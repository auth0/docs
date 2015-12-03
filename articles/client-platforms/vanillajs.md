---
title: Generic SPA / Vanilla JS Tutorial
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
---

## Generic SPA / Vanilla JS Tutorial

Follow the steps below to configure your JS app to use Auth0.

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

```js
lock.show(function(err, profile, token) {
  if (err) {
    // Error callback
    console.error("Something went wrong: ", err);
    alert("Something went wrong, check the Console errors");
  } else {
    // Success calback

    // Save the JWT token.
    localStorage.setItem('userToken', token);

    // Save the profile
    userProfile = profile;

    document.getElementById('nick').textContent = profile.nickname;
  }
});

```

To discover all the available arguments for `lock.show`, see the [Auth0Lock documentation](/libraries/lock#-show-options-callback-).


Now you can retrieve the user profile and display user information

```html
<p>Welcome <span id="nick"></span></p>
```

To discover all the available properties of a user's profile, see [user-profile](/user-profile). Note that the properties available depend on the social provider used.

### 4. Use the token to call your api

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

__Note:__ [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is a new and experimental api not yet supported by all browsers. For this reason, Auth0 has created a [polyfill](https://github.com/github/fetch).

### 5. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('id_token');
window.location.href = "/";
```

### 6. All done!

You have completed the implementation of Login and Signup with Auth0 and VanillaJS.
