---
lodash: true
title: Generic SPA / Vanilla JS Tutorial
name: Vanilla JS
image: //auth0.com/lib/platforms-collection/img/html5.png
tags:
  - quickstart
snippets:
  dependancies: client-platforms/vanillajs/dependancies
  setup: client-platforms/vanillajs/setup
  use: client-platforms/vanillajs/use
---

## Generic SPA / Vanilla JS Tutorial

Please follow the steps below to configure your JS app to use Auth0.

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

@@snippet(meta.snippets.dependancies)@@

We're including the Auth0 lock script to the `index.html`

### 2. Create the Auth0Lock instance

Configuring the Auth0Lock will let your app work with Auth0

@@snippet(meta.snippets.setup)@@

### 3. Let's implement the login

Now we're ready to implement the Login.

```html
<!-- ... -->
<input id="btn-login" class="btn-login" type="submit" />
<!-- ... -->
```

Once the user clicks on the login button, we'll call the `.show()` method of Auth0's `lock` we've just created.

@@snippet(meta.snippets.use)@@

If you want to check all the available arguments for the show method, check the [Auth0Lock](/lock) documentation.

After authentication, the page will be reloaded and you will get the token in a window.location.hash. This token can be parsed with Lock and it will be used for two things:

-  retrieve the profile from auth0
-  call your backend APIs

In this example we are going to store the `id_token` in local storage. We do this so users don't have to authenticate every time they open the application.

```js
var hash = lock.parseHash(window.location.hash);

if (hash && hash.id_token) {
  //save the token in the session:
  localStorage.setItem('id_token', hash.id_token);
}

if (hash && hash.error) {
  alert('There was an error: ' + hash.error + '\n' + hash.error_description);
}
```

### 4. Get the user profile and display the user's information

```js
  //retrieve the profile:
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error geting the profile: ' + err.message);
    }
    document.getElementById('name').textContent = profile.name;
  });
}
```

```html
<p>Name: <span id="name"></span></p>
```

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 5. Use the id_token to call your api

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

Note: [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is a quite new and experimental browser api not yet supported by all browsers. Fortunately there is a polyfill [here](https://github.com/github/fetch).

### 6. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

```js
localStorage.removeItem('id_token');
window.location.href = "/";
```

### 7. You're done!

You've implemented Login and Signup with Auth0 and VanillaJS.
