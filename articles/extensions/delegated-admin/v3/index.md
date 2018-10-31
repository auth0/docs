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

# Delegate Administration to a User Group

Use the **Delegated Administration** Extension (DAE) to grant a group of people administrative permissions to the [Users page](${manage_url}/#/users) without providing access to any other area by exposing the [Users Dashboard](${manage_url}/#/users) as an Auth0 application.

:::panel PSaaS Appliance Availability
The Delegated Administration extension is available for [PSaaS Appliance](/appliance) customers who are running build `10755` or later, and have User Search enabled.
:::

## Prerequisites

Prior to configuring the extension, you will need to:

* [Create and configure an Auth0 Application](#create-an-application)
* [Enable a Connection on the Application](#enable-a-connection-on-the-application)
* [Add a user to the Connection](#add-a-user-to-the-new-connection)

## Create a delegated administration application 

1. Log into the [Management Dashboard](${manage_url}).
2. Navigate to [Applications](${manage_url}/#/applications) and click on **+Create Application**. Provide a name for your Application (such as `Users Dashboard`) and set the Application type to `Single Page Web Applications`. Click **Create** to proceed.

![Create an Application](/media/articles/extensions/delegated-admin/create-client.png)

3. Click on the **Settings** tab and set the **Allowed Callback URLs**. This varies based on your location:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin/login` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin/login` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin/login` |

4. Configure the **Allowed Logout URLs**:
 
| Location | Allowed Logout URL |
| --- | --- |
| USA | `https://${account.tenant}.us8.webtask.io/auth0-delegated-admin` |
| Europe | `https://${account.tenant}.eu8.webtask.io/auth0-delegated-admin` |
| Australia | `https://${account.tenant}.au8.webtask.io/auth0-delegated-admin` |

Users who have not [migrated to Node.js v8](/migrations/guides/extensibility-node8) will use URLs that are slightly different:

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us.webtask.io/auth0-delegated-admin/login` |
| Europe | `https://${account.tenant}.eu.webtask.io/auth0-delegated-admin/login` |
| Australia | `https://${account.tenant}.au.webtask.io/auth0-delegated-admin/login` |

You will also need to configure the **Allowed Logout URLs**:
 
| Location | Allowed Logout URL |
| --- | --- |
| USA | `https://${account.tenant}.us.webtask.io/auth0-delegated-admin` |
| Europe | `https://${account.tenant}.eu.webtask.io/auth0-delegated-admin` |
| Australia | `https://${account.tenant}.au.webtask.io/auth0-delegated-admin` |

5. Copy the **Client ID** value. Navigate to **Settings > Show Advanced Settings > OAuth** and paste the **Client ID** value to the **Allowed APPs / APIs** field.

6. Set the **JsonWebToken Signature Algorithm** to `RS256`, and make sure the **OIDC Conformant** toggle is disabled.

::: note
The **Delegated Administration** extension requires applications to disable the **OIDC Conformant** flag. After turning off **OIDC Conformant** on the dashboard, ensure your application's authentication code is updated as well.
:::

![Change Advanced OAuth Settings](/media/articles/extensions/delegated-admin/oauth-settings.png)

7. Click **Save Changes** to proceed.

<%= include('../_session-timeout.md') %>

## Enable a connection on the application

When you create a new Application, Auth0 enables all [Connections](/identityproviders) associated with your tenant by default. 

::: security-warning
Auth0 recommends that you disable all Connections to help keep the Application secure. That way no one can add themselves using one of our existing Connections, create a new Database Connection, and enable only the newly-created Database Connection. However, you can choose to use any type of Connection.
:::

1. To disable all existing connetions, click on the Application's **Connections** tab and disable all the Connections using the associated switches.

2. Create a new connection in the navigation pane of the Management Dashboard. Click on **Connections** > [Database Connections](${manage_url}/#/connections/database). 

3. On the Database Connections page, click on **+Create DB Connection**. Provide a name for your Connection, such as `Helpdesk`. 

4. Click **Save** to proceed.

![Create DB Connection](/media/articles/extensions/delegated-admin/create-connection.png)

5. Navigate to the **Settings** tab of your new Connection and enable the **Disable Sign Ups** option. For security reasons, this ensures that even users who have the link to our Connection cannot sign themselves up.

![Disable Sign Ups](/media/articles/extensions/delegated-admin/disable-signup.png)

6. Under the **Applications Using This Connection** section, enable this Connection for your `Users Dashboard` Application.

## Add a user to the new connection and assign roles

1. You need to add at least one user to your Connection. You can do this on the [Users page](${manage_url}/#/users), where you can specify the Connection for the user during the configuration process.

2. Auth0 grants the user(s) in your Connection access to the Delegated Administration extension based on their roles:

- **Delegated Admin - Auditor**: Grants permission to search for users and view users information, but does not allow the user to make any changes. This role will also change the UI to remove action based buttons;

- **Delegated Admin - User**: Grants permission to search for users, create users, open users and execute actions on these users (such as `delete`, `block`, and so on);

- **Delegated Admin - Administrator**: In addition to all of the rights a user has, administrators can see all logs in the tenant and configure Hooks.

To use the extension, users must have either of these roles defined in one of the following fields of their user profiles:

* `user.app_metadata.roles`
* `user.app_metadata.authorization.roles`

You can set these fields manually or use [Rules](/rules).

### Example: Set user roles using Rules

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

## Install the extension

1. On the Management Dashboard, navigate to the [Extensions](${manage_url}/#/extensions) page. 

2. Click on the **Delegated Administration** box in the list of provided extensions. The **Install Extension** window will open.

![Install Extension](/media/articles/extensions/delegated-admin/install-extension.png)

3. Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: The **Client ID** value of the Application you will use. You can find this value on the **Settings** page of your Application.

- **TITLE** (optional): Set a title for your Application. It will be displayed at the header of the page.

- **CUSTOM_CSS** (optional): Provide a CSS script to customize the look and feel of your Application.

- **FAVICON_PATH** (optional): Path to custom favicon.

- **FEDERATED_LOGOUT** (optional): sign out from the IdP when users logout.

4. Once done, click **Install**. Your extension is now ready to use!

If you navigate back to the [Applications](${manage_url}/#/applications) view, you will see that the extension automatically created an additional application called `auth0-delegated-admin`.

![](/media/articles/extensions/delegated-admin/two-clients.png)

Because the application is authorized to access the [Management API](/api/management/v2), you shouldn't modify it.

## Use the extension

To access your newly created users dashboard, navigate to [**Extensions**](${manage_url}/#/extensions) > **Installed Extensions** > **Delegated Administration Dashboard**.

A new tab will open to display the login prompt.

![](/media/articles/extensions/delegated-admin/login-prompt.png)

Because we disabled signups for this Connection during the configuration period, the login screen doesn't display a Sign Up option.

Once you provide valid credentials, you'll be redirected to the *Delegated Administration Dashboard*.

![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

## What's next

* [Customize the Delegated Administration Extension Using Hooks](/extensions/delegated-admin/hooks)
* [Manage Users in the Delegated Administration Extension](/extensions/delegated-admin/manage-users)