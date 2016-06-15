# Guardian for Administrators 

Guardian is Auth0's multifactor authentication (MFA) application that provides a simple, safe way for you to implement MFA. The Guardian app is used for two-factor authentication when logging into an application, which helps create a more secure login.  With two-factor authentication your users will always need their mobile device in order to login.

This page will help to explain how to enable and use Push Notifications and SMS for MFA for signing in your users.

For information for your users on what Guardian is, how to download the app and common questions they may have, see [here](/multifactor-authentication/guardian/user-guide).
 
## Support for Push Notifications

To enable Push Notifications MFA for sign in and sign up for your application by your users, go to the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard. Then toggle the **Push Notification** slider to enable it.

![](/media/articles/mfa/guardian-dashboard.png)

For your users to utilize this type of MFA, they will need a supported mobile device. The device must have either the Guardian app installed, the Google Authenticator app installed or an app that supports scanning Time-based One-time Password(TOTP) codes to use with Guardian. Here are the available options:

| **OS** | **Guardian** | **Google Authenticator** | 
| --- | --- | --- | 
| **iOS** | Requires iOS 9.0 or later| Requires iOS 5.0 or later |
| **Android** | Requires Android API version 18 or later| Requires Android version 2.1 or later |
| **Windows** | Guardian codes are supported using the Micorsoft Authenticator app available for Windows 10 Mobile and Windows Phone 8/8.1 | Unsupported |
| **Blackberry** | Must use a TOTP scanning app | Requires OS 4.5-7.0 |
| **Other** | Must use a TOTP scanning app | Unsupported |

For more information on using the Google Authenticator app [see here](/multifactor-authentication/google-authenticator).

New users signing up will be prompted to download the Guardian app from either the App Store or Google Play. Once they indicate that they downloaded the app a code will appear. They will have five minutes to scan the code with the app before it expires. After the code has been successfully scanned, users will see a confirmation screen which includes a recovery code. They need to have this recovery code to login without their mobile device. If they lose both the recovery code and their mobile device, you will need to [reset their MFA](/admin-guide#reset-mfa-for-a-user). Then they will receive a push notification to their device and they will be logged

Users that were previously registered before you enable MFA, will complete the same process as new users on their next login.

## Support for SMS

You can enable SMS messages to use as a form of multifactor authentication. This is also under the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard. By toggling the **SMS** slider, you can enable using SMS for sign in and sign up for your application.  SMS can be used as your only form of MFA or in addition to Push Notifications. 

Your users must have a device capable of using SMS to use this option. If your users are unable to always receive SMS messages (such as when traveling) they will be unable sign up with SMS and unable to login without the recovery code.

When your users sign up with SMS they enter their phone number's country code and mobile phone number. 

![](/media/articles/mfa/sms.png)

After sign up they receive a six digit code to their phone.  They need to enter this code into the box, and then they will get a recovery code. They will need this code to login if you do not have their device. You may be contacted if they have lost their recovery code and their device, then you will need to [reset the user's MFA](/admin-guide#reset-mfa-for-a-user).

### Configuring Guardian SMS with Twilio

When initially setting up SMS, you have up to 100 SMS to be used for testing. This limit can be removed by setting up a Twilio account to use. Your users will always be limited to up to 10 SMS/Hour (replenishing one message an hour, up til 10) to help prevent malicious login attempts.

Click on the **SMS** box to configure your SMS settings.

![](/media/articles/mfa/sms-config.png)

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

Enter your **Twilio Account SID** and **Twilio Auth Token** in the appropriate fields.

Choose your **SMS Source**. 

* If you choose "Use From" you will need to enter the **From** phone number that users will see as the sender of the SMS. You may also configure this in Twilio. 

* If you choose "Use Copilot" you will need to enter a [Copilot SID](https://www.twilio.com/docs/api/rest/sending-messages-copilot)

Click **SAVE**.

## Customize MFA for Select Users

Once you have enabled either MFA option, you will be presented with the **Customize MFA** code snippet you may edit to ensure that MFA is applied to the appropriate Clients. By default, Auth0 enables Guardian for all accounts).

```js
function (user, context, callback) {

  //var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
  // run only for the specified clients
  // if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'guardian', //required
        ignoreCookie: true // optional. Force Auth0 MFA when this rule runs. Defaults to false. If accepted by the user the cookie lasts for 30 days (this cannot be changed)
      };
    // }
  //}

  callback(null, user, context);
}
```

If you choose to selectively apply MFA, you will need the appropriate `clientID` values, and the code is executed as part of a [Rule](/rule) whenever a user logs in.

More specifically, you will uncomment and populate the following line of the Customize MFA snippet with the appropriate client IDs:

```js
var CLIENTS_WITH_MFA = ['{REPLACE_WITH_CLIENT_ID}'];
```

By setting `ignoreCookie: true` the user will always be prompted for MFA when they login. This prevents the browser cookie from saving the credentials and helps make logins more secure especially from untrusted machines.

Once you have finished making your desired changes, click "Save" so that they persist.

## Customizing the Guardian Screen

You may change the logo and the friendly name that is displayed to your users. To do so, you may make the appropriate settings changes from the Guardian page's link to [Account Settings](${uiURL}/#/account). You may also reach the Account Settings page by clicking on your user name on the top right of the page and then selecting Account Settings from the dropdown menu that appears.
 
![](/media/articles/mfa/guardian-logo-and-name-settings.png)

 * **Friendly Name**: the name of the app that you want displayed to the users
 * **Logo URL**: the URL that points to the logo image you want displayed to your users

Auth0 recommends using a logo image that is at least 100x100 pixels, though an image that is 200x200 pixels ensures quality viewing in devices with Retina or high DPI displays.

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

1.  Find and select the user in the [Users](${uiURL}/#/users) section of the dashboard.
2. Once you have selected the affected user click on the **Actions** button on the top right of the screen. 
3. Select **Reset Multi Factor (Auth0)** from the dropdown.
4. There will be a pop up box to confirm your decision,  click **YES, RESET IT** to reset the user's MFA.

 ![](/media/articles/mfa/reset-mfa.png)

The next time the user logs in they will need to resetup their MFA just like a new user.

## Disabling Guardian and other MFA

Guardian and other types of MFA can be disabled from the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard. Toggle the button to disabled for the type of MFA you wish to turn off, a confirmation popup will appear.

By disabling a type of MFA you will unenroll all your current users of that type of MFA. They will be asked to re-enroll next time they try to login. This action cannot be reverted.