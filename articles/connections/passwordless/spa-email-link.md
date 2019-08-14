---
title: Implement Passwordless Email with Magic Links in Single-Page Apps
description: Learn how to authenticate users with a magic link sent by email in a Single-Page Application (SPA).
topics:
    - connections
    - passwordless
    - email
    - spa
contentType: how-to
useCase: customize-connections
---
# Implement Passwordless Email with Magic Links in Single-Page Apps

<%= include('./_includes/_introduction-email-magic-link') %>

## Setup

<%= include('./_includes/_setup-email') %>

<%= include('./_includes/_setup-callback', {spa:true} ) %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('./_includes/_init-passwordless-lock') %>

Then you can trigger the passwordless authentication using a magic link with the following code:

```html
<script src="${lock_url}"></script>

<script type="text/javascript">
   var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
    passwordlessMethod: "link",              // Sets Lock to use magic link
    auth: {
      redirectUrl: '${account.callback}',
      responseType: 'token id_token'
    }
  });
  
  lock.on('authenticated', function(authResult) {
     localStorage.setItem('id_token', authResult.idToken);
     localStorage.setItem('access_token', authResult.accessToken);
  });
  
  function login(){
    lock.show();
  }
</script>

<a href="javascript:login()">Login</a>
```

<%= include('./_includes/_custom-domains') %>

The user will receive an email with the magic link. Once the user clicks on this link, Auth0 will handle the authentication and redirect back to the application.

::: note
You can follow any of the [Single-Page App Quickstarts](/quickstart/spa) to see more about using Auth0.js in a SPA.
:::

### Use your own UI

You can perform passwordless authentication with a magic link in your single-page application using your own UI with the [Auth0 JavaScript client library](/libraries/auth0js).

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

This will send an email containing the magic link. After clicking the link, the user will be automatically signed in and redirected to the `redirectUri` which can be specified in the Auth0 constructor, where you will need to parse the token with `webAuth.parseHash`:

```js
//parse hash on page load
$(document).ready(function(){
  webAuth.parseHash({hash: window.location.hash}, function(err, authResult) {
    if (err) {
      return console.log(err);
    }

    webAuth.client.userInfo(authResult.accessToken, function(err, user) {
      // Now you have the user's information
    });
  });
});
```

<%= include('./_includes/_single-browser-magic-link') %>


Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
