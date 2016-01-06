---
url: /multifactor-authentication
---

# Multifactor Authentication in Auth0

Auth0 offers built-in support for OTP multifactor authentication via Google Authenticator and Duo.

* [Google Authenticator](http://en.wikipedia.org/wiki/Google_Authenticator)
* [Duo Security](https://www.duosecurity.com/)

In addition to these built-in integrations, Auth0 supports **contextual MFA** and [custom providers](/multifactor-authentication/custom-provider) such as [Yubikey](/multifactor-authentication/yubikey)

Contextual MFA allows you to define arbitrary conditions that will trigger additional authentication challenges to your users for increased security, for example:

* Geographic location (geo-fencing).
* Type of network used (IP filtering).
* Time of day, day of the week.
* Change in the location or device used to login.

Custom provider allows you to integrate **any** multifactor provider through Auth0's extensibility.

## Google Authenticator

```
function (user, context, callback) {

  if( conditionIsMet() ){
    context.multifactor = {
        provider: 'google-authenticator'
      };
  }

  callback(null, user, context);
}
```

## Duo Security

```
function (user, context, callback) {

  if( conditionIsMet() ){
    context.multifactor = {
        provider: 'duo',
        ikey: '{your Duo integration key}',
        skey: '{your Duo secret key}',
        host: '{your endpoint}.duosecurity.com'
      };
  }

  callback(null, user, context);
}
```

## Session

By default multifactor is requested only once per month. You can change this by disabling the cookie with `ignoreCookie` as follows:

```
function (user, context, callback) {

  if( conditionIsMet() ){
    context.multifactor = {
      ignoreCookie: true,
      provider: 'google-authenticator'
    };
  }

  callback(null, user, context);
}
```

## Examples of common conditions to trigger MFA

### Access a critical app from extranet

In this example, Auth0 will evaluate both the name of the app the user is trying to access, and the originating IP address. If the app is a critical one, and the request originates from outside the corporate network, then the user is challenged with MFA.

```
function (user, context, callback) {

  // If authentication is happening from
  // outside the intranet and on a critical app
  // then request MFA
  if( IsCriticalApp() && IsExtranet() ){
    context.multifactor = {
      ignoreCookie: true,
      provider: 'google-authenticator'
    };
  }

  callback(null, user, context);

  function IsCriticalApp(){
    return context.clientName === 'A critical App';
  }

  function IsExtranet(){
    return !rangeCheck.inRange(context.request.ip, '10.0.0.0/8');
  }
}
```

### Access an app from a different device/location

Auth0 computes a hash with the request IP address and the `userAgent` string. If the hash changes from the last time the user logged in, MFA is triggered.

```
function (user, context, callback) {

  var deviceFingerPrint = getDeviceFingerPrint();

  if( user.lastLoginDeviceFingerPrint !== deviceFingerPrint ){

    user.persistent.lasLoginDeviceFingerPrint = deviceFingerPrint;

    context.multifactor = {
      ignoreCookie: true,
      provider: 'google-authenticator'
    };
  }

  callback(null, user, context);

  function getDeviceFingerPrint(){
    var shasum = crypto.createHash('sha1');
    shasum.update(context.request.userAgent);
    shasum.update(context.request.ip);
    return shasum.digest('hex');
  }
}
```

## Simple demo

This demo illustrates an app in which __Duo Security__ has been enabled.

1. User logs in with Windows Live.
2. User is challenged with an additional authentication factor (in this example the enrollment process has been completed).
3. User accesses the app.

![](/media/articles/mfa/duo.gif)

## Custom MFA

If you are using a different MFA provider or want to build your own, you can use the `redirect` protocol in Auth0.

Using this facility you can interrupt the authentication transaction; redirect the user to an arbitrary URL where the additional authentication factor can happen. After this completes (successfully or not), the transaction can then resume in Auth0 for further processing.

Using this mechanism it is very easy to implement popular multifactor options like:

* One-time codes sent on SMS.
* Questions (e.g. your mother's name, your childhood friend, etc.).
* e-mail based multifactor.
* Integration with specialized providers like hardware tokens, etc.

```
function (user, context, callback) {

  if( condition() && context.protocol !== 'redirect-callback' ){
    context.redirect = {
      url: 'https://your_custom_mfa'
    };
  }

  if( context.protocol === 'redirect-callback'){
    //TODO: handle the result of the MFA step
  }

  callback(null, user, context);
}
```

## Additional notes

> Multifactor authentication does not work with the `/ro` (Resource Owner) endpoint. If using MFA for database connections that use popup mode, `sso: true` needs to be added to the options for auth0.js or Lock. Failing to do so will result in users being able to log in without MFA checks. [More information on `sso` parameter](https://github.com/auth0/auth0.js#popup-mode).

> In addition, if using multifactor authentication after authentication against social providers, it may be necessary to use your own application id and secret for the social connection instead of the default Auth0 development credentials.  Instructions for how to get these credentials for each social provider can be found via "Connections" - "Social" - "NAME-OF-PROVIDER".
