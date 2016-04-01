```js
var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  lock.show({ authParams: { scope: 'openid' } });
});
```

```html
<!-- ... -->
<input type="submit" class="btn-login" />
<!-- ... -->
```
