---
url: /multifactor-authentication
---

# Multifactor Authentication in Auth0

Multifactor authentication (MFA) is a method of verifying a user's identify by requiring him or her to present more than one piece of information. This provides additional layers of security to decrease the likelihood of unauthorized access. The information asked of the user is typically two or more of the following:

* Knowledge: something he or she knows, such as a password;
* Possession: something he or she has, such as a cell phone;
* Inheritance: something he or she is, such as a fingerprint or retina scan.

![](/media/articles/mfa/duo.gif)

With Auth0, you have three options for implementing MFA:

* Using built-in support for one-time password authentication services Google Authenticator or Duo Security;
* Setting up rules for Contextual MFA (which allows you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from an unrecognized device);
* Integrating with a custom provider such as Yubikey.

## Using Auth0's Built-in Support 

Auth0 provides built-in MFA support for Google Authenticator and Duo Security. You can enable MFA via the Multifactor Auth page of the Auth0 Management Portal.

![](/media/articles/mfa/mfa-config.PNG)

### Google Authenticator

To integrate with Google Authenticator, click on its logo in the Multifactor Auth page of the Auth0 Management Portal. The Portal displays a code editing area containing the following code snippet for you to use: 

```
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
When you have finished editing the code snippet based on the requirements of your app, click `Save`.

### Duo Security

To integrate with Duo Security, click on its logo in the Multifactor Auth page of the Auth0 Management Portal. The Portal displays a code editing area containing the following code snippet for you to use: 

```
function (user, context, callback) {

  var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];

  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {

    // uncomment the following if clause in case you want to request a second factor only from user's that have user_metadata.use_mfa === true
    // if (user.user_metadata && user.user_metadata.use_mfa){
      context.multifactor = {
        
        //required
        provider: 'duo',
        ikey: 'DIXBMN...LZO8IOS8',
        skey: 'nZLxq8GK7....saKCOLPnh',
        host: 'api-3....049.duosecurity.com',

        // optional. Force DuoSecurity everytime this rule runs. Defaults to false. if accepted by users the cookie lasts for 30 days (this cannot be changed)
        // ignoreCookie: true,

        // optional. Use some attribute of the profile as the username in DuoSecurity. This is also useful if you already have your users enrolled in Duo.
        // username: user.nickname,

        // optional. Admin credentials. If you provide an Admin SDK type of credentials. auth0 will update the realname and email in DuoSecurity.
        // admin: {
        //  ikey: 'DIAN...NV6UM',
        //  skey: 'YL8OVzvoeeh...I1uiYrKoHvuzHnSRj'

        // },
      };
    // }
  }

  callback(null, user, context);
}
```

When you have finished editing the code snippet based on the requirements of your app, click `Save`.

## Using Contextual MFA

The exact requirements you need for setting up contextual MFA will vary. Below are sample snippets you might consider using as you customize your specific solution.

### Changing the Frequency of Authentication Requests

By default, Auth0 asks the user for MFA once per month. You can change this setting the `ignoreCookie` field to `true`

```
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

### Accessing an App from Extranet

You can have Auth0 can request MFA from users whose requests originate from outside the corporate network.

```
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

### Accessing an App from a Different Device or Location

If a user makes a request from an IP address that Auth0 has not already associated with him or her, you can set Auth0 to request MFA.

```
function (user, context, callback) {

  var deviceFingerPrint = getDeviceFingerPrint();

  if (user.lastLoginDeviceFingerPrint !== deviceFingerPrint) {

    user.persistent.lasLoginDeviceFingerPrint = deviceFingerPrint;

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

## Using a Custom MFA Service

If you are using an MFA provider without Auth0 built-in support or if you are using a service you've built, you can use the [redirect](https://auth0.com/docs/protocols#redirect-protocol-in-rules) protocol for the integration.

By using the redirect protocol, you can interrupt the authentication transaction and redirect the user to a specified URL where the user is asked for MFA. If authentication is successful, Auth0 will continue processing the request.

Some MFA options you might want to implement using this option include:

* One-time codes sent via SMS
* Personally identifying questions (for example, questions about the user's parents, childhood friends, and so on)
* Integration with specialized providers, such as those that work with hardware tokens

To use the redirect protocol, edit the relevant URL field:

```
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

> MFA does not work with the [Resource Owner](https://auth0.com/docs/protocols#oauth-resource-owner-password-credentials-grant) endpoint. 

>If you are using MFA for database connections that use [Popup Mode](https://github.com/auth0/auth0.js#popup-mode), set `sso` to `true` when defining the options in [auth0.js](https://github.com/auth0/auth0.js#sso) or Lock. If you fail to do this, users will be able to log in without MFA.

> If you are using MFA after authentication against one or more social providers, you may need to use your own application ID and secret for the connection to the provider's site instead of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, please see the [documentation](https://github.com/auth0/docs/tree/master/articles/connections/social) provided by Auth0.