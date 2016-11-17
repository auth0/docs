---
description: Guardian for Select Users
---
## Customize MFA for Select Users

Once you have enabled either MFA option, you will be presented with the **Customize MFA** code snippet that you can edit to ensure that MFA is applied to the appropriate Clients. By default, Auth0 enables Guardian for all accounts.

```js
function (user, context, callback) {

  //var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
  // run only for the specified clients
  // if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'guardian', //required

        // optional, defaults to true. Set to false to force MFA authentication every time. 
        // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
        allowRememberBrowser: false
      };
    // }
  //}

  callback(null, user, context);
}
```

If you choose to selectively apply MFA, you will need the appropriate `clientID` values, and the code will be executed as part of a [Rule](/rules) whenever a user logs in.

More specifically, you will uncomment and populate the following line of the **Customize MFA** snippet with the appropriate client IDs:

`var CLIENTS_WITH_MFA = ['{REPLACE_WITH_CLIENT_ID}'];'

By setting `allowRememberBrowser: false`, the user will always be prompted for MFA when they login. This prevents the browser cookie from saving the credentials and helps make logins more secure, especially from untrusted machines. See [here](/articles/multifactor-authentication/custom#change-the-frequency-of-authentication-requests) for details

Once you have finished making your desired changes, click **Save**.
