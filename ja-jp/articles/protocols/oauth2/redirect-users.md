---
title: Redirect Users With State Parameters
description: How to redirect users with the OAuth 2.0 state parameter. 
topics:
  - users
  - user-management
  - state-parameter
  - redirection
contentType: how-to
useCase: manage-users
---
# Redirect Users with State Parameters

You can store the application state parameter before you redirect users to authenticate so that you can redirect them back to a URL. For example, if a user intends to access a protected page in your application, and that action triggers the request to authenticate, you can store that URL to redirect the user back to their intended page after the authentication finishes.

Use the `state` parameter to lookup and restore the previous state of your application. Generate and store a <dfn data-key="nonce">`nonce`</dfn> locally (cookies/session/localstorage), along with any desired state data (like the redirect URL). Use the `nonce` as a state in the protocol message. If the returned state matches the stored nonce, accept the OAuth2 message and fetch the corresponding state data from storage. This is the approach used by Auth0.js.

::: warning
Passing URLs in plaintext or in any predictable way is unsafe. State should always be unique and opaque to ensure that:

* `state` can be used for defense against CSRF attacks
* your app is not vulnerable to open redirect exploits, which can lead to phishing attacks
:::

1. Generate the `nonce` that you will use to protect against CSRF attacks as explained before. Store the `nonce` locally, using it as the key to store all the other application state like the URL where the user intended to go. For example:

   ```json
   {
     "xyzABC123" : {
       redirectUrl: '/protectedResource',
       expiresOn: [...]
     }
   }
   ```

2. Authenticate the user, sending the generated `nonce` as the state.

3. As part of the <dfn data-key="callback">callback</dfn> processing and response validation, verify that the state returned matches the `nonce` stored locally. If it does, retrieve the rest of the application state (like the `redirectUrl`). 

4. Once you complete the callback processing, redirect the user to the URL previously stored.

   Again, how you store the `nonce` and the URL or other information pertinent to the application state depends on your application's type. It can be local storage in single-page or native apps or a cookie in a regular web app. 

## Alternate method

Alternatively, you can:

1. Generate and store a `nonce` locally. 

2. Encode any desired `state` (like the redirect URL) along with the `nonce` in a protected message (that will need to be encrypted/signed to avoid tampering). 

3. In the response processing, unprotect the message, getting the `nonce` and other properties stored. 

4. Validate that the included `nonce` matches what was stored locally and, if so, accept the OAuth2 message.

## Keep reading

* [OAuth 2.0 Authorization Framework](/protocols/oauth2)
* [State Parameter](/protocols/oauth2/oauth-state)
* [Rules](/rules)
* [Redirect Users After Login Authentication](/users/guides/redirect-users-after-login)
* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [API Authorization](/api-auth)
