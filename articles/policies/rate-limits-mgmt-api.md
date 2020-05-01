---
title: Management API Endpoint Rate Limits
description: Describes Auth0's rate limit policy when working with Auth0 Management API endpoints.
toc: true
topics:
    - auth0-policies
    - rate-limits
contentType:
  - reference
useCase:
  - support
---
# Management API Endpoint Rate Limits

::: warning
These rate limits apply to you if you subscribed after **May 20, 2020**. Starting on **July 1, 2020**, these limits will apply to all tenants. If you subscribed on or before **May 21, 2020**, the older [rate limit policy](/policies/legacy-rate-limits) applies to you.
:::

The rate limits for this API differ depending on whether your tenant is free or paid, production or not.

| Tenant Type | Rate Limit (per second) | Rate Limit (per minute) |
| - | - | - |
| Free or Trial | 10 | 120 |
| Enterprise (Non-production) | 10 | 120 |
| Enterprise (Production) | 50 | 1000 |
| Developer or Developer Pro (created before 05-21-2020) | 50 | 1000 |

Each endpoint is configured with a bucket that defines:

-  Request limit
-  Rate limit window (per second, per minute, per day, etc.)

```text
bucket:
    size: x
    per_minute: y
```

For example, the above states that, for the given bucket, there is a maximum request limit of `x` per minute, and for each minute that elapses, permissions for `y` requests are added back. In other words, for each `60 / y` seconds, one additional request is added to the bucket. This occurs automatically until the bucket contains the maximum permitted number of requests.

For some API endpoints, the rate limits are defined per bucket, so the origins of the call do not influence the rate limit changes. For other buckets, the rate limits are defined using different keys, so the originating IP address is considered when counting the number of received API calls.

::: note
If you are using an API endpoint **not** listed below and you receive rate limit headers as part of your response, see [Anomaly Detection](/anomaly-detection) for more information.
:::

The aforementioned rate limits include calls made via [Rules](/rules) and are set **by tenant** and not by endpoint.

The following Auth0 Management API endpoints return rate limit-related headers. For additional information about these endpoints, please consult the [Management API explorer](/api/management/v2).

| Endpoint | Path | Rate Limit (per second) | Rate Limit (per minute) |
| - | - | - | - |
| Read or write users | `GET /api/v2/users` | 40 | 800 |
| | `POST /api/v2/users` | | |
| Read logs | `GET /api/v2/logs` | 10 | 200 |
| | `GET /api/v2/user/{id}/logs` | |
| Read clients | `GET /api/v2/clients` | 5 | 100 |
| | `POST /api/v2/clients/{id}` | |
| Read connections | `GET /api/v2/connections` | 10 | 100 |
| | `POST /api/v2/connections/{id} | |
| Delete device credentials | `DELETE /api/v2/device-credentials/{id} | 5 | 100 |
| All other endpoints | | 10 | 150 |

## Self-service subscription limits

| Endpoint | Path | Rate Limit (per second) | Rate Limit (per minute) | Rate Limit (per day) |
| - | - | - | - | - |
| Verify custom domain | `POST /api/v2/custom-domains{id}/verify` | n/a | 5 | n/a |
| Send test email | `POST /api/v2/email-send-test` | 1 | n/a | n/a |
| Register dynamic client | `POST /oidc/register` | 5 | n/a | n/a |
| Rotate signing keys | `POST /api/v2/keys/signing/rotate` | n/a | n/a | 5 |
| Create tenant | `POST /api/v2/tenants` | 5 | n/a | n/a |
| Read connection status | `GET /api/v2/connections/{id}/status` | 15 | n/a | n/a |
| Create tenant invitation | `POST /api/v2/tenants/invitations` | n/a | 5 | n/a |
| Read users | | 40 | 500 | n/a |
| Write users | | 20 | 200 | n/a |
| Read logs | | 10 | 100 | n/a |
| Read clients | | 5 | 100 | n/a |
| Read connections | | 10 | 100 | n/a |
| Write device credentials | | 5 | 100 | n/a |
| All other endpoints combined | | 10 | 150 | n/a |

## Concurrent import users job limits

The [create import users job](/api/management/v2#!/Jobs/post_users_imports) endpoint has a limit of 2 concurrent import jobs. If you request additional jobs while there are 2 pending returns, the following response occurs:

```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "There are 2 active import users jobs, please wait until some of them are finished and try again
}
```

## Access token limits for SPAs

If you obtain Access Tokens for your SPAs, there are rate limits that are applicable when working with the available `current_user`-related [scopes and endpoints](/api/management/v2/get-access-tokens-for-spas#available-scopes-and-endpoints). You are allowed a maximum of **10 requests per minute per user**.
