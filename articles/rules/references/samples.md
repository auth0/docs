---
title: Rule Examples
description: A collection of sample Rules.
toc: true
topics:
  - rules
  - extensibility
contentType: reference
useCase: extensibility-rules
---

# Rule Examples

In this article you'll find a collection of sample Rules. For more examples, see our Github repo at [auth0/rules](https://github.com/auth0/rules).

## Hello World

This Rule will add a `hello` claim (with the value `world`) to the ID Token that will be afterwards sent to the application.

```js
function (user, context, callback) {
  context.idToken["http://mynamespace/hello"] = "world";
  console.log('===> set "hello" for ' + user.name);
  callback(null, user, context);
}
```

Note that the claim is [namespaced](/tokens/guides/create-namespaced-custom-claims): we named it `http://mynamespace/hello` instead of just `hello`. This is what you have to do in order to add arbitrary claims to an ID Token or <dfn data-key="access-token">Access Token</dfn>.

::: panel Namespace Identifiers
Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier, and any number of namespaces can be used. Exceptions are `webtask.io` and `webtask.run`, which are Auth0 domains and therefore cannot be used. The namespace URL does not have to point to an actual resource; it's only used as an identifier and will not be called by Auth0. For more information, refer to [User profile claims and scope](/api-auth/tutorials/adoption/scope-custom-claims).
:::

## Add roles to a user

In this example, all authenticated users will get a **guest** <dfn data-key="role">role</dfn>, but `johnfoo@gmail.com` will also be an **admin**:

```js
function (user, context, callback) {
  if (user.email === 'johnfoo@gmail.com') {
    context.idToken["http://mynamespace/roles"] = ['admin', 'guest'];
  }else{
    context.idToken["http://mynamespace/roles"] = ['guest'];
  }

  callback(null, user, context);
}
```

At the beginning of the Rules pipeline, John's `context` object will be:

```json
{
  "clientID": "YOUR_CLIENT_ID",
  "clientName": "YOUR_CLIENT_NAME",
  "clientMetadata": {},
  "connection": "YOUR_CONNECTION_NAME",
  "connectionStrategy": "auth0",
  "protocol": "oidc-implicit-profile",
  "accessToken": {},
  "idToken": {},
  //... other properties ...
}
```

After the Rule executes, the `context` object will have the added namespaced claim as part of the ID Token:

```json
{
  "clientID": "YOUR_CLIENT_ID",
  "clientName": "YOUR_CLIENT_NAME",
  "clientMetadata": {},
  "connection": "YOUR_CONNECTION_NAME",
  "connectionStrategy": "auth0",
  "protocol": "oidc-implicit-profile",
  "accessToken": {},
  "idToken": { "http://mynamespace/roles": [ "admin", "guest" ] },
  //... other properties ...
}
```

When your application receives the ID Token, it will verify and decode it in order to access this added custom claim. The payload of the decoded ID Token will be similar to the following sample:

```json
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|USER_ID",
  "aud": "YOUR_CLIENT_ID",
  "exp": 1490226805,
  "iat": 1490190805,
  "nonce": "...",
  "at_hash": "...",
  "http://mynamespace/roles": [
    "admin",
    "guest"
  ]
}
```

For more information on the ID Token, refer to [ID Token](/tokens/concepts/id-tokens).

::: note
Properties added in a Rule are __not persisted__ in the Auth0 user store. Persisting properties requires calling the Auth0 Management API.
:::

## Deny access based on a condition

In addition to adding claims to the ID Token, you can return an *access denied* error.

```js
function (user, context, callback) {
  if (context.clientID === "BANNED_CLIENT_ID") {
    return callback(new UnauthorizedError('Access to this application has been temporarily revoked'));
  }

  callback(null, user, context);
}
```

This will cause a redirect to your <dfn data-key="callback">callback URL</dfn> with an `error` querystring parameter containing the message you set. (such as `https://yourapp.com/callback?error=unauthorized&error_description=Access%20to%20this%20application%20has%20been%20temporarily%20revoked`). Make sure to call the callback with an instance of `UnauthorizedError` (not `Error`).

::: note
Error reporting to the app depends on the protocol. <dfn data-key="openid">OpenID Connect (OIDC)</dfn> apps will receive the error in the querystring. <dfn data-key="security-assertion-markup-language">SAML</dfn> apps will receive the error in a `SAMLResponse`.
:::

## Copy user metadata to ID Token

This will read the `favorite_color` user metadata, and add it as a namespaced claim at the ID Token.

```js
function(user, context, callback) {

  // copy user metadata value in ID Token
  context.idToken['http://fiz/favorite_color'] = user.user_metadata.favorite_color;

  callback(null, user, context);
}
```

## Add claims to Access Token

This will add one custom namespaced claim at the Access Token.

```js
function(user, context, callback) {

  // add custom claims to Access Token
  context.accessToken['http://foo/bar'] = 'value';

  callback(null, user, context);
}
```

After this Rule executes, the Access Token will contain one additional namespaced claim: `http://foo/bar=value`.