## Google Authenticator for Administrators

::: panel-info Note:
This page refers to using Google Authenticator instead of Auth0 Guardian. Google Authenticator can also be used with Guardian(your users choose which to use) when **Push Notifications** is enabled. [Click here for more information on Guardian.](/multifactor-authentication/guardian)
:::

## Enabling Google Authenticator for MFA

To turn on Google Authenticator for two-step verification, first visit the [Multifactor Auth](${uiURL}/#/guardian) page from the dashboard. Then click on the link to use a different provider.

![](/media/articles/mfa/change-provider.png)

Then you can use the slider to turn on Google Authenticator.

![](/media/articles/mfa/toggle-google-auth.png)

## Google Authenticator Supported Devices

Your users must have a supported device to use the Google Authenticator app. If some of your users have an unsupported device type, they may be able to use Auth0's Guardian app instead of Google Authenticator. [Click here for information on using Guardian.](/multifactor-authentication/guardian/admin-guide)

| **OS** | **Google Authenticator** | 
| --- | --- | 
| **iOS** | Requires iOS 5.0 or later |
| **Android** | Requires Android version 2.1 or later |
| **Windows** | Unsupported |
| **Blackberry** | Requires OS 4.5-7.0 |
| **Other** | Unsupported |

## Customize Google Authenticator

Once you have turned on Google Authenticator, the portal displays a code editing textbox containing the following code snippet for you to use:

```JS
function (user, context, callback) {

  var CLIENTS_WITH_MFA = ['REPLACE_WITH_YOUR_CLIENT_ID'];
  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'google-authenticator',
        // issuer: 'Label on Google Authenticator App', // optional
        // key: '{YOUR_KEY_HERE}', //  optional, the key to use for TOTP. by default one is generated for you
        // ignoreCookie: true // optional, force Google Authenticator everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
      };
    // }
  }

  callback(null, user, context);
}
```

When you have finished editing the code snippet based on the requirements of your app, click **Save**.

## Tracking your Users MFA Events 

In the [Logs](${uiURL}/#/logs) section of the dashboard you can see the various events related to your users signing up and signing in using MFA.

![](/media/articles/mfa/logs.png)
 
Here are all the possible events related to MFA:

| Event Type  | Description |
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
 
These events can also be searched using the [APIv2](https://auth0.com/docs/api/management/v2#!/Logs) using [query string syntax](https://auth0.com/docs/api/management/v2/query-string-syntax). You can search criteria using the `q` parameter or you can search by a specific log ID.

**Examples searching with the `q` parameter:**
To see the events for users who are enrolling with MFA:

`type: gd_start_enroll`

To see all the times an SMS is sent:

`type: gd_send_sms`

## Reset a MFA for a User

If a user has lost their mobile device they will need their recovery code to be able to log in. If they have also lost their recovery code, you as an administrator will need to reset their MFA.

To reset a user's MFA:

1.  Find and select the user in the [Users](${uiURL}/#/guardian) section of the dashboard.
2. Once you have selected the affected user click on the **Actions** button on the top right of the screen. 
3. Select **Reset Multi Factor (Auth0)** from the dropdown.
4. There will be a pop up box to confirm your decision,  click **YES, RESET IT** to reset the user's MFA.

![](/media/articles/mfa/reset-mfa.png)

The next time the user logs in they will need to resetup their MFA just like a new user.

## Disabling Google Authenticator

Google Authenticator can be disabled from the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard then by clicking the link to use a different provider. 

![](/media/articles/mfa/change-provider.png)

Toggle the slider button to disable Google Authenticator, then a confirmation popup will appear.

By disabling a type of MFA you will unenroll all your current users of that type of MFA. They will be asked to re-enroll next time they try to login. This action cannot be reverted.
