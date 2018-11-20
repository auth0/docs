---
title: Manage Users and User Profiles
description: An introduction to the concepts and tasks related to how Auth0 helps you manage your users and their profile information. 
contentType: microsite
topics:
  - users
  - user-management
useCase: manage-users
template: microsite
v2: true
---

# Manage Users and User Profiles - DRAFT

Auth0 stores user profiles for your application in a central Directory. User profile information can come from your users directly or from any number of other external sources including Social Identity Providers, Enterprise connections like SAML, or custom sources like Active Directory. Auth0 refers to all user profile attribute sources as **connections** because Auth0 *connects* to them to authenticate the user.

You can manage and store custom user attributes such as favorite color or phone number along with the standard profile information. Using our Rules engine you can modify or enhance the user profiles.  

## How it works

Within the Auth0 database, we create a user profile for each unique user to your applications and fill that profile with information either provided by the user directly or with information from their chosen connection. If the information is sourced from a connection, Auth0 refreshes that data each time the user authenticates.

Each connection may return a set of attributes about the user, and each provider may use different names for the same attribute, such as surname, last name, and family name. To handle such differences, Auth0 provides a Normalized User Profile, which returns a basic set of information using specific attribute names.

*add data flow diagram here*

## Manage user identities and their user profile information

The information contained in a user profile and in an ID Token can be modified in a number of ways.

* [**Scopes**](/scopes/current): The authentication flows supported by Auth0 includes an optional parameter that allows you to specify a scope. This controls the user profile information (claims) included in the ID Token (JWT). 

* [**Management Dashboard**](/users/guides/manage-users-using-the-dashboard): The user profile can also be modified through the Auth0 Management Dashboard. The dashboard allows administrators to manually edit portions of the user profile for a particular user. This mechanism can be used to alter the user_metadata and app_metadata portions of the user profile.

* [**Management API**](/users/guides/manage-users-using-the-management-api): The Auth0 Management API provides access to read, update, and delete user profiles stored in the Auth0 database.

* [**Custom database scripts**](/connections/database/custom-db/templates): The above APIs are used for creating and managing users in the Auth0 Database. If a custom database is used as the connection, you can write scripts to implement lifecycle events such as create, login, verify, delete and change password. Auth0 provides templates for these scripts, but they must be modified as needed for the particular database and schema in use by a particular customer.

* [**Rules**](/rules): Rules execute after a user has been authenticated and can be used to augment the user profile during the authentication transaction, and optionally persist those changes back to Auth0. 

:::: further-reading
::: concepts
  * [User Management Overview](/users/concepts/overview-users)
  * [User Profile Overview](/users/concepts/overview-user-profile)
  * [User Metadata Overview](/users/concepts/overview-user-metadata)
  * [Normalized User Profile](/users/normalized/auth0)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Search for Users](/users/search/v3)
  * [View User Profiles](/users/guides/view-users)
  * [Update User Profiles Using Your Database](/users/guides/update-user-profiles-using-your-database)
  * [Create Users Using the Dashboard](/users/guides/create-users)
  * [Manage Users Using the Management API](/users/guides/manage-users-using-the-management-api)
  * [User Metadata in Rules](/rules/current/metadata-in-rules)
  * [Delete Users](/users/guides/delete-users)
  * [Change User Pictures](/users//guides/change-user-pictures)
  * [Change User Passwords](/connections/database/password-change)
  * [Block and Unblock Users](/users/guides/block-and-unblock-users)
  * [Implement Progressive Profiling](/users/guides/implement-progressive-profiling)
  * [Custom Database Script Templates](/connections/database/custom-db/templates)
:::

::: references
  * [User Profile Structure](/users/references/user-profile-structure)
  * [User Search Query Syntax](/users/search/v3/query-syntax)
  * [User Search Best Practices](/users/references/search-best-practices)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [User Data Storage Best Practices](/users/references/user-data-storage-best-practices)
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