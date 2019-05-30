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

Determining how users get signed up is important to address early, and the decisions you make here will influence many of the decisions you will need to make going forward. We’ve found there are a typical set of patterns for how users will get added to your system, and things to take note of when considering workflow design too.

<%= include('../_includes/_bp-universal-login.md') %>

Auth0 supports user sign up via a number of different [identity providers](/identityproviders). During sign up, Auth0 will also provision the [profile](/users/concepts/overview-user-profile) for the user (a.k.a. the user’s Account), and there are a number of things to consider when looking at functionality and workflow:

* Can I use Auth0 as an identity store?
* Can I use my own (legacy) identity store with Auth0?
* Can I migrate user identities from my identity store to Auth0?
* Can my users sign up using their existing (e.g. Facebook or Google) account?

Auth0 provides identity storage out of the box that can be leveraged to manage the burden of storing user credentials safely and securely (see Auth0 [Self Sign Up](#self-sign-up) for further discussion). If you’ve already got a legacy identity store and you want to offload the burden of managing it, then Auth0’s [User Migration](#user-migration) capabilities provide you with a number of options to handle this. Alternatively, if for some reason you have to stick with your legacy identity store for now - perhaps because you’ve got applications which you aren’t ready to migrate, or which can’t be migrated - then Auth0’s [identity store proxy](#identity-store-proxy) capability is exactly what you need. Allowing your customers to use “bring your own identity” is often an attractive proposition too, and although we find our customers don’t typically do so from the get-go, when you’re ready to provide it Auth0’s Social Sign Up capability is exactly what you’ll need. 

## Self sign up

Self sign up leverages Auth0 [Database Connections](/connections/database) to store the user ID, password, and (optional) username identity information collected from new users during the sign-up process. And database connection policies, governing things such as minimum [username length](connections/database/require-username#username-length) or [password strength and complexity](/connections/database/password-options), can be configured via the Auth0 Dashboard. 

::: panel Best Practice
Auth0 [Universal Login](/hosted-pages/login), as well Auth0 widgets such as [Lock](https://auth0.com/lock), integrate with Database Connections to provide comprehensive user interface functionality for sign up out of the box. These UI artefacts are fully reactive, and with feature rich configuration and comprehensive customization, ready to go functionality can be deployed for user self sign up as well as login in short order.
:::

## User migration

<%= include('../_includes/_user-migration.md') %>

::: panel Best Practice
<%= include('../_includes/_rate-limit-policy.md') %>
:::

### Identity store proxy

<%= include('../_includes/_identity-store-proxy.md') %>

## Planning

<%= include('../_includes/_identity-store-proxy.md') %>

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
