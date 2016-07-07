```js
document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ authParams: { scope: 'openid' } }); //Details: https://auth0.com/docs/scopes
});
```
