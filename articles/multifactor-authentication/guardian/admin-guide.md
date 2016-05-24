# Guardian for Administrators 

Guardian is Auth0's multifactor authentication (MFA) application that provides a simple, safe way for you to implement MFA. The Guardian app is used for two-factor authentication when logging into an application, which helps create a more secure login.  With two-factor authentication your users will always need their mobile device in order to login.

This page will help to explain how to enable and use Guardian for MFA for signing in your users.

For information for your users on what Guardian is, how to download the app and common questions they may have, see [here](/guardian/user-guide).
 
## Enabling Guardian 

You can enable Guardian by going to the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard. By toggling the **Push Notification** slider, you can enable using Guardian for sign in and sign up for your application. 

New users signing up will be prompted to download the Guardian app from either the App Store or Google Play. Once they indicate that they downloaded the app a code will appear. They will have five minutes to scan the code with the app before it expires. After the code has been successfully scanned, users will see a confirmation screen which includes a recovery code. They need to have this recovery code to login without their mobile device. If they lose both the recovery code and their mobile device, you will need to reset their MFA [see below](/admin-guide#reset-mfa-for-a-user) on how to do this. 

Users that were previously registered before you enable MFA, will complete the same process as new users on their next login.

By enabling **Push Notifications** for MFA, you will also be enabling the option to use Google Authenticator instead of Guardian. To use this option, your users must have the Google Authenticator app downloaded to their mobile device, the app is available for both Android and iOS. When a new user signs up, or a user is logging in for the first time since enabling MFA there will be a code to be scanned in the Google Authenticator app. After scanning the code, they will get a six digit code to enter. Once they enter this code, there will be a confirmation screen which has a recovery code. They need to have this recovery code to login without their mobile device. If they lose both the recovery code and their mobile device, you will need to reset their MFA [see below](/admin-guide#reset-mfa-for-a-user) on how to do this.

## Customize MFA for Select Users

You may choose to enable Guardian only for select users. Within the Customize MFA code snippet, you can include conditions to enable Guardian.

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

## Customizing the Guardian Screen

You may change the logo and the friendly name that is displayed to your users. To do so, you may make the appropriate settings changes from the Guardian page's link to [Account Settings](${uiURL}/#/account). You may also reach the Account Settings page by clicking on your user name on the top right of the page and then selecting Account Settings from the dropdown menu that appears.
 
 ![](/media/articles/mfa/guardian-logo-and-name-settings.png)

 * **Friendly Name**: the name of the app that you want displayed to the users
 * **Logo URL**: the URL that points to the logo image you want displayed to your users

Auth0 recommends using a logo image that is at least 100x100 pixels, though an image that is 200x200 pixels ensures quality viewing in devices with Retina or high DPI displays.

## Reset a MFA for a User

If a user has lost their mobile device they will need their recovery code to be able to log in. If they have also lost their recovery code, you as an administrator will need to reset their MFA.

To reset a user's MFA:

1.  Find and select the user in the [Users](${uiURL}/#/guardian) section of the dashboard.
2. Once you have selected the affected user click on the **Actions** button on the top right of the screen. 
3. Select **Reset Multi Factor (Auth0)** from the dropdown.
4. There will be a pop up box to confirm your decision,  click **YES, RESET IT** to reset the user's MFA.

 ![](/media/articles/mfa/reset-mfa.png)

The next time the user logs in they will need to resetup their MFA just like a new user.

## Disabling Guardian and other MFA

Guardian and other types of MFA can be disabled from the [Multifactor Auth](${uiURL}/#/guardian) section of the dashboard. Toggle the button to disabled for the type of MFA you wish to turn off, a confirmation popup will appear.

By disabling a type of MFA you will unenroll all your current users of that type of MFA. They will be asked to re-enroll next time they try to login. This action cannot be reverted.

