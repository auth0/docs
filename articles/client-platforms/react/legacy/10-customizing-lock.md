---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
budicon: 285
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '10-Customizing-Lock',
  requirements: [
    'React 15.3'
  ]
}) %>

Using Lock is easy, but you may want to customize your login UI. For that, there are several [customization options](/libraries/lock/v10/customization) available.

## Lock options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.

## Theme options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values when initializing the auth0 Lock widget. For more information, see: [Theming Options](/libraries/lock/v10/customization#theming-options).

Modify `AuthService.js` to apply a custom theme:

```javascript
// src/utils/AuthService.js

import LogoImg from 'images/test-icon.png';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      theme: {
        logo: LogoImg,
        primaryColor: "#b81b1c"
      },
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    })
    // ...
  }
  // ...
}
```

## Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter.
 For more information, see: [Language Dictionary Specification](/libraries/lock/v10/customization#languagedictionary-object-).

```javascript
// src/utils/AuthService.js

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      languageDictionary: {
        title: "My Company"
      }
    })
    // ...
  }
  // ...
}
```

## Results

This is how Lock will appear using a custom logo, color, and title:

![Custom lock](/media/articles/reactjs/widget-custom-logo-color.png)
