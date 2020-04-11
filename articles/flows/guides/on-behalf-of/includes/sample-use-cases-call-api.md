## Sample Use Cases

### Customize Tokens

You can use [Rules](/rules) to change the returned scopes of Access Tokens and/or add claims to Access and ID Tokens for [On-Behalf-Of Flows](/flows/context/on-behalf-of). To do so, add the following rule, which will run after the user authenticates:

```javascript
function(user, context, callback) {

  if (context.protocol == "token_exchange") {

    // add custom claims to Access Token and ID Token
    context.accessToken['http://foo/bar'] = 'value';
    context.idToken['http://fiz/baz'] = 'some other value';

    // change scope
    context.accessToken.scope = ['array', 'of', 'strings'];
  }

  callback(null, user, context);
}
```

::: panel-warning Namespacing Custom Claims 
Auth0 returns profile information in a [structured claim format as defined by the OpenID Connect (OIDC) specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that custom claims added to ID Tokens or Access Tokens must [conform to a namespaced format](/tokens/concepts/claims-namespacing) to avoid possible collisions with standard OIDC claims. 
:::
