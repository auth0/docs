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
  <script src="${widget_url}"></script>
  <script type="text/javascript">
    var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

    function signin() {
      lock.show({
        callbackURL: 'http://yourserver.com/callback.asp'
      });
    }
  </script>
  <button onclick="signin()">Login</button>
</body>
</html>
```
