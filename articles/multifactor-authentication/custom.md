---
title: Customize Multi-Factor Authentication
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
# Customize Multi-Factor Authentication

You can configure a [rule](/rules) in  [Dashboard > Rules](${manage_url}/#/rules) for custom <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> processes, which allow you to define the conditions that will trigger additional authentication challenges. Rules can be used to force MFA for users of certain applications, or for users with particular user metadata or IP ranges, among other triggers.

::: note
The MFA settings defined in rules will always take precedence over the toggles in the Multi-factor Auth section of the Dashboard.
:::

## `provider` setting

The `provider` setting is a way to specify whether to force MFA, and which factor to you use. The behavior is different depending if you use the Classic or the New Universal Login experience:

| Provider             | Classic Experience      | New Experience          |
|----------------------|:-----------------------:|------------------------:|
| any                  |  Push, SMS or OTP using | Push, SMS, OTP or Email |
| guardian             |  Push, SMS or OTP using | Push, SMS, OTP or Email |
| google-authenticator |  Google Authenticator   | Push, SMS, OTP or Email |
| duo                  |  Duo                    | Duo                     |

If you are using the New Experience you can get the behavior of the Classic experience if you enable customization of the MFA login page.

The `guardian` and `google-authenticator` options are legacy settings that are kept for backwards compability reasons, and should not be used moving forward. We recommend using `any`.  The 'google-authenticator' option does not let users enroll a recovery code.

Setting the `provider` to a specific option manually will override the enabled/disabled toggles in the Dashboard. The following rule will prompt the user to enroll for Duo even if other factor are enabled in the Dashboard:

```js
function (user, context, callback) {

  // Forcing the provider to Duo programmatically
  context.multifactor = {
    provider: 'duo'
  };

  callback(null, user, context);
}
```

## Implement contextual MFA

The exact requirements for configuring Contextual MFA will vary. Below are sample snippets you might consider using as you customize your specific solution.

### Customize MFA for select users

You may customize MFA to run only for users who are authenticating against specific applications in your tenant, or only for users who are marked to use MFA. To enable this behavior you need to have the "Always require Multi-factor Authentication" toggle turned off, and enable MFA using a rule for specific users or applications.

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

By setting `allowRememberBrowser: false`, the user will always be prompted for MFA when they login. This prevents the browser cookie from saving the credentials and helps make logins more secure, especially from untrusted machines. 

### Change authentication request frequency

In some scenarios you may want to avoid prompting the user for MFA each time they log in from the same browser. The default behavior is:

- The user will be prompted for MFA every 30 days when `provider` is set to `google-authenticator` or `duo`
- The user will be able to decide if they want to skip MFA for the next 30 days when `provider` is set to other values.

You can alter that behavior by using the `allowRememberBrowser` property:

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

Depending on the property value the behavior will be as follows:

- `true`: when `provider` is set to `google-authenticator` or `duo`, the user will be prompted for MFA once every 30 days. For other provider values, the user will be able to decide if they want to skip MFA for the next 30 days.
- `false`: the user will be prompted for MFA each time they authenticate.

In order to let the user skip MFA, a cookie will be stored in the user's browser. If the user has the cookie set but you still want the user to perform MFA, you have these options:

- Set `allowRememberBrowser` to `false`
- Set `acr_values` to `http://schemas.openid.net/pape/policies/2007/06/multi-factor` when calling the `/authorize` endpoint.

If you want to require a specific user to be prompted for MFA during their next log in, you can call the [Invalidate Remember Browser API endpoint](https://auth0.com/docs/api/management/v2#!/Users/post_invalidate_remember_browser). This is useful for situations where the user loses a trusted device.

::: note
The above time values are for active users. If a user is inactive for a period of seven days or more, their cookie will expire anyway and they will be prompted for MFA on their next login attempt, even if `allowRememberBrowser` is `true` and it has not been thirty days since their last MFA prompt.
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

## MFA with social connections

If you are using MFA after an authentication with one or more social providers, you need to use your own application `ID` and `Secret` in the connection to the provider's site in place of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, select your particular from the list at: [Identity Providers](/identityproviders). In production usage, you should always use your own credentials instead of [Auth0 devkeys](/connections/social/devkeys).

## Keep reading

* [Resource Owner](/api-auth/tutorials/multifactor-resource-owner-password)
* [Set Up Silent Authentication](/api-auth/tutorials/silent-authentication)
