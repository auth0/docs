---
url: /libraries/lock/v10
sitemap: false
---

# Lock 10 Preview

Lock 10 is a new version of the authentication widget that provides:

* support for custom sign up fields;
* easier [redirect mode](/libraries/lock/authentication-modes#redirect-mode) implementation;
* improved UX;

Currently, there is no support for foreign languages on the Beta 1 release (but we'll improve that soon).

Please see the [what's new](#what's-new) document for information about the differences between the old and new versions of Lock.

## Installation

::: panel-warning Version Notice
Because this is an early preview, we recommend installing the full version (x.y.z).
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

If you are targeting mobile audiences, we recommend that you add the following to the `head` element of your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

## What's new?

* By default, Lock uses redirect mode. Popup mode needs to be enabled explicitly.
* The public API has been updated to make it easier to use redirect mode. Both programming models now look similar.
* The Beta 1 release of Lock does not support foreign languages, but you can still customize the dictionary via `dict`.
* You can use JavaScript to create simple themes via `primaryColor` and `logo`. You may also use Markup and make CSS changes via Auth0.
* The improved UX comes with smoother transitions and animations and is keyboard friendly.
* Lock comes with support for pre-filled fields and custom avatar implementations.
* Lock comes with support for custom sign up fields.

Learn [how to migrate to the new version of Lock](#how-to-migrate-to-lock-10)

## Roadmap

We have planned two beta releases and a release candidate. The features currently available on Lock 9 (stable release) are not available yet on Lock 10. Namely, enterprise connection support, i18n and widget lifecycle events.

## How to migrate to Lock 10

Start by [installing](#install) Lock 10. You can use our CDN, `NPM` or `bower`.

Now, the new version of lock implements [Redirect mode](/libraries/lock/authentication-modes#redirect-mode) by default. If you'd like to use [Popup mode](/libraries/lock/authentication-modes#popup-mode), you can skip to [this section](#popup-mode). __Note:__ We recommend using redirect mode since it's less error-prone than popup mode (explain why).

### Redirect mode

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

Click [here](#implement-the-login) to skip the popup mode section.

### Popup mode

To implement Popup Mode, just make redirect `false` on the [Authentication options](#authentication-options):

```js
var lock = new Auth0Lock(
'${account.clientId}',
'${account.namespace}',
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

### Show

Call the .show() method of Auth0's lock instance the same way you used to. __Note:__ `showSignup`, `showSignin` and `showReset` are not available.

```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});
```

### Display the user's profile

Use the `id_token` and `profile` you've saved in `localStorage` to display the user's profile. This method also keeps the user logged in after a page refresh.

```js
//Verifiy that there's a token in localStorage
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
### Authentication options

Authentication options now have their own namespace.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    authentication: {
      authParams: {}
      callbackURL: window.location.href
      forceJSONP: false,
      redirect: true,
      responseType: "token",
      sso: true
    }
  },
  function(error, result) {
    // handle auth
});
```

### Initial screen

If you want to initially show lock in a predefined way, you can use the `inistialScreen` option. Valid values are `"signUp"`, `"login"` and `"resetPassword"`.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    initialScreen: "signUp" //"login" or "resetPassword"
  },
  function(error, result) {
    // handle auth
});
```
### Theming

Currently, the only theme option available is `primaryColor`, but more will be added soon. You can set it up as follows.

```js
var lock = new AuthLock(
  '${account.clientId}',
  '${account.namespace}',
  {
    theme: {
      primaryColor: "#49dd81"
    }
  },
  function(error, result) {
    // handle auth
});
```
