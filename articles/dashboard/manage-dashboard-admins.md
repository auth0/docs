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
# Manage Admins in the Dashboard

::: note
Please see [Reset Your Auth0 Account Password](/tutorials/reset-account-password) if you're having issues logging in.
:::

Tenant Administrators can be added and removed from the dashboard, by going to **Tenant Settings** and choosing the [Dashboard Admins](${manage_url}/#/tenant/admins) tab.

![Change Dashboard Admins](/media/articles/tutorials/manage-admins.png)

To add an Admin, enter the email of the account and then select the applications you would like this user to have admin access to in the **Application** box. Then click the **ADD** button.

When the recipient opens the invite, the current Auth0 account in the browser will be added as a Dashboard Admin, regardless of the email address the invite was sent to. If there is no session, the recipient will be prompted to log in or create an Auth0 account.

Admins can be removed by clicking the **REMOVE** button after they have been added.

::: note
If you're an app-specific administrator, you will not have user management privileges and pages to which you don't have access (such as APIs, Rules, Hooks, Hosted Pages, and so on) may appear blank.
:::

::: note
To update the email address associated with an existing tenant administrator, invite a new dashboard administrator using a new email address. Once the invite is accepted, you can remove the tenant administrator associated with the old email address.
:::

The MFA indicator will indicate whether an Admin has enabled their account for [Multi-factor Authentication](/multifactor-authentication), which they can do in their Account Settings.

![Dashboard Admins with MFA Indicator](/media/articles/tutorials/dashboard-admins.png)

## Enrolling in Multi-factor Authentication

The admin can self-enroll for multi-factor authentication. To begin, they should click on their user name in the top right and going to **View Profile** in the dropdown menu.

Click **Enroll your device now.**

![Admin Profile](/media/articles/tutorials/your-profile.png)

Follow the on-screen instructions to complete your enrollment.

## Support-Only Users

If you want to allow employees of your organization to have access to our [Support Center](https://support.auth0.com), but you don't want to give them complete Administrator access over the tenant or a particular application, you can alternatively add them as Support-Only users. If that's the case, please follow the instructions described in our [Support Options](/support#add-support-only-users) documentation.
