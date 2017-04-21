---
description: How to customize the behavior of the Delegated Administration extension using Hooks
toc: true
---

# Delegated Administration: Hooks

Users with the `Delegated Admin - Administrator` role will see a *Configure* option in the top-right dropdown. On the Configuration page, you can manage the different Hooks and queries using the Dashboard.

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

**1. Logging**

  To add a message to the Webtask logs (which you can view using the Realtime Webtask Logs extension), you can call the `log` method:

  ```js
  ctx.log('Hello there', someValue, otherValue);
  ```

**2. Caching**

  To cache something (such as a long list of departments), you can store it on the context's `global` object. This object will be available until the Webtask container recycles.

  ```js
  ctx.global.departments = [ 'IT', 'HR', 'Finance' ];
  ```

**3. Custom Data**

  You can store custom data within the extension. This is field is limited to 400kb of data.

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

  To read the data:

  ```js
  ctx.read()
    .then(function(data) {
      ...
    })
    .catch(function(err) {
      ...
    });
  ```

**4. Payload and Request**

  Each Hook exposes the current payload and/or request with specific information. The request will always contain information about the user that is logged in to the Users Dashboard:

  ```js
  var currentUser = ctx.request.user;
  ```

**5. Remote Calls**

  You might want to call an external service to validate data or to load memberships from a remote location, such as an API. This is possible using the request module:

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

By default, users with the **Delegated Admin - User** see all users in an Auth0 account. However, you can filter the data users can see using the **Filter Hook**.

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

::: panel-warning Quotes may lead to errors
Do not use single or double quotes, or any other special characters such as `+` or `-` in your department or group name, on which you'll want to filter. This might cause issues with the Lucene query, resulting in unexpected behavior.
:::

If this hook is not configured, **all users** will be returned.

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

**NOTE**: Creating users is only supported in Database Connections

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

**NOTE**: This query is only used in the UI. If assigning users to specific departments needs to be enforced, this will happen in the Create Hook. If only 1 membership is returned, the membership field in the UI will not be displayed.

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
