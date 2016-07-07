```js
var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  lock.show({ authParams: { scope: 'openid' } }); //Details: https://auth0.com/docs/scopes
});
```

```html
<!-- ... -->
<input type="submit" class="btn-login" />
<!-- ... -->
```
