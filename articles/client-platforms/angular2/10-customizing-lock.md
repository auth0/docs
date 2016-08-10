---
title: Customizing Lock
description: This tutorial will show you how to customize Lock.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '10-Customizing-Lock',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

Using Lock is easy, but you may want to customize your login UI. There are several options available.

## Lock Options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.

### Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values:

```typescript
lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  theme: {
    logo: "test-icon.png",
    primaryColor: "#b81b1c"
  }
});
```
**NOTE**: For more information, see: [Theming options](https://github.com/auth0/lock#theming-options).

### Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter:

```typescript
lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  languageDictionary: {
    title: "My Company"
  }
});
```

**NOTE**: For more information, see: [Language Dictionary Specification](https://github.com/auth0/lock#language-dictionary-specification).

### Results

This is how Lock will appear using a custom logo, color, and title:

![Custom lock](/media/articles/angularjs2/widget-custom-logo-color.png)

