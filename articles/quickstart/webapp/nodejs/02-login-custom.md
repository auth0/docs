---
title: Custom Login
description: This tutorial demonstrates how to create a custom login page for your web application by using the auth0.js library
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '02-Custom-Login',
  requirements: [
    'NodeJS 4.3 or higher',
    'Express 4.11'
  ]
}) %>

## auth0.js

The previous step explained how to provide a login screen with Auth0's [Lock widget](/libraries/lock). In this tutorial (based on the previous tutorial's source code) we are going to learn how to create a custom login page by using the [auth0.js library](/libraries/auth0js).

## Add the auth0.js Dependency

To begin, we need to add the `auth0.js` library in our `layout` template. The library can be retrieved from Auth0's CDN.

```pug
// views/layout.pug

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    // auth0.js
    script(src="${auth0js_urlv8}")
  body
    block content
```

## Login with Auth0.js

To log in with `auth0.js` we first need to create an Auth0 instance which will
then be used to initiate the login process.

```pug
// views/index.pug

script.
  var auth0 = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: 'http://localhost:3000/callback'
  });
```

Initiating the login process is done by calling the `.signin()` method of `auth0`
passing the connection to use.

Here is an example of how to use `.signin()` to log in with Google.

```pug
// views/index.pug

script.
  // ...
  function signinGoogle() {
    auth0.authorize({
      connection: 'google-oauth2',
      responseType: 'code'
    });
  }
```

## Username and Password Login

Logging in with a username and password is very similar to the previous case, but we need to pass the user's credentials to the `.signin()` method.

```pug
// views/index.pug

script.
  // ...
  function signinDb() {
    auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      responseType: 'code'
    });
  }
```

## Putting it All Together

We can now add some input fields and buttons to make a complete custom login page.

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}
  br
  button(onclick="signinGoogle()") Log In with Google
  br
  br
  label Username
  input(id='username')
  br
  label Password
  input(id='password', type='password')
  br
  button(onclick="signinDb()") Log In

  script.
    var auth0 = new auth0.WebAuth({
      domain: '#{env.AUTH0_DOMAIN}',
      clientID: '#{env.AUTH0_CLIENT_ID}',
      redirectUri: '#{env.AUTH0_CALLBACK_URL}'
    });

    function signinGoogle() {
      auth0.authorize({
        connection: 'google-oauth2',
        responseType: 'code'
      });
    }

    function signinDb() {
      auth0.redirect.loginWithCredentials({
        connection: 'Username-Password-Authentication',
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        responseType: 'code'
      });
    }
```
