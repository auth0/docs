---
section: libraries
title: Auth0.js v8 to v9 Migration Guide
description: How to migrate from auth0.js v8 to auth0.js v9
toc: true
---
# Migration Guide: Auth0.js v8 to v9

This document lists all the changes between versions 8 and 9 of Auth0.js. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you are using Auth0.js with your custom login in embedded mode, you are encouraged to use the latest, and more secure, version of the library, but before you update your code, make sure that you have reviewed this document and made any necessary changes in your implementation. 

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Why Migrate?

Auth0.js 9 uses by default Auth0's current authentication pipeline and does not utilize any of the legacy pipeline's endpoints. Going forward, any new Auth0 features, examples and documentation will target only this pipeline. All Auth0 SDK versions that depend on the legacy pipeline are deprecated and will not receive updates for new features or non-critical security issues, and will eventually be discontinued.

For more information on the current authentication pipeline and the changes it brings, refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).

## What Changes?

### Hosted Login Pages

Auth0.js 9 is a new version, designed for embedded login scenarios (i.e. implementations where the login widget is embedded in your application), and is not supported in centralized login scenarios (i.e. Hosted Login Pages).

If you are using a [Hosted Login Page](/hosted-pages/login), keep using Auth0.js v8. If you have a login widget embedded in your application consider upgrading to the latest Auth0.js version. 

### Cross Origin Authentication

If your implementation uses the `loginWithCredentials` method, then in order to use v9, you need to have [Cross Origin Authentication](/cross-origin-authentication) (COA) enabled. 

You can enable COA using the Dashboard, for details refer to [Configure Your Client for Cross-Origin Authentication](/cross-origin-authentication#configure-your-client-for-cross-origin-authentication).

::: note
Cross Origin Authentication has some limitations, before you enable it for your app make sure that you are aware of them. For details refer to [Cross Origin Authentication](/cross-origin-authentication).
:::

### checkSession Error Response

The `checkSession` method attempts to get a new token from Auth0 by using [silent authentication](/api-auth/tutorials/silent-authentication) or invokes callback with an error if the user does not have an active SSO session at your Auth0 domain.

In the case of callback with an error, Auth0.js 8 was returning a string with an error, for example `login_required`.

Auth0.js 9 will return a JSON object instead. For example:

```text
{
  error: 'login_required'
}
```

### Deprecated Methods

#### getSSOData
The `getSSOData` function is being replaced by the `checkSession` function.

If you are using `getSSOData` you need to update your implementation to use `checkSession` instead. For information on this new method, keep reading.

### New Methods

#### checkSession

The `checkSession` method attempts to get a new token from Auth0 by using [silent authentication](/api-auth/tutorials/silent-authentication) or invokes callback with an error if the user does not have an active SSO session at your Auth0 domain.

```js
auth0.checkSession({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order',
  redirectUri: 'https://example.com/auth/silent-callback',

  // this will use postMessage to comunicate between the silent callback
  // and the SPA. When false the SDK will attempt to parse the url hash
  // should ignore the url hash and no extra behaviour is needed.
  usePostMessage: true
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

You can use this method when a page loads. If the user was already logged in via SSO, Auth0 will respond exactly as if the user had authenticated manually through the SSO login page.

For example, if you using the [Implicit Grant](/api-auth/grant/implicit) in your SPA, Auth0 will respond with an `access_token` in the hash fragment of the URI:

```text
HTTP/1.1 302 Found
Location: http://YOUR-APP-URL#access_token=TOKEN&state=STATE&token_type=TYPE&expires_in=SECONDS
```

In this case you would extract the tokens from the hash fragment and display a Logout button in the page.
If the user was not logged in via SSO or their SSO session had expired, Auth0 will redirect to the specified `redirect_uri` (callback URL) with an error:

```text
GET https://your_callback_url/
    ?error=ERROR_CODE&
    error_description=ERROR_DESCRIPTION&
    state=...
```

In this case you will want to display a Login button in the page so the user can authenticate. 
For more information on Silent Authentication and how to implement it, refer to [Silent Authentication](/api-auth/tutorials/silent-authentication).
