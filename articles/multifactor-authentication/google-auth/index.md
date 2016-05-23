To integrate with Google Authenticator, click on its logo in the [Multifactor Auth](${uiURL}/#/multifactor) page of the Auth0 Management Portal. You will see its associated slider turn green, which indicates that this feature is now active.

The portal displays a code editing textbox containing the following code snippet for you to use:

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
