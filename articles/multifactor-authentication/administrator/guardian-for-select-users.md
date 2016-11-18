---
description: Guardian for Select Users
---
## Apply Guardian only to certain users

Once you have enabled either MFA option, you will be presented with the **Customize MFA** code snippet that allows advanced configuration of Guardian's behavior via [Rules](/rules). One option is to apply Guardian authentication only to a subset of your users.

By default, Auth0 enables Guardian for all accounts.

```js
function (user, context, callback) {

  // Apply Guardian only for users that have user_metadata.use_mfa === true
  if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'guardian', //required
      };
  }

  callback(null, user, context);
}
```

If you choose to selectively apply multifactor authentication, you simply set the appropriate `clientID` values, and the code will be executed as part of a [Rule](/rules) whenever a user logs in.

Once you have finished making your desired changes, click **Save**.

## Additional Information
* [Configuring Custom MFA](/multifactor-authentication/custom)
