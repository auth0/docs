```html
<script src="${lock_url}"></script>
<script>
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');


function signin() {
  lock.show({
      callbackURL: 'http://localhost:3000/callback'
    , responseType: 'code'
    , authParams: {
      scope: 'openid name email' //Details: https:///scopes
    }
  });
}
</script>

<button onclick="signin()">Login</button>
```
