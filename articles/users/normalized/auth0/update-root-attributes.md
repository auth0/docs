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

Auth0's normalized user profile contains a number of [root attributes](/users/references/user-profile-structure#attributes), some of which may be updated. Methods for updating root attributes vary depending on connection type.

## Auth0 as the Identity Provider

When Auth0 is the Identity Provider (IdP), subscribers may: 

* [Set root attributes on user sign-up](/api/management/guides/users/set-root-attributes-user-signup) (via the Management API or via public signup)
or [import](/api/management/guides/users/set-root-attributes-user-import)
* [Update root attributes individually](/api/management/guides/users/update-root-attributes-users) via the Management API

Auth0 is the IdP for the following connection types:

* [regular database connections](/connections/database)
* [custom database connections](/connections/database/custom-db) with import mode
* [passwordless connections](/connections/passwordless)

## Upstream Identity Providers

When an upstream IdP (like Google or Facebook) is used, subscribers have two options:

* The upstream IdP sets the root attributes when users are first created and then
automatically updates them with each subsequent login.
* The upstream IdP sets the root attributes on user creation only and does not
update them on subsequent logins, thereby allowing [independent updates individually](/api/management/guides/users/update-root-attributes-users) via the Management API.

By default, new connections sync profile data from the associated upstream IdP with each login. If you want to update root attributes on user creation only, you will need to [update your connection preferences](/api/management/guides/connections/update-connection-user-root-attributes).

Upstream Identity Providers handle the following connection types:

* [social connections](/connections#social)
* [enterprise connections](/connections#enterprise)
* [legal identity connections](/connections#legal-identities)

## Keep reading

* [Set Root Attributes During User Sign-Up](/api/management/guides/users/set-root-attributes-user-signup)
* [Set Root Attributes During User Import](/api/management/guides/users/set-root-attributes-user-import)
* [Update Root Attributes](/api/management/guides/users/update-root-attributes-users)
* [Update Connection Preferences for Updates to User Profile Root Attributes](/api/management/guides/connections/update-connection-user-root-attributes)