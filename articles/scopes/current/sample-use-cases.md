---
description: Learn how to use scopes with applications and APIs.
topics:
  - scopes
contentType:
  - how-to
useCase:
  - development
  - add-login
  - call-api
  - secure-api
---
# Sample Use Cases: Scopes and Claims

In these examples, we use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to authenticate a user and request the necessary scopes and tokens. For details on the request parameters or to learn how to fully implement this flow, refer to our tutorial: [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).

## Authenticate a user and request standard claims

In this example, we want to authenticate a user and get user details that will allow us to personalize our UI. To do this, we want to get an ID Token that contains the user's name, nickname, profile picture, and email information.

1. Initiate the authentication flow by sending the user to the authorization URL and requesting an ID Token:

```text
https://${account.namespace}/authorize?
  scope=openid%20profile%20email&
  response_type=id_token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Notice that in this example: 

* the `response_type` parameter includes one value:
  * `id_token` (to get an ID Token)
* the `scope` parameter includes three values: 
  * `openid` (to indicate that the application intends to use OIDC to verify the user's identity)
  * `profile` (to get `name`, `nickname`, and `picture`)
  * `email` (to get `email` and `email_verified`)

2. After the user consents and Auth0 redirects back to your app, extract the ID Token from the hash fragment of the URL and decode it.

You should see the following claims:

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

Your app now can retrieve the user attributes and use them to personalize your UI.


## Request custom API access

In this example, we expand on our previous example requesting standard claims to also include a custom scope for a calendar API that will allow the calling application to read appointments for the user. To do this, we want to get an additional token--an Access Token with a scope that allows us to read appointments from the API.

::: note
Before using a custom API scope, you need to [define the scope for your API using the Auth0 Dashboard](/scopes/guides/define-api-scope-dashboard). You can also use defined scopes to [customize the consent prompt](/scopes/guides/customize-consent-prompt) for your users.
:::

1. Initiate the authentication flow by sending the user to the authorization URL and requesting tokens:

```text
https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=openid%20profile%20email%20read:appointments&
  response_type=id_token%20token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Notice that in this example:

* the `response_type` parameter now includes two values:
  * `id_token` (to get an ID Token)
  * `token` (to get an Access Token)
* the `scope` parameter now includes four values: 
  * `openid` (to indicate that the application intends to use OIDC to verify the user's identity)
  * `profile` (to get `name`, `nickname`, and `picture`)
  * `email` (to get `email` and `email_verified`)
  * `read:appointments` (to allow us to read the user's appointments from the API)
* the `audience` parameter is new and includes one value:
  * the unique identifier of the API from which we want to read the user's appointments

2. As in the previous example, after the user consents and Auth0 redirects back to your app, extract the ID Token from the hash fragment of the URL, decode it, and retrieve the user attributes and use them to personalize your UI.

3. Call the API using the Access Token as credentials.


## Add custom claims to a token

In this example, we add a user's favorite color and preferred contact method to the ID Token. To do this, we create a [rule](/rules) to customize the token by adding these claims using a namespaced format. Once added, we will also be able to obtain the custom claims when calling the `/userinfo` endpoint (though the rule will run only during the authentication process).

Suppose that:

* The user logged in using an identity provider that returned a `favorite_color` claim as part of the user profile.
* At some point, the user selected a `preferred_contact` method of `email`, and we saved it as part of the [user's `user_metadata`](/users/concepts/overview-user-metadata).
* We've used the Auth0 Management API to set application-specific information for this user.

In this case, the Auth0-stored profile is:

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

Create a rule to customize the token:

```js
function (user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}
```

::: note
This example shows a custom claim being added to an ID Token, which uses the `context.idToken` property. To add to an Access Token, use the `context.accessToken` property instead.
:::

## Keep reading

- [Scopes](/scopes)
- [OpenID Connect Scopes](/scopes/current/oidc-scopes)
- [API Scopes](/scopes/current/api-scopes)
- [Custom Claims](/scopes/current/custom-claims)
