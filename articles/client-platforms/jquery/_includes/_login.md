## Provide a Login Function

To trigger authentication with **auth0.js**, call its `login` method. Pass a `responseType` of `token id_token` to indicate that you would like to receive an access token and an ID token back and include a `redirectUri` pointing to where you would like the user to be redirected to once authentication is complete. This is typically the location from which the log in process started. 

```js
// app.js

function login() {
  auth.login({
    responseType: 'token id_token',
    redirectUri: window.location.href
  });
}
```

This function can now be called when a user clicks a **Log In** button in the application.

```html
<!-- index.html -->

<button class="btn btn-primary btn-login">Log In</button>
```

```js
// app.js

$('.btn-login').click(function(e) {
  e.preventDefault();
  login();
});
```

When the **Log In** button is clicked, the user will be redirected to Auth0's hosted login page where they can enter their credentials.

![hosted lock](/media/articles/jquery/hosted-lock.png)

> **Note:** The hosted Lock widget can be fully customized in the [Hosted Pages](${manage_url}/#/login_page) section of your Auth0 dashbaord. For details about how to customize Lock, see the [documentation](/lock).

