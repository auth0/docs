## Migrating to Lock 10

::: panel-warning Version Notice
Because this is an early preview of Lock 10, we recommend installing the full version (x.y.z).
:::

You can get the required Lock installation package from several sources.

CDN:

```html
<script src="http://cdn.auth0.com/js/lock-next-2.2.1.min.js"></script>
```

[Bower](http://bower.io):

```sh
bower install auth0-lock-next
```

```html
<script src="bower_components/auth0-lock-next/dist/auth0-lock-next.min.js"></script>
```

[npm](https://npmjs.org):

```sh
npm install auth0-lock-next
```

After installing the `auth0-lock-next` module, you will need bundle it up along with all of its dependencies. We have examples for [browserify](examples/bundling/browserify/) and [webpack](examples/bundling/webpack/).

If you are targeting mobile audiences, we recommend adding the following to the `head` element of your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```


__Note:__ Auth0 recommends using Redirect Mode over Popup Mode.

## Implementing Lock with Redirect Mode

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {}, function(error, result) {
  // Will always be executed. Execution will happen on a later frame, so the
  // `lock` variable and everything will be available on scope.
  if (error) {
    // Handle error
  }

  if (result) {
    // We need to check for a result, if there was an error `result` will be undefined.

    // store the token and profile in local storage (or wherever you choose)
    localStorage.setItem('id_token', result.idToken);
    localStorage.setItem('profile', JSON.stringify(result.profile));

  }
});
```

## Implementing Lock with Popup Mode

To implement Popup Mode in lieu of Redirect Mode, pass `false` to the `Authentication` parameter:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}',
{ authentication: { redirect: false } },
function(error, result) {
    if (error) {
      // Handle error
    }

    if (result) {
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem('profile', JSON.stringify(result.profile));
    }
  });
```

## Showing the Lock

Call the `show` method to display the lock (the method call has not changed since Lock 9).

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```
__Note:__ The `showSignup`, `showSignin` and `showReset` parameters are not available in Lock 10.


## Displaying the User's Profile

Use the `id_token` and `profile` you've saved in `localStorage` to display the user's profile. This method also keeps the user logged in after a page refresh.

```js
//Verify that there's a token in localStorage
var id_token = localStorage.getItem('id_token');
if (id_token) {
    showLoggedIn();
}

//Display the user's profile
function showLoggedIn() {
  var profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}
```

```html
 <h2>Welcome <span id="nick" class="nickname"></span></h2>
```
