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

**This policy is effective May 19, 2020.**

::: warning
If you subscribed before **May 19, 2020**, the [previous rate limit policy](/policies/legacy-rate-limits) applies to you until **June 18, 2020**. Starting on **June 18, 2020**, these limits will apply to all tenants. You will be notified of the new limits through a **Dashboard Notification**. If the new limits impact your tenant, you will be notified directly via email with additional information about minimizing API calls and upgrading plans.
:::

The rate limits for this API differ depending on whether your tenant is free or paid, production or not.

| Tenant Type | Rate Limit (per second) | Rate Limit (per minute) |
| - | - | - |
| Free or Trial | 10 | 120 |
| Developer or Developer Pro (created before May 19, 2020) | 50 | 1000 |
| Enterprise (Production) | 50 | 1000 |
| Enterprise (Non-production) | 10 | 120 |

The rate limits include calls made via [Rules](/rules) and are set **by tenant** and not by endpoint.

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

The following Auth0 Management API endpoints return rate limit-related headers. For additional information about these endpoints, please consult the [Management API explorer](/api/management/v2).

## Developer and Developer Pro subscription limits

| Endpoint Group | Path | Rate Limit (per second) | Rate Limit (per minute) |
| - | - | - | - |
| Read users | `GET /api/v2/users` | 40 | 500 |
| | `GET /api/v2/users-by-email` | | |
| | `GET /api/v2/users/{id}` | | |
| Write users | `POST /api/v2/users` | 20 | 200 |
| | `POST /api/v2/users/{id}/identities` | | |
| | `PATCH /api/v2/users/{id}` | | |
| | `DELETE /api/v2/connections/{id}/users` | | |
| | `DELETE /api/v2/users/{id}/identities/{provider}/{user_id}` | | |
| | `DELETE /api/v2/users/{id}` | | |
| Read logs | `GET /api/v2/logs` | 10 | 100 |
| | `GET /api/v2/logs/{id}` | | |
| | `GET /api/v2/users/{id}/logs` | | |
| Read clients | `GET /api/v2/clients` | 5 | 100 |
| | `GET /api/v2/clients/{id}` | | |
| Read connections | `GET /api/v2/connections` | 10 | 100 |
| | `GET /api/v2/connections/{id}` | | |
| Write device credentials | `POST /api/v2/device-credentials` | 5 | 100 | 
| | `DELETE /api/v2/device-credentials/{id}` | | |
| All other endpoints combined | | 10 | 150 |

## Endpoint limits for all subscriptions

| Endpoint | Path | Rate Limit (per second) | Rate Limit (per minute) | Rate Limit (per day) |
| - | - | - | - | - |
| Verify custom domain | `POST /api/v2/custom-domains{id}/verify` | n/a | 5 | n/a |
| Register dynamic client | `POST /oidc/register` | 5 | n/a | n/a |
| Read connection status | `GET /api/v2/connections/{id}/status` | 15 | n/a | n/a |
| Rotate signing keys | `POST /api/v2/keys/signing/rotate` | n/a | n/a | 5 |

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
