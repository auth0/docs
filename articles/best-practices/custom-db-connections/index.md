---
title: Custom Database Connection and Action Script Best Practices
description: Learn about best practices for custom database connections and database action scripts.
classes: topic-page
toc: true
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Connection and Action Script Best Practices

::: panel Feature availability
Only **Enterprise** subscription plans include the ability to use a custom database for authentication requests. For more information, see [Auth0 pricing plans](https://auth0.com/pricing).
:::

[Extensibility](/extend-integrate) provides the capability to add custom login in Auth0 as a mechanism for building out last-mile solutions for Identity and Access Management (IdAM). Auth0 extensibility comes in several forms:

- [Rules](/rules): Run when artifacts for user authenticity are generated. For example:
   - An [ID Token](/tokens/id-token) in <dfn data-key="openid">OpenID Connect (OIDC)</dfn>
   - An <dfn data-key="access-token">Access Token</dfn> in [OAuth 2.0](/protocols/oauth2)
   - An [assertion in SAML](/protocols/saml/saml-configuration/saml-assertions#use-rules)
- [Hooks](/hooks): Provide additional extensibility when there is an exchange of non-user-related artifacts and when user identities are created such as pre-user registration and post-user registration.
- Scripts for both [Custom Database Connections](/connections/database#using-your-own-user-store) and [Migrations](/connections/database#migrating-to-auth0-from-a-custom-user-store): Used to [integrate with an existing user identity store](/connections/database/custom-db) or where [automatic user migration](https://auth0.com/learn/migrate-user-database-auth0/) from an independent or *legacy* identity store are required. 

Each extensibility type uses Node.js running on the Auth0 platform in an Auth0 tenant.

Whatever the use case, Auth0 extensibility provides comprehensive and sophisticated capability to tailor IdAM operations to your exact requirements. However, if not utilized in the right way, this can open up the potential for improper or unintended use which can lead to problematic situations down the line. In an attempt to address matters ahead of time, this document provides best practice guidance to both designers and implementers, and we recommend reading it in its entirety at least once, even if you've already started your journey with Auth0. 

## Keep reading

<%= include('../../_includes/_topic-links', { links: [
  'best-practices/custom-db-connections/anatomy',
  'best-practices/custom-db-connections/size',
  'best-practices/custom-db-connections/environment',
  'best-practices/custom-db-connections/execution',
  'best-practices/error-handling',
  'best-practices/debugging',
  'best-practices/testing',
  'best-practices/deployment',
  'best-practices/performance',
  'best-practices/custom-db-connections/security'
] }) %>