# Google Authenticator for Developers

::: panel-info Note:
This page refers to using Google Authenticator instead of Auth0 Guardian. Google Authenticator can also be used with Guardian (your users choose which to use) when **Push Notifications** is enabled. [Click here for more information on Guardian.](/multifactor-authentication/guardian)
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

Once you have finished making your desired changes, click **SAVE** so that they persist.

