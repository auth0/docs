---
title: Customizing Lock
description: This tutorial demonstrates how to customize the Lock widget
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '10-Customizing-Lock,
  pkgFilePath: '10-Customizing-Lock/auth0.variables.js',
  pkgType: 'replace'
}) %>

<%= include('../../_includes/_signup') %>

Using Lock is easy, but you may want to customize your login UI. There are several options available for this.

## Lock Options

Some UI customization can be done via the `options` parameter when initializing a `lockProvider`.

## Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values:

```js
// app.js

(function () {

    ...

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    ...

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        theme: {
          logo: 'https://auth0.com/lib/homepage/img/logo-tmz.svg',
          primaryColor: "#b81b1c"
        }
      }
    });
  }

})();
```

**NOTE**: For more information, see the [theming options](https://github.com/auth0/lock#theming-options).

## Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter:

```js
// app.js

(function () {

    ...

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    ...

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        languageDictionary: {
          title: "Log me in"
        }
      }
    });
  }

})();
```

> **NOTE**: For more information, see the [Language Dictionary Specification](https://github.com/auth0/lock#language-dictionary-specification).

This is how Lock will appear using a custom logo, color, and title:

![Custom lock](/media/articles/angularjs/widget-custom-logo-color.png)
