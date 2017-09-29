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

<div class="code-picker">
	<div class="languages-bar">
	  <ul>
	    <li><a href="#cdn-v8" data-toggle="tab">Using Auth0.js v8</a></li>
	    <li><a href="#cdn-v7" data-toggle="tab">Using Auth0.js v7</a></li>
	  </ul>
	</div>
	<div class="tab-content">
	  <div id="cdn-v8" class="tab-pane active">
	  <pre class="hljs html"><code>
	&lt;script src="${auth0js_urlv8}"&gt;&lt;/script&gt;
	&lt;script src="${lock_url}"&gt;&lt;/script&gt;
	  </code></pre>
	  </div>
	  <div id="cdn-v7" class="tab-pane">
	  <pre class="hljs html"><code>
	&lt;script src="${auth0js_url}"&gt;&lt;/script&gt;
	&lt;script src="${lock_url}"&gt;&lt;/script&gt;
	  </code></pre>
	  </div>
	</div>
</div>

If you installed Lock from npm, you should include `auth0-js` in your project dependencies and import it to pin the particular `auth0-js` version you're using. Before instantiating the `Auth0` object, you will need to require `auth0-js`:

```js
var auth0 = require('auth0-js');
```

Then, to use `auth0.js`, simply instantiate a new object:

<div class="code-picker">
	<div class="languages-bar">
	  <ul>
	    <li><a href="#instantiate-v8" data-toggle="tab">Auth0.js v8</a></li>
	    <li><a href="#instantiate-v7" data-toggle="tab">Auth0.js v7</a></li>
	  </ul>
	</div>
	<div class="tab-content">
	  <div id="instantiate-v8" class="tab-pane active">
	  <pre class="hljs js"><code>
	var webAuth = new auth0.WebAuth({
	  domain:       '${account.namespace}',
	  clientID:     '${account.clientId}'
	});
	  </code></pre>
	  </div>
	  <div id="instantiate-v7" class="tab-pane">
	  <pre class="hljs js"><code>
	var auth0 = new Auth0({
	  domain:       '${account.namespace}',
	  clientID:     '${account.clientId}',
	  callbackURL:  '{YOUR APP URL}',
	  responseType: 'token'
	});
	  </code></pre>
	  </div>
	</div>
</div>

If you need further detail about usage, check out the [Auth0.js v8 Reference](/libraries/auth0js).
