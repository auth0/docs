---
title: Refresh Token
description: What is a Refresh Token and what you can do with it.
---

# Refresh Token

A **refresh token** is a special kind of token that contains the information required to obtain a new `access_token` or `id_token`.

> An `id_token` is used by the client that receives it in order to identify the user. An `access_token` is used by a client to access an API. For more information refer to: [Tokens](/tokens).

Usually, a user will need a new access token only after the previous one expires, or when gaining access to a new resource for the first time.

Refresh tokens are subject to strict storage requirements to ensure that they are not leaked. Also, [Refresh tokens can be revoked](#revoke-a-refresh-token) by the Authorization Server.

## Overview

The response of an [authentication request](/protocols) can result in an `access_token` and/or an `id_token` being issued by Auth0. The  `access_token` is used to make authenticated calls to a secured API, while the `id_token` contains user profile attributes represented in the form of _claims_. Both JWTs have an expiration date indicated by the `exp` claim (among other security measures, like signing).

A refresh token allows the application to request Auth0 to issue a new `access_token` or `id_token` directly, without needing to re-authenticate the user. This will work as long as the refresh token has not been revoked.

::: panel-warning Secure Storage
Refresh tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

Refresh tokens can be [obtained](#obtain-a-refresh-token) or [revoked](#revoke-a-refresh-token-using-the-management-api) programmatically through the Auth0 API.

They can also be viewed and revoked [from the dashboard](#revoke-a-refresh-token-in-the-dashboard).

## Obtain a Refresh Token

To obtain a refresh token, the `offline_access` scope (see: [Scopes](/scopes)) and an arbitrary `device` name must be included when initiating an authentication request through the [authorize](/api/authentication/reference#authorize-client) endpoint.

For example:

```
GET https://${account.namespace}/authorize/?
    response_type=token
    &client_id=${account.clientId}
    &redirect_uri=YOUR_CALLBACK_URL
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &scope=openid%20offline_access
    &device=my-device
```

**NOTE**: The `device` parameter can be any value, such as a unique mobile device identifier.

When the authentication flow completes, Auth0 will redirect the user to the `callback_URL` as usual.
The complete URL will be as follows:

```
GET https://YOUR_CALLBACK_URL#
    access_token=2nF...WpA
    &id_token=eyJhb...
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &refresh_token=Cqp...Mwe
```

The refresh token is returned as part of the URL, in the form of an opaque string.

**NOTE**: In this case, the token was returned to the client directly in the URL because the [implicit flow](/protocols#oauth2-implicit-flow) (`response_type=token`) was used.

## Use a Refresh Token

To obtain a new `id_token`, call the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

::: panel-info Rate limits
Obtaining new tokens using the `refresh_token` should occur only if the `access_token` has expired or you want to refresh the claims contained in the `id_token`. For example, it is a bad practice to call the endpoint to get a new token every time you call an API using the `access_token`. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
:::


## Revoke a Refresh Token

Since refresh tokens never expire it is important to be able to revoke them. You can revoke a refresh token either by posting a revocation request to `https://${account.namespace}/oauth/revoke` or using the [dashboard](${manage_url}).

### Revoke a refresh token with a request

To revoke a refresh token you can send a `POST` request to `https://${account.namespace}/oauth/revoke`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/revoke",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\", \"token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

The refresh token must be issued for the client making the revocation request.

If the request is valid, the refresh token is revoked and the response is `HTTP 200`, with an empty response body. Otherwise, the response body contains the error code and description.

```json
{
  "error": "invalid_request|invalid_client",
  "error_description": "Description of the error"
}
```

The possible responses are:

| HTTP Status | Description |
| --- | --- |
| 200 | The refresh token is revoked or does not exist. The response body is empty. |
| 400 | The required parameters were not sent in the request or the refresh token was not issued to the client making the revocation request (`"error": "invalid_request"`). |
| 401 | The request is not authorized (`"error": "invalid_client"`). Check that the client credentials (`client_id` and `client_secret`) are present in the request and hold valid values. |

### Revoke a refresh token using the dashboard

To revoke a refresh token, go to the [Users section](${manage_url}/#/users) of the [dashboard](${manage_url}). Click the name of the user to view their *Details* page.

Select the *Authorized Applications* tab. This page lists all the clients to which the user has authorized access. Revoking an authorized application revokes also its associated refresh tokens.

To revoke a refresh token, click **Revoke**.

![Revoke a refresh token using the dashboard](/media/articles/tokens/dashboard-revoke-refresh-token.png)

## SDK Support

The [Lock](/libraries/lock), [auth0.js](/libraries/auth0js), and [auth0-angular.js](https://github.com/auth0/auth0-angular) libraries include support methods to obtain and use refresh tokens.

For more information about using refresh tokens with these libraries, see:

* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)

* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/save-and-refresh-jwt-tokens)

* [Get a refresh token with Auth0.js](https://github.com/auth0/auth0.js#login) and [Use a refresh token to get new id_token](https://github.com/auth0/auth0.js#refresh-token)

* [Using Refresh Tokens in Mobile Applications](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)


## More information

* [Refresh Tokens: When to Use Them and How They Interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

* [Using a refresh token with an ID token](/tokens/id_token#lifetime)

* [Using a refresh token with an access token](/tokens/access_token#lifetime)
