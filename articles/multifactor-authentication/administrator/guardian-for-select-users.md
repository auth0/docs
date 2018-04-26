---
description: Guardian for Select Users
---
# Customize MFA for Select Users

Once you have enabled either MFA option, you will be presented with the **Customize MFA** code snippet that allows advanced configuration of Guardian's behavior via [Rules](/rules). One option is to apply Guardian authentication only to a subset of your applications.

By default, Auth0 enables Guardian for all applications.

```js
function (user, context, callback) {

  var USERS_WITH_MFA = ['REPLACE_WITH_YOUR_USER_ID'];

  // Apply Guardian only for the specified users
  if (USERS_WITH_MFA.indexOf(user.user_id) !== -1) {
      context.multifactor = {
        provider: 'guardian' 
      };
  }

  callback(null, user, context);
}
```

If you choose to selectively apply multifactor authentication, you simply set the appropriate `user_id` values, and the code will be executed as part of a [Rule](/rules) whenever a user logs in.

Once you have finished making your desired changes, click **Save**.
