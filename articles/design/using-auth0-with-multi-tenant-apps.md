---
description: This article discusses how you can use Auth0 to secure multi-tenant applications.
crews: crew-2
toc: true
topics:
  - design
  - multi-tenancy
contentType: concept
useCase: strategize
---

# Using Auth0 to Secure Your Multi-Tenant Applications

This article provides a high-level overview of how Auth0 can help you to secure your multi-tenant applications.

[Multi-tenancy](https://en.wikipedia.org/wiki/Multitenancy) is when a single instance of software runs on a server that is accessible to multiple groups of users. In fact, Auth0 itself is a multi-tenant application; your collection of applications, settings, and connections is called a "tenant". Note that this document is **not about using multiple Auth0 tenant(s)**, but is about using Auth0 to secure your own multi-tenant application.

## Auth0 and multi-tenancy

There are several ways you can handle multi-tenant applications with Auth0. If you intend to use a single Auth0 tenant for all your customers you can handle your multi-tenancy needs with one of the following approaches:

* [Use multiple connections](#use-multiple-connections)
* [Identify different tenants by application](#identify-tenants-by-application)
* [Store tenant details in app_metadata](#store-tenant-details-in-app_metadata)
* [Use separate Auth0 tenants](#create-separate-auth0-tenants-for-each-customer)

### Use multiple connections

With this scenario, you would separate tenants by connection. Each connection would be a different pool of users. 

::: warning
If you use [Lock](/libraries/lock) in your applications, Lock supports a maximum of **50 Database Connections** per [application](/applications). Enterprise Connections are not affected by this limit. If you use the New Universal Login Experience, Lock is not involved and this limitation therefore does not affect you.
:::

While using multiple [Connections](/identityproviders) introduces additional layers of complexity, there are several scenarios where this option might make sense:

* You have different Connection-level requirements, such as varying password policies, for each of your Applications.
* You have user pools from different Connections. For example, one app may have users providing username/password credentials, while another app handles Enterprise logins.

You can call `/authorize` with a specific connection for a user, using the `connection` option in the [Auth0 SPA SDK](/libraries/auth0-spa-js), or by passing a `connection` parameter to the `authorize()` method in [Auth0.js](/libraries/auth0js/v9).

### Identify tenants by application

In this scenario, each of your tenants would be a separate application in Auth0. This allows you to configure each slightly differently and to enable or disable connections per application at will, if your customers/tenants have different needs. This will require you to keep track of which tenant each of your users belongs to in your application, and then when logging them in, specify a connection to let them use. 

This method would require you to use a different set of Auth0 credentials for the users belonging to each customer, as each would be a different application.

### Store tenant details in app_metadata

This is perhaps the simplest and most straightforward scenario, in which you simply add an `app_metadata` field for the tenant to [your metadata](/users/concepts/overview-user-metadata#metadata-usage), whatever identifier makes sense to you (such as `"tenant": "customer_12345"`). This method allows all of your users, despite what customer/tenant they belong to, to log in in one place with one user pool. You'll be able to check for this value in your application to sort users into the correct place after they login and are returned to your application.

### Create separate Auth0 tenants for each customer

We recommend that you follow this approach only if you need to share access to the Auth0 Dashboard with individual customers. Otherwise, one of the above solutions is a more practical and easy to manage one than attempting to manage many Auth0 tenant dashboards, which is also not a scalable solution as your customer base grows.

This method would require you to use a different set of Auth0 credentials for the users belonging to each customer, as each would be a different application.
