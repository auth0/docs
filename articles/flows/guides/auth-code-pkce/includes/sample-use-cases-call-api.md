## Sample Use Cases

### Customize Tokens

You can use [Rules](/rules) to change the returned scopes of Access Tokens and/or add claims to Access and ID Tokens. To do so, add the following rule, which will run after the user authenticates:

```javascript
function(user, context, callback) {

  // add custom claims to Access Token and ID Token
  context.accessToken['http://foo/bar'] = 'value';
  context.idToken['http://fiz/baz'] = 'some other value';

  // change scope
  context.accessToken.scope = ['array', 'of', 'strings'];

  callback(null, user, context);
}
```

::: panel-warning Namespacing Custom Claims 
Auth0 returns profile information in a [structured claim format as defined by the OpenID Connect (OIDC) specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that custom claims added to ID Tokens or Access Tokens must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims) to avoid possible collisions with standard OIDC claims. 
:::

### View Sample Application: Mobile App + API

For an sample implementation, see the [Mobile + API](/architecture-scenarios/application/mobile-api) architecture scenario. This series of tutorials is accompanied by a code sample that you can access in [GitHub](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets).
