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
# Sample Use Cases: Scopes

## Authenticate a user and request standard claims using OIDC scopes

In this example, we use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to authenticate a user and retrieve an ID Token that contains the user's name, nickname, profile picture, and email information. For details on the parameters or to learn how to fully implement this flow, refer to our tutorial: [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).

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

Notice that the `scope` parameter includes three values: 

* `openid` (to indicate that the application intends to use OIDC and would like an ID Token)
* `profile` (to get `name`, `nickname`, and `picture`)
* `email` (to get `email` and `email_verified`)


2. After Auth0 redirects back to your app, extract the ID Token from the hash fragment of the URL and decode it.

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

Your app now can retrieve these values and use them to personalize your UI.

## Request custom scopes for your API

If you wanted to expand [our example on asking for standard claims](/scopes/current/oidc-scopes#example-asking-for-standard-claims) to include also the `read:contacts` permission, then you would using something like the following sample URL to initiate the authentication flow using the Implicit grant:

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

Note the differences between the example above and the example on asking for standard claims. In the example above, we want to get an Access Token, that will allow us to access the API, with the rights to do specific actions. To do so, we changed two parameters and added a new one:

- `audience`: New parameter added for this example. Its value is the unique identifier of the API we want to get access to.

- `scope`: We appended the value `read:contacts`. This denotes the rights that we want to be granted at the API (in this case, read contact information).

- `response_type`: We appended the value `token`. This tells the Authorization Server (Auth0 in our case) to issue an Access Token as well, not only an ID Token. The Access Token will be sent to the API as credentials.
