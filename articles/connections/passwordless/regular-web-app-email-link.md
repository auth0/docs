---
title: Implement Passwordless Email with Magic Links in Regular Web Apps
description: Learn how to authenticate users with a magic link sent by email in a regular web application.
toc: true
topics:
    - connections
    - web-apps
    - passwordless
    - email
contentType: how-to
useCase: customize-connections
---
# Implement Passwordless Email with Magic Links in Regular Web Apps

<%= include('./_includes/_call-from-client-side') %>

<%= include('./_includes/_introduction-email-magic-link') %>

## Setup

<%= include('./_includes/_setup-email') %>

<%= include('./_includes/_setup-callback', {spa:false} ) %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('./_includes/_init-passwordless-lock') %>

Then you can trigger the login using the `callbackURL` option to specify the endpoint that will handle the authentication on the server-side:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
  function login() {
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
      passwordlessMethod: "link",              // Sets Lock to use magic link
      auth: {
        redirectUrl: '${account.callback}',
        responseType: 'code'
      }
    });
    
    lock.show();
  }
</script>
<a href="javascript:login()">Login</a>
```

<%= include('./_includes/_custom-domains') %>

This will open a dialog that asks the user for their email address.

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the magic link. After clicking the link, the user will be signed in to your application automatically and redirected to the specified `callbackURL`.

<%= include('./_includes/_single-browser-magic-link') %>


::: note
You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.
:::

### Use your own UI

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript application library](/libraries/auth0js).

<%= include('./_includes/_init-auth0js_v9', {redirectUri:true} ) %>

You must provide a way for the user to enter an email to which the magic link will be sent. Then you can begin the passwordless authentication as follows (assuming the name of your form input as `input.email`):

```js
function sendEmail(){
  var email = $('input.email').val();

  webAuth.passwordlessStart({
    connection: 'email',
    send: 'link',
    email: email
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // Hide the input and show a "Check your email for your login link!" screen
    $('.enter-email').hide();
    $('.check-email').show();
  });
}
```

This will send an email containing the magic link. After clicking the link, the user will be automatically signed in and redirected to the `redirectUri` which can be specified in the Auth0 constructor.

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
