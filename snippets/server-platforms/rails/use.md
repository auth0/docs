```html
<script src="${auth0js_urlv8}"></script>
<script>
  var webAuth = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: '${account.callback}',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'code',
    scope: 'openid profile',
    state: '${ "<%= get_state %>" }'
  });

  function signin() {
    webAuth.authorize();
  }
</script>
```