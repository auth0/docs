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

Entities in Auth0 are tenant configuration elements such as applications, connections, rules, and API resource servers. 

Auth0 limits the number of entities you can have depending on your subscription level. Auth0 provides notifications to you when you are approaching (90%) and when you have reached (100% or higher) your respective entity limits. We will also provide informative messages to prevent you from attempting to configure entities that would end up being rejected.

Here is an example of a message you would see if you reached your connection limit:

![Entity Limit Reached](/media/articles/policies/entity-limit-reached.png)

## Enterpise, Developer and Developer Pro subscription limits

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
