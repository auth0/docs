---
description: Guardian for Select Users
---
## Customize MFA for Select Clients

Once you have enabled either MFA option, you will be presented with the **Customize MFA** code snippet that allows advanced configuration of Guardian's behavior via [Rules](/rules). One option is to apply Guardian authentication only to a subset of your clients.

By default, Auth0 enables Guardian for all clients.

```js
function (user, context, callback) {

  var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];

  // Apply Guardian only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
      context.multifactor = {
        provider: 'guardian', //required
      };
  }

  callback(null, user, context);
}
```

If you choose to selectively apply multifactor authentication, you simply set the appropriate `clientID` values, and the code will be executed as part of a [Rule](/rules) whenever a user logs in.

Once you have finished making your desired changes, click **Save**.
