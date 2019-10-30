---
description: How to add and remove tenant admins in the Auth0 dashboard.
topics:
  - dashboard
  - admins
contentType: how-to
useCase:
  - manage-users
  - manage-accounts
---
# Manage Tenant Administrators in the Dashboard

::: note
Please see [Reset Your Auth0 Account Password](/tutorials/reset-account-password) if you're having issues logging in.
:::

You can add, edit, and remove tenant administrators from the Dashboard by going to **Tenant Settings** > [Dashboard Admins](${manage_url}/#/tenant/admins).

![Change Dashboard Admins](/media/articles/tutorials/manage-admins.png)

## Add administrator

To add an administrator, enter their email and select the applications to which you would like this user to have administrative access in the **Application** box. Click **ADD**.

When the recipient opens and accepts the invite, the current Auth0 account in the browser will be added as a Dashboard Admin (the user should use the same email as the one the invitation was sent to). If there is no current session, the recipient will be prompted to log in or create an Auth0 account.

::: note
If the invited administrator has not created an Auth0 admin user account, they will need to do so in order to be able to accept the invitation and log into the Management Dashboard. Auth0 admin users are managed separately from tenant users; accounts can be created by following the invitation URL or signing up through [auth0.com/signup](https://auth0.com/signup).
:::

Administrators are application-specific, so areas to which the admin doesn't have access rights (e.g., APIs, Rules, Hooks, Hosted Pages, and so on) will appear as blank pages. Administrators will also *not* be allowed to manage users, create rules, and perform other functions for applications to which they don't have access.

::: panel Application-Specific Access
Application-specific access includes the following:

* Read and write access to the specific application configuration
* Read access to enabled connections for the application
* Ability to configure add-ons for the specific application
* Read (not write) access to all user records

In addition, a user can be invited to be an administrator for multiple applications, but each application invite must be sent and accepted individually.
:::

## Update Admin

To update the email address associated with an existing tenant administrator, invite a new dashboard administrator using a new email address. Once they accept the invite, you can remove the tenant administrator associated with the old email address.

### Remove admin

You can remove administrators by clicking **REMOVE** after they have been added.

::: warning
You are responsible for managing your tenant administrators, **including revoking privileges from users as necessary**. You are responsible for all activities that occur under your account/tenant.
:::

## Enrolling in Multi-factor Authentication

The administrator can self-enroll for multi-factor authentication.

The MFA indicator will indicate whether an administrator has enabled their account for [Multi-factor Authentication](/multifactor-authentication), which they can do in their Account Settings.

![Dashboard Admins with MFA Indicator](/media/articles/tutorials/dashboard-admins.png)

To self-enroll for MFA, the administrator should click on their user name in the top right and going to **View Profile** in the dropdown menu.

Click **Enroll your device now.**

![Admin Profile](/media/articles/tutorials/your-profile.png)

Follow the on-screen instructions to complete the enrollment.

## Support-Only Users

If you want to allow employees of your organization to have access to our [Support Center](https://support.auth0.com), but you don't want to give them complete Administrator access over the tenant or a particular application, you can alternatively add them as Support-Only users. If that's the case, please follow the instructions described in our [Support Options](/support#add-support-only-users) documentation.

## Missing Tenants

We've occasionally found that Dashboard administrations inadvertently create multiple Auth0 accounts. For example, they might sign up with a social provider (e.g., Google, GitHub), then sign up again using the email address. If you have a Dashboard administrator that reports that they cannot see all of their tenants after logging in, check to see if they have multiple Auth0 accounts.

You can confirm the signup method used by the Dashboard adminsitrator by going to **Tenant Settings** > [**Dashboard Admins**](${manage_url}/#/tenant/admins). 
