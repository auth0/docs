---
url: /libraries/lock/v10
sitemap: false
---

# Lock 10 Preview

Lock 10 is a new version of the Auth0 authentication widget that provides:

* support for custom sign up fields;
* easier [redirect mode](/libraries/lock/authentication-modes#redirect-mode) implementation;
* improved UX;

Auth0 plans to have two beta releases and a release candidate.

Please note that the following features, which are available on Lock 9 (the current stable release), are not yet available with Lock 10:
- Enterprise connection support;
- Internationalization (i18n);
- Widget lifecycle events.

<<<<<<< HEAD
::: panel-warning Version Notice
Since this is an early preview we recommend to install with full version (x.y.z).
:::

From CDN

```html
<script src="http://cdn.auth0.com/js/lock-next-2.2.1.min.js"></script>
```

From [bower](http://bower.io)

```sh
bower install auth0-lock-next
```

```html
<script src="bower_components/auth0-lock-next/dist/auth0-lock-next.min.js"></script>
```

From [npm](https://npmjs.org)

```sh
npm install auth0-lock-next
```

After installing the `auth0-lock-next` module, you'll need to bundle it up along with all of its dependencies. We have examples for [browserify](examples/bundling/browserify/) and [webpack](examples/bundling/webpack/).

If you are targeting mobile audiences, it's recommended that you add:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```
## What's new?

* Redirect mode is used by default and popup mode needs to be enabled explicitly. You can review [this section](#redirect-mode-vs-popup-mode) for more information about why we decided this.
* The public API has been changed to make it easier to use redirect mode and make both programming models look similar.
* Foreign languages are not provided on the Beta 1 release but still dictionary custommization can be done through `dict`.
* Simple theming capabilities through JavaScript (`primaryColor` and `logo`). Markup and CSS changes done by Auth0 will no longer be considered breaking.
* Improved UX. We implemented smoother transitions, animations, keyboard friendly.
* Support for pre-filled fields and custom avatar implementations.
* Support for custom sign up fields.

Learn [how to migrate to the new version of Lock](#how-to-migrate-to-lock-10)

## Roadmap

We have planned two beta releases and a release candidate. The features currently available on Lock 9 (stable release) are not available yet on Lock 10. Namely, enterprise connection support, i18n and widget lifecycle events.

## How to migrate to Lock 10

Start by [installing](#install) Lock 10. You can use our CDN, `NPM` or `bower`.

Now, the new version of lock implements [Redirect mode](/libraries/lock/authentication-modes#redirect-mode) by default. If you'd like to use [Popup mode](/libraries/lock/authentication-modes#popup-mode), you can skip to [this section](#popup-mode). __Note:__ We recommend using redirect mode since it's less error-prone than popup mode. You can review [this section](#redirect-mode-vs-popup-mode) for more information regarding this matter.

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
=======
## What's new?

* Lock now uses Redirect Mode by default. To use Popup Mode, you must enable this explicitly.
* The Lock Public API has been updated so that the views are similar regardless of whether you are using Redirect Mode or Popup Mode. The Public API is also easier to use with Redirect Mode.
* The Beta 1 release of Lock does not support foreign languages, but you can still customize the dictionary via `dict`.
* You can create simple Lock themes using JavaScript to via `primaryColor` and `logo`. You may also make customizations using markup/CSS.
* The improved Lock UX comes with smoother transitions and animations and is keyboard friendly.
* Lock comes with support for pre-filled fields and custom avatar implementations.
* Lock comes with support for custom sign up fields.
>>>>>>> 8fa4aacf9531a53f7759debe64b7d5962f8cf872

Please see [New Features in Lock 10](/libraries/lock/v19/new-features.md) for additional information.

## Migrating to Lock 10

<<<<<<< HEAD
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

### Redirect Mode vs Popup Mode

In this new version of Lock, redirect is the default [authentication mode](/libraries/lock/authentication-modes). In this mode, your app gets redirected to the identity provider's (IdP) site and then, after authentication, that IdP will redirect you back to your app through Auth0. This offers some advantages, such as:

* Browser compatibility. Since there is a known bug in Chrome for iOS that prevents popup mode from functioning properly.
* Avoid errors caused by popup blockers (since on popup mode, a popup window is used).

Therefore, we recommend using redirect mode, and only using popup mode if you must.
=======
Please see [Migrating to Lock 10](/libraries/lock/v10/installation.md) for installation instructions.
>>>>>>> 8fa4aacf9531a53f7759debe64b7d5962f8cf872
