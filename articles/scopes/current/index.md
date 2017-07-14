---
title: Scopes
description: Overview of scopes.
toc: true
---

# Scopes

In OpenID Connect (OIDC) we have the notion of __claims__. These are strings, sent as part of the `scope` request parameter. These claims can be standard (as defined by the specification) or custom.

Claims are used in the following cases:

- When you want to get additional user information, like email or picture. For details refer to [Standard Claims](#standard-claims).

- When you want to have granular access control to your API. In this case, you need to define custom scopes for your API and add these values as part of the `scope` request parameter, for example: `scope=read:contacts`. For details refer to [API Scopes](#api-scopes).


## Standard Claims

OpenID Connect specifies a set of [standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). These are user attributes, intended to supply the client with user details such as email, name and picture.

This information can be returned in the `id_token` or in the response from [the /userinfo endpoint](/api/authentication#get-user-info).

### Example: Asking for Standard Claims

In this example, we will use the [OAuth 2.0 Implicit Grant](/api-auth/grant/implicit) to authenticate a user and get back an `id_token` that contains the user's name, nickname, profile picture and email information.

The following apply:
- `scope=openid`: will only return the `iss`, `sub`, `aud`, `exp`, `iat` and `at_hash` claims.
- `scope=openid profile`: will return the claims listed above, plus `name`, `nickname`, `picture` and `updated_at`.
- `scope=openid profile email`: will return the claims listed above, plus `email` and `email_verified`.

To initiate the authentication flow, send the user to the authorization URL and request an `id_token`:

```text
https://${account.namespace}/authorize?
  scope=openid%20profile%20email&
  response_type=id_token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

::: note
For details on the params and how to implement this flow refer to [How to implement the Implicit Grant](/api-auth/tutorials/implicit-grant).
:::

Notice that we included three values at the `scope` param: `openid`, `profile` (to get `name`, `nickname` and `picture`) and email (to get the `email` claim).

After Auth0 has redirected back to the app, you can extract the `id_token` from the hash fragment of the URL.

When decoded, the `id_token` contains the following claims:

```json
{
  "name": "John Doe",
  "nickname": "john.doe",
  "picture": "https://myawesomeavatar.com/avatar.png",
  "updated_at": "2017-03-30T15:13:40.474Z",
  "email": "john.doe@test.com",
  "email_verified": false,
  "iss": "https://${account.namespace}/",
  "sub": "auth0|USER-ID",
  "aud": "${account.clientId}",
  "exp": 1490922820,
  "iat": 1490886820,
  "nonce": "crypto-value",
  "at_hash": "IoS3ZGppJKUn3Bta_LgE2A"
}
```

Your app now can retrieve these values and personalize the UI.

## Custom Claims

In order to add custom claims to ID tokens or access tokens, they must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). This is to avoid possible collisions with standard OIDC claims.

### Example: Add Custom Claims

Suppose an identity provider returns a `favorite_color` claim as part of the user’s profile, and that we’ve used the Auth0 management API to set application-specific information for this user. We also save the `preferred_contact` information as part of the `user_metadata`.

This would be the profile stored by Auth0:

```json
{
  "email": "jane@example.com",
  "email_verified": true,
  "user_id": "custom|123",
  "favorite_color": "blue",
  "user_metadata": {
    "preferred_contact": "email"
  }
}
```

In order to add these claims to the `id_token` we need to create a rule to customize the token, and add these scopes using namespaced format in the rule.

Sample Rule:

```js
function (user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}
```

Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier, and any number of namespaces can be used. The namespace URL does not have to point to an actual resource, it’s only used as an identifier and will not be called by Auth0. This follows a [recommendation from the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims) stating that custom claim identifiers should be collision-resistant. While this is not mandatory according to the specification, Auth0 will always enforce namespacing, meaning that any non-namespaced claims will be silently excluded from tokens.

::: warning 
`auth0.com`, `webtask.io` and `webtask.run` are Auth0 domains and therefore cannot be used as a namespace identifier. 
:::

If you need to add custom claims to the access token, the same applies but using `context.accessToken` instead.

Please note that adding custom claims to id tokens through this method will also let you obtain them when calling the `/userinfo` endpoint. However, rules run when the user is authenticating, not when `/userinfo` is called.

## API Scopes

Scopes allow you to define the API data accessible to your client applications. When you [create an API in Auth0](/apis), you'll need to define one scope for each API represented and action. For example, if you want to `read` and `delete` contact information, you would create two scopes: `read:contacts` and `delete:contacts`.

Once you create an API and define the scopes, the client applications can request these defined permissions when they initiate an authorization flow, and include them in the access token as part of the scope request parameter.

If you wanted to expand [our example](#example-asking-for-standard-claims) to include also the `read:contacts` permission, then to initiate the authentication flow, using Implicit Grant, you would use something like this:

```text
https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=openid%20profile%20email%20read:contacts&
  response_type=id_token%20token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Note the differences between the two examples. In the latest, we want to get an `access_token`, that will allow us to access the API, with the rights to do specific actions. To do so, we changed two parameters and added a new one:

- `audience`: New parameter added for this example. Its value is the unique identifier of the API we want to get access to.

- `scope`: We appended the value `read:contacts`. This denotes the rights that we want to be granted at the API (in this case, read contact information).

- `response_type`: We appended the value `token`. This tells the Authorization Server (Auth0 in our case) to issue an `access_token` as well, not only an `id_token`. The `access_token` will be sent to the API as credentials.
