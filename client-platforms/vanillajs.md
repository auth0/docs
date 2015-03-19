---
lodash: true
---

## Generic SPA / Vanilla JS Tutorial

Please follow the steps below to configure your JS app to use Auth0.

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- Auth0Lock script -->
<script src="@@widget_url_no_scheme@@"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including the Auth0 lock script to the `index.html`

### 2. Create the Auth0Lock instance

Configuring the Auth0Lock will let your app work with Auth0

````js
var lock = new Auth0Lock('@@account.clientId@@', '@@account.namespace@@');
```

### 3. Let's implement the login

Now we're ready to implement the Login.

````html
<!-- ... -->
<input id="btn-login" class="btn-login" type="submit" />
<!-- ... -->
```

Once the user clicks on the login button, we'll call the `.show()` method of Auth0's `lock` we've just created.

````js
var userProfile = null;

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ authParams: { scope: 'openid' } });
});
```

We need to save the token so that we can use it later when calling a server or an API. In this case, we're saving that token in LocalStorage.

If you want to check all the available arguments for the show method, check the [Auth0Lock](@@base_url@@/lock) documentation.



### 4. Showing user information

After authentication you will get the token in a window.location.hash. You can use lock to parse the hash and get the token. This token will be used for two things:

-  retrieve the profile from auth0
-  call your backend APIs

````js
var authHash = lock.parseHash(window.location.hash);
if (authHash && authHash.id_token) {
  //save the token in the session:
  localStorage.setItem('id_token', authHash.id_token);

  //get the profile and show some information:
  lock.getProfile(result.id_token, function (err, profile) {
    window.profile = profile;
    document.getElementById('name').textContent = profile.name;
  });
}
```

````html
<p>His name is <span id="name"></span></p>
```

You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

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

### 6. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

````js
localStorage.removeItem('id_token');
delete window.profile;
window.location.href = "/";
```

### 7. You're done!

You've implemented Login and Signup with Auth0 and VanillaJS.
