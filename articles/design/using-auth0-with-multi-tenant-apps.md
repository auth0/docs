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

This article provides a high-level overview of how Auth0 can help you manage your multi-tenant applications.

## What is multi-tenancy

[Multi-tenancy](https://en.wikipedia.org/wiki/Multitenancy) is when a single instance of software runs on a server that is accessible to multiple groups of users.

Auth0's Public Cloud is an example of a multi-tenant application. Your applications, settings, and connections are a single tenant, which shares resources with other tenants in the Public Cloud.

Please note that this article is **not about using multiple Auth0 tenant(s)**. It is about using Auth0 to secure your own multi-tenant application.

## Auth0 and multi-tenancy

There are several ways you can secure multi-tenant applications with Auth0. You can handle your multi-tenancy needs with one of the following approaches:

* [Use multiple connections](#use-multiple-connections)
* [Identify different tenants by application](#identify-tenants-by-application)
* [Store tenant details in app_metadata](#store-tenant-details-in-app_metadata)
* [Use separate Auth0 tenants](#create-separate-auth0-tenants-for-each-customer)

### Use multiple connections

You can use multiple connections to handle your tenants. Each connection would represent and contain a different pool of users.

::: warning
If you use [Lock](/libraries/lock) in your applications, Lock supports a maximum of **50 Database Connections** per [application](/applications). Enterprise Connections are not affected by this limit. If you use the New Universal Login Experience, Lock is not involved and this limitation therefore does not affect you.
:::

Using multiple [Connections](/identityproviders) introduces additional layers of complexity, but there are several scenarios where the upsides of this option outweigh the downsides:

* You have different Connection-level requirements, such as varying password policies, for each of your Applications.
* You have user pools from different Connections. For example, one app may have users providing username/password credentials, while another app handles Enterprise logins.

To implement this, you can call `/authorize` with a connection specified for the user, using the `connection` option in the [Auth0 SPA SDK](/libraries/auth0-spa-js), or by passing a `connection` parameter to the `authorize()` method in [Auth0.js](/libraries/auth0js/v9).

### Identify tenants by application

You can represent each of your tenants with a separate application in Auth0. 

Representing each of your tenants with an application allows you to configure each one differently. You can also enable/disable [connections](/connections) for individual applications if your tenants have varying requirements. Doing so, however, requires you to track the tenants to which your users belong within your application. Then, when they log in, you will need to specify the application they are to use.

### Store tenant details in app_metadata

Storing tenant details in the user [metadata](/users/concepts/overview-user-metadata#metadata-usage) is the simplest of the implementation scenarios we cover in this article.

Using the identifier of your choice (e.g., `"tenant": "customer_12345"`), you can store tenant related details in the `app_metadata`. Doing so allows all of your users, regardless of which tenant to which they belong, to log in using one uniform method.

You can check for this value in your application after users log in and are redirected. This will help you sort users.

### Create separate Auth0 tenants for each customer

You can create a new Auth0 tenant for each of your application's tenants. 

We recommend that you follow this approach only if you need to share access to the Auth0 Dashboard with individual customers. Otherwise, one of the above solutions is a more practical and easy to manage one than attempting to manage many Auth0 tenant dashboards, which is also not a scalable solution as your customer base grows.

This method requires you to use a different set of Auth0 credentials when calling Auth0 APIs to authenticate users belonging to each customer, because you would be using different applications on different Auth0 tenants (with different Client IDs) for each of your customers.
