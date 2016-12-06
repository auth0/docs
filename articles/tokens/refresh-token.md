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

To obtain a refresh token, the `offline_access` scope (see: [Scopes](/scopes)) and an arbitrary `device` name must be included when initiating an authentication request through the [authorize](/auth-api#!#get--offline-access) endpoint.

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

Since refresh tokens never expire it is important to be able to revoke them.

### Revoke a Refresh Token using the Management API

To revoke a refresh token using the Auth0 Management API, you need the `id` of the refresh token you wish to revoke. To obtain a list of existing refresh tokens, call the [List device credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoint, specifying `type=refresh_token` with an access token containing `read:device_credentials` scope. To narrow the results, you can also specify the `client_id` and `user_id` associated with the token, if known.

```
GET https://${account.namespace}/api/v2/device-credentials?
  type=refresh_token
  &client_id={}
  &user_id={}

{
  "Authorization":   "Bearer {your_access_token}"
}
```

Response body:

```
[
  {
    "id": "dcr_dFJiaAxbEroQ5xxx",
    "device_name": "my-device" // the value of 'device' provided in the /authorize call when creating the token
  }
]
```

To revoke a __refresh token__, call the [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) endpoint with an access token containing `delete:device_credentials` scope and the value of `id` obtained above:

```
DELETE https://${account.namespace}/api/v2/device-credentials/{id}

{
  "Authorization":   "Bearer {your_access_token}"
}

```

The response will be a **204**: The credential no longer exists.

### Revoke a Refresh Token in the Dashboard

To see if a user has existing devices with associated refresh tokens, go to the [Users section](${manage_url}/#/users) of the dashboard. Click the name of the user to view their **Details** page.

Select the **Devices** tab. This page lists all device names and the number of refresh tokens associated with each. To revoke a refresh token, click the **X** to the right of the device name.

![](/media/articles/tokens/dashboard-revoke-refresh-token.png)

Click **UNLINK** to confirm.

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
