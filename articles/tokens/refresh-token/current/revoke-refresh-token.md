---
description: How to revoke a Refresh Token
toc: true
topics:
  - tokens
  - refresh-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# How to revoke a Refresh Token

Since Refresh Tokens never expire, it is important to be able to revoke them in case they get compromised.

Auth0 handles token revocation as though the token has been potentially exposed to malicious adversaries. Hence each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and audience will be revoked**.

You can revoke a Refresh Token either by posting a request to [the Authentication API /oauth/revoke endpoint](/api/authentication#revoke-refresh-token) or using the [dashboard](${manage_url}).

### Use the API

To revoke a Refresh Token, you can send a `POST` request to `https://${account.namespace}/oauth/revoke`.

The API first validates the application credentials and then verifies whether the token was issued to the application making the revocation request.  If this validation fails, the request is refused and the application is informed of the error. Next, the API invalidates the token. The invalidation takes place immediately, and the token cannot be used again after the revocation. Note that each revocation request invalidates all the tokens that have been issued for the same authorization grant.

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
| `client_secret` | Your application's Client Secret. Required for [confidential applications](/applications/application-types#confidential-applications). |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

The application should match the one the Refresh Token was issued for.

::: panel Revoke a token without the Client Secret
For applications that cannot keep the Client Secret safe (for example, native apps), the [Revoke endpoint](/api/authentication#revoke-refresh-token) supports access without the Client Secret but the application itself must have the property `tokenEndpointAuthMethod` set to `none`. You can change the `tokenEndpointAuthMethod` value, either from the UI ([Dashboard > Clients > Application Settings](${manage_url}/#/applications/${account.clientId}/settings)), or using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

If the request is valid, the Refresh Token is revoked and the response is `HTTP 200`, with an empty response body. Otherwise, the response body contains the error code and description.

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

### Use the Dashboard

When you revoke a Refresh Token using the dashboard, you have to revoke the user's authorized access to the application that issued the token. This renders the Refresh Token useless.

To do so, go to the [Users section](${manage_url}/#/users) of the [dashboard](${manage_url}). Click the name of the user to view their *Details* page.

Select the *Authorized Applications* tab. This page lists all the applications to which the user has authorized access. Revoking an authorized application revokes also its associated Refresh Tokens.

To revoke the user's access to an authorized application, and hence invalidate the Refresh Token, click **Revoke**.

![Revoke a Refresh Token using the dashboard](/media/articles/tokens/dashboard-revoke-refresh-token.png)
