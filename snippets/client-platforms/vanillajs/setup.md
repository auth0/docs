```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: { 
        params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
}
);
```
