---
description: How to manage users in the Delegated Administration extension
toc: true
topics:
  - extensions
  - delegated-admin
  - users
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---

# Delegated Administration: Manage Users

In the Application exposed by the Delegated Administration extension, there are two views available: *Users* and *Logs*. On the *Users* view, you can see the display and modify users associated with your Auth0 account.

By default, all users are displayed, but you can filter the displayed list by configuring a [filter hook](/extensions/delegated-admin/hooks#the-filter-hook).

## Available User Actions in the Delegated Administration Dashboard

The table below lists the options you can perform on users, as well as information on whether the option is available via the [Management Dashboard](${manage_url}/#/) and/or the Delegated Administration extension. To limit the number of options someone with access to the Dashboard exposed by the Delegated Administration extension, configure an [access hook](#access-hook).

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
  </tbody>
</table>

Notice the new *Reset Password* option available via the extension. This option will send an email to the user allowing them to choose a new password. To do this click on a user and select *Actions > Reset Password*.

![](/media/articles/extensions/delegated-admin/reset-pass-01.png)

This will send an email to the user, containing a link to change the password.

If your profile indicates that you have the `Delegated Admin - Administrator` <dfn data-key="role">role</dfn>, the *Logs* view allows you to see a list of authentications made by your users (this tab is only visible to users with the `Delegated Admin - Administrator` role). The contents of this view are a subset of the data displayed in the [Logs Dashboard](${manage_url}/#/logs). The Log Dashboard also displays data on administrative actions taken in the Dashboard.

## Create Users

You can create a new user by selecting the **+ Create User** button on the *Users* view. You need to specify are email and password. Depending on your role, you may not be able to set the *Department* to which the new user belongs.

For example, users with the `Delegated Admin - Administrator` role can see the **Department** field and select any of its values.

![](/media/articles/extensions/delegated-admin/create-user-admin.png)

On the other hand, Kelly who has the `Delegated Admin - User` role and belongs to the Finance department cannot see this field. The user she creates will be automatically assigned to the Finance department.

![](/media/articles/extensions/delegated-admin/create-user-kelly.png)
