---
description: How to request tokens for your applications.
---

# API Authorization: Asking for Access Tokens

To ask Auth0 for tokens for any of your authorized client applications, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```
{
  audience: "{YOUR_API_IDENTIFIER}",
  grant_type: "client_credentials",
  client_id: "{APP_CLIENT_ID}",
  client_secret: "{APP_CLIENT_SECRET}"
}
```
The response will be a [signed JWT (JSON Web Token)](/jwt#2-body) containing at least the following claims in the body:

```
{
  "iss": "https://${account.namespace}/",
  "sub": "{APP_CLIENT_ID}@clients",
  "aud": "{YOUR_API_IDENTIFIER}",
  "exp": // unix timestamp of the token's expiration date,
  "iat": // unix timestamp of the token's creation date,
  "scope": ""
}
```

### Verifying an access token for a resource server

Access tokens will be signed using the signature method configured for the resource server, and must be verified accordingly:

* HS256 (symmetric): signed using the resource server's signing secret
* RS256 (asymmetric): signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: https://${account.namespace}/.well-known/jwks.json

For claim verification, use any [recommended JWT library](https://jwt.io/) which validates all the standard claims returned in the token.

### Authorized Client Applications

Your client app must be authorized to access your API before you can request tokens.

You can go to the **Non Interactive Clients** tab of your API in the [APIs section](${uiURL}/#/apis) of the dashboard to verify that the app you are using has been authorized to request access tokens from this API.

To add an authorized app, follow the instructions as described in [API Authorization: Using the Auth0 Dashboard](/api-auth#using-the-auth0-dashboard-for-setting-up-an-api-authorization-scenario).

### Where to Find the IDs

To find the values for the parameters referred to in this sample, go to the [Clients](${uiURL}/#/applications) page in the Dashboard, and select the application you want to use. There you will find these values:

  * `APP_CLIENT_ID`: This is the value of the **Client ID** field.
  * `APP_CLIENT_SECRET`: This is the value of the **Client Secret** field.

Also, go to the [APIs section](${uiURL}/#/apis) of the dashboard and select the API you are working with. There you will find this value:

  * `YOUR_API_IDENTIFIER`: This is the value of the **Id** field on the Settings tab of the API.
