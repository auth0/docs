---
title: Custom Database Connections
description: Learn about authenticating users using your database as an identity provider.
classes: topic-page
topics:
    - connections
    - custom-database
    - scripts
contentType: index
useCase:
    - customize-connections
---
# Custom Database Connections

::: panel Feature availability
Only **Enterprise** subscription plans include the ability to use a custom database for authentication requests. For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

Use a custom database connection when you want to provide access to your own independent (legacy) identity store for the following purposes:

* **Authentication**: Use your database as an identity provider in Auth0 to authenticate users. (Refered to as *legacy authentication*.)
* **Import Users**: Use automatic migration (*trickle* or *lazy* migration)
* **Proxy access to an Auth0 tenant**: Use Auth0 multi-tenant architecture. 

You typically create and configure custom database connections in the [Auth0 dashboard](${manage_url}). You create a database connection and then toggle **Use my own database** to enable database action script editing. Alternatively, you can create and configure a custom database connection using the Auth0 Management API with the `auth0` strategy. 

<%= include('../_includes/_topic-links', { links: [
  'connections/database/custom-db/create-db-connection',
  'connections/database/custom-db/templates',
  'connections/database/custom-db/error-handling'
] }) %>

