---
title: Using Passwordless Authentication with a magic link via email on Regular Web Apps
---

# Passwordless Authentication with a magic link via e-mail on Regular Web Apps

<%= include('./_introduction-email-magic-link') %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-callback', {spa:false} ) %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login using the `callbackURL` option to specify the endpoint that will handle the authentication on the server-side:

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

This will open a dialog that asks the user for their email address.

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the magic link. After clicking the link, the user will be signed in to your application automatically and redirected to the specified `callbackURL`.

**NOTE:** You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

### Use your own UI

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:true} ) %>

You must provide a way for the user to enter an email to which the magic link will be sent. Then you can begin the passwordless authentication as follows:

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

After clicking the link, the user will be automatically signed in to your application and redirected to the `callbackURL` specified in the Auth0 constructor.

**NOTE:** You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback on the server-side.
