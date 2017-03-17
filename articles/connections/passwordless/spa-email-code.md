---
title: Using Passwordless Authentication with a one-time code via email on SPA
---

# Authenticate users with a one-time code via e-mail on SPA

<%= include('./_introduction-email', { isMobile: false }) %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-cors') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login with the following code:

```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open the lock in Email Code mode with the ability to handle
    // the authentication in page
    lock.emailcode( function (err, profile, id_token, state) {
      if (!err) {
        // Save the JWT token.
        localStorage.setItem('userToken', id_token);
        //use profile
      }
    });
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

Once the user enters the code received by email, Lock will authenticate them and call the callback function where the `id_token` and profile will be available.

### Use your own UI

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:false} ) %>

You must provide a way for the user to enter the email to which the one-time code will be sent. Then you can begin the passwordless authentication with the following code:

```js

function sendEmail(){
  var email = $('input.email').val();
  auth0.requestEmailCode({ email: email }, function(err) {
    if (err) {
      alert('error sending e-mail: ' + err.error_description);
      return;
    }
    // the request was successful and you should
    // receive the code to the specified email
    $('.enter-email').hide();
    $('.enter-code').show();
  });
}
```

This will send an email containing the one-time code. The user must now enter the code into your custom UI. Then you can continue with the login as follows:

```js
function login(){
  var email = $('input.email').val();
  var code = $('input.code').val();

  //submit the passcode to complete authentication
  auth0.verifyEmailCode({ email: email, code: code }, function(err, profile, id_token, access_token) {
      if (err) {
        alert('Couldn\'t login ' + err.message);
      } else {

        //save id_token to local storage
        localStorage.setItem('userToken', id_token);

        //use profile
        alert('Welcome '+ profile.name);
      }
    });
}
```
