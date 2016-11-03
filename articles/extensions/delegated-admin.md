---
description: The Delegated Administration extension allows you to expose the Users dashboard to a group of users, without allowing them access to the dashboard.
---

# Delegated Administration - v2

The **Delegated Administration** extension allows you to expose the [Users Dashboard](${manage_url}/#/users) to a group of users, without having to provide access to them to the [dashboard](${manage_url}/#/). Instead the [Users Dashboard](${manage_url}/#/users) is exposed as an Auth0 client. Let's see how this is done.

**NOTE**: This extension is currently available only for the public cloud. It is not yet supported in the [appliance](/appliance).

## Create A Client

Let's start with creating a new client application. Navigate to [Clients](${manage_url}/#/applications) and click on the **+Create Client** button. Set a name (we will name ours *Users Dashboard*) and choose *Single Page Web Applications* as client type. Click on **Create**.

![](/media/articles/extensions/delegated-admin/create-client.png)

Click on the *Settings* tab and set the **Allowed Callback URLs**. This varies based on your location.

| Location | Allowed Callback URL |
| --- | --- |
| USA | `https://${account.tenant}.us.webtask.io/auth0-delegated-admin/login` |
| Europe | `https://${account.tenant}.eu.webtask.io/auth0-delegated-admin/login` |
| Australia | `https://${account.tenant}.au.webtask.io/auth0-delegated-admin/login` |

Copy the **Client ID** value.

Navigate to *Settings > Show Advanced Settings > OAuth* and paste the **Client ID** value to the **Allowed APPs / APIs** field.

Set the **JsonWebToken Signature Algorithm** to *RS256*.

![](/media/articles/extensions/delegated-admin/set-rs256.png)

Save your changes.

### Enable Connections on the Client

When you create a new client, by default all the connections are enabled. This is something you want to change in this case, for security reasons. The approach we follow in this tutorial is to disable all connections, create a new Database Connection and enable only this one for our new client application. But you could do the same with another type of connection, like AD, ADFS, and so forth.

Navigate to the *Connections* tab and disable all the connections using the switch.

Following that, navigate to [Database Connections](${manage_url}/#/connections/database) and click on **+Create DB Connection**. Set a name for your connection, we will name ours *Helpdesk*.

![](/media/articles/extensions/delegated-admin/create-connection.png)

Navigate to the *Settings* tab of the new connection and enable the **Disable Sign Ups** option. This way we avoid another security concern: if some malicious user gets hold of the link, signing up will not be possible.

![](/media/articles/extensions/delegated-admin/disable-signup.png)

Enable this new connection for your client (*Users Dashboard* in our case) and add at least one user.

### Assign the right Roles to your Users

Access to the extension requires your users to have the right roles:

 - `Delegated Admin - User`: These users can search for users, create users, open users and execute actions on these users (like Delete, Block, and so forth).
 - `Delegated Admin - Administrator`: These users can additional see all logs in an account and configure Hooks.

Only users that have these roles defined in `user.roles`, `user.app_metadata.roles` or `user.app_metadata.authorization.roles` will be able to use the extension. You could manually set these roles in your users or use a rule in order to do this. The following rule shows how users from the `IT Department` are given the `Delegated Admin - Administrator` role while `Department Managers` are given the `Delegated Admin - User` role.

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

If you navigate back to the [Clients](${manage_url}/#/clients) view, you will see that there is an additional client created.

![](/media/articles/extensions/delegated-admin/two-clients.png)

The `auth0-delegated-admin` client is created automatically when you install the extension. It's a client authorized to access the [Management API](/api/management/v2) and you shouldn't modify it.

## Use the Extension

To access your newly created dashboard, navigate to *[Extensions](${manage_url}/#/extensions) > Installed Extensions* and click on the **Delegated Administration Dashboard**. A new tab will open and display the login prompt.

![](/media/articles/extensions/delegated-admin/login-prompt.png)

Notice that there is no Sign Up option. That's because we disabled it earlier.

Once you provide valid credentials you are navigated to the *Delegated Administration Dashboard*.

![](/media/articles/extensions/delegated-admin/standard-dashboard.png)

### Configure Hooks

Users with the `Delegated Admin - Administrator` role will see a *Configure* option in the top-right dropdown. On the Configuration page you can manage the different hooks and queries in the dashboard, which allows you to customize the behavior of the dashboard.

![](/media/articles/extensions/delegated-admin/dashboard-configuration.png)

#### Signature

Hooks always have the following signature:

```js
function(ctx, callback) {
  // First do some work
  ...

  // Done
  return callback(null, something);
}
```

The context object will expose a few helpers and information about the current request. The following methods and properties are available in every hook.

**Logging**

In order to log a message to the Webtask logs (which you can view using the Realtime Webtask Logs extension) you can call the `log` method:

```js
ctx.log('Hello there', someValue, otherValue);
```

**Caching**

If at some point you need to cache something (like a long list of departments), you can store this list on the context's `global` object. This object will be available until the Webtask container recycles.

```js
ctx.global.departments = [ 'IT', 'HR', 'Finance' ];
```

**Custom Data**

You can also store custom data within the extension. This is currently limited to around 400kb.

```js
var data = {
  departments: [ 'IT', 'HR', 'Finance' ]
};

ctx.write(data)
  .then(function() {
    ...
  })
  .catch(function(err) {
    ...
  });
```

And then to read the data:

```js
ctx.read()
  .then(function(data) {
    ...
  })
  .catch(function(err) {
    ...
  });
```

**Payload and Request**

Every hook exposes the current payload and/or request with specific information. The request will always contain the user that is logged in to the dashboard:

```js
var currentUser = ctx.request.user;
```

**Remote Calls**

At some point you might want to call an external service to validate data, to load memberships from a remote location (an API), ... This is possible using the request module:

```js
function(ctx, callback) {
  var request = require('request');
  request('http://api.mycompany.com/departments', function (error, response, body) {
    if (error) {
      return callback(error);
    }

    ...
  });
}
```

#### Filter Hook

By default, users with the `Delegated Admin - User` role will see all users in an Auth0 account. This could be fine if the dashboard is used by your Helpdesk department. But if you want to delegate administration to your departments (Finance, HR, IT, and so forth) or to your customers, your vendors, or your offices you'll want to filter the data users can see. With the **Filter Hook** you can decide how the list of users is filtered.

Hook contract:

 - `ctx`: The context object.
 - `callback(error, query)`: The callback to which you can return an error or the [lucene query](/api/management/v2/query-string-syntax) which should be used when filtering the users. The extension will send this query to the [`GET Users` endpoint](/api/management/v2#!/Users/get_users) of the Management API.

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

  // Return the lucene query.
  return callback(null, 'app_metadata.department:"' + department + '"');
}
```

> Note: We highly suggest not to use single or double quotes in your department or group name on which you'll want to filter since this might cause issues with the Lucene query.

If this hook is not configure, **all users** will be returned.

#### Access Hook

While the **Filter Hook** only applies filtering logic you'll need a second layer of logic to determine if the current user is allowed to access a specific user. This is what the **Access Hook** allows you to do, determine if the current user is allowed to read, delete, block, unblock, etc a specific user.

Hook contract:

 - `ctx`: The context object.
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

Supported action names:

 - `read:user`
 - `delete:user`
 - `reset:password`
 - `change:password`
 - `change:username`
 - `change:email`
 - `read:devices`
 - `read:logs`
 - `remove:multifactor-provider`
 - `block:user`
 - `unblock:user`
 - `send:verification-email`

#### Create Hook

Whenever new users are created you'll want these users to be assigned to the group/department/vendor/... of the current user. This is what the **Create Hook** allows you to configure.

Hook contract:

 - `ctx`: The context object.
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

  // This is the payload that will be sent to API v2. You have full control over how the user is created in API v2.
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
 - `callback(error, { createMemberships: true/false, memberships: [ ...] })`: The callback to which you can return an error and an object containing the membership configuration.

Example: Users of the IT department should be able to create users in other departments. Users from other departments, should only see their own department.

```js
function(ctx, callback) {
  var currentDepartment = ctx.payload.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  if (currentDepartment === 'IT') {
    return callback(null, [ 'IT', 'HR', 'Finance', 'Marketing' ]);
  }

  return callback(null, [ ctx.payload.user.app_metadata.department ]);
}
```

> Note: This query is only used in the UI. If assigning users to specific departments needs to be enforced, this will happen in the Create Hook. If only 1 membership is returned, the membership field in the UI will not be displayed.

You can also allow the end user to enter any value they wish for the memberships by setting `createMemberships` to true.

```js
function(ctx, callback) {
  var currentDepartment = ctx.payload.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  return callback(null, {
    createMemberships: ctx.payload.user.app_metadata.department === 'IT' ? true : false,
    memberships: [ ctx.payload.user.app_metadata.department ]
  });
}
```

#### Settings Query

The **Settings Query** allows you to customize the look and feel of the extension.

Hook contract:

 - `ctx`: The context object.
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

There are two available views, *Users* and *Logs*. At the *Users* view you can see the users displayed and perform certain actions on them.

Keep in mind that by default all users are displayed, but you can constrain that by configuring a [filter hook](#filter-hook).

In the table below you can see all the options you can perform on a user, which ones are available via the [dashboard](${manage_url}/#/) and which via the extension. Once more, keep in mind that this is the superset of the actions a user can perform using the extension. It can always be constrained by configuring an [access hook](#access-hook).

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

### Create Users

You can create a new user by selecting the **+ Create User** button at the *Users* view. The information you need to specify are email and password. Depending on your role you may or may not be able to set the *Department* that the new user belongs to.

For example, users with the `Delegated Admin - Administrator` role can see the **Department** field and select any of its values.

![](/media/articles/extensions/delegated-admin/create-user-admin.png)

On the other hand, Kelly who has the `Delegated Admin - User` role and belongs to the Finance department, cannot see this field. The user she will create will be automatically assigned to the Finance department.

![](/media/articles/extensions/delegated-admin/create-user-kelly.png)

## Customize the dashboard

You can use the **Title** and **Custom_CSS** variables to customize the look and feel of your dashboard.

Navigate to the [Extensions](${manage_url}/#/extensions) page and go to the settings of the **Delegated Administration** extension. We are going to set a custom title and a custom css file:

- Set the **TITLE** to `Finance User Management`.
- Set the **CUSTOM_CSS** to `https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css`.

Save your changes, navigate to the extension and login. The dashboard now looks like that:

![](/media/articles/extensions/delegated-admin/custom-dashboard.png)
