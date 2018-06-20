---
title: State Parameter
description: Explains how to use the state parameter in authentication requests to help prevent CSRF attacks.
topics:
    - protocols
    - oauth
    - state-parameter
	  - csrf
contentType: how-to
---

# State Parameter

Authorization protocols provide a `state` parameter. During authentication, the application sends this parameter in the authorization request, and the Authorization Server (Auth0) will return this parameter unchanged in the response.

A CSRF attack, also known as a one-click attack or session-riding, can occur when a malicious program causes a user's web browser to perform an unwanted action on a trusted site upon which the user is currently authenticated. This type of attack targets state-changing requests as opposed to user data to initiate an action.

![](/media/articles/protocols/CSRF_Diagram.png)

::: note
Depending on the application type or framework, this may be included for the developer. Also the exact structure of the requests may differ.
:::

## How to use the state parameter

Deny malicious requests by setting the `state` parameter to hold a value for verification.

::: note
For most cases, the `state` parameter should be a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) as shown in the example below.  **But this field can also be a [Base64](https://en.wikipedia.org/wiki/Base64) encoded json object that can hold multiple values [such as a return URL](/tutorials/redirecting-users).**
:::

1. Before redirecting a request to the [IdP](/identityproviders), have the application generate a random string.

```text
xyzABC123
```

2. Save this string to a variable in [web storage](/security/store-tokens#web-storage-local-storage-session-storage-).

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

### How to get the state parameter value in a rule

Accessing the `state` parameter value within a rule depends on the type of connection used; either in the body of the request or in the query string. You can obtain it using the following:

```js
var state = context.request.query.state || context.request.body.state;
```

## Keep reading

::: next-steps
* [Protecting against other common threats](/security/common-threats)
:::
