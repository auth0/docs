---
url: /multifactor-authentication
---

# Multifactor Authentication in Auth0

Multi-factor authentication (MFA) is a method of verifying a user's identify by requiring him or her to present at least two pieces of information. This provides additional layers of security to decrease the liklihood of aunauthorized access. This information asked of the user is typically two or more of the following:

* Knowledge: something he or she knows, such as a password
* Possession: something he or she has, such as a cell phone
* Inheritance: something he or she is, such as a fingerprint or retina scan

With Auth0, you have three options for implementing MFA:

* Using built-in support for one-time password authentication services Google Authenticator or Duo Security
* Setting up rules for Contextual MFA (which allows you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from an unrecognized device)
* Integrating a custom provider such as Yubikey

## Using Auth0's Built-in Support 

Auth0 provides built-in MFA support for Google Authenticator and Duo Security. To integrate with the appropriate service, include the provided functions in your code.

### Google Authenticator

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

### Duo Security

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

## Using Contextual MFA

The exact requirements you need for setting up contextual MFA will vary. Below are sample snippets you might consider using as you customize your specific solution.

### Changing the Frequency of Authentication Requests

By default, Auth0 asks the user for MFA once per month. You can change this setting the "irgnoreCookie" field to "true"

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

### Accessing a Critical App from Extranet

If you indicate that the app is critical, Auth0 will request MFA from the user if his or her request comes from outside the corporate network

```
function (user, context, callback) {

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

### Accessing an App from a Different Device or Location

Auth0 computes a hash with the IP address of the request and the 'userAgent' string. If the hash changes the next time the user logs in, Auth0 requests MFA from the user.

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

## Using a Custom MFA Service

You can use the "redirect" protocol in Auth0 if you are using another MFA provider or if you would like to build your own service.

By using the "redirect" protocol, you can interrupt the authentication transaction and redirect the user to a specified URL where the user is asked for MFA. If authentication is successful, Auth0 will continue processing the request.

Some MFA options you might want to implement using this option include:

* One-time codes sent via SMS
* Personally identifying questions (for example, questions about the user's parents, childhood friends, and so on)
* Integration with specialized providers, such as those that work with hardware tokens

To use the "redirect" protocol, include the following snippet in your code:

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

## Additional Notes

> MFA does not work with the Resource Owner ('/ro') endpoint. If you are using MFA for database connections that use [Popup Mode](https://github.com/auth0/auth0.js#popup-mode), set "sso" to "true" when defining the options in auth0.js or Lock. If you fail to do this, users will be able to log in without MFA.

> If you are using MFA after authentication against social providers, you may need to use your own application ID and secret for the social connection instead of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, please go to "Connections" - "Social" - "NAME-OF-PROVIDER".