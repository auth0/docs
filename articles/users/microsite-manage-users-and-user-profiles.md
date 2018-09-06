---
title: Manage Users and User Profiles
description: Now that you've added login to your app, granted Access Tokens and protected your API, it's time to manage your users and their identity information.
ctaText: Quickstart
ctaLink: /docs/quickstarts
contentType: concept
template: microsite
topics: users
useCase: manage-users
---

## Overview
Auth0 user profiles contain specific information about a user like the user's name, email address, contact information, and so on. User profile attributes may be returned by the authenticating service (such as Facebook), from your custom databases, and from web services. Auth0 refers to all user profile attribute sources as connections because Auth0 connects to them to authenticate the user. Each connection may return a set of attributes about the user, and each provider uses different names for the same attribute, such as surname, last name, and family name. To handle the differences, Auth0 provides a [Normalized User Profile](/user-profile/normalized/auth0) which returns a basic set of information using specific attribute names.

You can also store custom attributes such as users' favorite color or phone number. Auth0 provides a [JS widget](https://github.com/auth0-community/auth0-editprofile-widget) that allows the user to update their own profile information.

Auth0 caches the user profile received from a connection prior to passing it on to the calling application. This cache is stored in the Auth0 database. The information in the cache that originates from a connection is refreshed each time the user authenticates. 

You can modify information contained in a user profile in a number of ways.

* **Scopes**: Specify a scope as an optional parameter in the authentication flow to control the user profile information included in the ID Token (JWT).
* **Dashboard**: Edit the user_metadata and app_metadata portions of the user profile.
* **Management API**: Read, update, and delete user profiles stored in the Auth0 database.

Use the Dashboard and the Management API to complete the following tasks:

* Create users
* Search users
* View users
* Delete users
* Block and unblock users
* Change user pictures
* Change user passwords
* Fix breached passwords
* Migrate users
* Import/Export users

If you want to use a custom database as the connection, you will need to write scripts to implement lifecycle events such as create, login, verify, delete, and change password. Auth0 provides templates for these scripts, which you can modify for your particular database and schema. If you need to add additional attributes to the user profile, Auth0 provides rules to allow you augment the user profile. Rules execute after the user has been authenticated. Auth0 provides several example rules to achieve certain results.


## Learn More

The documents listed below will show you how to perform all these tasks as well as provide you with high-level conceptual and reference information. 


:::: card-panel--grid
::: card-panel--half
### Tutorials
  * [Link](/search/v3)
  * [Link](/anomaly-detection/breached-passwords)
  * [Link](/user-profile/view-users)
:::

::: card-panel--half--expandable
  ### How-tos
  * [Search for Users](/search/v3)
  * [Fix Breached Passwords](/anomaly-detection/breached-passwords)
  * [View User Profiles](/user-profile/view-users)
  * [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
  * [Create Users Using the Dashboard](/dashboard/create-users)
  * [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
  * [Delete Users](/user-profile/delete-users)
  * [Change User Pictures](/user-profile/change-user-pictures)
  * [Change User Passwords](/connections/database/password-change)
  * [Get User Information with Unbounce Landing Pages](get-user-information-with-unbounce-landing-pages)
  * [Redirect Users After Login](redirect-users-after-login)
  * [Fix Breached Passwords](/anomaly-detection/fix-breached-passwords)
  * [Block and Unblock Users](/user-profile/block-and-unblock-users)
  * [Impersonate Users Using the Dashboard](/user-profile/impersonate-users-using-the-dashboard)
  * [Impersonate Users Using the Impersonation API](/user-profile/impersonate-users-using-the-impersonation-api)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [Delegated Administration Extension](/extensions/delegated-admin/v3)
:::
::::

:::: card-panel--grid
::: card-panel--half
  ### Concepts
  * [User Profile Overview](/user-profile/overview-user-profile)
  * [Normalized User Profile](/user-profile/normalized/auth0)
  * [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
  * [Progressive Profiling](/user-profile/progressive-profiling)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: card-panel--half--expandable
  ### References
  * [User Profile Structure](/user-profile/user-profile-structure)
  * [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
  * [User Search Best Practices](/user-profile/user-search-best-practices)
  * [User Search Query Syntax](/search/v3/query-syntax)
  * [Password Security Tips](/anomaly-detection/password-security-tips)
  * [Identity Providers Supported](/connections/identity-providers-supported)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: card-panel
  ## What's Next
  * [Connect Users to Your Identity Platform](microsite-connect-users-to-your-identity-platform)
  * [Manage User Metadata](microsite-manage-user-metadata)
:::