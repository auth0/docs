---
description: How to use auth0.js v8 in the Hosted Login page
---

# Using Auth0.js v8 in the Hosted Login Page

Within the Hosted Login page, you can use the the [Auth0.js library](/libraries/auth0js), instead of [Lock](/libraries/lock), to perform authentication using a custom UI. You can also use Auth0.js _in addition_ to Lock, for authentication or user management tasks. 

To do this, you'll need to provide all the parameters requested in `config.internalOptions`.

In this example, you'll build an authorization link that takes the user directly to a specific Connection using [Auth0.js v8](/libraries/auth0js).

```html
[...]
<a id="direct-link" href="">A direct link to the IdP</a>
<script src="https://cdn.auth0.com/js/auth0/8.3.0/auth0.min.js"></script>
<script src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.core.min.js"></script>
<script src="https://cdn.auth0.com/js/lock/10.11/lock.js"></script>

<script>
  // standard config decoding as in the default template
  var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

  // builds an Auth0.js instance using config options
  var authClient = new auth0.Authentication({
    domain:       config.auth0Domain,
    clientID:     config.clientID,
    _disableDeprecationWarnings: true,
    redirectUri: config.callbackURL,
    responseType: config.extraParams.response_type ||
      config.callbackOnLocationHash ? 'token' : 'code'
  });

  // build an authorize URL specifying a connection
  var buildDirectAuthUrl = function(connectionName) {
    // using lodash to extend config.internalOptions with the connectionName
    var options = _.extend({}, config.internalOptions, {
      connection: connectionName
    });
    return authClient.buildAuthorizeUrl(options);
  };

  window.getElementById('direct-link').href = buildDirectAuthUrl("my-idp-connection");
</script>
```
