---
description: Learn how to reset a user's MFA in case they lose their mobile device and do not have a recovery code. 
topics:
  - mfa
  - user-management
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Reset User's MFA

If a user has lost their mobile device, they can use their recovery code to log in. If they do not have a recovery code, they will need their tenant administrator to reset their <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>. 

This action is equivalent to removing or deleting the user's MFA registration. The MFA settings associated with their user will be removed, which allows them to set up MFA as if they were a new user on their next login attempt.

::: note
If you need to reset an admin's MFA as opposed to an end user's MFA, please contact [Auth0 Support](https://auth0.com/docs/support).
:::

## Reset MFA in the Dashboard

1. Go to [Dashboard > Users & Roles > Users](${manage_url}/#/users).
2. Click on the user whose MFA you want to reset.
3. Click on the **Actions** button on the top right of the screen.
4. Select **Reset Multi-factor** from the dropdown.

  Admins will also see a **Reset MFA** link at the bottom of the **Multi-Factor Authentication** tab of the **User Details** page if the user is already enrolled in MFA. Both these methods function the same way. 

5. There will be a pop up box to confirm your decision.  Click **YES, RESET IT** to reset the user's MFA.

The next time the user logs in, they will need to setup their MFA just like a new user.

## Reset MFA using the Management API

As an admin, you can also use the Management API to delete a user's MFA enrollment using `DELETE /api/v2/guardian/enrollments/{id}`. This requires getting the enrollment ID first with a `GET` to the same endpoint. If the user has more than one enrollment, you will need to repeat the process for each enrollment.

## Recovery codes

With most MFA factors, the end user will be given a recovery code upon signup, which should be noted and kept secret. If they do not have their device or are otherwise temporarily unable to use their normal MFA process, the user can log in by entering this code after their username and password. 

![MFA Recovery Code](/media/articles/mfa/recovery-code.png)

::: note
If a recovery code is used, a new recovery code will be provided at that time.
:::

If a user uninstalls then later re-installs Guardian, they may be prompted to enter their recovery code. If the recovery code has been lost, the user can perform a new installation of the app by disabling automatic restoration of their Guardian backup. To do so, the user will need to uninstall Guardian, temporarily disable automatic restoration of backups within their device settings (steps to do so will vary according to the device), then re-install the app. They will then need to add their MFA account(s) to the app as if performing a first-time setup. If automatic backups or automatic restoration are not enabled on the user's device, re-installation of the app will not prompt for a recovery code and the user will be required to add their MFA account(s) as in a first-time setup.

## Keep reading

* [Reset Auth0 Account Password](/support/reset-account-password)
