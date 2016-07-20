---
title: Multifactor Authentication
description: This tutorial will show you how to set up multifactor authentication on your app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-samples/auth0-ios-objc-sample',
  pkgBranch: 'master',
  pkgPath: '09-MFA',
  pkgFilePath: '09-MFA/Auth0Sample/Info.plist',
  pkgType: 'replace'
}) %>

### In the Beginning

#### i. Be familiar with Auth0

This tutorial assumes you are already familiar with Auth0 and how to Sign up and Sign in using Lock or Auth0 Toolkit. **If you're not sure, check out [this tutorial](01-login.md) first.** Some knowledge about [Rule](06-Rules.md) would be advisable too.

### 1. Setting up the Multifactor Authentication

There are several MFA providers you can use with your app, we usually recomend our own `Guardian` app, but it's not currently supported on mobile enviroments, so we recomned you to use `Google Authenticator` as your provider.

You can set it up either following this [link](${uiURL}/#/multifactor) or selecting `Multifactor Auth` on the Auth0 dashboard and then selecting the link under the `Push Notification` and `SMS` switches.

### 2. Configure your Rule

Enabling this switches will create a Rule, and as any Rule you can tweak it as you see fit. You will be presented with a proposed code for the Rule, where you can set an array with the ClientIDs of the Apps you want to use MFA in. 
You can also enforce MFA only on selected users, or following different criteria. 

```
function (user, context, callback) {
  // Uncomment the following to skip MFA when impersonating a user
  // if (user.impersonated) { return callback(null, user, context); }

  var CLIENTS_WITH_MFA = ['REPLACE_WITH_YOUR_CLIENT_ID'];
  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from users that have app_metadata.use_mfa === true
    // if (user.app_metadata && user.app_metadata.use_mfa){
      context.multifactor = {
        provider: 'google-authenticator',
        // issuer: 'Label on Google Authenticator App', // optional
        // key: '{YOUR_KEY_HERE}', //  optional, the key to use for TOTP. by default one is generated for you
        ignoreCookie: true // optional, force Google Authenticator everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
      };
    }
  }
```

### 3. That's all

And you have MFA completely operational in your app.

