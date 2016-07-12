```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: { 
        params: { scope: 'openid' } //Details: https://auth0.com/docs/scopes
    }
}
);
```
