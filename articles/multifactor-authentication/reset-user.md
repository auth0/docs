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
