---
title: Using Passwordless Authentication with a one time code via email on SPA
connection: Email
image:
alias:
  - email
  - spa
---

# Authenticate users with a one time code via e-mail on SPA

<%= include('./_introduction-email', { isMobile: false }) %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-cors') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login like this:


```
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

This will first open a dialog that asks the user for an email address.

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Then, it will ask for a code that has been sent in an email to the given address. The code will be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

After the user enters the code he received by email, lock will authenticate it and call the callback function, where you will have the the id_token and profile available.

### Use your own UI

You can perform passwordless authentication in your SPA with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:false} ) %>

You will have to provide a way for the user to enter the email to which the one time code will be sent. Then you can start the passwordless authentication like this:

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

This will send an email containing the one time code. The user must now fill the code in your custom UI. After that you can continue with the login as follows:

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
> A sample application is available in [the jQuery Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-jquery-passwordless-sample).
