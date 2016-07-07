---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/09-Customizing-Lock',
}) %>_

Using Lock widget is great, but eventually you will want to customize the UI. There are several options to do that.

### Lock options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.


#### Theme options

You can set custom theme properties like using a different logo, or changing the primary color.
Just add a `theme` property with custom values. 
See full details [here](https://github.com/auth0/lock/tree/v10.0.0-rc.1#theming-options)

```typescript
lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  theme: {
    logo: "test-icon.png",
    primaryColor: "#b81b1c"
  }
});
```

#### Language Dictionary Specification

You can also customize every piece of text `Lock` needs to display. The option parameter to do this is `languageDictionary `. See full details [here](https://github.com/auth0/lock/tree/v10.0.0-rc.1#language-dictionary-specification)

```typescript
lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  languageDictionary: {
    title: "My Company"
  }
});
```
#### Results

This is how it looks like using custom logo, color, and title:

![Custom lock](/media/articles/login-widget/widget-custom-logo-color.png)


<!-- ### CSS specification -->