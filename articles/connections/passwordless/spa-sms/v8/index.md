---
title: Using Passwordless Authentication in SPA with SMS
description: Learn how to authenticate users with a one-time-code using SMS in a Single Page Application (SPA).
---
# Using Passwordless Authentication in SPA with SMS

<%= include('../../_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('../../_setup-sms-twilio') %>

<%= include('../../_setup-cors') %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('../../_init-passwordless-lock') %>

You can then trigger the login widget with the following code:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
  function login() {
    // Open the lock in Email Code mode with the ability to handle
    // the authentication in page
      var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
        autoclose: true,
        oidcConformant: true,                    // Forces an OIDC comformant flow
        allowedConnections: ['sms'],             // Should match the SMS connection name  
        auth: {
          params: {
            scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
          }          
        }
      });

      lock.on('authenticated', function(authResult) {
          localStorage.setItem('id_token', authResult.idToken);
      });
  }
</script>
<a href="javascript:login()">Login</a>
```

This will open a dialog that asks the user for their phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send to the user an SMS containing the one-time code:

```html
<div class="phone-mockup"><img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="SMS one-time code"/></div>
```

Lock will ask for the code that has been sent via SMS to the provided number. The code can then be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

If the code is correct, the user will be authenticated. This will trigger the 'authenticated' event where `id_token`, `refresh_token` can be accessed and stored. Then the user will be allowed to continue to the authenticated part of the application.

### Use your own UI

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

First, initialize Auth0.js. Be sure to provide a `redirectUri` and to set the `responseType: 'token'`. 

```js
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: 'http://example.com',
  responseType: 'token'
});
```

You must provide a way for the user to enter a phone number to which the SMS will be sent. Then you can begin the passwordless authentication as follows (assuming the name of your form input as `input.phone-number`):

```js
function sendSMS(){
  var phone = $('input.phone-number').val();

  webAuth.passwordlessStart({
    connection: 'sms',
    send: 'code',
    phoneNumber: phone
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // Hide the input and show the code entry screen
    $('.enter-phone').hide();
    $('.enter-code').show();
  });
}
```

This will send an SMS to the provided phone number. The user must now enter the code they received into your custom UI. Then you can continue with the login as follows (assuming the name of your form inputs as `input.phone-number` and `input.code`):

```js
function login(){
  var phone = $('input.phone-number').val();
  var code = $('input.code').val();

  webAuth.passwordlessLogin({
    connection: 'sms',
    phoneNumber: phone,
    verificationCode: code
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // If successful, save the user's token and proceed
  });
};
```

The `passwordlessLogin` method will verify the Passwordless transaction, then redirect the user back to the `redirectUri` that was set. You will then need to parse the URL hash in order to acquire the token, and then call the `client.userInfo` method to acquire your user's information, as in the following example:

```js
$(document).ready(function() {
  if(window.location.hash){
    webAuth.parseHash(window.location.hash, function(err, authResult) {
      if (err) {
        return console.log(err);
      } else if (authResult){
        localStorage.setItem('accessToken', authResult.accessToken);
        webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          if (err){
            console.log('err',err);
            alert('There was an error retrieving your profile: ' + err.message);
          } else {
            // Hide the login UI, show a user profile element with name and image
            $('.login-box').hide();
            $('.logged-in-box').show();
            localStorage.setItem('user', user);
            $('.nickname').text(user.nickname);
            $('.avatar').attr('src', user.picture);
          }
        });
      }
    });
  }
});
```

::: note
The `parseHash` method requires that your tokens are signed with RS256 rather than HS256. For more information about this, check the [Auth0.js v8 Migration Guide](/libraries/auth0js/migration-guide#the-parsehash-method).
:::

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
