---
title: Customizing Lock
description: This tutorial demonstrates how to customize Lock.
budicon: 285
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs2-systemjs-sample',
  path: '10-Customizing-Lock'
}) %>

Using Lock is easy, but you may want to customize your login UI. For that, there are several [customization options](/libraries/lock/v10/customization) available.

## Lock Options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.

### Theme Options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values:

```typescript
// auth.service.ts

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
// auth.service.ts

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

