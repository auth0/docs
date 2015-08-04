```html
<script src="${widget_url}"></script>
<script>
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');


function signin() {
  lock.show({
      callbackURL: 'http://localhost:3000/callback'
    , responseType: 'code'
    , authParams: {
      scope: 'openid profile'
    }
  });
}
</script>

<button onclick="signin()">Login</button>
```
