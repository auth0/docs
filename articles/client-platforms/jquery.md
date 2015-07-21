---
lodash: true
title: jQuery Tutorial
name: jQuery
image: //upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg
tags:
  - quickstart
snippets:
  dependancies: client-platforms/jquery/dependancies
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

**Otherwise, if you already have an existing application, please follow the steps below.**

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

@@snippet(meta.snippets.dependancies)@@

We're including the Auth0 lock script to the `index.html`

### 2. Configure the Auth0Lock

Configuring the Auth0Lock will let your app work with Auth0:

@@snippet(meta.snippets.setup)@@

### 3. Let's implement the login

Now we're ready to implement the login. Once the user clicks on the login button, we'll call the `.show()` method of Auth0's `lock` we've just created.

@@snippet(meta.snippets.use)@@

We need to save the token so that we can use it later when calling a server or an API. In this case, we're saving that token in LocalStorage.

If you want to check all the available arguments for the signin call, please [check here](/lock#5)

@@browser@@

<% if (configuration.api && configuration.thirdParty) { %>

### 4. Configuring calls to a Third Party API

Now, we want to be able to call <%= configuration.api %> which is a third party api. What we're going to do is to exchange the JWT token we got from Auth0 for a token we can use to query <%= configuration.api %> securely and authenticated.

For that, we're going to modify the login call we did in step #4. We're going to add the call to get the new token

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

We're going to activate the <%= configuration.api %> add-on in the following steps. Once we do that, the code we wrote here will just work.

<% } else { %>

### 4. Configuring secure calls to your API

As we're going to call an API we're going to make <%= configuration.api ? ('on ' + configuration.api) : '' %>, we need to make sure we send the [JWT token](/jwt) we receive on the login on every request. For that, we need to implement `$.ajaxSetup` so that every ajax call sends the `Authorization` header with the correct token.

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

Please note that we're using the JWT that we saved after login on Step [#4](#5).

<% } %>

> The settings specified in `ajaxSetup` will affect all calls to $.ajax or Ajax-based derivatives such as $.get(). This can cause undesirable behavior since other callers (for example, plugins) may be expecting the normal default settings. For that reason is recommend against using this API. Instead, set the options explicitly in the call or define a simple plugin to do so ([more details](http://api.jquery.com/jQuery.ajaxSetup/)).

### 5. Showing user information

We already have the `userProfile` variable with the user information. Now, we can set that information to a span:

```js
$('.nick').text(userProfile.nickname);
```

```html
<p>His name is <span class="nick"></span></p>
```

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 6. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

```js
localStorage.removeItem('token');
userProfile = null;
window.location.href = "/";
```

### 7. You're done!

You've implemented Login and Signup with Auth0 and jQuery.
