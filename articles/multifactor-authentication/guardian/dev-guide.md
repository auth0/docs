---
description: How to implement multifactor authentication with Guardian.
---

# Developer Guide to Configuring Guardian

Guardian is Auth0's multifactor authentication (MFA) application that provides a simple, safe way for you to implement MFA. The Guardian app is currently available for mobile devices running iOS or Android.

For applications where Guardian MFA is enabled, the user will be required to sign in **and** confirm the login with a verified mobile device. You can find additional information on user login and sign-up process and common user questions at: [How to Use the Guardian App](/multifactor-authentication/guardian/user-guide).

## Implementing Multifactor Authentication
Within Auth0, you may implement MFA via the [Multifactor Auth](${manage_url}/#/guardian) page of the Management Dashboard.

![](/media/articles/mfa/guardian-dashboard.png)

> Auth0 provides [built-in support](/multifactor-authentication) for MFA using Google Authenticator or Duo. You may choose to use either of these providers, in lieu of Guardian, or any code generator application, on the **Multifactor Auth** page of the Management Dashboard.

### Configuring Guardian in the Management Dashboard

The first thing you will do when setting up Guardian is to decide whether you would like MFA to occur via push notifications, SMS, or both.

* **Push Notifications**: the user receives, via the Guardian app, a push notification that requires their input prior to gaining access to the app. Or, instead, if the user chooses, they can use the Google Authenticator app in a similar way.
* **SMS**: the user receives, via SMS, a code that they are required to enter prior to gaining access to the app.

To enable either Push Notifications or SMS verification, move the appropriate slider to the right.

![](/media/articles/mfa/guardian-both.png)

Once you have enabled either option, you will be presented with the **Customize MFA** code snippet that is applied automatically as a new [Rule](/rules). This rule will be executed in Auth0 as part of the transaction everytime a user authenticates to your application. By default, Auth0 enables Guardian for everything, but you may edit the rule so that MFA is applied only to some clients or users, as shown below. 


```js
function (user, context, callback) {

  //var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
  // run only for the specified clients
  // if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'guardian', //required
        ignoreCookie: true, // optional. Force Auth0 MFA everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
      };
    // }
  //}

  callback(null, user, context);
}
```

If you choose to selectively apply MFA, you will need the appropriate `clientID` values, and the code is executed as part of a [Rule](/rules) whenever a user logs in.

More specifically, you will uncomment and populate the following line of the Customize MFA snippet with the appropriate client IDs:

```js
var CLIENTS_WITH_MFA = ['{REPLACE_WITH_CLIENT_ID}'];
```

Once you have finished making your desired changes, click "Save" so that they persist.

### Configuring Guardian for Select Users

You may choose to enable Guardian only for select users. Within the Customize MFA code snippet, you may include the conditions for Guardian is enabled.

For example, suppose you want to *omit* MFA for all users signing in from the `foo.com` domain.


```js
function (user, context, callback) {

    if (context.connection !== 'foo.com'){
        context.multifactor = {
            provider: 'guardian', //required
        };
    }

    callback(null, user, context);
}
```

Once you have finished making your desired changes, click "Save" so that they persist.

### Customizing the Guardian Screen

You may change the logo and the friendly name that is displayed to your users. To do so, you may make the appropriate settings changes from the Guardian page's link to Account Settings. You may also reach the Account Settings page by clicking on your user name on the top right of the page and then selecting Account Settings from the dropdown menu that appears.

![](/media/articles/mfa/guardian-logo-and-name-settings.png)

* **Friendly Name**: the name of the app that you want displayed to the users;
* **Logo URL**: the URL that points to the logo image you want displayed to your users.

Auth0 recommends using a logo image that is at least 100x100 pixels, though an image that is 200x200 pixels ensures quality viewing in devices with Retina or high DPI displays.

## Tracking and Searching MFA Events

All MFA related events are recorded for audit purposes. For example, each time a new user enrolls with a form of MFA enabled, an **Enroll started** event is triggered.

![](/media/articles/mfa/log-example.png)

You can view events in the [Logs](${manage_url}/#/logs) sections of the dashboard.

![](/media/articles/mfa/logs.png)
 
Here are all the possible events related to MFA:

| Event Name  | Description |
| --- | --- |
| `gd_unenroll` | When a device account is deleted |
| `gd_update_device_account` | When a device account is updated |
| `gd_send_pn` | When a push notification is sent |
| `gd_send_sms` | When a SMS is sent |
| `gd_start_auth` | Start second factor authentication  |
| `gd_start_enroll` | Second factor auth enrollment is started |
| `gd_module_switch` | When changing feature config |
| `gd_tenant_update` | When tenant info has been updated |
| `gd_user_delete` | When calling (user delete => unenroll) |
| `gd_auth_failed` | When second factor login has failed |
| `gd_auth_succeed` | When second factor authentication has succeeded |
| `gd_recovery_succeed` | Recovery succeeded |
| `gd_recovery_failed` | Failed recovery |
| `gd_otp_rate_limit_exceed` | When One Time Password fails validation because rate limit is exceeded |
| `gd_recovery_rate_limit_exceed` | When recovery validation fails because rate limit is exceeded |

These events can also be searched using the [Management APIv2](/api/management/v2#!/Logs) using [query string syntax](/api/management/v2/query-string-syntax). You can search  criteria using the `q` parameter or you can search by a specific log ID.

