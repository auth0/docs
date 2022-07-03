---
title: Delegated Administration Extension
description: Learn about Auth0's Delegated Administration Extension, which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard.
toc: true
topics:
  - extensions
  - delegated-admin
contentType:
  - how-to
  - concept
  - index
useCase: extensibility-extensions
---

# Delegated Administration Extension

The **Delegated Administration Extension (DAE)** allows you to grant a select group of people administrative permissions to the [Users page](${manage_url}/#/users) of the Auth0 Dashboard without providing access to any other area. This guide will show you how to do this by exposing the [Users area](${manage_url}/#/users) as an Auth0 application.

## Steps

To set up the Delegate Administration Extension (DAE), you must:

1. [Register an Application with Auth0](#register-an-application-with-auth0)
2. [Create a database connection](#create-a-database-connection)
3. [Disable all other connections for your Auth0 Application](#disable-all-other-connections-for-your-auth0-application)
4. [Create a user for the database connection](#create-a-user-for-the-database-connection)
5. [Assign roles to the user](#assign-roles-to-the-user)
6. [Install and configure the extension](#install-and-configure-the-extension)
7. [Use the extension](#use-the-extension)

### Register an Application with Auth0

First, you must create the Application that the Delegated Administration Extension will expose to those who should have administrative privileges for the Users page. To do this, [create a delegated admin application](/dashboard/guides/extensions/delegated-admin-create-app) in Auth0.

When finished, make sure to note the application's **Client ID**.

### Create a database connection

In this example, a database connection will serve as the source of your users who are allowed access to the Users area. To configure this, [create a database connection](/dashboard/guides/connections/set-up-connections-database).

While setting up your connection, make sure you use the following settings:

* For connection name, use an appropriate name, such as `HelpDesk`.
* Enable the **Disable Sign Ups** toggle, which, for security purposes, will ensure that even users who have the link to the database connection cannot sign themselves up.

### Disable all other connections for your Auth0 Application

By default, Auth0 enables all connections associated with your tenant when you create a new Application. For this example, we will disable all connections other than our newly-created database connection. This will help keep the application secure because no one will be able to add themselves using one of our existing connections.

To configure this, [update application connections](/dashboard/guides/applications/update-app-connections).

### Create a user for the database connection

To continue, you must [create at least one user](/dashboard/guides/users/create-users) and attach it to your connection.

### Assign roles to the user

<%= include('../../../_includes/_rbac_vs_extensions') %>

Auth0 grants access to the Delegated Administration Extension (DAE) for the user(s) attached to your connection based on their <dfn data-key="role">roles</dfn>. DAE-specific roles include:

- **Delegated Admin - User**: Grants permission to search for users, create users, open users, and execute actions on users (e.g., `delete`, `block`).

- **Delegated Admin - Administrator**: Grants all the rights of **Delegated Admin - User**, plus the ability to see all logs in the tenant and configure Hooks.

- **Delegated Admin - Auditor**: Grants permission to search for users and view user information, but does not allow any changes to be made. This role also changes the UI to remove action-based buttons.

- **Delegated Admin - Operator**: Grants permission to access user management and logs, but does not allow access to the extension configuration section.

When working with roles, we recommend that you use the Authorization Core feature set:

1. [Create DAE roles](/dashboard/guides/roles/create-roles). The names of the roles you create must match the names of the [pre-defined DAE roles above](#assign-roles-to-users).

2. [Assign the DAE role to a user manually](/dashboard/guides/users/assign-roles-users), then add the user roles to the DAE namespace in the ID Token using the following rule, remembering to replace the `CLIENT_ID` placeholder with your delegated admin application's **Client ID**.  

```js
function (user, context, callback) {
    if (context.clientID === 'CLIENT_ID') {
        const namespace = 'https://example.com/auth0-delegated-admin';
        context.idToken[namespace] = {
            roles: (context.authorization || {}).roles
        };
    }
    callback(null, user, context);
}
```

See this guide with more [information about creating rules](/dashboard/guides/rules/create-rules).

::: note
Your claim should be [namespaced](/tokens/guides/create-namespaced-custom-claims).
:::

::: note
Using Authorization Core will define roles in the `context.authorization` object.

If you choose not to use Authorization Core, you should define DAE roles in one of the following fields on the user profile:

* `user.app_metadata.roles`
* `user.app_metadata.authorization.roles`
:::

## Install and configure the extension

Now that we've created and configured an application, a connection, and our user, we can [install and configure the Delegated Admin Extension](/dashboard/guides/extensions/delegated-admin-install-extension) itself.

## Use the extension

Once installed, you are ready to [use the Delegated Admin Extension](/dashboard/guides/extensions/delegated-admin-use-extension).

<%= include('./_session-timeout.md') %>

## Keep reading

* [Customizing the Delegated Administration Extension using Hooks](/extensions/delegated-admin/hooks)

* [Managing users in the Delegated Administration Dashboard](/extensions/delegated-admin/manage-users)
