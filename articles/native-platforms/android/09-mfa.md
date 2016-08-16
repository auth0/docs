---
title: MFA
description: This tutorial will show you how to configure Multi Factor Authentication (MFA) via Google Authenticator in your app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/inaka/auth0-android-sample/tree/09-mfa',
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
:::
  
<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/09-MFA', }) %>

### 1. Enable MFA in your account

You have to enable the MFA feature in your account. 

First, follow [this link](${uiURL}/#/multifactor). Then, turn the switch on for **Google Authenticator**, under the *Choose a Provider* section.

> There are two other MFA providers that you can choose: Guardian and Duo. Just have in mind that they rork only in web based auth which is social & enterprise.

Then, you have to specify on which clients you want to enable MFA; you accomplish this by editing the snippet that appears below, replacing the placeholder with your actual client ids.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-02.png)

If you want to use MFA in **all** of your clients, the easiest you can do is disabling this conditional in the script:

```javascript
if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1)
```

### Done!

Piece of cake, wasn't it? Now you should get a google authenticator screen when you try to login in your app using **Lock-Android**


> For more information on how to configure Lock-Android in your app, take a look at the [login tutorial](01-login.md).