## Provide a Logout Function

Since JWT is a stateless method of authentication, all that is required to log the user out is to remove their tokens from local storage. Create a function which removes the tokens and adjusts the UI to indicate to the user that they have logged out.

```js
// app.js

function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  window.location.href = "/";
  $('#login-message').show();
  $('#logged-in-message').hide();
  $('.btn-login').show();
  $('.btn-logout').hide();
}
```

This function can now be called when the user clicks a **Log Out** button.

```html
<!-- index.html -->

<button class="btn btn-primary btn-logout">Log Out</button>
```

```js
// app.js

$('.btn-logout').click(function(e) {
  e.preventDefault();
  logout();
});
```