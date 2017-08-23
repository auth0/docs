---
title: Using Passwordless Authentication with a one-time code via email on SPA
description: Learn how to authenticate users with a one-time-code using email in a Single Page Application (SPA).
---
# Using Passwordless Authentication in SPA with Email

<%= include('../../_introduction-email', { isMobile: false }) %>

## Setup

<%= include('../../_setup-email') %>

<%= include('../../_setup-cors') %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('../../_init-passwordless-lock') %>

Then you can trigger the login with the following code:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
  function login()
  {
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
        oidcConformant: true,                    // Forces an OIDC comformant flow
        allowedConnections: ['email'],           // Should match the Email connection name, it defaults to 'email'     
        passwordlessMethod: 'code',              // If not specified, defaults to 'code'
        auth: {
          redirectUrl: '${account.callback}',    // If not specified, defaults to the current page 
          params: {
            scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
          }          
        }
      });

      lock.on('authenticated', function(authResult) {
          localStorage.setItem('id_token', authResult.idToken);
      });

      lock.show();
  }
</script>
<a href="javascript:login()">Login</a>
```

First, this will open a dialog that asks the user for their email address:

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the one-time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Lock will ask for the code that has been emailed to the provided address. The code can then be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

Once the user enters the code received by email, Lock will trigger the 'authenticated' event where the `id_token` and profile will be available.

### Use your own UI

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript SDK](/libraries/auth0js).

First, initialize Auth0.js. Be sure to provide a `redirectUri` and to set the `responseType: 'token'`. 

```js
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: 'http://example.com',
  responseType: 'token'
});
```

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
