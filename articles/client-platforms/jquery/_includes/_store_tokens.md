## Storing the Returned Tokens

Once the user has successfully authenticated, their access token and ID token will be returned in a URL hash. These values can be captured using the `parseHash` method from **auth0.js**. Once the hash is parsed, the tokens can be saved in local storage for later use and various UI elements can be hidden and shown to indicate that the user has successfully logged in.

```js
var authResult = auth.parseHash(window.location.hash);

if (authResult && authResult.accessToken && authResult.idToken) {
  window.location.hash = '';
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  $('#login-message').hide();
  $('#logged-in-message').show();
  $('.btn-login').hide();
  $('.btn-logout').show();
}
```