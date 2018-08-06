You can use [Rules](/rules) to change the returned scopes of the Access Token and/or add claims to it (and the ID Token) with a script like this:

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
Auth0 returns profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID Tokens or Access Tokens, they must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims) to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`. You can [add namespaced claims using Rules](#optional-customize-the-tokens).
:::
