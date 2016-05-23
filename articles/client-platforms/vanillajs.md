---
title: Auth0 Javascript Single Page App SDK Tutorial
description: This tutorial will show you how to use the Auth0 Javascript SDK to add authentication and authorization to your web app.
name: Vanilla JS
alias:
  - vanilla
  - vanillajs
language:
  - Javascript
image: /media/platforms/html5.png
tags:
  - quickstart
snippets:
  dependencies: client-platforms/vanillajs/dependencies
  setup: client-platforms/vanillajs/setup
  use: client-platforms/vanillajs/use
alias:
  - spa
  - single-page-app
  - html5
  - backendless
  - javascript-app
seo_alias: vanillajs
---

## Generic SPA / Vanilla JS Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3
* Jquery 2.1.1
:::

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-vanillajs-api-sample',
  pkgBranch: 'gh-pages',
  pkgPath: 'vanillajs-redirect-auth0-sample',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

**If you have an existing application, please follow the steps below.**

${include('./\_callback')}

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include the Auth0 `lock` script and set the viewport:

${snippet(meta.snippets.dependencies)}

### 2. Configure Auth0Lock

To have your app work with Auth0, configure Auth0Lock by creating an instance of the service:

${snippet(meta.snippets.setup)}

### 3. Implement the login

Create a login button:

```html
<!-- ... -->
<input id="btn-login" class="btn-login" type="submit" />
<!-- ... -->
```

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks on the login button.

${snippet(meta.snippets.use)}

To discover all the available arguments for `lock.show`, see the [Auth0Lock documentation](/libraries/lock#-show-options-callback-).

After authentication, Auth0 will redirect the user back to your application with an identifying `token` as a `hash` parameter of `window.location`. Use `lock.parseHash` to parse the `hash` and create the `token`. This `token` is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `id_token` is stored in `localStorage` to keep the user authenticated after each page refresh.

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
### 4. Retrieve the user profile and display user information

Use the `id_token` to retrieve the user profile and display the user's name:

```js
  //retrieve the profile:
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    document.getElementById('name').textContent = profile.name;
  });
}
```

```html
<p>Welcome: <span id="name"></span></p>
```

To discover all the available properties of a user's profile, see [user-profile](/user-profile). Note that the properties available depend on the social provider used.

### 5. Use the token to call your api

To perform secure calls to your API, include the `id_token` in the `Authorization` header:

```js
var getFoos = fetch('/api/foo', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
  },
  method: 'GET',
  cache: false
});

getFoos.then(function (response) {
  response.json().then(function (foos) {
    console.log('the foos:', foos);
  });
});
```

__Note:__ [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is a new and experimental api not yet supported by all browsers. For this reason, you should use a [polyfill](https://github.com/github/fetch).

### 6. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('id_token');
window.location.href = "/";
```

### 7. All done!

You have completed the implementation of Login and Signup with Auth0 and VanillaJS.
