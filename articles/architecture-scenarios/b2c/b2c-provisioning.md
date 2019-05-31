---
title: Provisioning
description: Understand user provisioning functionality and considerations for your B2C implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-migration
    - custom-db
    - universal-login
    - user-profiles
contentType: concept
useCase:
  - user-provisioning
  - store-user-data
---
# Provisioning

<%= include('../_includes/_provisioning-intro.md') %>

<%= include('../_includes/_bp-universal-login.md') %>

## Design considerations

<%= include('../_includes/_provisioning-design-considerations.md') %>

* Can I use Auth0 as an identity store?
* Can I use my own legacy identity store with Auth0?
* Can I migrate user identities from my identity store to Auth0?
* Can my users sign up using their existing social - e.g. Facebook or Google - accounts?

<%= include('../_includes/_provisioning-design-considerations2.md') %>

## Self sign up

Self sign up leverages Auth0 [Database Connections](/connections/database) to store the user ID, password, and (optional) username identity information collected from new users during the sign-up process. And database connection policies, governing things such as minimum [username length](connections/database/require-username#username-length) or [password strength and complexity](/connections/database/password-options), can be configured via the Auth0 Dashboard. 

::: panel Best Practice
Auth0 [Universal Login](/hosted-pages/login), as well Auth0 widgets such as [Lock](https://auth0.com/lock), integrate with Database Connections to provide comprehensive user interface functionality for sign up out of the box. These UI artifacts are fully reactive, and with feature rich configuration and comprehensive customization, ready to go functionality can be deployed for user self sign up as well as login in short order.
:::

## Social sign up

Social signup is synonymous with sign in via [social authentication](/architecture-scenarios/implementation/b2c/b2c-authentication#social-authentication) - there’s no distinction here per se, as user [profile](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt) creation happens automatically upon first social login.

## User migration

<%= include('../_includes/_user-migration.md') %>

::: panel Best Practice
<%= include('../_includes/_rate-limit-policy.md') %>
:::

### Identity store proxy

<%= include('../_includes/_identity-store-proxy.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)
