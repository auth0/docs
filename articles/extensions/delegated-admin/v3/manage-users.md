---
description: How to manage users in the Delegated Administration extension
topics:
  - extensions
  - delegated-admin
  - users
contentType:
  - how-to
useCase: extensibility-extensions
---

# Manage Users in the Delegated Administration Extension

In the Application exposed by the Delegated Administration extension (DAE), there are two views available: *Users* and *Logs*. On the **Users** view, you can see the display and modify users associated with your Auth0 account.

By default, all users are displayed, but you can filter the displayed list by configuring a [filter hook](/extensions/delegated-admin/v3/hooks/filter).

<%= include('./_session-timeout.md') %>

## Prerequisite

* [Delegate Administration to a User Group](/extensions/delegated-admin/v3)

## User actions

The table below lists the options you can perform on users, as well as information on whether the option is available via the [Management Dashboard](${manage_url}/#/) and/or the Delegated Administration extension. To limit the number of options someone with access to the Dashboard exposed by the Delegated Administration extension, configure an [access hook](/extensions/delegated-admin/v3/hooks/access).

<table class="table">
  <tbody>
    <tr>
        <th>Action</th>
        <th> Available in the Management Dashboard </th>
        <th> Available in the Delegated Administration Extension </th>
    </tr>
    <tr>
        <th>Create User</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Contact User</th>
        <th>Yes</th>
        <th>No</th>
    </tr>
    <tr>
        <th>Block User</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Delete User</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Send Verification Email</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Change Email</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Change Password</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Reset Password</th>
        <th>No</th>
        <th>Yes</th>
    </tr>
    <tr>
        <th>Change Profile</th>
        <th>Yes</th>
        <th>Yes</th>
    </tr>
  </tbody>
</table>

::: note
The **Change Profile** option is available only if you have configured custom fields.
:::

## Create users

1. Click on the **+ Create User** button on the *Users* view. 

2. Specify email and password. 

Depending on your role, you may not be able to set the *Department* to which the new user belongs. For example, users with the `Delegated Admin - Administrator` role can see the **Department** field and select any of its values.

![](/media/articles/extensions/delegated-admin/create-user-admin.png)

On the other hand, Kelly who has the `Delegated Admin - User` role and belongs to the Finance department cannot see this field. The user she creates will be automatically assigned to the Finance department.

![](/media/articles/extensions/delegated-admin/create-user-kelly.png)
