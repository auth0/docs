---
description: Learn how to update user profiles when using your own database as an identity provider.
topics:
    - updating-users
    - user-management
    - users
    - custom-database
contentType:
  - how-to
useCase:
  - manage-users
v2: true
---

# Update User Profiles Using Your Database

Update user profiles when using [your own database as an identity provider](/connections/database/custom-db) by doing the following tasks:

* Use the [Management API](/api/management/v2#!/Users/patch_users_by_id).
* Update the user in your database.
* [Configure user migration](/users/guides/configure-automatic-migration) from your database to Auth0.

## Update users with the Management API

When using your own database for authentication, you can use the [Management API](/api/management/v2) to update the following fields:

* `app_metadata`
* `user_metadata`
* `blocked`

If you need to update other user fields, you will need to do it directly in your database.

## Update users in your database

You can update user profiles in your database as you normally do, and Auth0 will update its cached user profile the next time that user logs in.

The user profile in the custom database can be implemented with any user profile structure, but you need to map it in the Login call to the Auth0 normalized user profile attributes as shown in the "Login" custom database template. 

Access the custom database templates are accessed via
*Connections* -> *Database* -> *Custom Database*. Be sure to turn on the "Use my own database" toggle to enable editing the scripts.

See the [User profile cache](#user-profile-cache) section below for a brief overview of how Auth0 caches user profiles.

## Update users through migration

If you have [enabled user migration](/connections/database/migrating), and a user has already been migrated to the Auth0 database, then Auth0 will not query your database again for the user profile. Therefore, all changes made in the custom database for that user will never reflect in Auth0.

Once a user has been migrated, you will also be able to update fields, such as `name`, `nickname`, `given_name`, `family_name`, `picture`, `email`, and `email_verified` via the Management API.

However, rules for updating other user fields will still apply as described in the [Normalized User Profile](/users/normalized).

## User profile cache

Auth0 caches the user profile received from a [database connection](/connections/database) before sending it to the client application. This cache is stored in the Auth0 database and is refreshed each time the user authenticates.

The cached values for the [Normalized User Profile](/users/normalized/auth0/normalized-user-profile-schema) fields are based on the values returned from the Login Script of your custom database connection.

The User Profile is cached for several reasons. First, caching allows you the option of implementing <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> at the Auth0 layer to avoid going to the Connection for every request. Additionally, this provides resilience if a Connection is temporarily unavailable.

## Keep reading

* [User Profiles](/users/concepts/overview-user-profile)
* [Metadata](/users/concepts/overview-user-metadata)
* [Manage User Metadata](/users/guides/manage-user-metadata)
* [Manage Users Using the Management API](users/guides/manage-users-using-the-management-api)
* [Update Metadata with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [Read Metadata](/users/guides/read-metadata)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
* [User Data Storage Scenario](/users/references/user-data-storage-scenario)
* [View Users](/users/guides/view-users)
