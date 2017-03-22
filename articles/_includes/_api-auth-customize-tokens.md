You can use [Rules](/rules) to change the returned scopes of the `access_token` and/or add claims to it (and the `id_token`) with a script like this:

```javascript
function(user, context, callback) {

  // add custom claims to access token and ID token
  context.accessToken['http://foo/bar'] = 'value';
  context.idToken['http://fiz/baz'] = 'some other value';

  // change scope
  context.accessToken.scope = ['array', 'of', 'strings'];

  callback(null, user, context);
}
```

::: panel-warning Namespacing Custom Claims
You must properly namespace your custom claims with URI format to avoid conflicting with spec claims.
:::
