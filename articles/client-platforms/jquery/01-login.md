---
title: Login
description: This tutorial will show you how to use the Auth0 jQuery SDK to add authentication and authorization to your web app.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples/tree/master/01-Login',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 2.1.1
:::

<%= include('../../_includes/_signup') %>

**If you have an existing application, follow the steps below.**

${include('../\_callback')}

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include Auth0's jQuery module and its dependencies and set the viewport:

${snippet(meta.snippets.dependencies)}

### 2. Configure the Auth0Lock

Configure Auth0Lock with your `client-ID` and `domain`:

To discover all the available options for `Auth0Lock`, see [the Lock customization documentation)](/libraries/lock/customization).

${snippet(meta.snippets.setup)}

### 3. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button.

${snippet(meta.snippets.use)}

After authentication, Auth0 will redirect the user back to your application with an identifying token. This token is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `id_token` is stored in `localStorage` to keep the user authenticated after each page refresh:

```js
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);
  });
});
```

${browser}

<% if (configuration.thirdParty) { %>

### 4. Configure calls to a Third Party API

To enable calls to a third-party API <%= configuration.api %>, exchange the JWT token from Auth0 for a token that can be used to query <%= configuration.api %> securely.

Include `auth0.js` to your project by adding following to `index.html`:

```html
<script src="${auth0js_url_no_scheme}"></script>
```

Modify the login code in [Step 3](#3-implement-the-login) by adding a call to get the new token:

```js
var auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
});

...

auth0.getDelegationToken({
   id_token: token,
        // By default the first active third party add-on will be used
        // However, We can specify which third party API to use here by specifying the name of the add-on
        // api: <%= configuration.api %>
  },
  function(err, thirdPartyApiToken) {
     localStorage.setItem('thirdPartyApiToken', thirdPartyApiToken.id_token);
  });

```

The code above will function once the <%= configuration.api %> add-on is activated in the following steps.

<% } else { %>

### 4. Configure secure calls to your API

To configure secure calls to the API you are creating <%= configuration.api ? ' on ' + configuration.api : '' %>, implement `$.ajaxSetup` to send on each request, in the `Authorization` header with every ajax call, the [JWT token](/jwt) received on the login and saved to `localStorage` as shown in [Step 3](#3-implement-the-login).

```js
$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('id_token')) {
      xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('id_token'));
    }
  }
});
```

__Note:__ The settings specified in `ajaxSetup` will affect all calls to $.ajax or Ajax-based derivatives such as $.get(). This may cause undesirable behavior if other callers (for example: plugins) are expecting the default settings. Therefore, use of this API is not recommended. Instead, set the options explicitly in the call or define a simple plugin to do so. For more information, see [jQuery.ajaxSetup()](http://api.jquery.com/jQuery.ajaxSetup/).

<% } %>

### 5. Retrieve the user profile and display user information

Use the `id_token` to retrieve the user profile and display the user's nickname:

```js
  //retrieve the profile:
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    // Display user information
    $('.nickname').text(profile.nickname);

  });
}
```

```html
<p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

### 6. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('id_token');
userProfile = null;
window.location.href = "/";
```
