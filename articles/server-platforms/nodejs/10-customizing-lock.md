---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nodejs-webapp-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgBranch: 'master',
  pkgPath: '10-Customizing-Lock',
  pkgType: 'server'
}) %>

Using the Lock widget is easy, but it might be necessary to customize the UI for it. There are several options available to do so.

## Lock Options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance. These options can be found in the [full documentation](https://auth0.com/docs/libraries/lock/v10/customization).

## Theme options

Theme properties, such as a different logo or primary color, can be set by adding a `theme` property with custom values when initializing the Lock widget. For more information, see: [Theming Options](/libraries/lock/v10/customization#theming-options).

```js
var lock = new Auth0Lock(clientId, domain, {
  theme: {
    logo: 'https://example.com/assets/logo.png',
    primaryColor: 'green'
  }
});
```

### Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter. For more information, see: [Language Dictionary Specification](/libraries/lock/v10/customization#languagedictionary-object-).

```js
var lock = new Auth0Lock(clientId, domain, {
  languageDictionary: {
    title: "My Company"
  }
});
```

### Results

This is how Lock will appear using a custom logo, color, and title:

![Custom lock](/media/articles/reactjs/widget-custom-logo-color.png)

## Further Reading

For more information, read read the [full documentation](https://auth0.com/docs/libraries/lock/v10/customization) on Lock customization options.
