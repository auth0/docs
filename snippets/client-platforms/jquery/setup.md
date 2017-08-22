```js
$(document).ready(function() {
  var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    oidcConformant: true,
    auth: { 
      params: { 
        scope: 'openid email' 
      }
    }
  });
});
```
