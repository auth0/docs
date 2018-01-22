---
description: How to use the Access Hook with the Delegated Administration
toc: false
---
# Delegated Administration Hooks: The Access Hook

<<<<<<< HEAD
<<<<<<< HEAD
Because the [Filter Hook](/extensions/delegated-admin-hooks/filter) only applies filtering logic, you'll need a second layer of logic to determine if the current user (or the person acting as the administrator) is allowed to access a specific user. 

The **Access Hook** allows you to determine if the current user is allowed to read, delete, block, unblock, or update a specific user.

## The Hook Contract

 - **ctx**: The context object
   - **payload**: The payload object
     - **action**: The current action (eg: **delete:user**) that is being executed
     - **user**: The user on which the action is being executed
 - **callback(error)**: The callback to which you can return an error if access is denied

## Sample Usage

Kelly manages the Finance department, and she should only be able to access users within her department.
=======
While the [Filter Hook](/extensions/delegated-admin-hooks/filter) only applies filtering logic you'll need a second layer of logic to determine if the current user is allowed to access a specific user. This is what the **Access Hook** allows you to do, determine if the current user is allowed to read, delete, block, unblock, etc a specific user.
=======
Because the [Filter Hook](/extensions/delegated-admin-hooks/filter) only applies filtering logic, you'll need a second layer of logic to determine if the current user (or the person acting as the administrator) is allowed to access a specific user. 
>>>>>>> Edit Hooks docs

The **Access Hook** allows you to determine if the current user is allowed to read, delete, block, unblock, or update a specific user.

## The Hook Contract

<<<<<<< HEAD
Example: **Kelly** manages the Finance department and she should only be able to access users within her department.
>>>>>>> Move Hooks to their own pages
=======
 - **ctx**: The context object
   - **payload**: The payload object
     - **action**: The current action (eg: **delete:user**) that is being executed
     - **user**: The user on which the action is being executed
 - **callback(error)**: The callback to which you can return an error if access is denied

## Sample Usage

Kelly manages the Finance department, and she should only be able to access users within her department.
>>>>>>> Edit Hooks docs

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Edit Hooks docs
## Notes

If this hook is not configured, all users will be accessible to the current user.

The Hook supports the following action names (which you set using as the value for **ctx.payload.action**:

- **read:user**
- **delete:user**
- **reset:password**
- **change:password**
- **change:username**
- **change:email**
- **read:devices**
- **read:logs**
- **remove:multifactor-provider**
- **block:user**
- **unblock:user**
<<<<<<< HEAD
- **send:verification-email**

<%= include('./_stepnav', {
 prev: ["Delegated Admin: Hooks", "/extensions/delegated-admin/hooks"]
}) %>
=======
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
>>>>>>> Move Hooks to their own pages
=======
- **send:verification-email**
>>>>>>> Edit Hooks docs
