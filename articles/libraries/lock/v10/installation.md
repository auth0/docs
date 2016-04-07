## Migrating to Lock 10

::: panel-warning Version Notice
Because this is an early preview of Lock 10, we recommend installing the full version (10.0.0-beta.1).
:::

You can get the required Lock installation package from several sources.

CDN:

```html
<script src="https://cdn.auth0.com/js/lock/10.0.0-beta.1/lock.min.js"></script>
```

[Bower](http://bower.io):

```sh
bower install auth0-lock#10.0.0-beta.1
```

```html
<script src="bower_components/auth0-lock/build/lock.min.js"></script>
```

[npm](https://npmjs.org):

```sh
npm install --save auth0-lock@beta
```

After installing the `auth0-lock` module, you will need bundle it up. We have examples for [browserify](https://github.com/auth0/lock/tree/v10/examples/bundling/browserify) and [webpack](https://github.com/auth0/lock/tree/v10/examples/bundling/webpack).

If you are targeting mobile audiences, we recommend adding the following to the `head` element of your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

## Implementing Lock with Redirect Mode

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {}, function(error, result) {
  // Will always be executed. Execution will happen on a later frame, so the
  // `lock` variable and everything will be available on scope.

  if (error) {
    // Handle error
  }

  if (result) {
    // We need to check for a result. When lock is constructed it will
    // always attempt to auhtenticate the user. If it can't, `result`
    // will be `undefined`.

    // Store the token and profile in local storage (or wherever you choose)
    localStorage.setItem('id_token', result.idToken);
    localStorage.setItem('profile', JSON.stringify(result.profile));
  }
});
```

## Implementing Lock with Popup Mode

__Note:__ Auth0 recommends using Redirect Mode over Popup Mode.

To implement Popup Mode in lieu of Redirect Mode, pass `false` to the auth `redirect` parameter:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}',
  { auth: { redirect: false } },
  function(error, result) {
    // Will be executed after a login attemp.

    if (error) {
      // Handle error
    }

    if (result) {
      // Store the token and profile in local storage (or wherever you choose)
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem('profile', JSON.stringify(result.profile));
    }
  });
```

## Showing the Lock

Call the `show` method to display the widget.

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```
__Note:__ The `showSignup`, `showSignin` and `showReset` parameters are not available in Lock 10.


## Displaying the User's Profile

Use the `id_token` and `profile` you've saved in `localStorage` to display the user's profile. This method also keeps the user logged in after a page refresh.

```js
// Verify that there's a token in localStorage
var id_token = localStorage.getItem('id_token');
if (id_token) {
  showLoggedIn();
}

// Display the user's profile
function showLoggedIn() {
  var profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}
```

```html
 <h2>Welcome <span id="nick" class="nickname"></span></h2>
```
