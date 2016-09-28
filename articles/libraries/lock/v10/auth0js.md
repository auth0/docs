---
description: How to use Lock V10 with auth0.js
---

<%= include('../_includes/_lock-version') %>

# Using Lock With auth0.js

If you try to use `auth0.js` along with Lock 10, you will not be able to call `getClient()`. Instead, you should instantiate an `Auth0` object.

If you included the script from the Auth0 CDN or installed Lock from bower, you only need to instantiate the `Auth0` object to use it with Lock (see below). 

If you installed Lock from npm, you must include `auth0-js` in your project dependencies and import it. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var Auth0 = require('auth0-js');
```

Then, to use `auth0.js`, simply instantiate a new `Auth0` object:

```js
var client = new Auth0({
  domain:       '${account.namespace}',
  clientID:     '${account.clientId}',
  callbackURL:  '{YOUR APP URL}',
  responseType: 'token'
});
```

<%= include('../_includes/_lock-toc') %>
