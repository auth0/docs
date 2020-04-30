---
title: Entity Limit Policy for Self-Service Subscribers
description: Describes Auth0's entity rate limit policy for self-service subscribers.
toc: true
topics:
    - auth0-policies
    - rate-limits
    - entity-limits
contentType:
  - reference
useCase:
  - support
---
# Entity Limit Policy for Self-Service Subscribers

If you exceed rate limits, the following message appears:

![Rate Limit Reached](/media/articles/policies/rate-limit-reached.png)

## Entity limits for self-service subscriptions

| Entity | Maximum | 
| - | - |
| Applications/Clients | 100 |
| Connections | 100 |
| Rules | 100 |
| Resource Server | 100 |

## Entity limits for free subscriptions

| Entity | Maximum | 
| - | - |
| Applications/Clients | 10 |
| Connections | 10 |
| Rules | 10 |
| Resource Server | 10 |

## Management API rate limits for self-service subscriptions

| Endpoints | Rate Limit (per second) | Rate Limit (per minute) | Rate Limit (per day) |
| - | - | - | - |
| Verify custom domain: `POST /api/v2/custom-domains{id}/verify` | n/a | 5 | n/a |
| Send test email: `POST /api/v2/email-send-test` | 1 | n/a | n/a |
| Register dynamic client: `POST /oidc/register` | 5 | n/a | n/a |
| Rotate signing keys: `POST /api/v2/keys/signing/rotate` | n/a | n/a | 5 |
| Create tenant: `POST /api/v2/tenants` | 5 | n/a | n/a |
| Read connection status: `GET /api/v2/connections/{id}/status` | 15 | n/a | n/a |
| Create tenant invitation: `POST /api/v2/tenants/invitations` | n/a | 5 | n/a |
| Read users | 40 | 500 | n/a |
| Write users | 20 | 200 | n/a |
| Read logs | 10 | 100 | n/a |
| Read clients | 5 | 100 | n/a |
| Read connections | 10 | 100 | n/a |
| Write device credentials | 5 | 100 | n/a |
| All other endpoints combined | 10 | 150 | n/a |
