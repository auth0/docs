---
description: How to use the Memberships Query Hook with the Delegated Administration extension
topics:
  - extensions
  - delegated-admin
  - users
  - hooks
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---
# Delegated Administration Hooks: The Memberships Query Hook

When creating a new user, the User Interface shows a drop-down where you can choose the membership(s) you want assigned to a user. These memberships are then defined using the **Memberships Query Hook**.

## The Hook Contract

 - **ctx**: The context object
 - **callback(error, { createMemberships: true/false, memberships: [ ...] })**: The callback to which you can return an error and an object containing the membership configuration

## Sample Usage

Users of the IT department should be able to create users in other departments. Users from other departments should only be able to create users for their departments.

```js
function(ctx, callback) {
  var currentDepartment = ctx.payload.user.app_metadata && ctx.payload.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  if (currentDepartment === 'IT') {
    return callback(null, [ 'IT', 'HR', 'Finance', 'Marketing' ]);
  }

  return callback(null, [ ctx.payload.user.app_metadata.department ]);
}
```

## Notes

Because you can only use this query in the UI, you'll need to assign memberships using the **Write Hook** if you need to enforce rules regarding the assignment of users to specific departments.

If there is only one membership group possible, the Memberships field will not show in the UI.

You can allow the end user to enter any value into the **memberships** field by setting **createMemberships** to true:

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

<%= include('./_stepnav', {
 prev: ["Delegated Admin: Hooks", "/extensions/delegated-admin/hooks"]
}) %>
