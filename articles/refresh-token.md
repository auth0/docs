---
description: A refresh token allows an application to request Auth0 to issue a new id_token directly, without needing to re-authenticate the user.
---

# Refresh Tokens

A **refresh token** is a special kind of [JWT](/jwt) that is used to obtain a renewed `id_token` at any time.

For more information on the types of access tokens used by Auth0, see [Tokens](/tokens).

**NOTE:** Refresh tokens must be stored securely by an application because they essentially allow a user to remain authenticated forever.

## Introduction

The response of an [authentication request](/protocols) can result in an `id_token` (JWT) being issued by Auth0. This token is used to make authenticated calls to a secured API.

JWTs have an expiration date indicated by the `exp` claim, among other security measures (like signing).

However, applications that are installed locally on a device (such as a desktop or smartphone) may want to avoid asking the user to enter their credentials each time the token expires.

A refresh token allows the application to request Auth0 to issue a new `id_token` directly, without needing to re-authenticate. This will work as long as the refresh token has not been revoked.

Refresh tokens can be issued or revoked for each combination of __app__, __user__ and __device__. This can be done manually from the dashboard or programmatically through the Auth0 API.


## Obtain a refresh token

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

When the authentication flow finishes, Auth0 will redirect the user to the `callback_URL` as usual.
The complete URL will be as follows:

```
GET https://YOUR_CALLBACK_URL#
    access_token=2nF...WpA
    &id_token=eyJhb...
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &refresh_token=Cqp...Mwe
```

The refresh token is returned as part of the URL, in the form of an opaque string.

**NOTE**: In this case, the token was returned to the client directly in the URL because the [implicit flow](/protocols#oauth-for-native-clients-and-javascript-in-the-browser) (`response_type=token`) was used.

## Use a refresh token

To obtain a new `id_token`, call the [delegation](/auth-api#!#post--delegation) endpoint:

```
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id":       "${account.clientId}",
  "grant_type":      "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "refresh_token":   "your_refresh_token",
  "api_type":        "app"
}
```

A response from this request could be as follows:

```
{
  "token_type": "Bearer",
  "expires_in": 36000,
  "id_token": "eyJ..."
}
```

The `expires_in` parameter indicates the lifetime of the new JWT in seconds. It can be calculated by the difference between the `exp` and `iat` claims of the JWT.

::: panel-info Rate limits
Obtaining new tokens using the `refresh_token` should occur only if the `id_token` has expired. For example, it is a bad practice to call the endpoint to get a new token every time you call an API. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
:::


## Revoke a refresh token

Since refresh tokens never expire, it is important to be able to revoke them. 

You will need the `id` of the refresh token. To obtain a list of existing refresh tokens, you can call the [List device credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoint, specifying `type=refresh_token` with an access token containing `read:device_credentials` scope. To narrow the results, you can also specify the `client_id` and `user_id` associated with the token, if known.

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

## SDK support

The [auth0.js](/libraries/auth0js) and [auth0-angular.js](https://github.com/auth0/auth0-angular) libraries include support to obtain and use refresh tokens.

For more information about using refresh tokens with these libraries, see:

* [Get a refresh token with Auth0.js](https://github.com/auth0/auth0.js#login) and [Use a refresh token to get new id_token](https://github.com/auth0/auth0.js#refresh-token)

* [Using Refresh Tokens in Mobile Applications](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)
