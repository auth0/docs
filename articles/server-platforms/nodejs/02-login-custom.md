---
title: Custom Login
description: This tutorial will show you how to create a custom login page for your web application by using the auth0.js library
---

## NodeJS Web App Tutorial

You can get started by downloading the seed project and following the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgPath: '02-Login-Custom',
  pkgType: 'server'
}) %>

### 1. Auth0.js

The previous guide explained how to login with the Auth0Lock widget. In this tutorial
(based on the previous tutorial's source code) we are going to learn how to create a custom
login page by using [Auth0.js library](/libraries/auth0js)

### 2. Add auth0.js dependency

We need to import the auth0.js library in our template.
Add the following `<script>` tag to the `views/index.jade` template.

```jade
...
block content
  //- import the auth0.js library
  script(src="http://cdn.auth0.com/w2/auth0-6.7.js")

  h1= title
...
```

### 3. Login with Auth0.js

To login with `auth0.js` we first need to create an Auth0 instance which will
then be used to initiate the login process.

```js
var auth0 = new Auth0({
    domain:      '#{env.AUTH0_DOMAIN}',
    clientID:    '#{env.AUTH0_CLIENT_ID}',
    callbackURL: '#{env.AUTH0_CALLBACK_URL}',
  });
```

Initiating the login process is done by calling the `.signin()` method of `auth0`
passing the connection to use.

Let's see an example of how to use `.signin()` to login with Google.

```js
function signinGoogle() {
  auth0.signin({
    connection: 'google-oauth2',
  });
}
```

That's it.

### 4. Username - Password Login

The username/password case is very similar to the previous one, but you also need
to pass the credentials to the `.signin()` method, like so:

```js
function signinDb() {
  auth0.signin({
    // The conenction name may not be the same as the one used here,
    // look in your dashboard for the proper name.
    connection: 'Username-Password-Authentication',
    username: <username>,
    password: <password>,
  });
}
```

### 5. Putting it all together.

Adding a few buttons and inputs you'll get something like this:


```jade
extends layout

block content
  script(src="http://cdn.auth0.com/w2/auth0-6.7.js")

  h1= title
  p Welcome to #{title}
  br
  button(onclick="signinGoogle()") Login Google
  br
  br
  label Username
  input(id='username')
  br
  label Password
  input(id='password', type='password')
  br
  button(onclick="signinDb()") Login Db

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
