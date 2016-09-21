---
title: Custom Login
description: This tutorial demonstrates how to create a custom login page for your web application by using the auth0.js library
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nodejs-webapp-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgBranch: 'master',
  pkgPath: '02-Custom-Login',
  pkgType: 'server'
}) %>

### 1. auth0.js

The previous step explained how to provide a login screen with Auth0's Lock widget. In this tutorial (based on the previous tutorial's source code) we are going to learn how to create a custom login page by using the [auth0.js library](/libraries/auth0js).

### 2. Add the auth0.js Dependency

To begin, we need to add the `auth0.js` library in our `layout` template. The library can be retrieved from Auth0's CDN.

```jade
// views/layout.jade

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    // auth0.js
    script(src="http://cdn.auth0.com/w2/auth0-7.2.js")
  body
    block content
```

### 3. Login with Auth0.js

To login with `auth0.js` we first need to create an Auth0 instance which will
then be used to initiate the login process.

```jade
// views/index.jade

script.
  var auth0 = new Auth0({
    domain:      '#{env.AUTH0_DOMAIN}',
    clientID:    '#{env.AUTH0_CLIENT_ID}',
    callbackURL: '#{env.AUTH0_CALLBACK_URL}',
  });
```

Initiating the login process is done by calling the `.signin()` method of `auth0`
passing the connection to use.

Here is an example of how to use `.signin()` to login with Google.

```jade
// views/index.jade

script.

  ...

  function signinGoogle() {
    auth0.signin({
      connection: 'google-oauth2',
    });
  }
```

### 4. Username and Password Login

Logging in with a username and password is very similar to the previous case, but we need to pass the user's credentials to the `.signin()` method.

```jade
// views/index.jade

script.

  ...

  function signinDb() {
    auth0.signin({
      connection: 'Username-Password-Authentication',
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    });
  }
```

### 5. Putting it All Together

We can now add some input fields and buttons to make a complete custom login page.

```jade
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
    var auth0 = new Auth0({
        domain:      '#{env.AUTH0_DOMAIN}',
        clientID:    '#{env.AUTH0_CLIENT_ID}',
        callbackURL: '#{env.AUTH0_CALLBACK_URL}',
      });

    function signinGoogle() {
      auth0.signin({
        connection: 'google-oauth2',
      });
    }

    function signinDb() {
      auth0.signin({
        connection: 'Username-Password-Authentication',
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      });
    }
```
