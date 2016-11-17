---
description: How to enable and use push notifications for Guardian.
---

## Support for Push Notifications

To enable Push Notifications MFA for sign in and sign up for your application by your users, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard. Then toggle the **Push Notification** slider to enable it.

![](/media/articles/mfa/guardian-dashboard.png)

New users signing up will be prompted to download the Guardian app from either the App Store or Google Play. Once they indicate that they downloaded the app, a code will appear. They will have five minutes to scan the code with the app before it expires. After the code has been successfully scanned, users will see a confirmation screen which includes a recovery code. They need to have this recovery code to login without their mobile device. If they lose both the recovery code and their mobile device, you will need to [reset their MFA](#reset-an-mfa-for-a-user). Then they will receive a push notification to their device and they will be logged in.

Users that were previously registered before you enabled MFA will need to complete the same process as new users on their next login.
