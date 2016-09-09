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
  <script src="${lock_url}"></script>
  <script type="text/javascript">
    var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
      auth: {
        redirectUrl: '${account.callback}'
      }
    });

    function signin() {
      lock.show();
    }
  </script>
  <button onclick="signin()">Login</button>
</body>
</html>
```
