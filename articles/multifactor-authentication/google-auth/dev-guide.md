# Google Authenticator for Developers

::: panel-info Note:
This page refers to using Google Authenticator instead of Auth0 Guardian. Google Authenticator can also be used with Guardian(your users choose which to use) when **Push Notifications** is enabled. [Click here for more information on Guardian.](/multifactor-authentication/guardian)
:::

## Enabling Google Authenticator for MFA

To turn on Google Authenticator for two-step verification, first visit the [Multifactor Auth](${uiURL}/#/guardian) page from the dashboard. Then click on the link to use a different provider.

![](/media/articles/mfa/change-provider.png)

Then you can use the slider to turn on Google Authenticator.

![](/media/articles/mfa/toggle-google-auth.png)

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

### Configuring Google Authenticator for Select Users

You may choose to enable Google Authenticator only for select users. Within the Customize MFA code snippet, you may include the conditions for Google Authenticator is enabled.

For example, suppose you want to *omit* MFA for all users signing in from the `foo.com` domain.


```js
function (user, context, callback) {

    if (context.connection !== 'foo.com'){
        context.multifactor = {
            provider: 'google-authenticator', //required
        };
    }

    callback(null, user, context);
}
```

Once you have finished making your desired changes, click "Save" so that they persist.

## Tracking and Searching MFA Events

All MFA related events are recorded for audit purposes. For example, each time a new user enrolls with a form of MFA enabled, an **Enroll started** event is triggered.

![](/media/articles/mfa/log-example.png)

You can view events in the [Logs](${uiURL}/#/logs) sections of the dashboard.

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

These events can also be searched using the [APIv2](https://auth0.com/docs/api/management/v2#!/Logs) using [query string syntax](https://auth0.com/docs/api/management/v2/query-string-syntax). You can search  criteria using the `q` parameter or you can search by a specific log ID.

