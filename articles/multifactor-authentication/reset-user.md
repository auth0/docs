---
description: Learn how to reset users' multi-factor authentication accounts in case they lose their mobile device and/or their recovery code to log in. 
topics:
  - mfa
  - guardian
  - user-management
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Reset User Multi-Factor Accounts

If a user has lost their mobile device, they can use their recovery code to log in. If they do not have recovery code, they will need their tenant administrator to reset their <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>. This action is equivalent to removing or deleting the user's MFA registration. The MFA settings associated with their user will be removed, which allows them to set up MFA as if they were a new user on their next login attempt.

1. Find and select the user in the [Users](${manage_url}/#/users) section of the dashboard.
2. Click on the **Actions** button on the top right of the screen.
3. Select **Reset Multi-factor Authentication** from the dropdown. A pop-up box appears to confirm your decision.  
4. Click **YES, RESET IT** to reset the user's MFA.

 ![Reset MFA](/media/articles/mfa/reset-mfa.png)

The next time the user logs in, they will need to setup their MFA just like a new user.
