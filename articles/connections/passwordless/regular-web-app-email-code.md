---
title: Using Passwordless Authentication with a one-time code via email on Regular Web Apps
---

# Passwordless Authentication with a one-time code via e-mail on Regular Web Apps

<%= include('./_introduction-email', { isMobile: false }) %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-callback', {spa:false} )%>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

<%= include('./_init-passwordless-lock') %>

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

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:true} ) %>

You must provide a way for the user to enter an email to which the one-time code will be sent. Then you can begin the passwordless authentication as follows:

```js
function sendEmail(){
  var email = $('input.email').val();
  auth0.requestEmailCode( { email:email }, function(err) {
    if (err) {
      alert('error sending e-mail: '+ err.error_description);
      return;
    }
    // the request was successful and you should
    // receive the passcode to the specified email
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
  //submit the passcode to authenticate the phone
  auth0.verifyEmailCode({ email: email, code: code }, function(err){
    if (err){
      alert('code verification failed. ' + err.statusCode + ' '+ err.error);
    }
  });
};
```

If authentication is successful, the user will be redirected to the `callbackURL` specified in the Auth0 constructor.

**NOTE:** You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback on the server-side.
