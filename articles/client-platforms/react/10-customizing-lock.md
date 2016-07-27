---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.2.0
* NPM 3.3.12
* React 15.0.2
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/10-Customizing-Lock',
}) %>_

Using Lock widget is great, but eventually you will want to customize the UI. There are several options to do that.

## 1. Lock options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance.
So, let's modify our `AuthService` helper to do that.


### Theme options

You can set custom theme properties like using a different logo, or changing the primary color.
Just add a `theme` property with custom values when initializing the auth0 Lock widget.
See full details [here](/libraries/lock/v10/customization#theming-options)


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

You can also customize every piece of text `Lock` needs to display. The option parameter to do this is `languageDictionary`. 
See full details [here](/libraries/lock/v10/customization#languagedictionary-object-)

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

This is how it looks like using custom logo, color, and title:

![Custom lock](/media/articles/reactjs/widget-custom-logo-color.png)


<!-- CSS specification -->

### 2. All done!

You have implemented the customization of the Lock widget.
