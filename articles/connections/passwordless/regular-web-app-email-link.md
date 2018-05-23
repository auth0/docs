---
title: Using Passwordless Authentication with a magic link via email on Regular Web Apps
description: How to authenticate users with a magic link via email in a traditional web app that runs on the server
toc: true
tags:
    - connections
    - web-apps
    - passwordless
    - email
---
# Passwordless Authentication with a magic link via e-mail on Regular Web Apps

:::warning
Passwordless is designed to be called from the client-side, and has a [rate limit](/policies/rate-limits#authentication-api) of 50 requests per hour per IP. If you call it from the server-side, your backend's IP may easily hit these rate limits.
:::

<%= include('_introduction-email-magic-link') %>

## Setup

<%= include('_setup-email') %>

<%= include('_setup-callback', {spa:false} ) %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('_init-passwordless-lock') %>

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

This will open a dialog that asks the user for their email address.

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the magic link. After clicking the link, the user will be signed in to your application automatically and redirected to the specified `callbackURL`.

::: note
You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side. A sample application is available in the [Node.js Passwordless Authentication repository](https://github.com/auth0/auth0-node-passwordless-sample) on GitHub.
:::

### Use your own UI

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript application library](/libraries/auth0js).

<%= include('_init-auth0js_v9', {redirectUri:true} ) %>

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
