---
description: How to customize the behavior of the Delegated Administration extension using Hooks
toc: true
topics:
  - extensions
  - delegated-admin
  - hooks
---

# Delegated Administration: Hooks

If you are a user with the `Delegated Admin - Administrator` <dfn data-key="role">role</dfn> in your User Profile, log in to the Delegated Administration Dashboard, and click on your name in the top right corner, you'll see a  *Configure* option. On the Configuration page, you can manage the different Hooks and queries that allow you to customize the behavior of the Delegated Administration extension.

![](/media/articles/extensions/delegated-admin/dashboard-configuration.png)

## Hooks Signature

Hooks always have the following signature:

```js
function(ctx, callback) {
  // First do some work
  ...

  // Done
  return callback(null, something);
}
```

The context object will expose a few helpers and information about the current request. The following methods and properties are available in every Hook.

**1. Logging**

  To add a message to the Webtask logs (which you can view using the [Realtime Webtask Logs](/extensions/realtime-webtask-logs) extension), call the `log` method:

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

  Each Hook exposes the current payload and/or request with specific information. The request will always contain information about the user that is logged into the Users Dashboard:

  ```js
  var currentUser = ctx.request.user;
  ```

**5. Remote Calls**

  If you want to call an external service (such as an API) to validate data or to load memberships, you can do this using the `request` module.

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

## The Filter Hook

By default, users with the **Delegated Admin - User** role see *all* users associated with the Auth0 account. However, you can filter the data users see using the **Filter Hook**.

### The Hook contract:

 - `ctx`: The context object
 - `callback(error, query)`: The callback to which you can return an error or the [lucene query](/api/management/v2/query-string-syntax) used when filtering the users. The extension will send this query to the [`GET Users` endpoint](/api/management/v2#!/Users/get_users) of the Management API

### Example

If **Kelly** manages the Finance department, she should only see the users that are also part of the Finance department. We'll filter the users with respect to the department of the current user.

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

::: panel-warning Using Special Characters
Do not use single quotes, double quotes, or any other special characters (such as `+` or `-`) in any term on which you'll want to filter. This might cause issues with the Lucene query.
:::

If you do not configure this Hook, the search returns **all users**.

## The Access Hook

While the **Filter Hook** only applies filtering logic you'll need a second layer of logic to determine if the current user is allowed to access a specific user. This is what the **Access Hook** allows you to do, determine if the current user is allowed to read, delete, block, or unblock a specific user.

### The Hook contract:

 - `ctx`: The context object
   - `payload`: The payload object
     - `action`: The current action (eg: `delete:user`) that is being executed
     - `user`: The user on which the action is being executed
 - `callback(error)`: The callback to which you can return an error if access is denied

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

Example: **Kelly** manages the Finance department. When she creates users, these users should be assigned to her department.

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

::: warning
Auth0 only supports user creation with Database Connections.
:::

## The Memberships Query Hook

When creating a new user, the UI shows a drop-down where you can choose the membership(s) you want assigned to a user. These memberships are then defined using the **Memberships Query**.

### The Hook contract:

 - `ctx`: The context object
 - `callback(error, { createMemberships: true/false, memberships: [ ...] })`: The callback to which you can return an error and an object containing the membership configuration

Example: Users of the IT department should be able to create users in other departments. Users from other departments should only be able to create users for their own departments.

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

**Notes**:

* Because you can only use this query in the UI, you'll need to assign memberships using the *Create Users* function if you need to enforce the assigning of users to specific departments.
* If there is only one membership possible, this field will not show in the UI.

You can allow the end user to enter any value `memberships` by setting `createMemberships` to true.

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

## The Settings Query Hook

The **Settings Query** allows you to customize the look and feel of the extension.

### The Hook contract

 - `ctx`: The context object
 - `callback(error, settings)`: The callback to which you can return an error and a settings object

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
