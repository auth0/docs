---
title: State Parameter
description: Explains how to use the state parameter in authentication requests to help prevent CSRF attacks and restore state
toc: true
topics:
    - protocols
    - oauth
    - state-parameter
    - csrf
contentType:
  - concept
useCase:
  - development
---

# State Parameter

Authorization protocols provide a **state** parameter. During authentication, the application sends this parameter in the authorization request, and the Authorization Server (Auth0) will return this parameter unchanged in the response.

Your application can use this parameter in order to:

- Make sure that the response belongs to a request that was initiated by the same user. Therefore, **state** helps mitigate [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

- Restore the previous state of your application.

## Format and Limitations

For the most basic cases the **state** parameter should be a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), used to correlate the request with the response received from the authentication (see below).

Note that the allowed length for state is not unlimited. If you get the error `414 Request-URI Too Large` try a smaller value.

## How to use the parameter against CSRF attacks

A **CSRF attack** can occur when a malicious program causes a user's web browser to perform an unwanted action on a trusted site that the user is currently authenticated. This type of attack specifically target state-changing requests to initiate a type of action instead of getting user data because the attacker has no way to see the response of the forged request.

![Diagram of CSRF attack](/media/articles/protocols/CSRF_Diagram.png)

By using the state parameter to hold a correlation value for verification, malicious requests can be denied.

::: note
Most modern OIDC and OAuth2 SDKs, including Auth0.js in Single Page Applications, handle the state generation and validation automatically. 
:::

1. Before redirecting a request to the [IdP](/identityproviders), have the application generate a random string.

```text
xyzABC123
```

2. Remember this string locally. The method will vary depending on the type of application: could be a cookie or session in a regular web application, local storage in the browser for a single page app, or memory or local storage for a native application.

```text
storeStateLocally(xyzABC123)
```

3. Add the **state** parameter in the request (URL-encoding if necessary).

```js
// Encode the String
tenant.auth0.com/authorize?...&state=xyzABC123
```

4. After the request is sent, the user is redirected back to the application by Auth0. The **state** value will be included in this redirect. Note that depending on the type of connection used, this value might be in the body of the request or in the query string.

```text
/callback?...&state=xyzABC123
```

5.  Retrieve the returned **state** value and compare it with the one you stored earlier. If the values match, then approve the authentication response, else deny it.

```js
// Decode the String
var decodedString = Base64.decode(encodedString);
if(receivedState === retrieveStateStoredLocally()) {
	// Authorized request
} else {
	// This response is not for us, reject it
}
```
## How to use the parameter to restore application state

Before you redirect the user to authenticate you might want to store some application state. For instance, if a user intended to access a protected page in your app, and that action triggered the request to authenticate, you will store that URL to redirect the user back to the intended page after the authentication finishes.

You can use the same `state` parameter to lookup and restore the previous state of your application.

The process in order to do that looks like the following:

1. Generate the nonce that you will use to protect against CSRF attacks as explained before. Store the nonce locally, using it as the key to store all the other application state like the URL where the user intended to go. E.g.:

```json
{
  "xyzABC123" : {
    redirectUrl: '/protectedResource',
    expiresOn: [...]
  }
}
```

2. Authenticate the user, sending the generated nonce as the state.
3. As part of the callback processing and response validation, verify that the state returned matches the nonce stored locally. If it does, retrieve the rest of the application state (like the `redirectUrl`). 
4. Once you complete the callback processing redirect the user to the URL previously stored.

Again, how you store the nonce and the URL or other information pertinent to the application state depends on your application's type. It can be local storage in single page or native apps or a cookie in a regular web app. 

## How to get the parameter value in a rule

You can access the **state** parameter value within a [rule](/rules). How you can get this value will depend on the type of flow used; either from the body of the request or from the query string. 

You can obtain it using the following:

```js
var state = context.request.query.state || context.request.body.state;
```

## Keep reading

::: next-steps
* [Protecting against other common threats](/security/common-threats)
:::
