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

### 1. Enable MFA in your client

First, you have to enable the MFA feature in your account. Go to the [MFA configuration page](${uiURL}/#/multifactor) and turn the  **Google Authenticator** switch on, under the *Choose a Provider* section.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-01.png)

> MFA for native apps currently supports **Google Authenticator** only.

Then, you have to specify on which clients you want to enable MFA; you accomplish this by editing the snippet that appears below, replacing the placeholder with your actual client ids.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-02.png)

Make sure this line looks like this:

```
var CLIENTS_WITH_MFA = ['${account.clientId}'];
```

If you want to use MFA in **all** of your clients, the easiest you can do is disabling this conditional in the script:

```javascript
if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1)
```

Make sure you hit the **save** button.

### 2. Configure the flags

To enable multifactor authentication and enrollment in your database connection, you must set the `options.mfa.active` and`options.mfa.return_enroll_settings` flags using the `PATCH /api/v2/connections/:id` endpoint.

First, go to [Database Connections]({$uiURL}/#/connections/database) and select the database you want to use MFA on.

Then, copy the database `id` from the URL of the **Settings** page of your database. It will be in the form: `con_xxxxxxxxxxxxxxxx`.

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-03.png)

Also, make sure that your client is enabled for this database:

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-04.png)

After that, go to the [**PATCH /api/v2/connections/:id**](/api/management/v2#!/Connections/patch_connections_by_id) endpoint.

![Patch Connections](/media/articles/mfa/mfa-native/mfa-native-05.png)

On the top left, select the `connections: update` scope.

In the `id` field, enter the connection `id` you previously obtained (`con_xxxxxxxxxxxxxxxx`).

In the `body` field, enter the following:

```json
{
 "options": {
    "mfa": { "active" : true, "return_enroll_settings" : true }
},
 "enabled_clients": [
   "${account.clientId}"
 ]
}
```

Click **TRY** to call the API and effectively set the flags. You should receive a response similar to this:

```json
{
  "id": "con_xxxxxxxxxxxxxxxx",
  "options": {
    "mfa": {
      "active": true,
      "return_enroll_settings": true
    },
    "brute_force_protection": true
  },
  "strategy": "auth0",
  "name": "Username-Password-Authentication",
  "enabled_clients": [
    "YOUR_CLIENT_ID"
  ]
}
```

### 3. Test your MFA

Now, you can run the simulator in your project and sign-in to your Auth0 app with MFA.

1. In XCode, run your project using the simulator.

2. Click **Sign-in**:

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-06.png)

3. Select a provider (Google in this example):

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-07.png)

4. Scan the QR code with Google Authenticator:

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-08.png)

5. Enter the code provided by Google Authenticator:

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-09.png)

6. You're in!

    ![Simulator](/media/articles/mfa/mfa-native/mfa-native-10.png)

### Done!

You've integrated MFA in your app.
