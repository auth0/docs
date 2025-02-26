---
title: Manage Users and User Profiles
description: An introduction to how Auth0 helps you manage users and their profile information
contentType: microsite
public: false
topics:
  - users
  - user-management
useCase: manage-users
template: microsite
v2: true
---

Auth0 stores user profiles for your application in a hosted cloud database. User profile information can come from your users directly or from any number of other external sources including Social Identity Providers, Enterprise connections like <dfn data-key="security-assertion-markup-language">SAML</dfn>, or custom sources like Active Directory. Auth0 refers to all user profile attribute sources as connections because Auth0 *connects* to them to authenticate the user.

You can manage and store custom user attributes such as favorite color or phone number along with the standard profile information. Using our Rules engine you can modify or enhance the user profiles.   

## How it works

Within the Auth0 database:

1. Auth0 creates a user profile for each unique user of your applications.
2. Auth0 fills that profile with information provided by the user directly or from their chosen connection. 
3. If the information is sourced from a connection, Auth0 refreshes that data each time the user authenticates.
4. Each connection may return a set of attributes about the user, and each provider may use different names for the same attribute, such as surname, last name, and family name. To handle such differences, Auth0 applies a Normalized User Profile, which returns a basic set of information using specific attribute names.

<img src="/media/articles/microsites/manage-users.png" alt="Manage Users and User Profiles" width="100%">

## Manage user identities and profile information

There are several ways you can modify information in a user profile or an ID Token.

* **Scopes**: The authentication flows supported by Auth0 include an optional parameter that allows you to specify a scope. This controls the user profile information (claims) included in the ID Token (JWT).

* **Management Dashboard**: On the dashboard administrators can manually edit portions of the user profile for a particular user. This mechanism can be used to alter the user_metadata and app_metadata portions of the user profile.

* **Management API**: Provides access to read, update, and delete user profiles stored in the Auth0 database.

* **Custom database scripts**: If a custom database is used as the connection, you can write scripts to implement lifecycle events such as create, login, verify, delete and change password. Auth0 provides templates for these scripts that you can modify for the particular database and schema.

* **Rules**: Rules execute after a user has been authenticated. Use Rules to augment the user profile during the authentication transaction, and optionally persist those changes back to Auth0. 

:::: further-reading
::: concepts
  * [User Management](/users)
  * [User Profiles](/users/concepts/overview-user-profile)
  * [Metadata](/users/concepts/overview-user-metadata)
  * [Normalized User Profiles](/users/normalized)
 :::

::: guides
  * [Scopes](/scopes)
  * [Manage Users Using the Dashboard](/users/guides/manage-users-using-the-dashboard)
  * [Manage Users Using the Management API](/users/guides/manage-users-using-the-management-api)
  * [Update User Profiles Using Your Database](/users/guides/update-user-profiles-using-your-database)
  * [Custom Database Script Templates](/connections/database/custom-db/templates)
  * [User Metadata in Rules](/rules/current/metadata-in-rules)
:::

::: references
  * [User Profile Structure](/users/references/user-profile-structure)
  * [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
  * [User Data Storage Scenario](/users/references/user-data-storage-scenario)
  * [Identity Providers Supported](/identityproviders)
 :::
::::

::: whats-next
* Learn about the tools available to [define and maintain custom user data](/microsites/manage-users/define-maintain-custom-user-data).
* If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
 :::
