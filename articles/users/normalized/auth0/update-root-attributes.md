---
title: Updating User Profile Root Attributes
description: Learn about root attributes available for the Auth0 normalized user profile and methods of updating them.
topics:
  - user-profile
  - normalized-user-profile
  - users
  - auth0-user-profiles
contentType:
  - how-to
useCase:
  - manage-users
---
# Updating User Profile Root Attributes

Auth0's normalized user profile contains a number of root attributes (attributes stored at the first, or root, level of the object), some of which may be updated. [Learn more about the user profile structure and its attributes.](/users/references/user-profile-structure) 

Methods for updating root attributes vary depending on connection type.

## Auth0 as the Identity Provider

When Auth0 is the Identity Provider (IdP), subscribers may: 

* Set root attributes [on user sign-up](/api/management/guides/users/set-root-attributes-user-signup) (via the Management API or via public signup)
or [on import](/api/management/guides/users/set-root-attributes-user-import)
* [Update root attributes individually](/api/management/guides/users/update-root-attributes-users) via the Management API

Auth0 is the IdP for the following connection types:

* [regular database connections](/connections/database)
* [custom database connections](/connections/database/custom-db) with import mode
* <dfn data-key="passwordless">[passwordless connections](/connections/passwordless)</dfn>

## Upstream Identity Providers

When an upstream IdP (like Google or Facebook) is used, subscribers have two options:

* The upstream IdP sets the root attributes when users are first created and then
automatically updates them with each subsequent login. This is the default behavior.
* The upstream IdP sets the root attributes on user creation only and does not
update them on subsequent logins, thereby allowing subscribers to [update root attributes individually](/api/management/guides/users/update-root-attributes-users) via the Management API. To enable this, you will need to [configure your connection sync with Auth0](/api/management/guides/connections/configure-connection-sync).

Upstream Identity Providers handle the following connection types:

* [social connections](/connections#social)
* [enterprise connections](/connections#enterprise)
* [legal identity connections](/connections#legal-identities)

## Keep reading

* [Set Root Attributes During User Sign-Up](/api/management/guides/users/set-root-attributes-user-signup)
* [Set Root Attributes During User Import](/api/management/guides/users/set-root-attributes-user-import)
* [Update Root Attributes](/api/management/guides/users/update-root-attributes-users)
* [Configure Connection Sync with Auth0](/api/management/guides/connections/configure-connection-sync)