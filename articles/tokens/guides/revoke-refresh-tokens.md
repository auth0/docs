---
title: Revoke Refresh Tokens
description: Learn how to revoke a Refresh Token if it gets compromised using the Authentication API, the Management API, or the Auth0 Dashboard. 
topics:
  - access-tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - how-to
useCase:
  - add-login
  - development
---
# Revoke Refresh Tokens

Since Refresh Tokens never expire, it is essential to be able to revoke them in case they get compromised.

For the Device Authorization Flow, the only way to force a device to reauthorize is to revoke the Refresh Token assigned to the device. To learn how, see [Unlink Devices from Users](/dashboard/guides/users/unlink-user-devices). Note that the device will not be forced to reauthorize until the current Access Token expires and the application tries to use the revoked Refresh Token.

Auth0 handles token revocation as though the token has been potentially exposed to malicious adversaries. Therefore, each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and audience will be revoked**.

You can revoke a Refresh Token by:

* Posting a request to [the Authentication API's /oauth/revoke endpoint](/api/authentication#revoke-refresh-token)
* Posting a request to [the Management API's /api/v2/device-credentials endpoint](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) 
* Using the [dashboard](${manage_url}).

## Use the Authentication API

To revoke a Refresh Token, you can send a `POST` request to `https://${account.namespace}/oauth/revoke`.

The API first validates the application credentials and then verifies whether the token was issued to the application making the revocation request.  If this validation fails, the request is refused, and the application is informed of the error. Next, the API invalidates the token. The invalidation takes place immediately, and the token cannot be used again after the revocation. Each revocation request invalidates all the tokens that have been issued for the same authorization grant.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/revoke",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Where:

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. The application should match the one the Refresh Token was issued for. |
| `client_secret` | Your application's Client Secret. Required for [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications). |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

The application should match the one for which the Refresh Token was issued.

::: panel Revoke a token without the Client Secret
For applications that cannot keep the Client Secret safe (e.g., native apps), the [Revoke endpoint](/api/authentication#revoke-refresh-token) supports access without the Client Secret. However, the application itself must have the property `tokenEndpointAuthMethod` set to `none`. You can change the `tokenEndpointAuthMethod` value, either from the UI ([Dashboard > Clients > Application Settings](${manage_url}/#/applications/${account.clientId}/settings)), or using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

If the request is valid, the Refresh Token is revoked, and the response is `HTTP 200`, with an empty response body. Otherwise, the response body contains the error code and description.

```json
{
  "error": "invalid_request|invalid_client",
  "error_description": "Description of the error"
}
```

The possible responses are:

| HTTP Status | Description |
| --- | --- |
| 200 | The Refresh Token is revoked, does not exist, or was not issued to the application making the revocation request. The response body is empty. |
| 400 | The required parameters were not sent in the request (`"error": "invalid_request"`). |
| 401 | The request is not authorized (`"error": "invalid_client"`). Check that the application credentials (`client_id` and `client_secret`) are present in the request and hold valid values. |

## Use the Management API

To revoke a Refresh Token using the Auth0 Management API, you need the `id` of the Refresh Token you wish to revoke. To obtain a list of existing Refresh Tokens, call the [List device credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoint, specifying `type=refresh_token` with an Access Token containing `read:device_credentials` scope. To narrow the results, you can also specify the `client_id` and `user_id` associated with the token (if known).

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

To revoke a __Refresh Token__, call the [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) endpoint with an Access Token containing `delete:device_credentials` scope and the value of `id` obtained above:

```text
DELETE https://${account.namespace}/api/v2/device-credentials/{id}

{
  "Authorization":   "Bearer {your_access_token}"
}

```

The response will be an **HTTP 204**: The credential no longer exists.

## Use the Dashboard

Strictly speaking, the following process shows you how to revoke a user's authorized access to the application that issued the token. This renders the Refresh Token invalid, which is functionally identical to revoking the token itself.

To do this, go to the [Users section](${manage_url}/#/users) of the [dashboard](${manage_url}). Click the name of the user to view their *Details* page.

Select the *Authorized Applications* tab. This page lists all the applications to which the user has authorized access. Revoking an authorized application also revokes its associated Refresh Tokens.

To revoke the user's access to an authorized application, and hence invalidate the Refresh Token, click **Revoke**.

![Revoke a Refresh Token using the dashboard](/media/articles/tokens/dashboard-revoke-refresh-token.png)

## Keep reading

* [Tokens](/tokens)
* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Access Tokens](/tokens/concepts/access-tokens)
* [ID Tokens](/tokens/concepts/id-tokens)
* [Get Refresh Tokens](/tokens/guides/get-refresh-tokens)
* [Use Refresh Tokens](/tokens/guides/use-refresh-tokens)
