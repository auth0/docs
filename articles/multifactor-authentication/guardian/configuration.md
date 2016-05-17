# Setting Up Guardian

Guardian is Auth0's multifactor authentication (MFA) application that provides a simple, safe way for you to implement MFA. The Guardian app is currently available for mobile devices running iOS or Android.

For applications where Guardian MFA is enabled, the user will be required to sign in **and** confirm the logon with a verified mobile device. You can find additional information on the user log in process [here](#).

## Implementing Multifactor Authentication
Within Auth0, you may implement MFA via the **Multifactor Auth** page of the Management Dashboard.

![](/guardian-dashboard.png)

> Auth0 provides [built-in support](https://auth0.com/docs/multifactor-authentication#using-auth0-s-built-in-support) for MFA using Google Authenticator or Duo. You may choose to use either of these providers, in lieu of Guardian, on the **Multifactor Auth** page of the Management Dashboard.

### Configuring Guardian in the Management Dashboard

The first thing you will do when setting up Guardian is to decide whether you would like MFA to occur via push notifications, SMS, or both.

* **Push Notifications**: the user receives, via the Guardian app, a push notification that requires their input prior to gaining access to the app;
* **SMS**: the user receives, via SMS, a code that they are required to enter prior to gaining access to the app.

To enable either Push Notifications or SMS verification, move the appropriate slider to the right.

![](/guardian-both.png)

Once you have enabled either option, you will be presented with the **Customize MFA** code snippet you will need to edit to ensure that MFA is applied to the appropriate Clinets. You will need the appropriate `clientID` values, and the code is executed as part of a [Rule](/rule) whenever a user logs in.

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

More specifically, you will uncomment and populate the following line with the appropriate client IDs:

```js
var CLIENTS_WITH_MFA = ['{REPLACE_WITH_CLIENT_ID}'];
```

Once you have finished making your desired changes, click "Save" so that they persist.

### Customizing the Guardian Screen.

You may change the logo and the friendly name that is displayed to your users. To do so, you may make the appropriate settings changes from the Guardian page's link to Account Settings.

![](/guardian-logo-and-name-settings.png)

* **Friendly Name**: the name of the app that you want displayed to the users;
* **Logo URL**: the URL that points to the logo image you want displayed to your users.

![](/default-guardian-view.png)
