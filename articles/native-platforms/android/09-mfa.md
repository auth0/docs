---
title: Multifactor Authentication
description: This tutorial will show you how to configure Multifactor Authentication (MFA) via Google Authenticator in your app.
---

 <%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/09-MFA',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '09-MFA',
  pkgFilePath: '09-MFA/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>  

## Enable Multifactor Authentication In Your Account

Multifactor authentication can be enabled with the flip of a switch with Auth0. Go to the [MFA section](${manage_url}/#/multifactor) of your dashboard and flip the switch on for **Google Authenticator** under the *Choose a Provider* section.

You must specify which clients you want to enable MFA for. This can be done by editing the snippet that appears below, replacing the placeholder with your actual client IDs.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-02.png)

If you want to use MFA in **all** of your clients, the easiest you can do is disabling this conditional in the script:

```javascript
if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1)
```

> For more information on how to configure Lock-Android in your app, take a look at the [login tutorial](01-login).
