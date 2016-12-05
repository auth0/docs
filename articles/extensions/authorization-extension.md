---
description: This page explains how to setup and manage the Authorization Extension v2.
---

# Auth0 Extension: Authorization Extension

::: panel-warning Notice
This page explains how to use version 2 and later of the Authorization Extension, [click here for documentation of version 1.](/extensions/authorization-extension-v1)

[Click here for information about upgrading your Authorization Extension version](#migration-to-v2-of-the-authorization-extension)
:::

The Auth0 Authorization Extension provides user authorization support in Auth0. Currently the extension supports authorizations for Users using Groups, Roles and Permissions.

## How to Install

To install the Authorization extension, click on the "Auth0 Authorization" box on the main Extensions page of the Management Portal. You will be prompted to install the app.

![Install Authorization Extension](/media/articles/extensions/authorization/app-install.png)

Once installed, you will see the app listed under "Installed Extensions".

![Installed Extensions](/media/articles/extensions/authorization/installed-extensions.png)

When you click on the link to open the extension for the first time, you will be prompted to provide permission for the extension to access your Auth0 account. Then you will be redirected to the Authorization Dashboard.

![Authorization Dashboard](/media/articles/extensions/authorization/auth-dashboard-v2.png)

## Migration from v1 to v2 of the Authorization Extension (breaking changes)

::: panel-warning Notice
One of the major changes of the v2 of the Authorization Extension is that the **Applications** section has been removed. The driving factor for this change is complexity: Defining a policy when someone can or cannot access an application depends on different factors (roles, groups, time of day, MFA, ...). This is why the desired approach for this use case is [rules](#controlling-application-access).
:::

### Upgrading to v2

To upgrade your existing version of the Authorization Extension, go to [Extensions section](${manage_url}/#/extensions) of the dashboard, then click **Installed Extensions**.

Next to the Authorization Extension, you should see a link to upgrade to the latest version.

## Setup the Authorization Extension

Once you have the Authorization Extension installed, you can start to configure Groups, Roles and Permissions for your Users in the Authorization Extension dashboard.

### Users

The **Users** section lists all the current users of your applications. Here you can search your users and select a specific user. You can then view their profile, edit or view their groups, and edit or view their roles.

![Users Section](/media/articles/extensions/authorization/users.png)

### Groups

To create and manage the Groups with which you will use to manage users' settings, click on the "Groups" link in the Authorization Dashboard.

When creating a Group, you will provide a **name** for the group, as well as a **description** of what that Group does.

![Create a New Group](/media/articles/extensions/authorization/create-group-v2.png)

There are two ways for you to manage users and their Group memberships:

* Opening the **group** and managing the group's users;

    ![Open a Group](/media/articles/extensions/authorization/group-membership-v2.png)

* Opening the **user** and managing the user's group membership.

    ![Open a User](/media/articles/extensions/authorization/user-membership-v2.png)

The Groups that you will create are dependent on the needs of your business process. For example, you might have a Group for your users in Finance, a group for your users in IT, and so on. Additionally, you may create nested groups, similar to the following:

* Example Company
    * Accounting
        * External Accountants
    * Human Resources
    * Finance
        * Finance IT Support
    * Management

To create nested Groups, you must first create all of the individual groups via the CREATE button on the Groups page of the Authorization Dashboard.

![Add Nested Groups](/media/articles/extensions/authorization/add-nested-groups-v2.png)

To nest the groups:

1. Open up the top-level Group (in the example above, this would be the Example Company Group);
2. Click on the **Nested Groups** tab;
3. Click on the **ADD NESTED GROUP** button. Then you will be presented with a list of Groups that can be added to the primary Group. To select a particular Group, click on the check box to the left of the name. After each selection, you will be returned to the primary Group page. Continue this process until you have included all the Groups you need.

With nested Groups, adding a user to a sub-Group also grants the user permissions granted to the Groups that are parents of that Group. For example, adding a user to the External Accountants group automatically makes them a member of the Finance and Company Groups. Please note, however, that the user is only explicitly a member of External Accountants; all other memberships are purely dynamic and are calculated as needed (for example, when loading the user's group memberships).

![View Nested Groups](/media/articles/extensions/authorization/nested-groups-v2.png)

To prevent confusion, you will be shown both the explicit members AND the "calculated members" that result from nested groups whenever you open a specific Groups page in the Authorization Dashboard.

### Group Mappings

Group Mappings allow you to dynamically "add" users to different Groups based on the users' Connections.

For example, suppose your company has the following Groups of users:

* **Americas - West**, which consists of users who connect via *google-oauth2*;
* **Europe - West**, which consists of users who connect via *google-oauth2*.

With Group Mappings, you can consolidate these Groups and the permissions allotted to the included users into one larger group, such as Overall Company Group. Similar to nested Groups, the memberships of the users in Overall Company Group is not explicit, but dynamic, and are calculated at runtime. Such memberships will appear listed as such under the Groups page.

![Group Mappings](/media/articles/extensions/authorization/group-mapping-v2.png)

### Roles

The Roles that you will create will depend on the access to certain permissions in your application. For example, let's say that you have an application that allows employees to enter in company expenses. You want all employees to be able to submit expenses, but want certain Finance users to have more admin type of actions such as being able to approve or delete expenses. These actions can be mapped to [Permissions](#permissions) and then assigned to a certain Role.

You can create different types of Roles such as: Expense Admins, Expense Manager, and Expense User for your Expense Management Tool.

![Roles](/media/articles/extensions/authorization/roles.png)

To add a role, click the **CREATE ROLE** button from the **Roles** section of the dashboard. Then choose the application this Role applys to (such as Expense Management Tool) and then add a name of the role (such as Expense Admins) and a description of the role. Then select the permissions you wish to grant to this role. If you haven't yet created your permissions you can add them later to an exisiting Role.

![Add a New Role](/media/articles/extensions/authorization/add-role.png)

Once you have a **Role** created, you can add it to a user so they can then have the associated **Permissions**. To add a role to a user, find the user in the **Users** section, then click the **Roles** tab. Then click **ADD ROLE TO USER** to choose which roles you wish to assign to a user, then click **SAVE**.

![Add Role to User](/media/articles/extensions/authorization/add-role-to-user.png)

### Permissions

Permissions are the actions or functions that can be added to Roles.

Using the previous example of an Expense application, let's look at possible roles and how they can be associated with certain permissions:

- Role: Expense User
  - Permissions:
    - View their own expenses
    - Add a new expense

- Role: Expense Admin
  - Permissions:
    - Approve expenses
    - View all user expenses
    - Delete expenses
    - Add a new expense

To create a new permission, go to the **Permissions** section of the Authorization Extension dashboard.

![Permissions](/media/articles/extensions/authorization/permissions.png)

Then click the **CREATE PERMISSION** button. Then enter the name of the permission, the ddescription and select the application for which this permission applies.

![Create Permission](/media/articles/extensions/authorization/create-permission.png)

Once you have your permissions created, you can associate them with [Roles](#roles).

## Enabling API Access

At this point the extension might contain some roles, groups, permissions. Your users might also have been assigned to specific roles and groups.

The Authorization Dashboard can optionally enable API access which will allow you to automate provisioning and query the authorization context of your users in real time.

To get to **API** section, click **API** on the dropdown on the top right of the **Authorization Dashboard**.

![Click API](/media/articles/extensions/authorization/click-api.png)

Under **Settings** you can use the toggle to enable API Access.

You can also set the Token Expiration, Token Issuer, Token Audience and Url. Click the **SAVE** button when finished editing these field.

Click the **Explorer** section to see the API endpoints that can be called.

![Explorer](/media/articles/extensions/authorization/api-explorer.png)

## Rule Behavior for the Authorization Extension

In addition to API access, you can also deploy a rule that reaches out to the extension each time a user logs in. Once the rule is enabled, it will do the following:

1. Determine the user's group membership, roles and permissions using information provided by the Extension;
2. Optionally store the user's groups, roles and permissions info as part of the `app_metadata`, to enable this [see details below](#persistence);
3. Add the user's groups, roles and permissions to the outgoing token (which can be requested via the **OpenID Groups** scope) [see details below](#token-contents);

> Note: Since this logic is part of a rule it will only be executed in the context of a login. If users are added to or removed from a group this will only be reflected within Auth0 after this user logs in again (eg: in the user's `app_metadata` or when calling the `/userinfo` endpoint).

### Configuration

To configure this rule, click **Configuration** on the dropdown on the top right of the **Authorization Dashboard**.

![Click Configuration](/media/articles/extensions/authorization/click-configuration.png)

This will bring you to the **Rule Configuration** section of the **Configuration** page.

![Configuration page](/media/articles/extensions/authorization/configuration.png)

Here you can configure:

### Token Contents

**Storing Additional Data in Tokens**:

If you want to store data on Groups, Roles, or Permissions of a user in the token, use the toggle buttons to add the desired data pieces.

::: panel-warning Notice
Storing too much data in the token can cause performance issues or even prevent the token to be issued. Make sure you only choose to store the data that you'll really need. If this data can grow too large, consider using persistence instead of adding it to the token.
:::

**Passthroughs**:

If you have users that receive groups from the Identity Provider (such as Active Directory) then you can merge these groups (in order to preserve them) with the groups defined in your Authorization Extension. Use the toggle buttons to choose which to merge of Groups, Roles and Permissions.

### Persistence

You can also store the authorization context information in the user profile. The data will be stored in the [user's `app_metadata`](/metadata) and you can then use the [Management API](/api/management/v2) or the [`/tokeninfo` endpoint](/api/authentication#!#post--tokeninfo) to retrieve this information after the user has logged in.

### Controlling Application Access

In addition to the rule that is published by the extension, you can write your own rules after that one to control application access for example. One way to achieve this is to use [Application Metadata](https://auth0.com/docs/rules/metadata-in-rules#reading-metadata) where you could specify on every client that roles might be required. Eg:

- **required_roles**: `Timesheet User,Timesheet Admin`

Then you can write a rule that enforces this logic.

```js
function (user, context, callback) {
  context.clientMetadata = context.clientMetadata || {};
  if (context.clientMetadata.required_roles && context.clientMetadata.required_roles.length){
    if (user.roles) {
      var _ = require('lodash');
      var roles = context.clientMetadata.required_roles.split(',');
      var matchingRoles =_.filter(user.roles, function(roleName) {
        return _.includes(roles, roleName);
      });

      if (matchingRoles && matchingRoles.length) {
        return callback(null, user, context);
      }
    }

    return callback(new UnauthorizedError('You do not have the required role to access ' + context.clientName));
  }

 callback(null, user, context);
}
```

> Note: For this to work you must enable "Roles" under the "Token Contents" section and publish the rule. Then add this rule after the generated "auth0-authorization-extension" rule.

## Import/Export Authorization Data

You can import new data or export exisiting authorization data with a JSON file. This can be useful when moving over an environment, but remember roles and permissions are linked to specific clients, so you will need to update to the correct **applicationId** when moving environments.

You can get to the **Import/Export** section by clicking **Configuration** on the dropdown on the top right of the **Authorization Dashboard**.

![Click Configuration](/media/articles/extensions/authorization/click-configuration.png)

And then clicking **Import/Export**.

![Import/Export Section](/media/articles/extensions/authorization/import-export.png)

Use this form to copy and/or paste, or edit JSON data and then click either the **IMPORT** or **EXPORT** button when finished, depending on your use case.

## Storage

The extension uses the internal Webtask storage capabilities, which are limited to 500 KB. Here are some examples of what this means in terms of scenarios:

 - If you have 1000 groups and 3000 users, where each user is member of 3 groups about 475 KB of data would be used.
 - If you have 20 groups and 7000 users, where each user is member of 3 groups about 480 KB of data would be used.

Think you need more? [Contact support.](https://support.auth0.com)
