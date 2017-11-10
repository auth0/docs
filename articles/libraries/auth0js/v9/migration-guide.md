---
section: libraries
title: Auth0.js v8 to v9 Migration Guide
description: How to migrate from auth0.js v8 to auth0.js v9
toc: true
---
# Migration Guide: Auth0.js v8 to v9

This document lists all the changes that you should be aware of when migrating between versions 8 and 9 of Auth0.js. It includes information on what is changing and why, details on new or deprecated features, and instructions on how you can migrate your implementation.

If you are using Auth0.js with your custom login in embedded mode, you are encouraged to use the latest and more secure version of the library, but before you update your code, make sure that you have reviewed this document and made any necessary changes in your implementation. 

If you have any questions or concerns, you can submit them using the [Support Center](${env.DOMAIN_URL_SUPPORT}), or directly through your account representative, if applicable. 

## Cross Origin Authentication

If your implementation uses the `loginWithCredentials` method, then in order to use v9, you need to have Cross Origin Authentication (COA) enabled. COA has some limitations which you should be aware of, and can be read about in the [Cross Origin Authentication](/cross-origin-authentication) documentation.

You can enable COA using the Dashboard, for details refer to [Configure Your Client for Cross-Origin Authentication](/cross-origin-authentication#configure-your-client-for-cross-origin-authentication).

![Cross-Origin Authentication Setting](/media/articles/cross-origin-authentication/cross-origin-settings.png)

## Allowed Web Origins

In order to use `login`, `loginWithCredentials`, `loginWithCredentials`, `passwordlessLogin`, `getSSOData` or `checkSession` you need to whitelist the websites where you will embed the login dialog in the  ‘Allowed Web Origins’ field, and in the Allowed Origins (CORS) fields:

![Allowed Web Origins](/media/articles/libraries/lock/allowed-origins.png)

### Hosted Login Pages

Auth0.js 9 is a new version, designed for embedded login scenarios (i.e. implementations where the login widget is embedded in your application), and is not supported in centralized login scenarios (i.e. Hosted Login Pages).

If you are using a [Hosted Login Page](/hosted-pages/login), keep using Auth0.js v8. If you have a login widget embedded in your application consider upgrading to the latest Auth0.js version. 

## Browsers with Third Party Cookies Disabled

The `login`, `loginWithCredentials`, `passwordlessLogin` methods will not work with [some browser versions](/cross-origin-authentication#browser-testing-matrix) when they have third-party cookies disabled.

## Default Values

Auth0.js 9 will default the value of the `scope` parameter to `openid profile email`.

## Differences in getSSOData Return Values

| Property | Old Value | New Value |
| --- | --- | --- |
| sso | `true` if user has an existing session, `false` if not | The same |
| sessionClients | List of clients ids the user has active sessions with | An array with a single element with the client id configured in auth0.js |
| lastUsedClientId | The client id for the last active connection | The last client the user used when calling `/authorize` |
| lastUsedUsername | User’s email or name | The same (requires `scope=’openid profile email’)` |
| lastUsedClientId | Client Id of the active session  | The client id configured in auth0.js |
| lastUsedConnection | Last used connection and strategy. | Last connection that the user called `/authorize` or `/co/authenticate` with. It will be `null` if the user authenticated with the HLP. It will not return `strategy`, only `name` |

## Calling getProfile

In earlier versions of Auth0.js the `getProfile()` function received a string parameter with an ID Token. In Auth.js v9 it needs to receive an Access Token. You’ll need to update your code to change the parameter sent.

## The checkSession Method

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

In case of error the response will include a JSON object, for example:

```text
{
  error: 'login_required'
}
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
{
  error: 'login_required'
}
```

In this case you will want to display a Login button in the page so the user can authenticate. 

::: note
For more information on Silent Authentication and how to implement it, refer to [Silent Authentication](/api-auth/tutorials/silent-authentication).
:::
