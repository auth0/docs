```asp
<%= '\<%@ Language="VBScript" %\>' %>
<%= '\<% Option Explicit %\>' %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Testing Auth0 with Classic ASP</title>
</head>
<body>
  <script src="${auth0js_urlv8}"></script>
  <script type="text/javascript">
    var webAuth = new auth0.WebAuth({
      domain: '${account.namespace}',
      clientID: '${account.clientId}',
      redirectUri: '${account.callback}',
      audience: 'https://${account.namespace}/userinfo',
      responseType: 'code',
      scope: 'openid profile'
    });

    function signin() {
      webAuth.authorize();
    }
  </script>
  <button onclick="signin()">Login</button>
</body>
</html>
```
