---
description: Overview of importing users from external applications into Auth0.
topics:
  - users
  - user-management
  - migrations
contentType:
  - concept
useCase:
  - manage-users
  - migrate
---
# Import and Export Users

Auth0 supports importing users from external applications using custom database connections, the Auth0 Management API, or the User Import/Export Extension.

## Automatic migrations

Auth0 supports automatic migration of users from a [custom database connection](/connections/database/custom-db) to Auth0. By activating this feature, your users are:

* Moved to Auth0 the first time they log in after you set up the integration. 
* Not asked to reset their password as a result of the migration.

::: panel Feature availability
- Only **Developer**, **Developer Pro**, and **Enterprise** subscription plans include the database migration feature.
- Only **Enterprise** subscription plans include the ability to connect to an existing store or database via JavaScript running on Auth0's servers for every authentication request.

For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

When a user authenticates via a custom database connection marked for import to Auth0, the following process takes place:

![Migration Diagram](/media/articles/connections/database/migrating-diagram.png)

* Auth0 authenticates migrated users against the Auth0 database. 
* If the user has not been migrated, Auth0 executes your custom login script and, upon successfully log in, adds the user to the Auth0 database. 
* Subsequent logins result in the user's credentials retrieved from Auth0, **NOT** your custom database.
* New users are automatically added to the Auth0 database.

::: note
Auth0 can only assist users in the Auth0 database with password reset.
:::

## Bulk user imports with the Management API

If you already have a user database, you can use our [`/post_users_imports`](/api/management/v2#!/Jobs/post_users_imports) Management API endpoint to populate a database connection with this information. 

## Migrate users with the User Import/Export Extension

The User Import/Export Extension allows you to:

* Bulk import your existing database users into Auth0.
* Search for and export some (or all) of your Auth0 database users.

::: note
You must be a Dashboard Admin to use this extension.
:::

You can import and export user data using the User Import/Export Extension available on the [Extensions](${manage_url}/#/extensions) section of the Dashboard. Select the **User Import / Export** extension and install it. For more information, see [User Import/Export Extension](/extensions/user-import-export).

## Keep reading

* [Configure Automatic Migration from Your Database](/users/guides/configure-automatic-migration)
* [Bulk User Imports](/users/guides/bulk-user-imports)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [User Import/Export Extension](/extensions/user-import-export)
* [Bulk Import Database Schema and Example](/users/references/bulk-import-database-schema-examples)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
* [Migrate Stormpath Users to Auth0 Demo](https://github.com/auth0-blog/migrate-stormpath-users-to-auth0)
* [Migrate a User Database to Auth0](https://auth0.com/learn/migrate-user-database-auth0/)
