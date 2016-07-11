```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: { 
        params: { scope: 'openid' } 
    }
}
);
```
