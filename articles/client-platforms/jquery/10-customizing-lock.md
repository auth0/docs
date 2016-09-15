---
title: Customizing Lock
description: This tutorial demonstrates how to customize Lock.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '10-Customizing-Lock',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

Using Lock is easy, but you may want to customize your login UI. There are several [customization](/libraries/lock/v10/customization) options available. The aspects explained here are not the only customizations available.

## Lock Options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.

### Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values:

```javascript
// app.js

var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  theme: {
    logo: "test-icon.png",
    primaryColor: "#b81b1c"
  }
});
```
For more information, see the [theming options](/libraries/lock/v10/ui-customization) documenation.

### Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter:

```javascript
// app.js

var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  languageDictionary: {
    title: "My Company"
  }
});
```

For more information, see the [language dictionary specification](/libraries/lock/v10/i18n) documenation.
