---
description: How to use the Write Hook with the Delegated Administration
toc: false
---
# Delegated Administration Hooks: The Write Hook

Whenever you're creating new users, and you want the newly-created user to be assigned to the same group, department, or vendor as the ones to which you've been assigned, you can configure this behavior using the **Write Hook**.

::: warning
Auth0 only supports user creation with Database Connections.
:::

The Write Hook will run anytime a user is updated if you are using custom fields. The activities that trigger the Write Hook to run include changing the user's password, changing their email address, updating their profile, and so on.

## The Hook Contract

 - **ctx**: The context object.
   - **request.originalUser**: The current user's values where the **payload** is the new set of fields.  Only available when the method is **update**
   - **payload**: The payload object
     - **memberships**: An array of memberships that were selected in the UI when creating the user
     - **email**: The email address of the user
     - **password**: The password of the user
     - **connection**: The name of the user
   - **userFields**: The user fields array (if specified in the [settings query](#the-settings-query-hook))
   - **method**: Either **create** or **update** depending on whether this is being called as a result of a create or an update call
 - **callback(error, user)**: The callback to which you can return an error and the user object that should be sent to the Management API

## Sample Usage

Kelly manages the Finance department. When she creates users, these users should be assigned as members of the Finance department.

```js
function(ctx, callback) {
  var newProfile = {
    email: ctx.payload.email,
    password: ctx.payload.password,
    connection: ctx.payload.connection,
    user_metadata: ctx.payload.user_metadata,
    app_metadata: {
      department: ctx.payload.memberships && ctx.payload.memberships[0],
      ...ctx.payload.app_metadata
    }
  };

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

  if (ctx.method === 'update') {
    // If updating, only set the fields we need to send
    Object.keys(newProfile).forEach(function(key) {
      if (newProfile[key] === ctx.request.originalUser[key]) delete newProfile[key];
    });
  }

  // This is the payload that will be sent to API v2. You have full control over how the user is created in API v2.
  return callback(null, newProfile);
}
```

<%= include('./_stepnav', {
 prev: ["Delegated Admin: Hooks", "/extensions/delegated-admin/hooks"]
}) %>