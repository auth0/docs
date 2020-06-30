---
description: Describes the MFA Widget theme options for customizing the theme properties of the MFA pages. 
topics:
  - mfa
  - hosted-pages
contentType: reference
useCase: customize-hosted-pages
---
# MFA Widget Theme Options

When using your own HTML, it uses the Auth0 MFA Widget, which has the following limitations:
- It does not support MFA with Email.
- If users enrolled more than one factor, they cannot select which one to use, the MFA widget will ask them to login with the most secure factor.
- It does not use Universal Login's [internationalization](/universal-login/i18n) features

There are a few theming options for the MFA Widget, namespaced under the `theme` property.

## icon

The value for `icon` is the URL for an image that will be used in the MFA Widget header, which defaults to the Auth0 logo. It has a recommended max height of `58px` for a better user experience.

```js
return new Auth0MFAWidget({

...

  theme: {
    icon: 'https://example.com/assets/logo.png'
  },
  
...

})
```

## primaryColor

The `primaryColor` property defines the primary color of the MFA Widget. This option is useful when providing a custom `icon`, to ensure all colors go well together with the `icon`'s color palette. Defaults to `#ea5323`.

```js
return new Auth0MFAWidget({

...

  theme: {
    icon: 'https://example.com/assets/logo.png',
    primaryColor: 'blue'
  },
  
...  
  
})
```

## Keep reading

* [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js)
* [Widget Example Using auth0-guardian.js](https://github.com/auth0/auth0-guardian.js/tree/master/example)
* [Multi-factor Authentication with Classic Universal Login](/universal-login/multifactor-authentication)
