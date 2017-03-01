---
section: libraries
description: How to use Lock V10 with auth0.js
---

<%= include('../_includes/_lock-version') %>

# Using Lock With auth0.js

If you try to use auth0.js along with Lock 10, you will not be able to call `getClient()`. Instead, you should include its dependency and instantiate the object.

In the past, a version of auth0.js was included automatically with Lock; at this point, you must include auth0.js yourself, allowing you to choose the supported version of auth0.js that best suits the needs of your application - version 7, or version 8. Note that the two versions have different CDN paths, as well as slightly different instantiations.

## Using auth0.js v8

### Including auth0.js

If you included the Lock script from the Auth0 CDN, you will need to also include the auth0.js script before Lock:

```html
<script src="https://cdn.auth0.com/js/auth0/8.0.0/auth0.min.js"></script>
<script src="https://cdn.auth0.com/js/lock/10.9.0/lock.min.js"></script>
```

If you installed Lock from npm, you must include `auth0-js` in your project dependencies and import it. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var Auth0 = require('auth0-js');
```

### Initiating auth0.js

Then, to use `auth0.js`, simply instantiate a new `Auth0` object:

```js
var auth0 = new auth0.WebAuth({
  domain: "${account.namespace}",
  clientID: "${account.clientId}"
});
```

If you need further detail about usage, check out the [Auth0.js v8 Reference](/libraries/auth0js).

## Using auth0.js v7

### Including auth0.js

If you included the Lock script from the Auth0 CDN, you will need to also include the auth0.js script before Lock:

```html
<script src="https://cdn.auth0.com/w2/auth0-7.6.1.min.js"></script>
<script src="https://cdn.auth0.com/js/lock/10.9.0/lock.min.js"></script>
```

If you installed Lock from npm, you must include `auth0-js` in your project dependencies and import it. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var Auth0 = require('auth0-js');
```

### Initiating auth0.js

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

<%= include('../_includes/_lock-toc') %>
