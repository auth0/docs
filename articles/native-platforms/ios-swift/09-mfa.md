---
title: MFA
description: This tutorial will show you how to configure Multi Factor Authentication (MFA) via Google Authenticator in your app.
---

### 1. Enable MFA in your account

You have to enable the MFA feature in your account. 

First, follow [this link](https://manage.auth0.com/#/multifactor). Then, turn the switch on for **Google Authenticator**, under the *Choose a Provider* section.

> There are two other MFA providers that you can choose: Guardian and Duo. Just have in mind that Guardian isn't available yet for the Lock-iOS framework.

Then, you have to specify on which clients you want to enable MFA; you accomplish this by editing the snippet that appears below, replacing the placeholder with your actual client ids.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-02.png)

If you want to use MFA in **all** of your clients, the easiest you can do is disabling this conditional in the script:

```javascript
if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1)
```

### Done!

Peace of cake, wasn't it? Now you should get a google authenticator screen when you try to login with social providers in your app.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-09.png)