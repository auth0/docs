---
title: Customizing Lock
description: This tutorial demonstrates how to customize the Lock widget
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '10-Customizing-Lock'
}) %>

Using Lock is easy, but you may want to customize your login UI. For that, there are several [customization options](/libraries/lock/v10/customization) available.

## Lock Options

Some UI customization can be done via the `options` parameter when creating a `Auth0Lock` instance.

### Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values.

```js
// app.js

var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>', {
  theme: {
    logo: "test-icon.png",
    primaryColor: "#b81b1c"
  }
});
```

For more information, see the [theming options](/libraries/lock/v10/ui-customization).

### Language Dictionary Specification

You can also customize the text that Lock will display with the `languageDictionary` option parameter.

```js
// app.js

var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>', {
  languageDictionary: {
    title: "My Company"
  }
});
```

For more information, see [language dictionary specification](/libraries/lock/v10/i18n).
