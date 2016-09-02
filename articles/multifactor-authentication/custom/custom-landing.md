---
title: Configuring Custom Multifactor Authentication
url: /multifactor-authentication/custom
description: Examples for configuring custom MFA implementations.
---

# Configuring Custom MFA

You may configure [rules](/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.

## Implementing Contextual MFA

The exact requirements for configuring Contextual MFA will vary. Below are sample snippets you might consider using as you customize your specific solution.

### Change the frequency of authentication requests

By default, Auth0 asks the user for MFA once per month. You can change this setting by changing the `ignoreCookie` field to `true`:

```JS
function (user, context, callback) {

  if (conditionIsMet()){
    context.multifactor = {
      ignoreCookie: true,
      provider: 'google-authenticator'
    };
  }

  callback(null, user, context);
}
```

### Access from an extranet

You can have Auth0 request MFA from users whose requests originate from outside the corporate network:

```JS
function (user, context, callback) {

  if (IsExtranet()) {
    context.multifactor = {
      ignoreCookie: true,
      provider: 'google-authenticator'
    };
  }

  callback(null, user, context);

  function IsExtranet() {
    return !rangeCheck.inRange(context.request.ip, '10.0.0.0/8');
  }
}
```

### Access from a different device or location

If the user makes a request from an IP address that Auth0 has not already associated with them, you can configure Auth0 to request MFA.

```JS
function (user, context, callback) {

  var deviceFingerPrint = getDeviceFingerPrint();

  if (user.lastLoginDeviceFingerPrint !== deviceFingerPrint) {

    user.persistent.lastLoginDeviceFingerPrint = deviceFingerPrint;

    context.multifactor = {
      ignoreCookie: true,
      provider: 'google-authenticator'
    };
  }

  callback(null, user, context);

  function getDeviceFingerPrint() {

    var shasum = crypto.createHash('sha1');
    shasum.update(context.request.userAgent);
    shasum.update(context.request.ip);
    return shasum.digest('hex');

  }
}
```

## Use a Custom MFA Service

If you are using an MFA provider that does not have Auth0 built-in support or if you are using a service you have created, you can use the [redirect](/protocols#redirect-protocol-in-rules) protocol for the integration.

By using the redirect protocol, you interrupt the authentication transaction and redirect the user to a specified URL where they are asked for MFA. If authentication is successful, Auth0 will continue processing the request.

Some MFA options you can implement using the redirect protocol include:

* A one-time code sent via SMS
* A personally identifying question (e.g. about the user's parents, childhood friends, etc.)
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

MFA does not work with the [Resource Owner](/protocols#oauth-resource-owner-password-credentials-grant) endpoint.

If you are using MFA for database connections that use [Popup Mode](https://github.com/auth0/auth0.js#popup-mode), set `sso` to `true` when defining the options in [auth0.js](https://github.com/auth0/auth0.js#sso) or [Lock](/libraries/lock). If you fail to do this, users will be able to log in without MFA.

If you are using MFA after an authentication with one or more social providers, you may need to use your own application `ID` and `Secret` in the connection to the provider's site in place of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, select your particular from the list at: [Identity Providers](/identityproviders).
