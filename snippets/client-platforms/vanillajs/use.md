```js
var userProfile = null;

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ authParams: { scope: 'openid' } });
});
```
