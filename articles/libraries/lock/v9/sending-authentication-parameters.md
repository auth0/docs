---
description: Supported parameters that can be used with Lock V9.
---

<%= include('../_includes/_lock-version-9') %>

# Lock: Authentication Parameters

You can send parameters when starting a login by adding them to the options object. The example below adds a `state` parameter with a value equal to `'foo'`.

```js
lock.show({
  // ... other options ...
  authParams: {
    state: 'foo'
  }
});
```

The following parameters are supported: `access_token`, `scope`, `protocol`, `device`, `request_id`, `connection_scopes`, `nonce` and `state`.

> Note: this would be analogous to trigger the login with `https://${account.namespace}/authorize?state=foo&...`.


## Supported parameters
### scope {string}

```js
lock.show({
  authParams: {
    scope: 'openid email user_metadata app_metadata picture'
  }
});
```

There are different values supported for scope:

* `scope: 'openid'`: _(default)_ It will return not only the `access_token`, but also an `id_token` which is a JSON Web Token (JWT). The JWT will only contain the user ID (`sub` claim).
* `scope: 'openid profile'`: (not recommended): will return all the user attributes in the token. This can cause problems when sending or receiving tokens in URLs (e.g. when using response_type=token) and will likely create an unnecessarily large token(especially with Azure AD which returns a fairly long JWT). Keep in mind that JWTs are sent on every API request, so it is desirable to keep them as small as possible.
* `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user attributes to be part of the `id_token` (For example: `scope: 'openid name email picture'`).

### connection_scopes {Object}

The `connection_scopes` parameter allows for dynamically specifying scopes on any connection. This is useful if you want to initially start with a set of scopes (defined on the dashboard), but later on request the user for extra permissions or attributes.

The object keys must be the names of the connections and the values must be arrays containing the scopes to request to append to the dashboard specified scopes. An example is shown below:

```js
lock.show({
  authParams: {
    connections: ['facebook', 'google-oauth2', 'twitter', 'Username-Password-Authentication', 'fabrikam.com'],
    connection_scopes: {
      'facebook': ['public_profile', 'user_friends'],
      'google-oauth2': ['https://www.googleapis.com/auth/orkut'],
      // none for twitter
    }
  }
}
```

> The values for each scope are not transformed in any way. They must match exactly the values recognized by each identity provider.

### state {string}

The `state` parameter is an arbitrary state value that will be mantained across redirects. It is useful to mitigate [XSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery) and for any contextual information (such as a return url) that you might need after the authentication process is finished.

[Click here to learn more about how to send/receive the state parameter.](/protocols/oauth-state)

#### Getting the `state` value in a rule

If you need to access the `state` parameter within a rule you must take in consideration that, depending on the type of connection used, it might come either in the body of the request or in the query string, so you should do:

```js
var state = context.request.query.state || context.request.body.state;.
```
