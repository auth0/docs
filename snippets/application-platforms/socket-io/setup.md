```js
var lock = null;
$(document).ready(function() {
   lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
});
```
