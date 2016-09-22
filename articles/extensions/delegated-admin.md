---
description: The Delegated Administration extension allows you to expose the Users dashboard to a group of users, without allowing them access to the dashboard.
---

# Delegated Administration - v2

The **Delegated Administration** extension allows you to expose the [Users Dashboard](${manage_url}/#/users) to a group of users, without having to provide access to them to the [dashboard](${manage_url}/#/). Instead the [Users Dashboard](${manage_url}/#/users) is exposed as an Auth0 client. Let's see how this is done.

**NOTE**: This extension is currently available only for the public cloud. Extensions are not yet supported in the [appliance](/appliance).

## Create A Client

Let's start with creating a new client application. Navigate to [Clients](${manage_url}/#/applications) and click on the **+Create Client** button. Set a name (we will name ours *Users Dashboard*) and choose *Single Page Web Applications* as client type. Click on **Create**.

![](/media/articles/extensions/delegated-admin/create-client.png)

Click on the *Settings* tab and set the **Allowed Callback URLs**. This varies based on your location.

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://sandbox.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login` |
| Europe | `https://sandbox-eu.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login` |
| Australia | `https://sandbox-au.it.auth0.com/api/run/${account.tenant}/8d6f0f0711daedc87d1a6d595771015a/login` |

Copy the **Client ID** value.

Navigate to *Settings > Show Advanced Settings > OAuth* and paste the **Client ID** value to the **Allowed APPs / APIs** field.

Set the **JsonWebToken Signature Algorithm** to *RS256*.

![](/media/articles/extensions/delegated-admin/set-rs256.png)

Save your changes.

### Enable Connections on the Client

When you create a new client, by default all the connections are enabled. This is something you want to change in this case, for security reasons. The approach we follow in this tutorial is to disable all connections, create a new Database Connection and enable only this one for our new client application. But you could do the same with an AD, ADFS, ... connection for example.

Navigate to the *Connections* tab and disable all the connections using the switch.

Following that, navigate to [Database Connections](${manage_url}/#/connections/database) and click on **+Create DB Connection**. Set a name for your connection, we will name ours *Helpdesk*.

![](/media/articles/extensions/delegated-admin/create-connection.png)

Navigate to the *Settings* tab of the new connection and enable the **Disable Sign Ups** option. This way we avoid another security concern: if some malicious user gets hold of the link, signing up will not be possible.

![](/media/articles/extensions/delegated-admin/disable-signup.png)

Enable this new connection for your client (*Users Dashboard* in our case) and add at least one user.

### Assing the right Roles to your Users

Access to the extension requires your users to have the right roles:

 - `Delegated Admin - User`: These users can search for users, create users, open users and execute actions on these users (like Delete, Block ...)
 - `Delegated Admin - Administrator`: These users can additional see all logs in an account and configure Hooks

Only users that have these roles defined in `user.roles`, `user.app_metadata.roles` or `user.app_metadata.authorization.roles` will be able to use the extension. You could manually set these roles in your users or use a rule in order to do this. The following rule shows how users from the `IT Department` are given the Administrator role while "Department Managers" are given the User role.

```js
function (user, context, callback) {
 if (context.clientID === 'CLIENT_ID') {
   if (user.groups && user.groups.indexOf('IT Department') > -1) {
     user.roles = user.roles || [ ];
     user.roles.push('Delegated Admin - Administrator');
     return callback(null, user, context);
   } else if (user.app_metadata && user.app_metadata.isDepartmentManager && user.app_metadata.department && user.app_metadata.department.length) {
     user.roles = user.roles || [ ];
     user.roles.push('Delegated Admin - User');
     return callback(null, user, context);
   }

   return callback(new UnauthorizedError('You are not allowed to use this application.'));
 }

 callback(null, user, context);
}
```

## Install the Extension

We are now ready to setup our new extension. Before we do so head back to your new Client and copy the **Client ID** value.

To install and configure this extension, click on the **Delegated Administration** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the dashboard. The **Install Extension** window will open.

![](/media/articles/extensions/delegated-admin/install-extension.png)

Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: The **Client ID** value of the Client you will use.
- **TITLE**: Optionally, you can set a title for your Client. It will be displayed at the header of the page.
- **CUSTOM_CSS**: Optionally, you can set a css file, to customize the look and feel of your Client.

Once you have provided this information, click **Install**. Your extension is now ready to use!

## Use the Extension

To access your newly created dashboard, navigate to *[Extensions](${manage_url}/#/extensions) > Installed Extensions* and click on the **Delegated Administration Dashboard**. A new tab will open and display the login prompt.

![](/media/articles/extensions/delegated-admin/login-prompt.png)

Notice that there is no Sign Up option. That's because we disabled it earlier.

Once you provide valid credentials you are navigated to the *Delegated Administration Dashboard*.

![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

### Configure Hooks

Users with the `Delegated Admin - Administrator` role will see a *Configure* option in the top-right dropdown. On the Configuration page you can manage the different hooks and queries in the dashboard, which allows you to customize the behavior of the dashboard.

#### Filter Hook

By default, users with the `Delegated Admin - User` role will see all users in an Auth0 account. This could be fine if the dashboard is used by your Helpdesk department. But if you want to delegate administration to your departments (eg: Finance, HR, IT ...) or to your customers, your vendors, your offices ... you'll want to filter the data users can see. With the **Filter Hook** you can decide how the list of users is filtered.

Hook contract:

 - `ctx`: The context object.
   - `log`: A method that allows you to write something to Webtask logs
   - `request`: The current request.
     - `user`: The current logged in user.
 - `callback(error, query)`: The callback to which you can return an error or the [lucene query](https://auth0.com/docs/api/management/v2/query-string-syntax) which should be used when filtering the users. The extension will send this query to the [`GET Users` endpoint](https://auth0.com/docs/api/management/v2#!/Users/get_users) of the Management API.

Example: If **Kelly** manages the Finance department, she should only see the users that are also part of the Finance department. So we'll filter the users based on the department of the current user.

```js
function(ctx, callback) {
  // Get the department from the current user's metadata.
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!department || !department.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // The IT department can see all users.
  if (department === 'IT') {
    return callback();
  }

  // Prevent issues with departments containing a single or a double quote.
  department = department.replace(/\'/g,'\\\'').replace(/\"/g,'\\\"');

  // Any other department can only see users within their own department.
  var luceneQuery = 'app_metadata.department:"' + department + '"';
  ctx.log('Filtering users with:', luceneQuery);

  // Return the lucene query.
  return callback(null, luceneQuery);
}
```

> Note: We highly suggest you to not use single or double quotes in your department/group/... name on which you'll want to filter since this might cause issues with the Lucene query.

If this hook is not configure, **all users** will be returned.

#### Access Hook

While the **Filter Hook** only applies filtering logic you'll need a second layer of logic to determine if the current user is allowed to access a specific user. This is what the **Access Hook** allows you to do, determine if the current user is allowed to read, delete, block, unblock ... a specific user.

Hook contract:

 - `ctx`: The context object.
   - `log`: A method that allows you to write something to Webtask logs
   - `request`: The current request.
     - `user`: The current logged in user.
   - `payload`: The payload object.
     - `action`: The current action (eg: `delete:user`) that is being executed.
     - `user`: The user on which the action is being executed
 - `callback(error)`: The callback to which you can return an error if access is denied.

Example: **Kelly** manages the Finance department and she should only be able to access users within her department.

```js
function(ctx, callback) {
  if (ctx.payload.action === 'delete:user') {
    return callback(new Error('You are not allowed to delete users.'));
  }

  // Get the department from the current user's metadata.
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!department || !department.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // The IT department can access all users.
  if (department === 'IT') {
    return callback();
  }

  ctx.log('Verifying access:', ctx.payload.user.app_metadata.department, department);

  if (!ctx.payload.user.app_metadata.department || ctx.payload.user.app_metadata.department !== department) {
    return callback(new Error('You can only access users within your own department.'));
  }

  return callback();
}
```

If this hook is not configured all users will be accessible.

#### Create Hook

Whenever new users are created you'll want these users to be assigned to the group/department/vendor/... of the current user. This is what the **Create Hook** allows you to configure.

Hook contract:

 - `ctx`: The context object.
   - `log`: A method that allows you to write something to Webtask logs
   - `request`: The current request.
     - `user`: The current logged in user.
   - `payload`: The payload object.
     - `memberships`: An array of memberships that were selected in the UI when creating the user.
     - `email`: The email address of the user.
     - `password`: The password of the user.
     - `connection`: The name of the user.
 - `callback(error, user)`: The callback to which you can return an error and the user object that should be sent to the Management API.

Example: **Kelly** manages the Finance department. When she creates users, these users should be assigned to the same department she's in.

```js
function(ctx, callback) {
  if (!ctx.payload.memberships || ctx.payload.memberships.length === 0) {
    return callback(new Error('The user must be created within a department.'));
  }

  // Get the department from the current user's metadata.
  var currentDepartment = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // If you're not in the IT department, you can only create users within your own department.
  // IT can create users in all departments.
  if (currentDepartment !== 'IT' && ctx.payload.memberships[0] !== currentDepartment) {
    return callback(new Error('You can only create users within your own department.'));
  }

  return callback(null, {
    email: ctx.payload.email,
    password: ctx.payload.password,
    connection: ctx.payload.connection,
    app_metadata: {
      department: ctx.payload.memberships[0]
    }
  });
}
```

> Note: Creating users is only supported in Database Connections

#### Memberships Query

When creating a new user the UI will show a picklist where you can choose the memberships you want to assign to a user. These memberships are defined using the **Memberships Query**.

Hook contract:

 - `ctx`: The context object.
   - `log`: A method that allows you to write something to Webtask logs
   - `request`: The current request.
     - `user`: The current logged in user.
   - `payload`: The payload object.
     - `memberships`: An array of memberships that were selected in the UI when creating the user.
     - `email`: The email address of the user.
     - `password`: The password of the user.
     - `connection`: The name of the user.
 - `callback(error)`: The callback to which you can return an error and an array containing the list of memberships.

Example: Users of the IT department should be able to create users in other departments. Users from other deparments, should only see their own department.

```js
function(ctx, callback) {
  var currentDepartment = ctx.request.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  if (currentDepartment === 'IT') {
    return callback(null, [ 'IT', 'HR', 'Finance', 'Marketing' ]);
  }

  return callback(null, [ ctx.request.user.app_metadata.department ]);
}
```

> Note: This query is only used in the UI. If assigning users to specific departments needs to be enforced, this will happen in the Create Hook. If only 1 membership is returned, the membership field in the UI will not be displayed.

#### Settings Query

The **Settings Query** allows you to customize the look and feel of the extension.

Hook contract:

 - `ctx`: The context object.
   - `log`: A method that allows you to write something to Webtask logs
   - `request`: The current request.
     - `user`: The current logged in user.
 - `callback(error, settings)`: The callback to which you can return an error and a settings object.

Example:

```js
function(ctx, callback) {
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;

  return callback(null, {
    // Only these connections should be visible in the connections picker.
    // If only one connection is available, the connections picker will not be shown in the UI.
    connections: [ 'Username-Password-Authentication', 'My-Custom-DB' ],
    // The dictionary allows you to overwrite the title of the dashboard and the "Memberships" label in the Create User dialog.
    dict: {
      title: department ? department + ' User Management' : 'User Management Dashboard',
      memberships: 'Departments'
    },
    // The CSS option allows you to inject a custom CSS file depending on the context of the current user (eg: a different CSS for every customer)
    css: (department && department !== 'IT') && 'https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css'
  });
}
```

### Manage Users

There are two available views, *Users* and *Logs*. At the *Users* view you can see the users displayed and perform certain actions on them. In the table below you can see all the options you can perform on a user, which ones are available via the [dashboard](${manage_url}/#/) and which via the extension.

<table class="table">
    <tr>
        <th>Action</th>
        <th> Available via Dashboard </th>
        <th> Available via Extension </th>
    </tr>
    <tr>
        <th>Create user</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Contact user</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Sign in as user</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Block user</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Delete user</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Send verification email</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Change email</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Change password</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Reset password</th>
        <th>No</th>
        <th>Yes</th>
    </tr>
</table>

Notice the new *Reset Password* option available via the extension. This option will send an email to the user allowing them to choose a new password. To do this click on a user and select *Actions > Reset Password*.

![](/media/articles/extensions/delegated-admin/reset-pass-01.png)

This will send an email to the user, containing a link to change the password.

At the *Logs* view you can see log data of authentications made by your users (this tab is only visible to users with the `Delegated Admin - Administrator` role). The contents of this view are a subset of the data displayed in the [Logs Dashboard](${manage_url}/#/logs), which also displays data for the actions taken in the dashboard by the administrators.

## Customize the dashboard

You can use the **Title** and **Custom_CSS** variables to customize the look and feel of your dashboard.

Navigate to the [Extensions](${manage_url}/#/extensions) page and go to the settings of the **Delegated Administration** extension. We are going to set a custom title and a custom css file:

- Set the **TITLE** to `Fabrikam User Management`.
- Set the **CUSTOM_CSS** to `https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css`.

Save your changes, navigate to the extension and login. The dashboard now looks like that:

![](/media/articles/extensions/delegated-admin/custom-dashboard.png)
