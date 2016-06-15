# Google Authenticator for Administrators

::: panel-info Note:
This page refers to using Google Authenticator instead of Auth0 Guardian. Google Authenticator can also be used with Guardian (your users choose which to use) when **Push Notifications** is enabled. [Click here for more information on Guardian.](/multifactor-authentication/guardian)
:::

## Enabling Google Authenticator for MFA

To turn on Google Authenticator for two-step verification, first visit the [Multifactor Auth](${uiURL}/#/guardian) page from the dashboard. Then click on the link to use a different provider.

![](/media/articles/mfa/change-provider.png)

Then you can use the slider to turn on Google Authenticator.

![](/media/articles/mfa/toggle-google-auth.png)

::: panel-info Note
If you enable Google Authenticator while using another provider for MFA, all other providers will be disabled. All customizations and enrolled users in other MFA will be lost. Be careful as this action cannot be reverted.
:::

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
    // }
  }

  callback(null, user, context);
}
```

When you have finished editing the code snippet based on the requirements of your app, click **Save**.

## Reset a MFA for a User

If a user has lost their mobile device, you as an administrator will need to reset their MFA.

To reset a user's MFA:

1.  Find and select the user in the [Users](${uiURL}/#/users) section of the dashboard.
2. Once you have selected the affected user click on the **Actions** button on the top right of the screen. 
3. Select **Reset Multi Factor (Google)** from the dropdown.
4. There will be a pop up box to confirm your decision, click **YES, RESET IT** to reset the user's MFA.

![](/media/articles/mfa/reset-google-mfa.png)

The next time the user logs in they will need to resetup their MFA just like a new user.

## Disabling Google Authenticator

Google Authenticator can be disabled from the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard then by clicking the link to use a different provider. 

![](/media/articles/mfa/change-provider.png)

Toggle the slider button to disable Google Authenticator, then a confirmation popup will appear.

By disabling a type of MFA you will lose all customizations.
