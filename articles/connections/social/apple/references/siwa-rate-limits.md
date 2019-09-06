---
title: Sign In with Apple and Auth0 Rate Limits
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Describes the Auth0 rate limits for Sign In with Apple connections.
topics:
  - authentication
  - connections
  - social
  - apple
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Sign In with Apple and Auth0 Rate Limits

The proposed limits are the following:

| Endpoint | Path | Limited by | Affected Tenants | Rate Limits |
| --- | --- | --- | --- | --- |
| Get Token	| `/oauth/token` | Native Social Login (Apple, Facebook, etc.) | Free |	100 requests per minute |
| --- | --- | Native Social Login and IP | Paid |	500 requests per minute with burst of up to a 1000 requests |

## Keep reading

* [Auth0 and Sign In with Apple Overview](/connections/social/apple/concepts/sign-in-with-apple-overview)
* [Sign In with Apple and Auth0 Logging](/connections/social/apple/references/siwa-logging)
* [Sign In with Apple and Auth0 Troubleshooting](/connections/social/apple/references/siwa-troubleshooting)
