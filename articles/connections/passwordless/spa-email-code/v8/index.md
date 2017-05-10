---
title: Using Passwordless Authentication with a one-time code via email on SPA
---

<div class="alert alert-info">
This document covers Passwordless Authentication, and uses the most up-to-date version of auth0.js - version 8. We recommend using this version, but if you are already using version 7, you can see the Passwordless documentation that uses version 7 using the dropdown at the top of this document. If you are interested in upgrading to use auth0.js v8, take a look at the <a href="/libraries/auth0js/v8/migration-guide">migration guide</a>.
</div>

# Authenticate users with a one-time code via e-mail on SPA

<%= include('../../_introduction-email', { isMobile: false }) %>

## Setup

<%= include('../../_setup-email') %>

<%= include('../../_setup-cors') %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('../../_init-passwordless-lock') %>

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

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('../../_init-auth0js_v8', {redirectUri:false} ) %>

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
  
  webAuth.passwordlessVerify({
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

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
