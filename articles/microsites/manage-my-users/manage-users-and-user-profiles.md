---
title: Manage Users and User Profiles
description: An introduction to the concepts and tasks related to how Auth0 helps you manage your users and their profile information. 
contentType: microsite
topics:
  - users
  - user-management
useCase: manage-users
template: microsite
v2: True
---

# Manage Users and User Profiles - DRAFT

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in. 

Auth0 creates users profiles that contain specific information about your users such as name, email address, contact information, and so on. Auth0 gets user profile attributes from authenticating services (such as Google or Facebook), your own custom database, or web services. You can also manage and store custom user attributes such as users' favorite color or phone number. 

## How it works

Auth0 caches the user profile received from a connection prior to passing it on to your application. This cache is stored in the Auth0 database. The information in the cache that originates from a connection is refreshed each time the user authenticates.

Auth0 refers to all user profile attribute sources as connections because Auth0 "connects" to them to authenticate the user. Each connection may return a set of attributes about the user, and each provider may use different names for the same attribute, such as surname, last name, and family name. To handle such differences, Auth0 provides a Normalized User Profile, which returns a basic set of information using specific attribute names.

*Data flow diagram here*

## Manage user identities and their user profile information

Auth0 provides tools to help you manage user identities, including adding or removing users, modifying user profiles and authorization attributes, and identifying root-cause login issues in minutes with a simple, intuitive and powerful web interface, the Auth0 Management Dashboard. 

*Dashboard picture here*
*Users Dashboard picture here*

You can also use the Management API to view, update, and delete user profiles stored in the Auth0 database.

*Fix all links*

Other tasks you can do with Auth0 are the following:

* [Search for users](/users/search/v3)
* [Block and unblock users](/user-profile/block-and-unblock-users)
* [Change user pictures](/user-profile/change-user-pictures)
* [Change user passwords](/connections/database/password-change)
* Customize user profile data
* [Import/Export users](/extensions/user-import-export)
* Create custom database scripts

:::: further-reading
::: concepts
  * [User Profile Overview](/user-profile/overview-user-profile)
  * [Normalized User Profile](/user-profile/normalized/auth0)
  * [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
  * [User Search Best Practices](/users/search/best-practices)
  * [Custom Database Script Templates](/connections/database/custom-db/templates)
  * [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
  * [Progressive Profiling](/user-profile/progressive-profiling)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Search for Users](/users/search/v3)
  * [View User Profiles](/user-profile/view-users)
  * [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
  * [Create Users Using the Dashboard](/dashboard/create-users)
  * [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
  * [Delete Users](/user-profile/delete-users)
  * [Change User Pictures](/user-profile/change-user-pictures)
  * [Change User Passwords](/connections/database/password-change)
  * [Block and Unblock Users](/user-profile/block-and-unblock-users)
  :::

::: references
  * [User Profile Structure](/user-profile/user-profile-structure)
  * [User Search Query Syntax](/search/v3/query-syntax)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [Breached Password Security](/anomaly-detection/breached-passwords)
  * [Password Security Tips](/anomaly-detection/password-security-tips)
  * [Identity Providers Supported](/identityproviders)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next

* [Define and Maintain Custom User Data](/microsites/manage-my-users/define-maintain-custom-user-data)
* [Connect Users to my Identity Platform](/microsites/manage-my-users/connect-users-to-my-identity-platform)
:::