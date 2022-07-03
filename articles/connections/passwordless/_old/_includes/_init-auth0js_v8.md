Construct a new instance of the Auth0 client as follows:

```html
<script src="${auth0js_urlv8}"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'<% if (redirectUri) { %>,
    redirectUri: '${account.callback}'<%}%>
  });
</script>
```
