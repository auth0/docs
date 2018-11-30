---
title: Configuring Custom Multi-factor Authentication
url: /multifactor-authentication/custom
description: Examples for configuring custom MFA implementations.
topics:
  - mfa
  - custom-mfa
contentType:
  - how-to
  - concept
useCase:
  - customize-mfa
---
# Configuring Custom MFA

You may configure a [rule](/rules) from your [Dashboard > Rules](${manage_url}/#/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges. Rules can be used to force MFA for users of certain applications, or for users with particular user metadata or IP ranges, among other triggers.

::: note
The MFA settings defined in rules will always take precedence over the toggles in the Multi-factor Auth section of the Dashboard.
:::

## The provider setting

The `provider` setting is a way to specify whether to force MFA. It can be set to allow MFA from any enabled factor, or from a specific factor.If the `provider` value is manually set, it overrides the toggles in the [Dashboard > MFA](${manage_url}/#/mfa). 

Setting the `provider` value to `any` will force MFA for all users, but allow them to use any of the factors which have been enabled in the Dashboard. You can also set the `provider` to any of these specific legacy options, which are still valid to ensure backwards compatibility:

* `guardian` = uses SMS or Push via Guardian
* `google-authenticator` = forces you to use a UI which is specific to Google Authenticator
* `duo` = forces you to use Duo

Setting the `provider` to a specific option manually will override the enabled/disabled toggles in the Dashboard, and is not the recommended way to control which factors are used.

```js
function (user, context, callback) {

  // Forcing the provider to Guardian programmatically
  context.multifactor = {
    provider: 'guardian'
  };

  callback(null, user, context);
}
```

## Implementing contextual MFA

The exact requirements for configuring Contextual MFA will vary. Below are sample snippets you might consider using as you customize your specific solution.

### Customize MFA for select users

You may customize MFA to run only for users who are authenticating against specific applications in your tenant, or only for users who are marked to use MFA.

```js
function (user, context, callback) {

  //var CLIENTS_WITH_MFA = ['REPLACE_WITH_YOUR_CLIENT_ID'];
  // run only for the specified applications
  // if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        provider: 'any',
        allowRememberBrowser: false
      };
    // }
  //}

  callback(null, user, context);
}
```

If you choose to selectively apply MFA, you will need the appropriate `clientID` values, and the code will be executed as part of a [Rule](/rules) whenever a user logs in.

More specifically, you will uncomment and populate the following line of the rule template above with the appropriate client IDs:

`var CLIENTS_WITH_MFA = ['REPLACE_WITH_CLIENT_ID'];`

By setting `allowRememberBrowser: false`, the user will always be prompted for MFA when they login. This prevents the browser cookie from saving the credentials and helps make logins more secure, especially from untrusted machines. See [here](#change-the-frequency-of-authentication-requests) for details.

### Change the frequency of authentication requests

When using the Guardian multi-factor application, by default users are given the option to be remembered and skip MFA for a period of 30 days. To disable this choice for users, set the `allowRememberBrowser` field to `false`.

For other types of MFA, users are remembered for 30 days by default, or when `allowRememberBrowser` is explicitly set to `true`. You can disable this by setting `allowRememberBrowser` to `false`.

```JS
function (user, context, callback) {

  if (conditionIsMet()){
    context.multifactor = {
      allowRememberBrowser: false,
      provider: 'any'
    };
  }

  callback(null, user, context);
}
```

::: note
Some older rules may use the field `ignoreCookie` here. While deprecated, that field will still function as expected, and will force multi-factor authentication at every login.
:::

### Access from an extranet

Assuming that access to the specified network of internal IP addresses is well controlled, you can also have Auth0 request MFA from only users whose requests originate from outside the corporate network:

```js
function (user, context, callback) {
  var ipaddr = require('ipaddr.js');
  var corp_network = "192.168.1.134/26";

  var current_ip = ipaddr.parse(context.request.ip);
  if (!current_ip.match(ipaddr.parseCIDR(corp_network))) {
    context.multifactor = {
        provider: 'any',
        allowRememberBrowser: false
    };
  }

  callback(null, user, context);
}
```

## Additional Notes

* A tutorial is available on using MFA with the [Resource Owner](/api-auth/tutorials/multifactor-resource-owner-password) endpoint.
* If you are using MFA for database connections that use Popup Mode, and you are using [Lock](/libraries/lock/v11) or [Auth0.js](/libraries/auth0.js/v9), set `sso` to `true` when defining the options object. If you fail to do this, users will be able to log in without MFA.
* If you are using MFA after an authentication with one or more social providers, you need to use your own application `ID` and `Secret` in the connection to the provider's site in place of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, select your particular from the list at: [Identity Providers](/identityproviders). In production usage, you should always use your own credentials instead of [Auth0 devkeys](/connections/social/devkeys).
