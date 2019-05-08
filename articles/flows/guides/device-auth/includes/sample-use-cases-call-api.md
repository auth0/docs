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
Auth0 returns profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that custom claims added to ID Tokens or Access Tokens must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims) to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`. 
:::

### Detect Device Authorization Flow Use

You can use [Rules](/rules) to detect whether the current transaction is using the Device Authorization Flow. To do so, check the `context` object's `protocol` property:

```javascript
function (user, context, callback) {
   if (context.protocol === 'oauth2-device-code') {
      ...
   }
 
   callback(null, user, context);
}
```

### Sample Implementations

* [Device Authorization Playground](https://auth0.github.io/device-flow-playground/)
* [AppleTV (Swift)](https://github.com/pushpabrol/auth0-device-flow-appletv): Simple application that shows how Auth0 can be used with the Device Authorization Flow from an AppleTV.
* [CLI (Node.js)](https://gist.github.com/panva/652c61e7d847e0ed99926c324fa91b36): Sample implementation of a CLI that uses the Device Authorization Flow instead of the Authorization Code Flow. The major difference is that your CLI does not need to host a webserver and listen on a port.
