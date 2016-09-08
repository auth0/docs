---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
---

Using Lock widget is easy, but you may want to customize your login UI. There are several options available.

## Lock options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.

### Theme options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values when initializing the auth0 Lock widget. For more information, see: [Theming Options](/libraries/lock/v10/customization#theming-options).

```javascript
var lock = new Auth0Lock(clientId, domain, {
  theme: {
    logo: LogoImg,
    primaryColor: "#b81b1c"
  }
});
```

### Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter.
 For more information, see: [Language Dictionary Specification](/libraries/lock/v10/customization#languagedictionary-object-).

```javascript
var lock = new Auth0Lock(clientId, domain, {
  languageDictionary: {
    title: "My Company"
  }
});
```
