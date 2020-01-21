---
description: Learn to use tokens to control user access.
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

As a result, tokens should be issued for relatively short periods, and then [refreshed](/tokens/concepts/refresh-tokens) periodically if the user remains active.

## Keep reading

* [Revoke Refresh Tokens](/tokens/guides/revoke-refresh-tokens)
* [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)

