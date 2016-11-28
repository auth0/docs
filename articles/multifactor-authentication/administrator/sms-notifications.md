---
description: How to enable and use push notifications for Guardian.
---

## SMS notifications

You can enable SMS messages to use as a form of multifactor authentication. This is also under the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard. By toggling the **SMS** slider, you can enable using SMS for sign in and sign up for your application. SMS can be used as your only form of MFA or in addition to Push Notifications. 

Your users must have a device capable of using SMS to use this option. If your users are unable to always receive SMS messages (such as when traveling), they will be unable sign up with SMS and unable to log in without the recovery code.

When your users sign up with SMS, they enter their phone number's country code and mobile phone number. 

![](/media/articles/mfa/sms.png)

After sign up, they receive a six digit code to their phone. They need to enter this code into the box, and then they will get a recovery code. They will need this code to login if they do not have their device. If they have lost their recovery code and device, you will need to [reset the user's MFA](/multifactor-authentication/administrator/reset-user).
