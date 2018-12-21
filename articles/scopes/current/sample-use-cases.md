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

In these examples, we use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to authenticate a user and request the necessary scopes and tokens. For details on the request parameters or to learn how to fully implement this flow, refer to our tutorial: [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).

## Authenticate a user and request standard claims using OIDC scopes

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

Your app now can retrieve the user attributes and use them to personalize your UI.


## Request custom API access for your application

In this example, we expand on our previous example requesting standard claims to also include a custom scope for a calendar API that will allow the calling application to read appointments for the user. To do this, we want to get an additional token--an Access Token with a scope that allows us to read appointments from the API.

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

Notice that in this example, we have added an `audience` parameter. Its value is the unique identifier of the API to which we want to gain access.

Also notice:

* the `response_type` parameter now includes two values:
  * `id_token` (to get an ID Token)
  * `token` (to get an Access Token)
* the `scope` parameter now includes four values: 
  * `openid` (to indicate that the application intends to use OIDC to verify the user's identity)
  * `profile` (to get `name`, `nickname`, and `picture`)
  * `email` (to get `email` and `email_verified`)
  * `read:appointments` (to allow us to read the user's appointments from the API)

2. As in the previous example, after Auth0 redirects back to your app, extract the ID Token from the hash fragment of the URL, decode it, and retrieve the user attributes and use them to personalize your UI.

3. Call the API using the Access Token as credentials.
