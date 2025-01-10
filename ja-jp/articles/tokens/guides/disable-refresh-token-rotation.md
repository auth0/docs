---
description: Learn how to disable Refresh Token rotation.
topics:
  - tokens
  - refresh-tokens
  - refresh-token-rotation
contentType: how-to
useCase:
  - disable-refresh-token-rotation
  - configure-refresh-token-rotation
---
# Disable Refresh Token Rotation

You can disable Refresh Token Rotation for each application using Dashboard or the Management API.

## Using the Dashboard

1. Go to [Dashboard > Application Settings](${manage_url}/#/applications). Scroll to the **Application Tokens** section. Next to **Refresh Token Behavior** select **Non-Rotating**.  

    ![Application Token Settings - Non-Rotating Refresh Tokens](/media/articles/tokens/non-rotating-tokens.png)

2. Click **Save Changes**.

## Using the Management API

2. Disable Refresh Token Rotation for each application using the Management API: 

    ```js
    const auth0 = await createAuth0Client({
      domain: '<YOUR AUTH0 DOMAIN>',
      client_id: '<YOUR CLIENT ID>',
      audience: '<YOUR API IDENTIFIER>',
      useRefreshTokens: false
    });
    ```

2. Configure the non-rotating Refresh Token settings as follows:

    ```js
    PATCH /api/v2/clients/{client_id}
    {
      "refresh_token": {
        "rotation_type": "non-rotating",
        "expiration_type": "non-expiring"
      }
    }
    ```

## Keep reading

* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)
