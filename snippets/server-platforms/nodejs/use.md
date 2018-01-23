```html
<script src="${lock_url}"></script>
<script>
const options = {
  auth: {
    redirectUrl: 'http://localhost:CHANGE-TO-YOUR-PORT/callback',
    params: {
      audience: 'https://${account.namespace}/userinfo',
      scope: 'openid profile'
    }
  }
};
const lock = new Auth0Lock('${account.clientId}', '${account.namespace}', options);

function signin() {
  lock.show();
}
</script>

<button onclick="signin()">Login</button>
```
