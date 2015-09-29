---
title: Using Passwordless Authentication with a magic link via email on Regular Web Apps
connection: Email
image:
alias:
  - email
  - regular-web-app
---

# Passwordless Authentication with a magic link via e-mail on Regular Web Apps

<%= include('./_introduction-email-magic-link') %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-callback', {spa:false} ) %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login, using the callbackURL option for specifying the endpoint that will handle the authentication server side:

```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open Lock in SMS mode
    lock.magiclink( {callbackURL: '${account.callback}'} );
  }
</script>
<a href="javascript:login()">Login</a>
```

This will first open a dialog that asks the user for an email address.

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the magic link. After clicking the link, the user will be signed in automatically in the application, and will be redirected to the specified `callbackURL`. You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

> A sample application is available in [the Node.js Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-node-passwordless-sample).

### Use your own UI

You can perform passwordless authentication in your regular web app with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:true} ) %>

You will have to provide a way for the user to enter the email to which the magic link will be sent. Then you can start the passwordless authentication like this:

```js
function sendEmail(){
  var email = $('input.email').val();
  auth0.requestMagicLink({ email: email , send: 'link'}, function(err) {
    if (err) {
      alert('error sending e-mail: ' + err.error_description);
      return;
    }
    // the request was successful and you should
    // receive the magic link in the specified email
    alert('email sent!');
  });
}
```

This will send an email containing the magic link.

After clicking the link, the user will be signed in automatically in the application, and will be redirected to the `callbackURL` specified in the Auth0 constructor. You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

> A sample application is available in [the Node.js Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-node-passwordless-sample).
