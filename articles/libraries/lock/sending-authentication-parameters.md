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

There are other extra parameters that will depend on the provider. For example, Google allows you to get back a `refresh_token` only if you explicitly ask for `access_type=offline`.

We support sending arbitrary parameters like this:

```js
lock.show({
  // ... other options ...
  authParams: {
    access_type: 'offline',
    my_arbitrary_param: 'fooo'
  }
});
```

> Note: this would be analogous to trigger the login with `https://${account.namespace}/authorize?access_type=offline&...`.


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
* `scope: 'openid profile'`: If you want the entire user profile to be part of the `id_token`.
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
