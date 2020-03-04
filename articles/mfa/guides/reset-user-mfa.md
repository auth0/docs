---
description: Reset a User's MFA
topics:
  - mfa
  - guardian
  - user-management
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Resetting a user's multi-factor account

If a user has lost their mobile device, they can use their recovery code to log in. If they do not have recovery code, they will need their tenant administrator to reset their <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>. This action is equivalent to removing or deleting the user's MFA registration. The MFA settings associated with their user will be removed, which allows them to set up MFA as if they were a new user on their next login attempt.

To reset a user's MFA:

1. Find and select the user in the [Users](${manage_url}/#/users) section of the dashboard.
2. Once you have selected the affected user, click on the **Actions** button on the top right of the screen.
3. Select **Reset Multi-factor Authentication** from the dropdown.
4. There will be a pop up box to confirm your decision.  Click **YES, RESET IT** to reset the user's MFA.

 ![Reset MFA](/media/articles/mfa/reset-mfa.png)

The next time the user logs in they will need to setup their MFA just like a new user.

## Recovery codes

With most MFA factors, upon signup, the end user will be given a recovery code which should be noted and kept secret. They will enter this code, after their username and password, to login if they do not have their device or are temporarily unable to use their normal MFA. 

![MFA Recovery Code](/media/articles/multifactor-authentication/recovery-code.png)

::: note
If a recovery code is used, a new recovery code will be provided at that time.
:::

If they have lost their recovery code and device, you will need to [reset the user's MFA](/multifactor-authentication/reset-user).

If a user uninstalls then later re-installs Guardian, they may be prompted to enter their recovery code. If the recovery code has been lost, the user can perform a new installation of the app by disabling automatic restoration of their Guardian backup. To do so, the user will need to uninstall Guardian, temporarily disable automatic restoration of backups within their device settings (steps to do so will vary according to the device), then re-install the app. They will then need to add their MFA account(s) to the app as if performing a first-time setup. If automatic backups or automatic restoration are not enabled on the user's device, re-installation of the app will not prompt for a recovery code and the user will be required to add their MFA account(s) as in a first-time setup.
