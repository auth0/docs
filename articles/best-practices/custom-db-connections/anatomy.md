---
title: Custom Database Connection Anatomy Best Practices
description: Learn about best practices for custom database connection anatomy.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Connection Anatomy Best Practices

You typically use a [custom database connection](/connections/database/custom-db) to provide access to your own legacy identity store for authentication (sometimes referred to as *legacy authentication*) or perform user import through [automatic migration](/users/guides/configure-automatic-migration) (often referred to as *trickle* or *lazy* migration).

::: note
You can also use custom database connections to proxy access to an Auth0 tenant in scenarios where you use Auth0 multi-tenant architecture. For more information, see [Using Auth0 to Secure Your Multi-Tenant Applications](/design/using-auth0-with-multi-tenant-apps). 
:::

You typically create and configure custom database connections using the [Auth0 Dashboard](/connections/database/custom-db/create-db-connection#step-1-create-and-configure-a-custom-database-connection). You create a database connection, and then toggle **Use my own database** to enable editing of the database action scripts. A custom database connection can also be created and configured with the Auth0 [Management API](/api/management/v2#!/Connections/post_connections) and the `auth0` strategy. 

![Enable Use Own Database Option](/media/articles/dashboard/connections/database/connections-db-settings-custom-1.png)

As shown below, you use custom database connections as part of a login workflow to obtain user identity information from your own legacy identity store for authentication or user import, referred to as *legacy authentication*.

<p align="center"> 
    <img src="/media/articles/connections/database/custom-database-connections.png" alt="Custom Database Connection Flow">
</p>

In addition to artifacts common for all database connections types, a custom database connection allows you to configure action scripts&mdash;custom code used when interfacing with legacy identity stores. The scripts you choose to configure depend on whether you are creating a connection for legacy authentication or for automatic migration (see [Custom Database Action Script Execution](/best-practices/custom-db-connections/execution) for further details). 

::: panel Best Practice
Action scripts can be implemented as anonymous functions; however, anonymous functions make it hard to debug when it comes to interpreting the call-stack generated as a result of any exceptional error conditions. For convenience, we recommend providing a function name for each action script and have supplied some [recommended names](/best-practices/custom-db-connections/execution#recommended-script-names).
:::

In a legacy authentication scenario, no new user record is created; the user remains in the legacy identity store and Auth0 uses the identity it contains when authenticating the user.

::: note
Custom database connections are also used outside of the Universal Login workflow. For example, a connection's [`changePassword`](/best-practices/custom-db-connections/execution#change-password) action script is called when a password change operation occurs for a user that resides in a legacy identity store.
:::

## Automatic migration

During automatic migration, Auth0 creates a new user in an identity store (database) managed by Auth0. Auth0 uses the identity in the Auth0-managed identity store when authenticating the user. For this to occur, Auth0 first requires the user be authenticated against the legacy identity store and only if this succeeds will the new user be created in the Auth0 managed database. Auth0 creates the new user using the same id and password that were supplied during authentication. 

::: panel Best Practice
User creation in an automatic migration scenario typically occurs after the **Login** action script completes. We recommend that you **do not attempt** to delete users from a legacy identity store as an inline operation within the **Login** script, but instead as an independent process. This prevents accidental user deletion should an error condition occur during migration. 
:::

With automatic migration, users remain in the legacy identity store and can be deleted or archived if required. A side-effect can occur where a user is deleted from Auth0 but remains in the legacy data store. In this case, a login made by the deleted user could result in either the **Login** or **Get User** script executing and the user again migrating from the legacy identity store. 

::: panel Best Practice
We recommend marking legacy store user identities as *migrated* before either **Login** or **Get User** scripts complete and prior to any eventual legacy store deletion to prevent the unintentional recreation of intentionally-deleted users.
:::

## Keep reading

<%= include('../../_includes/_topic-links', { links: [
  'best-practices/custom-db-connections/size',
  'best-practices/custom-db-connections/environment',
  'best-practices/custom-db-connections/execution',
  'best-practices/error-handling',
  'best-practices/debugging',
  'best-practices/testing',
  'best-practices/deployment',
  'best-practices/performance',
  'best-practices/custom-db-connections/security'
] }) %>
