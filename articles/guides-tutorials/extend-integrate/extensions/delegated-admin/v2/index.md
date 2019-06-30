---
description: The Delegated Administration extension allows you to expose the Users dashboard to a group of users, without allowing them access to the dashboard.
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

# Delegated Administration

The **Delegated Administration** extension allows you to grant a select group of people administrative permissions to the [Users page](${manage_url}/#/users) without providing access to any other area. This is done by exposing the [Users Dashboard](${manage_url}/#/users) as an Auth0 application.

Prior to configuring the extension, you will need to:

* [Create and configure an Auth0 Application](#create-an-application)
* [Enable a Connection on the Application](#enable-a-connection-on-the-application)
* [Add a user to the Connection](#add-a-user-to-the-new-connection)

## Create an Application

The first step is to create the Application that the extension exposes to those who should have administrative privileges to the Users page.

After you've logged into the [Management Dashboard](${manage_url}), navigate to [Applications](${manage_url}/#/applications) and click on **+Create Application**. Provide a name for your Application (such as `Users Dashboard`) and set the Application type to `Single-Page Web Applications`. Click **Create** to proceed.

![Create an Application](/media/articles/extensions/delegated-admin/create-client.png)

### Configure Application Settings

Once you've created your Application, you'll need to make the following Application configuration changes.

Click on the **Settings** tab and set the **Allowed Callback URLs**. This varies based on your location:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin/login` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin/login` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin/login` |

You will also need to configure the **Allowed Logout URLs**:
 
| Location | Allowed Logout URL |
| --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin` |

Copy the **Client ID** value.

Navigate to **Settings > Show Advanced Settings > OAuth** and paste the **Client ID** value to the **Allowed APPs / APIs** field.

Next, set the **JsonWebToken Signature Algorithm** to `RS256`, and make sure the **OIDC Conformant** toggle is disabled.

::: note
The **Delegated Administration** extension requires applications to disable the **OIDC Conformant** flag. After turning off **OIDC Conformant** on the dashboard, ensure your application's authentication code is updated as well.
:::

![Change Advanced OAuth Settings](/media/articles/extensions/delegated-admin/oauth-settings.png)

Click **Save Changes** to proceed.

### Enable a Connection on the Application

When you create a new Application, Auth0 enables all [Connections](/identityproviders) associated with your tenant by default. For the purposes of this tutorial, we will disable all Connections (this helps keep our Application secure, since no one can add themselves using one of our existing Connections), create a new Database Connection, and enable only the newly-created Database Connection. However, you can choose to use any type of Connection.

#### Disable All Existing Connections

Switch over to the Application's **Connections** tab and disable all the Connections using the associated switches.

#### Create a New Connection

In the navigation pane of the Management Dashboard, click on **Connections** > [Database Connections](${manage_url}/#/connections/database).

On the Database Connections page, click on **+Create DB Connection**. Provide a name for your Connection, such as `Helpdesk`. 

Click **Save** to proceed.

![Create DB Connection](/media/articles/extensions/delegated-admin/create-connection.png)

Navigate to the **Settings** tab of your new Connection and enable the **Disable Sign Ups** option. For security reasons, this ensures that even users who have the link to our Connection cannot sign themselves up.

![Disable Sign Ups](/media/articles/extensions/delegated-admin/disable-signup.png)

Under the **Applications Using This Connection** section, enable this Connection for your `Users Dashboard` Application.

### Add a User to the New Connection

You will need to add at least one user to your Connection. You can do this via the [Users page](${manage_url}/#/users), where you can specify the Connection for the user during the configuration process.

### Assign Roles to Users

Auth0 grants the user(s) in your Connection access to the Delegated Administration extension based on their <dfn data-key="role">roles</dfn>:

- **Delegated Admin - User**: Grants permission to search for users, create users, open users and execute actions on these users (such as `delete`, `block`, and so on);

- **Delegated Admin - Administrator**: In addition to all of the rights a user has, administrators can see all logs in the tenant and configure Hooks.

To use the extension, users must have either of these roles defined in one of the following fields of their user profiles:

* `user.app_metadata.roles`
* `user.app_metadata.authorization.roles`

You can set these fields manually or via [rules](/rules).

#### Set User Roles via Rules

This rule gives users from the `IT Department` the `Delegated Admin - Administrator` role and users from `Department Managers` are the `Delegated Admin - User` role.

```js
function (user, context, callback) {
 if (context.clientID === 'CLIENT_ID') {
   const namespace = 'https://${account.tenant}.us8.webtask.io/auth0-delegated-admin';
   if (user.groups && user.groups.indexOf('IT Department') > -1) {
     context.idToken[namespace] = { roles: [ 'Delegated Admin - Administrator' ] };
     return callback(null, user, context);
   } else if (user.app_metadata && user.app_metadata.isDepartmentManager && user.app_metadata.department && user.app_metadata.department.length) {
     context.idToken[namespace] = { roles: [ 'Delegated Admin - User' ] };
     return callback(null, user, context);
   }

   return callback(new UnauthorizedError('You are not allowed to use this application.'));
 }

 callback(null, user, context);
}
```

## Install the Extension

Now that we've created and configured an Application, a Connection, and our users, we can install and configure the extension itself.

On the Management Dashboard, navigate to the [Extensions](${manage_url}/#/extensions) page. Click on the **Delegated Administration** box in the list of provided extensions. The **Install Extension** window will open.

![Install Extension](/media/articles/extensions/delegated-admin/install-extension.png)

Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: The **Client ID** value of the Application you will use. You can find this value on the **Settings** page of your Application.

- **TITLE** (optional): Set a title for your Application. It will be displayed at the header of the page.

- **CUSTOM_CSS** (optional): Provide a CSS script to customize the look and feel of your Application.

Once done, click **Install**. Your extension is now ready to use!

If you navigate back to the [Applications](${manage_url}/#/applications) view, you will see that the extension automatically created an additional application called `auth0-delegated-admin`.

![](/media/articles/extensions/delegated-admin/two-clients.png)

Because the application is authorized to access the [Management API](/api/management/v2), you shouldn't modify it.

## Use the Extension

To access your newly created users dashboard, navigate to [**Extensions**](${manage_url}/#/extensions) > **Installed Extensions** > **Delegated Administration Dashboard**.

A new tab will open to display the login prompt.

![](/media/articles/extensions/delegated-admin/login-prompt.png)

Because we disabled signups for this Connection during the configuration period, the login screen doesn't display a Sign Up option.

Once you provide valid credentials, you'll be redirected to the *Delegated Administration Dashboard*.

![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

## Keep Reading

* [Customizing the Delegated Administration Extension Using Hooks](/extensions/delegated-admin/hooks)

* [Managing Users in the Delegated Administration Extension Dashboard](/extensions/delegated-admin/manage-users)
