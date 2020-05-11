---
title: Entity Limit Policy
description: Describes Auth0's tenant entity limit policy for subscribers.
topics:
    - auth0-policies
    - rate-limits
    - entity-limits
contentType:
  - reference
useCase:
  - support
---
# Entity Limit Policy

::: note
This policy is effective for all Developer, Developer Pro, and free subscriptions made on or after May 19, 2020. Starting on **June 18, 2020**, the policy will apply to all Developer, Developer Pro, and free subscriptions.
:::

Entities in Auth0 are tenant configuration elements such as applications, connections, rules, and API resource servers. 

Auth0 limits the number of entities you can have depending on your subscription level. Auth0 provides notifications to you when you are approaching (80%) and when you have reached your respective entity limits (100% or higher). We will also provide messages to prevent you from attempting to configure entities that would be rejected because they would put you over your limit. Here is an example of a message you would see if you reached your connection limit:

![Entity Limit Reached](/media/articles/policies/entity-limit-reached.png)

::: note
Entity counts may take a few seconds to update. If you see a warning that you believe is in error, try again after a few seconds or contact support if the issue persists.
:::

## Developer and Developer Pro subscription limits

| Entity | Maximum | 
| - | - |
| Applications | 100 |
| Connections | 100 |
| Rules | 100 |
| API Resource Servers | 100 |

## Free subscription limits

| Entity | Maximum | 
| - | - |
| Applications | 10 |
| Connections | 10 |
| Rules | 10 |
| API Resource Servers | 10 |

## Keep reading

* [Rate Limit Policy](/policies/rate-limits)
* [Management API Endpoint Rate Limits](/policies/rate-limits-mgmt-api)
* [Authentication API Endpoint Rate Limits](/policies/rate-limits-auth-api)
* [Legacy Rate Limits](/policies/legacy-rate-limits)
