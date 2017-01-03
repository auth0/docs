## 1. Add the Auth0 Scripts and set the Viewport

Add the code below to the `index.html` file to include the Lock widget library and set the viewport:

```html
<!-- index.html -->
<head>

  <!-- Auth0 lock script -->
  <script src="${lock_url}"></script>

  <!-- Setting the right viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
```

## 2. Configure Lock

Configure Lock with your `client ID` and `domain`:

To discover all the available options for `Auth0Lock`, see [the Lock customization documentation](/libraries/lock/customization).

```js
// app.js

var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');
```

## 3. Implement the Login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button.

```js
// app.js

var btn_login = document.getElementById('btn-login');

btn_login.addEventListener('click', function() {
  lock.show();
});
```

```html
<!-- index.html -->

<button type="submit" id="btn-login">Sign In</button>
```

After authentication, Auth0 will redirect the user back to your application with an identifying token. This token is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `id_token` is stored in `localStorage` to keep the user authenticated after each page refresh:

```js
// app.js

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem('id_token', authResult.idToken);
    // Display user information
    show_profile_info(profile);
  });
});
```
