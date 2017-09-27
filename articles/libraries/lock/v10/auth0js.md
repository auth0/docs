---
section: libraries
description: How to use Lock v10 with auth0.js
---
# Using Lock With auth0.js

By nature, Lock and the Auth0.js SDK are different things. Lock provides a UI that is customizable (to an extent) with behavior that is customizable (to an extent). It is an easily deployed, easily used interface for Auth0 authentication in custom applications. It is also easily used within the Auth0 [Hosted Login Page](/hosted-pages/login).

For simple uses, Lock is all that is necessary. However, while using Lock, if more customization is required in an application than Lock allows, functionality from the Auth0.js SDK can be used alongside Lock to meet those needs. An example might be using Lock to handle signups and logins, while using auth0.js to [manage users](/libraries/auth0js#user-management) (read and update user metadata, link user accounts together, and similar tasks).

## Using auth0.js v8

### Including auth0.js

If you included the Lock script from the Auth0 CDN, you will need to also include the auth0.js script before Lock:

```html
<script src="${auth0js_urlv8}"></script>
<script src="${lock_url}"></script>
```

If you installed Lock from npm, you should include `auth0-js` in your project dependencies and import it to pin the `auth0-js` version you're using. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var auth0 = require('auth0-js');
```

### Initiating auth0.js

Then, to use `auth0.js`, simply instantiate a new `Auth0` object:

```js
var auth0 = new Auth0({
  domain: "${account.namespace}",
  clientID: "${account.clientId}"
});
```

If you need further detail about usage, check out the [Auth0.js v8 Reference](/libraries/auth0js).

## Using auth0.js v7

### Including auth0.js v7

If you included the Lock script from the Auth0 CDN, you will need to also include the auth0.js script before Lock:

```html
<script src="${auth0js_url}"></script>
<script src="${auth0js_urlv8}"></script>
```

If you installed Lock from npm, you must include `auth0-js` in your project dependencies and import it. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var Auth0 = require('auth0-js');
```

### Initiating auth0.js v7

Then, to use `auth0.js`, simply instantiate a new `Auth0` object:

```js
var client = new Auth0({
  domain:       '${account.namespace}',
  clientID:     '${account.clientId}',
  callbackURL:  '{YOUR APP URL}',
  responseType: 'token'
});
```

If you need further detail about usage, check out the [Auth0.js v7 Reference](/libraries/auth0js/v7).
