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

You may configure a [rule](/rules) from your [Dashboard > Rules](${manage_url}/#/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices. You can also use the rule to force a particular MFA provider despite the Dashboard toggles, or to force MFA only for particular applications or for particular users.

## The provider setting

The `provider` setting now defaults to `any`. This allows the toggles on the [Dashboard > MFA](${manage_url}/#/mfa) to control which providers are enabled, and the user to select from any of the enabled providers. Setting `provider` to `guardian`, for example, will now restrict end users to only use Guardian for their second factor, regardless of which factors are enabled in the Dashboard.

In addition to `any` or a particular value such as `guardian`, `sms`, `google-authenticator`, or `duo`, you can also set `provider` to `none`. This will forcibly remove MFA prompts from the login process.

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

You can have Auth0 request MFA from users whose requests originate from outside the corporate network:

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

## Use a custom MFA service

If you are using an MFA provider that does not have Auth0 built-in support or if you are using a service you have created, you can use the [redirect](/rules/redirect) protocol for the integration.

By using the redirect protocol, you interrupt the authentication transaction and redirect the user to a specified URL where they are asked for MFA. If authentication is successful, Auth0 will continue processing the request.

Some MFA options you can implement using the redirect protocol include:

* A one-time code sent via SMS
* Integration with specialized providers, such as those that require hardware tokens

To use the redirect protocol, edit the `URL` field:

```JS
function (user, context, callback) {

  if (condition() && context.protocol !== 'redirect-callback'){
    context.redirect = {
      url: 'https://your_custom_mfa'
    };
  }

  if (context.protocol === 'redirect-callback'){
    //TODO: handle the result of the MFA step
  }

  callback(null, user, context);
}
```

## Additional Notes

* A tutorial is available on using MFA with the [Resource Owner](/api-auth/tutorials/multifactor-resource-owner-password) endpoint.
* If you are using MFA for database connections that use Popup Mode, and you are using [Lock](/libraries/lock/v11) or [Auth0.js](/libraries/auth0.js/v9), set `sso` to `true` when defining the options object. If you fail to do this, users will be able to log in without MFA.
* If you are using MFA after an authentication with one or more social providers, you may need to use your own application `ID` and `Secret` in the connection to the provider's site in place of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, select your particular from the list at: [Identity Providers](/identityproviders). In production usage, you should always use your own credentials instead of [Auth0 devkeys](/connections/social/devkeys).
