---
title: jQuery Tutorial
name: jQuery
alias:
  - jquery
language:
  - Javascript
framework:
  - jQuery
image: //upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg
tags:
  - quickstart
snippets:
  dependencies: client-platforms/jquery/dependencies
  setup: client-platforms/jquery/setup
  use: client-platforms/jquery/use
---

## jQuery Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-jquery',
  pkgBranch: 'gh-pages',
  pkgPath: (configuration.api && configuration.thirdParty) ? 'examples/widget-with-thirdparty-api' : 'examples/widget-with-api-redirect',
  pkgFilePath: null,
  pkgType: 'js' + account.clientParam
}) %>

**If you have an existing application, follow the steps below.**

${include('./\_callback')}

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include Auth0's jQuery module and its dependencies and set the viewport:

${snippet(meta.snippets.dependencies)}

### 2. Configure the Auth0Lock

Configure Auth0Lock with your `client-ID` and `domain`:

${snippet(meta.snippets.setup)}

### 3. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button.
 __Note:__ This implementation uses Lock's [redirect mode](/libraries/lock/authentication-modes). 
 
${snippet(meta.snippets.use)}

To discover all the available arguments for `lock.show`, see [.show\(\[options, callback\]\)](/libraries/lock#-show-options-callback-).

After authentication, Auth0 will redirect the user back to your application with an identifying token as a hash parameter of window.location. Use lock.parseHash to parse the hash and create the token. This token is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the id_token is stored in localStorage to keep the user authenticated after each page refresh. 

```js
var hash = lock.parseHash(window.location.hash);
if (hash) {
  if (hash.error) {
    console.log("There was an error logging in", hash.error);
    alert('There was an error: ' + hash.error + '\n' + hash.error_description);
  } else {
    //save the token in the session:
    localStorage.setItem('id_token', hash.id_token);
  }
}
```

${browser}

<% if (configuration.api && configuration.thirdParty) { %>

### 4. Configure calls to a Third Party API

To enable calls to a third-party API <%= configuration.api %>, exchange the JWT token from Auth0 for a token that can be used to query <%= configuration.api %> securely.

Modify the login code in [Step 3](#3-implement-the-login) by adding a call to get the new token:

```js
lock.getClient().getDelegationToken({
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

### 5. Configure secure calls to your API

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

<% } %>

__Note:__ The settings specified in `ajaxSetup` will affect all calls to $.ajax or Ajax-based derivatives such as $.get(). This may cause undesirable behavior if other callers (for example: plugins) are expecting the default settings. Therefore, use of this API is not recommended. Instead, set the options explicitly in the call or define a simple plugin to do so. For more information, see [jQuery.ajaxSetup()](http://api.jquery.com/jQuery.ajaxSetup/).

### 6. Retrieve the user profile and display user information

Use the `id_token` to retrieve the user profile and display the user's nickname:

```js
  //retrieve the profile:
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error geting the profile: ' + err.message);
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

### 7. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('id_token');
userProfile = null;
window.location.href = "/";
```

### 8. All done!

You have completed the implementation of Login and Signup with Auth0 and jQuery.
