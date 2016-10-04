---
title: Customizing Lock
description: This tutorial demonstrates how to customize the Lock widget
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '09-Customizing-Lock',
  pkgFilePath: '09-Customizing-Lock/www/auth0.variables.js',
  pkgType: 'replace'
}) %>



Using Lock is easy, but you may want to customize your login UI. There are several options available for this.

## Lock Options

Some UI customization can be done via the `options` parameter when initializing a `lockProvider`.

## Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values:

```js
// www/app.js

(function () {

	...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
   
    ...

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          redirect: false,
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        },
        theme: {
          logo: 'https://auth0.com/lib/homepage/img/logo-tmz.svg',
          primaryColor: "#b81b1c"
        }
      }
    });

	...

})();
```

**NOTE**: For more information, see the [theming options](https://github.com/auth0/lock#theming-options).

## Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter:

```js
// www/app.js

(function () {

	...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
   
    ...

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          redirect: false,
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        },
        languageDictionary: {
          title: "Log me in"
        }
      }
    });

	...

})();
```

> **NOTE**: For more information, see the [Language Dictionary Specification](https://github.com/auth0/lock#language-dictionary-specification).

This is how Lock will appear using a custom logo, color, and title:

<div class="phone-mockup">
  <img src="/media/articles/native-platforms/ionic/image_customizing_lock.png" alt="Mobile example screenshot"/>
</div>
