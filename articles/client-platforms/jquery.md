---
lodash: true
title: jQuery Tutorial
name: jQuery
alias:
  - jquery
language: 
  - Javascript
image: //upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg
tags:
  - quickstart
snippets:
  dependencies: client-platforms/jquery/dependencies
  setup: client-platforms/jquery/setup
  use: client-platforms/jquery/use
---

## jQuery Tutorial

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-jquery/gh-pages/create-package?path=examples/widget-with-thirdparty-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>


<% } else  { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-jquery/gh-pages/create-package?path=examples/widget-with-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**If you have an existing application, follow the steps below.**

@@includes.callback@@

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include Auth0's jQuery module and its dependencies and set the viewport:

@@snippet(meta.snippets.dependencies)@@

### 2. Configure the Auth0Lock

Configure Auth0Lock with your `client-ID` and `domain`:

@@snippet(meta.snippets.setup)@@

### 3. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button, and save the JWT token to `localStorage` for later use in calling a server or an API:

@@snippet(meta.snippets.use)@@

To discover all the available arguments for `lock.show`, see [user-profile](/lock#5).

This is how it will appear in the browser:

@@browser@@

<% if (configuration.api && configuration.thirdParty) { %>

### 4. Configure calls to a Third Party API

To enable calls to a third-party API <%= configuration.api %>, exchange the JWT token from Auth0 for a token that can be used to query <%= configuration.api %> securely.

Modify the login code in [Step 3](#3) by adding a call to get the new token:

```js
var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  lock.show(function(err, profile, token) {
    if (err) {
      // Error callback
      alert('There was an error');
    } else {
      // Success calback


      // Call to get new token starts here

      lock.getClient().getDelegationToken({
        id_token: token,
        // By default the first active third party add-on will be used
        // However, We can specify which third party API to use here by specifying the name of the add-on
        // api: <%= configuration.api %>
      },
      function(err, thirdPartyApiToken) {
        localStorage.setItem('thirdPartyApiToken', thirdPartyApiToken.id_token);
      });

      // Call to get new token ends here

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
    }
  }});
});
```

The code above will function once the <%= configuration.api %> add-on is activated in the following steps.

<% } else { %>

### 5. Configure secure calls to your API

To configure secure calls to the API you are creating <%= configuration.api ? ' on ' + configuration.api : '' %>, implement `$.ajaxSetup` to send on each request, in the `Authorization` header with every ajax call, the [JWT token](/jwt) received on the login and saved to `localStorage` as shown in [Step 3](#3).

```js
$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('userToken')) {
      xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('userToken'));
    }
  }
});
```

<% } %>

__Note:__ The settings specified in `ajaxSetup` will affect all calls to $.ajax or Ajax-based derivatives such as $.get(). This may cause undesirable behavior if other callers (for example: plugins) are expecting the default settings. Therefore, use of this API is not recommended. Instead, set the options explicitly in the call or define a simple plugin to do so. For more information, see [jQuery.ajaxSetup()](http://api.jquery.com/jQuery.ajaxSetup/).

### 6. Display user information

Since the `userProfile` variable contains the user's information, it can be called on to diplay that information in a `span` tag:

```js
$('.nick').text(userProfile.nickname);
```

```html
<p>His name is <span class="nick"></span></p>
```

To discover all the available properties of a user's profile, see [user-profile](/user-profile). Note that the properties available depend on the social provider used.

### 7. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('token');
userProfile = null;
window.location.href = "/";
```

### 8. All done!

You have completed the implementation of Login and Signup with Auth0 and jQuery.
