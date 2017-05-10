---
title: Using Passwordless Authentication with a one-time code via email on Regular Web Apps
---

<div class="alert alert-info">
This document covers Passwordless Authentication, and uses the most up-to-date version of auth0.js - version 8. We recommend using this version, but if you are already using version 7, you can see the Passwordless documentation that uses version 7 using the dropdown at the top of this document. If you are interested in upgrading to use auth0.js v8, take a look at the <a href="/libraries/auth0js/v8/migration-guide">migration guide</a>.
</div>

# Passwordless Authentication with a one-time code via e-mail on Regular Web Apps

<%= include('../../_introduction-email', { isMobile: false }) %>

## Setup

<%= include('../../_setup-email') %>

<%= include('../../_setup-callback', {spa:false} )%>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('../../_init-passwordless-lock') %>

Then you can trigger the login using the `callbackURL` option to specify the endpoint that will handle the server-side authentication:

```
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open Lock in Email Code mode
    lock.emailcode( {callbackURL: '${account.callback}'} );
  }
</script>
<a href="javascript:login()">Login</a>
```

This will open a dialog that asks the user for their email address:

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the one-time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Lock will ask for the code that has been emailed to the provided address. The code can then be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

Once the user enters the code received by email, Lock will authenticate the user and redirect to the specified `callbackURL`.

**NOTE:** You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the server-side authentication callback. A sample application is available in the [Node.js Passwordless Authentication repository](https://github.com/auth0/auth0-node-passwordless-sample) on GitHub.

### Use your own UI

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('../../_init-auth0js_v8', {redirectUri:true} ) %>

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
  });
};
```

If authentication is successful, the user will be redirected to the `redirectUri` specified in the Auth0 constructor.

**NOTE:** You can follow up with any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback on the server-side.

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.