---
title: MFA
description: This tutorial will show you how to configure Multi Factor Authentication (MFA) via Google Authenticator in your app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

- CocoaPods 1.0.0
- XCode 7.3 (7D175)
- iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/09-MFA',
  pkgRepo: 'auth0-ios-swift-sample',
  pkgBranch: 'master',
  pkgPath: '09-MFA',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

### 1. Enable MFA in your account

You have to enable the MFA feature in your account. 

First, follow [this link](${uiURL}/#/multifactor). Then, turn the switch on for **Google Authenticator**, under the *Choose a Provider* section.

> There are two other MFA providers that you can choose: Guardian and Duo. Just have in mind that Guardian isn't available yet for the Lock-iOS framework.

Then, you have to specify on which clients you want to enable MFA; you accomplish this by editing the snippet that appears below, replacing the placeholder with your actual client ids.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-02.png)

If you want to use MFA in **all** of your clients, the easiest you can do is disabling this conditional in the script:

```javascript
if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1)
```

### Done!

Piece of cake, wasn't it? Now you should get a Google Authenticator screen when you try to login with social providers in your app using [Lock-iOS](https://github.com/auth0/Lock.iOS-OSX).

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-09.png)

> For more information on how to configure Lock-iOS in your app, take a look at the [login tutorial](01-login.md).
