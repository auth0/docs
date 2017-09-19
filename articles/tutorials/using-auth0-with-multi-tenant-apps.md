---
description: This articles describes ways to implement and use Auth0 with multi-tenancy.
crews: crew-2
toc: true
---

# Using Auth0 with Multi-Tenant Applications

Multi-tenancy refers to the software architecture principle where a single instance of software runs on a server that is accessible to multiple groups of users.

When working with multi-tenant software, you can serve multiple customers from a single application instance running on one server (or pool of servers). This contrasts with single-tenant software, where you serve each customer with a dedicated software instance running on dedicated servers. In summation:

| Tenancy Type | Definition |
| - | - |
| Multi-Tenant | One instance, multiple customers |
| Single-Tenant | One instance, one customer |

We define **tenant** as a group of users who share access to one particular application instance. One example of this includes a company with multiple employees, all of whom have access to your SaaS offering. 

When you use a multi-tenant setup, one single instance of your SaaS offering would be shared across multiple tenants (or multiple companies), each of whom has its own group fo employees. However, each tenant has a dedicated share of that instance, and you can then customize each share to meet the needs of the tenant that's using it. Such customization includes (but isn't limited to) branding, functionality, and access control.

## Auth0 and Multi-Tenancy

By using a single Auth0 tenant for all of *your* customers, you maintain simplicity in your architecture and are able to manage all of your authentication flows in one place. The primary method by which you can handle multi-tenancy is to use multiple [connections](identityproviders). 

::: note
We recommend that you [create multiple Auth0 tenants](https://github.com/auth0/auth0-multitenant-spa-api-sample) only if you need to share access to the Auth0 Dashboard with individual customers.
:::

## Use Multiple Connections

::: warning
Auth0 enforces a limit of 50 Database Connections for each [client](/clients).
:::

While using multiple [Connections](/identityproviders) introduces additional layers of complexity, there are several scenarios where this option might make sense:

* You have different Connection-level requirements, such as varying password policies, for each of your Clients.
* You have users from different Connections. For example, one app may have users providing username/password credentials, while another app handles Enterprise logins.

::: note
For additional assistance on how you can customize Auth0, please contact [Sales](https://auth0.com/?contact=true) to discuss possible architecture scenarios.
:::

## Keep Reading

::: next-steps
* [Build Multi-tenant SaaS Apps with Azure Active Directory](/tutorials/building-multi-tenant-saas-applications-with-azure-active-directory)
* [Sample: Multi-Tenant Support for a jQuery SPA with a Node.js API](https://github.com/auth0/auth0-multitenant-spa-api-sample)
:::
