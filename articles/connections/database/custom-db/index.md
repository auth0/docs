---
title: Custom Database Connections
description: Learn about authenticating users using your database as an identity provider.
classes: topic-page
topics:
    - connections
    - custom-database
    - scripts
contentType: 
    - concept
    - index
useCase:
    - customize-connections
---
<!-- markdownlint-disable MD041 MD002 -->
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Custom Database Connections</h1>
  <p>
  Use a custom database connection when you want to provide Auth0 with access to your own independent (legacy) identity data store primarily for authenticaton (filling the role of an identity provider) and for migrating user data to Auth0's data store. 
  </p>
</div>

Auth0 [Extensibility](/topics/extensibility) allows you to add custom logic to build out last mile solutions for Identity and Access Management (IdAM). Auth0 extensibility comes in several forms: [Rules](/rules), [Hooks](/hooks), and [scripts](/connections/database/custom-db/templates) for both custom database connections and custom database migration. Each is implemented using [Node.js](https://nodejs.org/en/) running on the Auth0 platform in an Auth0 tenant. 

Auth0 extensibility executes at different points in the IdAM pipeline: 

* **Rules** run when artifacts for user authenticity are generated (i.e., an ID Token in <dfn data-key="openid">OpenID Connect (OIDC)</dfn>), an Access Token in OAuth 2.0, or an assertion in <dfn data-key="security-assertion-markup-language">Security Assertion Markup Language (SAML)</dfn>. 
* **Hooks** provide additional extensibility for when there is an exchange of non-user related artifacts, and for when user identities are created. See [pre-user registration](/hooks/extensibility-points/pre-user-registration) and [post-user registration](/hooks/extensibility-points/post-user-registration) Hooks for details. 
* **Custom database action scripts** can be used to integrate with an existing user identity store, or can be used where [automatic user migration](/users/concepts/overview-user-migration#automatic-migrations) from an legacy identity store is required. 

Whatever the use case, Auth0 extensibility allows you to tailor IdAM operations to your exact requirements. However, if not used in the right way, this can open up the potential for improper or unintended use which can lead to problematic situations down the line. In an attempt to address matters ahead of time, Auth0 provides [best practice guidance](/best-practices/custom-db-connections) to both designers and implementers, and we recommend reading it in its entirety at least once, even if you've already started your journey with Auth0.    

<%= include('./_includes/_panel-feature-availability') %>

<%= include('../../../_includes/_topic-links', { links: [
  'connections/database/custom-db/overview-custom-db-connections',
  'connections/database/custom-db/create-db-connection',
  'connections/database/custom-db/templates',
  'best-practices/custom-db-connections',
  'connections/database/custom-db/error-handling'
] }) %>
