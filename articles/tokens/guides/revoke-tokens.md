---
description: Learn about revoking tokens.
topics:
  - tokens
  - access-tokens
  - id-tokens
contentType:
  - how-to
useCase:
  - invoke-api
  - add-login
  - secure-api
---

# Revoke Tokens

Once issued, tokens cannot be revoked in the same way as cookies with session ids for server-side sessions. 

As a result, tokens should be issued for relatively short periods, and then [refreshed](/tokens/concepts/refresh-token) periodically if the user remains active.
