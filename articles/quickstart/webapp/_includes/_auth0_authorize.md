## Integrate auth0.js

```html
<script src="${auth0js_url}"></script>
<script>
  var webAuth = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: '${account.callback}',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  });
</script>
<button onclick="webAuth.authorize();">Log In</button>
```