---
title: Mitigate CSRF Attacks with State Parameters
description: Learn how to use the OAuth 2.0 state parameters against CSRF attacks.
topics:
    - protocols
    - oauth
    - state-parameter
    - csrf
    - xsrf
contentType: how-to
useCase: development
---
# Mitigate CSRF Attacks With State Parameters

You can deny malicious requests by using the `state` parameter to hold a correlation value for verification.

A CSRF attack can occur when a malicious program causes a user's web browser to perform an unwanted action on a trusted site on which the user is currently authenticated. This type of attack specifically targets state-changing requests to initiate an action instead of getting user data because the attacker has no way to see the response to the forged request.

The state parameter helps mitigate CSRF attacks to ensure that the response belongs to a request that was initiated by the same user. For the most basic cases the state parameter should be a <dfn data-key="nonce">nonce</dfn>, used to correlate the request with the response received from the authentication. 

::: note
Most modern OIDC and OAuth2 SDKs, including Auth0.js in single-page applications, handle the state generation and validation automatically. 
:::

1. Before redirecting a request to the [IdP](/identityproviders), have the application generate a random string. For example:

   ```text
   xyzABC123
   ```

::: note
The allowed length for state is not unlimited. If you get the error `414 Request-URI Too Large` try a smaller value.
:::

2. Store this string locally. Choose a method based on your type of application. For example:

   * For regular web apps, use a cookie or session
   * For a single-page app, use local storage in the browser
   * For a native app, use memory or local storage

   ```text
   storeStateLocally(xyzABC123)
   ```

3. Add the `state` parameter to the request (URL-encoding if necessary).

   ```js
   // Encode the String
   tenant.auth0.com/authorize?...&state=xyzABC123
   ```

   After the request is sent, the user is redirected back to the application by Auth0. The `state` value will be included in this redirect. Note that depending on the type of connection used, this value might be in the body of the request or in the query string.

   ```text
   /callback?...&state=xyzABC123
   ```

4.  Retrieve the returned `state` value and compare it with the one you stored earlier. If the values match, then approve the authentication response, else deny it.

   ```js
   // Decode the String
   var decodedString = Base64.decode(encodedString);
   if(receivedState === retrieveStateStoredLocally()) {
    	// Authorized request
   } else {
    	// This response is not for us, reject it
   }
   ```

## Keep reading

* [State Parameter Overview](/protocols/oauth2/oauth-state)
* [OAuth 2.0 Framework](/protocols/oauth2)
* [Protecting against other common threats](/security/common-threats)
