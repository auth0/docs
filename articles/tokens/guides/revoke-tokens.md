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

Once issued, tokens cannot be revoked in the same way as [cookies](/sessions/concepts/cookies) with session IDs for [server-side sessions](/sessions/concepts/session-layers). As a result, tokens should be issued for relatively short periods, and then [refreshed](/tokens/guides/refresh-token/get-refresh-tokens) periodically if the user remains active.

Auth0 handles token revocation as though the token has been potentially exposed to malicious adversaries. Therefore, each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that all Refresh Tokens that have been issued for the same user, application, and audience will be [revoked](/tokens/guides/refresh-token/revoke-refresh-tokens).

## Keep reading

* [Refresh Tokens](/tokens/concepts/refresh-token)
* [Use Refresh Tokens](/tokens/guides/refresh-token/use-refresh-tokens)
