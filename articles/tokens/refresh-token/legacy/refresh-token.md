---
description: A refresh token allows an application to request Auth0 to issue a new id_token directly, without needing to re-authenticate the user.
---

# Refresh Token

<div class="alert alert-info">
  <strong>Heads up!</strong> If you are working with the <a href="/api-auth">API Authorization flows</a> and you are looking for the updated documentation, refer to <a href="/tokens/preview/refresh-token">Refresh Token (API Authorization)</a>.
</div>

A **Refresh Token** is a special kind of token that is used to authenticate a user without them needing to re-authenticate. This is primarily useful for mobile applications that are installed on a device.

Usually, a user will need a new access token only after the previous one expires, or when gaining access to a new resource for the first time.

If you are new to refresh tokens, you can learn more about them in this blog post: [Refresh Tokens: When to Use Them and How They Interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/).

Refresh tokens can be [obtained](#obtain-a-refresh-token) or [revoked](#revoke-a-refresh-token-using-the-management-api) programmatically through the Auth0 API. They can also be viewed and revoked [from the dashboard](#revoke-a-refresh-token-in-the-dashboard).

Refresh tokens are subject to strict storage requirements to ensure that they are not leaked.

## Obtain a Refresh Token

To obtain a refresh token, the `offline_access` scope (see: [Scopes](/scopes)) and an arbitrary `device` name must be included when initiating an authentication request through the [authorize](/api/authentication/reference#authorize-client) endpoint.

For example:

```text
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

```text
GET https://YOUR_CALLBACK_URL#
    access_token=2nF...WpA
    &id_token=eyJhb...
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &refresh_token=Cqp...Mwe
```

The refresh token is returned as part of the URL, in the form of an opaque string.

::: panel-warning Security Warning
Refresh tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

**NOTE**: In this case, the token was returned to the client directly in the URL because the [implicit flow](/protocols#oauth2-implicit-flow) (`response_type=token`) was used.

## Use a Refresh Token

To obtain a new `id_token`, call the [delegation](/api/authentication/reference#delegation) endpoint in the Authentication API:

```text
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

```json
{
  "token_type": "Bearer",
  "expires_in": 36000,
  "id_token": "eyJ..."
}
```

The `expires_in` parameter indicates the lifetime of the new JWT in seconds. It can be calculated by the difference between the `exp` and `iat` claims of the JWT.

::: panel-info Rate limits
Obtaining new tokens using the `refresh_token` should occur only if the `id_token` has expired. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
:::


## Revoke a Refresh Token

Since refresh tokens never expire, it is important to be able to revoke them.

### Revoke a Refresh Token using the Management API

To revoke a refresh token using the Auth0 Management API, you need the `id` of the refresh token you wish to revoke. To obtain a list of existing refresh tokens, call the [List device credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoint, specifying `type=refresh_token` with an access token containing `read:device_credentials` scope. To narrow the results, you can also specify the `client_id` and `user_id` associated with the token, if known.

```text
GET https://${account.namespace}/api/v2/device-credentials?
  type=refresh_token
  &client_id={}
  &user_id={}

{
  "Authorization":   "Bearer {your_access_token}"
}
```

Response body:

```text
[
  {
    "id": "dcr_dFJiaAxbEroQ5xxx",
    "device_name": "my-device" // the value of 'device' provided in the /authorize call when creating the token
  }
]
```

To revoke a __refresh token__, call the [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) endpoint with an access token containing `delete:device_credentials` scope and the value of `id` obtained above:

```text
DELETE https://${account.namespace}/api/v2/device-credentials/{id}

{
  "Authorization":   "Bearer {your_access_token}"
}

```

The response will be a **204**: The credential no longer exists.

### Revoke a Refresh Token in the Dashboard

To see if a user has existing devices with associated refresh tokens, go to the [Users section](${manage_url}/#/users) of the dashboard. Click the name of the user to view their **Details** page.

Select the **Devices** tab. This page lists all device names and the number of refresh tokens associated with each. To revoke a refresh token, click the **X** to the right of the device name.

![Revoke a Refresh Token in the Dashboard](/media/articles/tokens/legacy/dashboard-revoke-refresh-token.png)

Click **UNLINK** to confirm.
