---
title: Implement Passwordless Email in Single-Page Apps
description: Learn how to authenticate users with a one-time code sent by email in a Single-Page Application (SPA).
topics:
    - connections
    - passwordless
    - spa
    - email
contentType: how-to
useCase: customize-connections
---
# Implement Passwordless Email in Single-Page Apps

<%= include('./_includes/_introduction-email', { isMobile: false }) %>

## Setup

<%= include('./_includes/_setup-email') %>

<%= include('./_includes/_setup-cors') %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('./_includes/_init-passwordless-lock') %>

Then you can trigger the login with the following code:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
   var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
    allowedConnections: ['email'],           // Should match the Email connection name, it defaults to 'email'     
    passwordlessMethod: 'code',              // If not specified, defaults to 'code'
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

<%= include('./_includes/_custom-domains') %>

First, this will open a dialog that asks the user for their email address:

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the one-time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

<dfn data-key="lock">Lock</dfn> will ask for the code that has been emailed to the provided address. The code can then be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

Once the user enters the code received by email, Lock will authenticate them and call the callback function where the ID Token and profile will be available.

### Use your own UI

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript SDK](/libraries/auth0js).

<%= include('./_includes/_init-auth0js_v9', {redirectUri:true} ) %>

Be sure to provide a `redirectUri` and to set the `responseType: 'token'`.

You must provide a way for the user to enter a address to which the email will be sent. Then you can begin the passwordless authentication as follows (assuming the name of your form input as `input.email`):

```js
function sendEmail(){
  var email = $('input.email').val();

  webAuth.passwordlessStart({
    connection: 'email',
    send: 'code',
    email: email
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // Hide the input and show the code entry screen
    $('.enter-email').hide();
    $('.enter-code').show();
  });
}
```

This will send an email to the provided address. The user must now enter the code they received into your custom UI. Then you can continue with the login as follows (assuming the name of your form inputs as `input.email` and `input.code`):

```js
function login(){
  var email = $('input.email').val();
  var code = $('input.code').val();

  webAuth.passwordlessLogin({
    connection: 'email',
    email: email,
    verificationCode: code
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // If successful, save the user's token and proceed
  });
};
```

The `passwordlessVerify` method will verify the Passwordless transaction, then redirect the user back to the `redirectUri` that was set. You will then need to parse the URL hash in order to acquire the token, and then call the `client.userInfo` method to acquire your user's information, as in the following example:

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
