---
title: Using Passwordless Authentication in SPA with SMS
description: Learn how to authenticate users with a one-time-code using SMS in a Single Page Application (SPA).
topics:
    - connections
    - passwordless
    - sms
    - spa
contentType: how-to
useCase: customize-connections
---
# Using Passwordless Authentication in SPA with SMS

<%= include('_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('_setup-sms-twilio') %>

<%= include('_setup-cors') %>

## Implementation

### Use Lock 

<%= include('_init-passwordless-lock') %>

You can then trigger the login widget with the following code:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
   var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
    allowedConnections: ['sms'],       
    auth: {
      redirectUrl: '${account.callback}',
      responseType: 'token id_token'
    }
  });

  lock.on('authenticated', function(authResult) {
     localStorage.setItem('id_token', authResult.idToken);
     localStorage.setItem('access_token', authResult.accessToken);
  });

  function login() {
    lock.show(); 
  }
</script>
<a href="javascript:login()">Login</a>
```

This will open a dialog that asks the user for their phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send to the user an SMS containing the one-time code:

<div class="phone-mockup"><img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="SMS one-time code"/></div>

Lock will ask for the code that has been sent via SMS to the provided number. The code can then be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

If the code is correct, the user will be authenticated. This will trigger the `authenticated` event where the ID Token and Access Token will be available. Then the user will be allowed to continue to the authenticated part of the application.

### Use your own UI

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

First, initialize Auth0.js. Be sure to provide a `redirectUri` and to set the `responseType: 'token id_token'`. 

```js
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: 'http://example.com',
  responseType: 'token id_token'
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
    webAuth.parseHash({hash: window.location.hash}, function(err, authResult) {
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

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
