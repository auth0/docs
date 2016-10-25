---
title: Customizing Lock
description: This tutorial demonstrates how to customize the Lock widget
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '10-Customizing-Lock'
}) %>

Using Lock is easy, but you may want to customize your login UI. There are several options available for this.

## Lock Options

Some UI customization can be done via the `options` parameter when initializing a `lockProvider`.

## Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config(lockProvider) {

    lockProvider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
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

**Note**: See the [theming options](https://github.com/auth0/lock#theming-options) documentation for more detail.

## Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter:

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config(lockProvider) {

    lockProvider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
      options: {
        languageDictionary: {
          title: "Log me in"
        }
      }
    });
  }

})();
```

> **Note**: See the [Language Dictionary Specification](https://github.com/auth0/lock#language-dictionary-specification) for more information.

This is how Lock will appear using a custom logo, color, and title:

![Custom lock](/media/articles/angularjs/widget-custom-logo-color.png)
