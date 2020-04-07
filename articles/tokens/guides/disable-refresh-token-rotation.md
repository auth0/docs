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

Disable Refresh Token Rotation for each application using the Management API: 

```js
PATCH /api/v2/clients/{client_id}
{
  "refresh_token": {
    "rotation_type": "reusable"
    "expiration_type": "non-expiring"
  }
}
```

## Keep reading

* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation)
* [Token Storage](/tokens/concepts/token-storage)
* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)
