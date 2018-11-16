---
description: This article discusses how you can use Auth0 with multi-tenant applications.
crews: crew-2
toc: true
topics:
  - design
  - multi-tenancy
contentType: concept
useCase: strategize
---

# Using Auth0 with Multi-Tenant Applications

In this article, we'll discuss (at a high-level) how Auth0 can help you manage users for your multi-tenant applications.

If you're planning to build a multi-tenant solution, please [contact our Sales or Professional Services](https://auth0.com/?contact=true) teams.

## What's multi-tenant?

[Multi-tenancy](https://en.wikipedia.org/wiki/Multitenancy) is when a single instance of software runs on a server that is accessible to multiple groups of users.

When working with multi-tenant software, you can serve multiple customers from a single application instance running on one server (or pool of servers). This contrasts with single-tenant software, where you serve each customer with a dedicated software instance running on dedicated servers. In summation:

| Tenancy Type | Definition |
| - | - |
| Multi-Tenant | One instance, multiple customers |
| Single-Tenant | One instance, one customer |

We define **tenant** as a group of users who share access to one particular application instance. One example of this includes a company with multiple employees, all of whom have access to your SaaS offering. 

When you use a multi-tenant setup, one single instance of your SaaS offering would be shared across multiple tenants (or multiple companies), each with its own group of employees. However, each tenant has a dedicated share of that instance, and you can then customize each share to meet the needs of the tenant that's using it. Such customization includes (but isn't limited to) branding, functionality, and access control.

## Auth0 and multi-tenancy

There are several ways you can handle multi-tenancy with Auth0. When using a single Auth0 tenant for all your customers you can:

* Use multiple [connections](/connections).
* Identify different tenants by application (using client IDs).
* Store tenant details in [app_metadata](/users/concepts/overview-user-metadata).

Another approach would be to use separate Auth0 tenants for each of your customers.

If you're planning to build a multi-tenant solution, please [contact our Sales or Professional Services](https://auth0.com/?contact=true) teams.

::: note
We recommend that you [create multiple Auth0 tenants](https://github.com/auth0/auth0-multitenant-spa-api-sample) only if you need to share access to the Auth0 Dashboard with individual customers.
:::

### Use multiple connections

::: warning
[Lock](https://auth0.com/lock) supports a maximum of **50 Database Connections** per [application](/applications). Enterprise Connections are not affected by this limit.
:::

While using multiple [Connections](/identityproviders) introduces additional layers of complexity, there are several scenarios where this option might make sense:

* You have different Connection-level requirements, such as varying password policies, for each of your Applications.
* You have users from different Connections. For example, one app may have users providing username/password credentials, while another app handles Enterprise logins.
