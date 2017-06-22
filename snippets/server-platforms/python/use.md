```html
<script src="${auth0js_url}"></script>
<script>
var auth = new auth0.WebAuth({domain: '${account.namespace}', clientID: '${account.clientId}'});

function signin() {
     auth.authorize({
         audience: '${apiIdentifier}',
         scope: 'openid profile',
         responseType: 'code',
         redirectUri: '${account.callback}'
     });
}
</script>

<button onclick="signin()">Login</button>
```
