Create a file named `myrule.js`, and enter the following:

```js
module.exports = function(${args}) {
  var access_token = {};
  access_token['https://foo.com/claim'] = 'bar';
  access_token.scope = scope;
  access_token.scope.push('extra');
  cb(null, access_token);
};
```
This is a sample rule that will:

* Add an arbitrary claim (`https://foo.com/claim`) to the `access_token`.
* Add an extra scope to the default scopes configured on your [API](${manage_url}/#/apis).

::: panel-info Custom claims namespaced format
In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. That is why we named our arbitrary claim `https://foo.com/claim`, instead of `claim`.
:::
