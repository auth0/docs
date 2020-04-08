---
description: Learn how to configure Refresh Token rotation.
topics:
  - tokens
  - refresh-tokens
  - refresh-token-rotation
contentType: how-to
useCase:
  - enable-refresh-token-rotation
  - configure-refresh-token-rotation
---
# Configure Refresh Token Rotation

Configure Refresh Token Rotation for each application using the Management API. When Refresh Token Rotation is enabled, the transition for the end-user is seamless. The application uses the previous non-rotating Refresh Token, which has expired and swaps it for a rotating Refresh Token. 

::: note
Migration scenarios accommodate automatic token revocation when migrating from a non-rotating Refresh Token to a rotating Refresh Token and vice-versa.
:::

Request a new Refresh Token/Access Token pair when Refresh Token Rotation is enabled.

- Exchanging a non-rotating Refresh Token when Refresh Token Rotation is enabled deletes all the non-rotating tokens issued for the same `client_id`, resource server, and user and tenant.
- Exchanging a rotating Refresh Token when Refresh Token Rotation is disabled issues a non-rotating Refresh Token and revokes the Rotating Refresh Token family.

The following steps describe how to configure Refresh Token rotation for a SPA, as an example. 

1. Install the latest version of the `auth0-spa-js` SDK.

    ```text
    npm install @auth0/auth0-spa-js
    ```

2. Use the Managment API to enable Refresh Token rotation:

    ```js
    PATCH /api/v2/clients/{client_id}
    {
      "refresh_token": {
        "rotation_type": "rotating"
        "expiration_type": "expiring"
        "token_lifetime": "2592000"
        "leeway": 3
      }
    }
    ```

    | Attribute | Description |
    | -- | -- |
    | `rotation_type` | Text string: "rotating" or "reusable" |
    | `expiration_type` | Text string: "expiring" or "non-expiring" |
    | `token_lifetime` | The default Refresh Token expiration period, when Refresh Token Rotation is enabled, is 30 days (2592000 seconds). You can configure up to 90 days (7776000 seconds). |
    | `leeway` | Allow the same Refresh Token to be used within the time period to account for potential network concurrency issues that would otherwise invalidate the token should the client attempt to retry using the same Refresh Token. By default leeway is disabled. Configurable in seconds. |

    ::: panel What is *leeway*?
    The concept of *leeway* is to avoid concurrency issues when exchanging the Rotating Refresh Token multiple times within a given timeframe. During the leeway window which is configurable on a per second basis, the breach detection features don't apply and therefore a new rotating Refresh Token is issued. Only the previous token can be reused, meaning if the second to last one is exchanged, the breach detection will apply. 
    :::

## Refresh Tokens and re-use detection

If a previously invalidated token is used, the entire set of Refresh Tokens issued since that invalidated token was issued will immediately be revoked along with the grant, requiring the end-user to re-authenticate.

See [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens) for details. 

## Keep reading

* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation)
* [Use Refresh Token Rotation](/tokens/guides/use-refresh-token-rotation)
* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
* [Disable Refresh Token Rotation](/tokens/guides/disable-refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-storage)