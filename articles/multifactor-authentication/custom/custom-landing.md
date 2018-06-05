---
title: Configuring Custom Multifactor Authentication
url: /multifactor-authentication/custom
description: Examples for configuring custom MFA implementations.
tags:
  - mfa
  - custom-mfa
---
# Configuring Custom MFA

You may configure [rules](/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.

## Implementing Contextual MFA

The exact requirements for configuring Contextual MFA will vary. Below are sample snippets you might consider using as you customize your specific solution.

### Change the frequency of authentication requests

When using the Guardian multi-factor application, by default users are given the option to be remembered and skip MFA for a period of 30 days. To disable this choice for users, set the `allowRememberBrowser` field to `false`.

For other types of MFA, users are remembered for 30 days by default, or when `allowRememberBrowser` is explicitly set to `true`. You can disable this by setting `allowRememberBrowser` to `false`.

Note that some older rules may use the field `ignoreCookie` here. While deprecated, that field will still function as expected, and will force multifactor authentication at every login.

```JS
function (user, context, callback) {

  if (conditionIsMet()){
    context.multifactor = {
      allowRememberBrowser: false,
      provider: 'guardian'
    };
  }

  callback(null, user, context);
}
```

### Access from an extranet

You can have Auth0 request MFA from users whose requests originate from outside the corporate network:

```js
function (user, context, callback) {
  var ipaddr = require('ipaddr.js');
  var corp_network = "192.168.1.134/26";

  var current_ip = ipaddr.parse(context.request.ip);
  if (!current_ip.match(ipaddr.parseCIDR(corp_network))) {
    context.multifactor = {
        provider: 'guardian',

        // optional, defaults to true. Set to false to force Guardian authentication every time.
        // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
        allowRememberBrowser: false
    };
  }

  callback(null, user, context);
}
```

## Use a Custom MFA Service

If you are using an MFA provider that does not have Auth0 built-in support or if you are using a service you have created, you can use the [redirect](/rules/redirect) protocol for the integration.

By using the redirect protocol, you interrupt the authentication transaction and redirect the user to a specified URL where they are asked for MFA. If authentication is successful, Auth0 will continue processing the request.

Some MFA options you can implement using the redirect protocol include:

* A one-time code sent via SMS
* A personally identifying question (such as about the user's parents, childhood friends, and so on)
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
* If you are using MFA for database connections that use Popup Mode, set `sso` to `true` when defining the options in [auth0.js](/libraries/auth0js) or [Lock](/libraries/lock). If you fail to do this, users will be able to log in without MFA.
* If you are using MFA after an authentication with one or more social providers, you may need to use your own application `ID` and `Secret` in the connection to the provider's site in place of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, select your particular from the list at: [Identity Providers](/identityproviders).
