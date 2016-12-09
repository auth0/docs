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
