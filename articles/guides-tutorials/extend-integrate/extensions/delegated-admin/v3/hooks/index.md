---
description: How to customize the behavior of the Delegated Administration extension using Hooks
toc: true
topics:
  - extensions
  - delegated-admin
  - users
  - hooks
contentType:
  - how-to
  - concept
  - index
useCase: extensibility-extensions
---

# Delegated Administration: Hooks

If you're a user assigned the **Delegated Admin - Administrator** <dfn data-key="role">role</dfn>, you can manage the different Hooks and queries that allow you to customize the behavior of the Delegated Administration extension. 

To access the configuration area:

1. Log in to the Delegated Administration Dashboard
2. Click on your name in the top right corner. You'll see a drop-down menu; click on the **Configure** option.

The **Configuration** page to which you're redirected is where you can manage your Hooks and queries.

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

The context (**ctx**) object will expose a few helpers and information about the current request. The following methods and properties are available in every Hook:

* Logging
* Caching
* Custom Data
* Payload and Request
* Remote Calls

### Logging

To add a message to the Webtask logs (which you can view using the [Realtime Webtask Logs](/extensions/realtime-webtask-logs) extension), call the **log** method:

```js
ctx.log('Hello there', someValue, otherValue);
  ```

### Caching

To cache something (such as a long list of departments), you can store it on the context's **global** object. This object will be available until the Webtask container recycles.

```js
ctx.global.departments = [ 'IT', 'HR', 'Finance' ];
```

### Custom Data

You can store custom data within the extension. This field is limited to 400kb of data.

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

### Payload and Request

Each Hook exposes the current payload or request with specific information. The request will always contain information about the user that is logged into the Users Dashboard:

```js
var currentUser = ctx.request.user;
```

### Remote Calls

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

### The Hook contract:

 - `ctx`: The context object
   - `payload`: The payload object
     - `action`: The current action (for example, `delete:user`) that is being executed
     - `user`: The user on which the action is being executed
 - `callback(error)`: The callback to which you can return an error if access is denied

Example: Kelly manages the Finance department, and she should only be able to access users within her department.

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

If this hook is not configured, all users will be accessible.

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

## Available Hooks

The following Hooks are available for use with your Delegated Administration extension:

* [The Access Hook](/extensions/delegated-admin/v3/hooks/access)
* [The Filter Hook](/extensions/delegated-admin/v3/hooks/filter)
* [The Memberships Query Hook](/extensions/delegated-admin/v3/hooks/membership)
* [The Settings Query Hook](/extensions/delegated-admin/v3/hooks/settings)
* [The Write Hook](/extensions/delegated-admin/v3/hooks/write)