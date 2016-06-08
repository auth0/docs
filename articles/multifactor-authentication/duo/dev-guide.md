# Duo for Developers

## Enabling Duo for MFA

To turn on Duo for two-step verification, first visit the [Multifactor Auth](${uiURL}/#/guardian) page from the dashboard. Then click on the link to use a different provider.

![](/media/articles/mfa/change-provider.png)

Then you can use the slider to turn on Duo.

![](/media/articles/mfa/toggle-duo.png)

### Customize Duo 

After you toggle the slider to enable using Duo, a portal displays a code editing textbox containing the following code snippet for you to use:

```JS
function (user, context, callback) {

  var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        //required
        provider: 'duo',
        ikey: 'DIXBMN...LZO8IOS8',
        skey: 'nZLxq8GK7....saKCOLPnh',
        host: 'api-3....049.duosecurity.com',

        // optional. Force DuoSecurity everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
        // ignoreCookie: true,

        // optional. Use some attribute of the profile as the username in DuoSecurity. This is also useful if you already have your users enrolled in Duo.
        // username: user.nickname,

        // optional. Admin credentials. If you provide an Admin SDK type of credentials. auth0 will update the realname and email in DuoSecurity.
        // admin: {
        //  ikey: 'DIAN...NV6UM',
        //  skey: 'YL8OVzvoeeh...I1uiYrKoHvuzHnSRj'
        // },
      };
    // }
  }

  callback(null, user, context);
}
```

### Changing the Required Fields

Required fields that you **must** replace to use Duo are: `ikey`, `skey` and `host`. 

1. To get these fields first [login to your Duo account](https://admin.duosecurity.com/login).

2. Click on the **Applications** section from the sidebar.

3. Then click on the button to **Protect an Application**.

4. Find the **Auth API** option from the list and then click **Protect this Application**.

5. Then you will be brought to the **Auth API** page under your Appications, you should see a **Details** section.

6. Under the **Details** section you will see: 

Integration key - use this for your `ikey` field
Secret key - use this for your `skey` field
API hostname  - use this for your `host` field

Replace the three fields in the code snippet, and click **SAVE**.

[Click here to learn more about Duo's Auth API](https://duo.com/docs/authapi)

## Other Customizations

### Use Duo only for Specified Users

#### Based on your Application
To use Duo for logins only for the specified clients, replace `REPLACE_WITH_YOUR_CLIENT_ID` field with the Client ID of the application you wish to use. You can find your Client ID(s) under the [Applications](${uiURL}/#/applications) section of the dashboard and then clicking the application you wish to use.

To use Duo for users of all your applications, you can comment or remove the sections regarding `CLIENTS_WITH_MFA`.

#### Specify users to use MFA
To only use Duo for MFA on users that have `user_metadata.use_mfa === true` uncomment this if block.

### Setting `ignoreCookie: true`
If you uncomment the line to `ignoreCookie: true`, then users will not have to login with Duo everytime they login. The browser will save a cookie that will persist for 30 days and this cannot be undone.

### Changing the Username sent to Duo
To use a specific attribute of the profile as the username in DuoSecurity, uncomment `username: user.nickname` and change it to the attribute you wish to use. This is also useful if you already have your users enrolled in Duo.

### Setting Admin Credentials
If you provide an Admin SDK type of credentials then Auth0 will update the realname and email in Duo. To do this, replace the `ikey` and `skey` with the integration key and secret key.

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