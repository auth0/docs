---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Node 5.2.0
* NPM 3.3.12
* React 15.3.2
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-react-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-react-sample',
  pkgBranch: 'master',
  pkgPath: '10-Customizing-Lock',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

Using Lock widget is easy, but you may want to customize your login UI. There are several options available.

## Lock options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.

### Theme options

You can set custom theme properties, such as a different logo or primary color, by adding a `theme` property with custom values when initializing the auth0 Lock widget. For more information, see: [Theming Options](/libraries/lock/v10/customization#theming-options).

Modify `AuthService.js` to apply a custom theme:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
... //omitting some code
import LogoImg from 'images/test-icon.png';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      theme: {
        logo: LogoImg,
        primaryColor: "#b81b1c"
      }
    })
    ... //omitting some code
  }
  ... //omitting some code
}
```

### Language Dictionary Specification

You can also customize the text that `Lock` will display with the `languageDictionary` option parameter. 
 For more information, see: [Language Dictionary Specification](/libraries/lock/v10/customization#languagedictionary-object-).

```javascript
/* ===== ./src/utils/AuthService.js ===== */
... //omitting some code

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      languageDictionary: {
        title: "My Company"
      }
    })
    ... //omitting some code
  }
  ... //omitting some code
}
```

### Results

This is how Lock will appear using a custom logo, color, and title:

![Custom lock](/media/articles/reactjs/widget-custom-logo-color.png)
