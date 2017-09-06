---
description: This articles describes ways to implement and use Auth0 with multi-tenancy.
crews: crew-2
toc: true
---

# Using Auth0 with Multi-Tenant Applications

Multi-tenancy refers to the software architecture principle where a single instance of software runs on a server that is accessible to multiple groups of users.

By using a single Auth0 account for all of your applications, you maintain simplicity in your architecture and are able to manage all of your authentication flows in one place. Only if you need to share access to the Management Dashboard with individual applications would you need to create multiple Auth0 accounts (see this [GitHub repo](https://github.com/auth0/auth0-multitenant-spa-api-sample) for a sample application using this architecture scheme).

One way to handle multi-tenancy is with multiple connections. For additional assistance on how you can customize Auth0, please contact [Sales](https://auth0.com/?contact=true).

## Use Multiple Connections

While using multiple [Connections](/identityproviders) introduces additional layers of complexity, there are several scenarios where this option might make sense:

* You have different Connection-level requirements, such as varying password policies, for each of your Clients.
* You have users from different Connections. For example, one app may have users providing username/password credentials, while another app handles Enterprise logins.

::: warning
Please be aware that Auth0 enforces a limit of 50 Database Connections for a single Client.
:::
