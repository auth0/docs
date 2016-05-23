---
title: Auth0 Multifactor Authentication
url: /multifactor-authentication
---

# Multifactor Authentication

Multifactor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user knows (e.g. a password)
* **Possession**: Something the user has (e.g. a cell phone)
* **Inheritance**: Something the user is (e.g. a fingerprint or retina scan)

<<<<<<< 0b27d5f8e13a06ab58bc5f7c209905e8cd6ce8ca
Auth0 provides three ways of implementing MFA:
=======
![](/media/articles/mfa/duo.gif)

## Implementing MFA with Auth0
>>>>>>> Create new MFA docs structure

Auth0 supports the following methods of implementing MFA:

1. Using Guardian, Auth0's MFA application;
2. Using Auth0's built-in support for one-time password authentication services Google Authenticator and Duo Security.
3. Configuring rules for custom processes, such as Contextual MFA, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.
4. Integration with a custom provider, such as **Yubikey**.

<<<<<<< 0b27d5f8e13a06ab58bc5f7c209905e8cd6ce8ca
## Using Auth0's Built-in Support
=======
### MFA Using Auth0 Built-In MFA Support
>>>>>>> Create new MFA docs structure

Auth0 provides built-in support for the following one-time password authentication services:

* Google Authenticator;
* Duo Security.

You may enable these options via the Auth0 Management Dashboard. To navigate to the appropriate configuration page, navigate to the Multifactor Auth page. You will see the following message, along with the link to the appropriate page:

<<<<<<< 0b27d5f8e13a06ab58bc5f7c209905e8cd6ce8ca
To integrate with Google Authenticator, click on its logo in the [Multifactor Auth](${uiURL}/#/multifactor) page of the Auth0 Management Portal.

The portal displays a code editing textbox containing the following code snippet for you to use:

```JS
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

When you have finished editing the code snippet based on the requirements of your app, click **Save**.

### Duo Security

To integrate with Duo Security, click on its logo in the [Multifactor Auth](${uiURL}/#/multifactor) page of the Auth0 Management Portal.

The portal displays a code editing textbox containing the following code snippet for you to use:

```JS
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

When you have finished editing the code snippet based on the requirements of your app, click **Save**.

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
=======
```text
Auth0 also supports plugging in other multifactor providers. If you already have your own provider, click here to use a different provider.
>>>>>>> Create new MFA docs structure
```

#### MFA Using Google Authenticator

Google Authenticator allows you to request six- to eight-digit one-time use password as the second factor after your user has attempted to log in with their Google credentials.

You will find further instructions on enabling this feature [here](google-auth/index).

#### MFA Using Duo Security

Duo Security allows you to request either of the following as your second factor once the user has provided their initial login credentials:

* A user response to a push notification sent to the appropriate device;
* A passcode provided to the user via SMS.

You will find further instructions on enabling this feature [here](duo-security/index).

### MFA Using Custom Rules

You may configure [rules](/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.

<<<<<<< 0b27d5f8e13a06ab58bc5f7c209905e8cd6ce8ca
MFA does not work with the [Resource Owner](/protocols#oauth-resource-owner-password-credentials-grant) endpoint.
=======
You will find [sample code snippets](/custom/index) to assist you in building your rules here.
>>>>>>> Create new MFA docs structure

### MFA Using Custom Providers

<<<<<<< 0b27d5f8e13a06ab58bc5f7c209905e8cd6ce8ca
If you are using MFA after an authentication with one or more social providers, you may need to use your own application `ID` and `Secret` in the connection to the provider's site in place of the default Auth0 development credentials. For instructions on how to get the credentials for each social provider, please see the [Social Connections](/identityproviders#social) documentation.
=======
For a detailed look at implementing MFA with **YubiKey**, see [Multifactor Authentication with YubiKey-NEO](/multifactor-authentication/yubikey).
>>>>>>> Create new MFA docs structure
