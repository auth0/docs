---
title: The State Parameter
description: Explains how to use the state parameter in authentication requests to help prevent CSRF attacks.
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

# The State Parameter

Authorization protocols provide a `state` parameter. During authentication, the application sends this parameter in the authorization request, and the Authorization Server (Auth0) will return this parameter unchanged in the response.

Your application can use this parameter in order to:

- Make sure that the response belongs to a request that was initiated by the same user. Therefore, `state` helps mitigate [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

- Restore the previous state of the application. For example, you can retrieve the URL that the user intended to reach before the application decided that it needed to issue an authorization request. Store this value locally, authenticate the user, retrieve the value once you get the callback from Auth0, and then redirect the user there. How you store that value depends on your application's type. It can be local storage in single page apps or a cookie in a regular web app. Also, in this case, the parameter cannot be just a random string, it has to be a proper JSON object in order to hold values (see [Format](#format)).

:::note
A **CSRF attack** can occur when a malicious program causes a user's web browser to perform an unwanted action on a trusted site that the user is currently authenticated. This type of attack specifically target state-changing requests to initiate a type of action instead of getting user data because the attacker has no way to see the response of the forged request.
:::

## Format

For the most basic cases the `state` parameter should be a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). 

This field can also be a [Base64](https://en.wikipedia.org/wiki/Base64) encoded JSON object that can hold multiple values, [such as a return URL](/tutorials/redirecting-users).

## How to use the state parameter

By using the state parameter to hold a value for verification, malicious requests can be denied.

![Diagram of CSRF attack](/media/articles/protocols/CSRF_Diagram.png)

::: note
Depending on the application type or framework this may be included for the developer. Also the exact structure of the requests may differ.
:::

1. Before redirecting a request to the [IdP](/identityproviders), have the application generate a random string.

```text
xyzABC123
```

2. Save this string to a variable in [web storage](/security/store-tokens#web-storage-localstorage-sessionstorage-).

```text
auth0-authorize = xyzABC123
```

3. Encode this value and set it as the `state` parameter in the request.

```js
// Encode the String
var encodedString = Base64.encode(string);
tenant.auth0.com/authorize?...&state=encodedString
```

4. After the request is sent, the user is redirected back to the application by Auth0. The `state` value will be included in this redirect. Note that depending on the type of connection used, this value might be in the body of the request or in the query string.

```text
/login/callback?...&state=encodedString
```

5.  Decode the returned `state` value and compare it to the one you stored earlier. If the values match, then approve the request, else deny it.

```js
// Decode the String
var decodedString = Base64.decode(encodedString);
if(decodedString == auth0-authorize) {
	// Authorized request
} else {
	// Request Denied
}
```

### How to get the state in a rule

If you need to access the `state` value within a rule you must take in consideration that, depending on the type of connection used, it might come either in the body of the request or in the query string. Keeping that in mind, it can be accessed using the following:

```js
var state = context.request.query.state || context.request.body.state;
```

## Keep reading

::: next-steps
* [Protecting against other common threats](/security/common-threats)
:::
