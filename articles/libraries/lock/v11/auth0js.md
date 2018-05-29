---
section: libraries
description: How to use Lock v11 with auth0.js v9
tags:
  - libraries
  - lock
  - auth0js
---
# Using Lock With auth0.js

By nature, Lock and the Auth0.js SDK are different things. Lock provides a UI that is customizable (to an extent) with behavior that is customizable (to an extent). It is an easily deployed, easily used interface for Auth0 authentication in custom applications.

For simple uses, Lock is all that is necessary. However, while using Lock, if more customization is required in an application than Lock allows, functionality from the Auth0.js SDK can be used alongside Lock to meet those needs. An example might be using Lock to handle signups and logins, while using auth0.js to [manage users](/libraries/auth0js#user-management) (read and update user metadata, link user accounts together, and similar tasks).

### Including auth0.js

If you are using the Auth0 CDN, you can also include the auth0.js script in the same manner:

```html
<script src="${auth0js_urlv9}"></script>
<script src="${lock_urlv11}"></script>
```

If you installed Lock from npm, you should include `auth0-js` in your project dependencies and import it to pin the particular `auth0-js` version you're using. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var auth0 = require('auth0-js');
```

Then, to use `auth0.js`, simply instantiate a new object:

```js
var webAuth = new auth0.WebAuth({
  domain:       '${account.namespace}',
  clientID:     '${account.clientId}'
});
```

If you need further detail about usage, check out the [Auth0.js v9 Reference](/libraries/auth0js).
