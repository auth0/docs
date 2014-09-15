---
lodash: true
---

## ASP.Net Classic Tutorial

### 1. Showing the Login Widget

We need to create the `default.asp` file. It'll be just hosting our `Login Widget`. After login with any provider, Auth0 will redirect the user to `/callback.asp`. That's because we've configured that url as the `callbackURL` of the widget. 


````asp
<%@ Language="VBScript" %><%
 
Option Explicit
%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Testing Auth0 with Classic ASP</title>
</head>
<body>
  <script src="cdn.auth0.com/w2/auth0-widget-5.js"></script>
  <script type="text/javascript">
  var widget = new Auth0Widget({
    domain:         '@@account.namespace@@',  
    clientID:       '@@account.clientId@@',
    callbackURL:    'http://yourserver.com/callback.asp'
  });
  </script>
  <button onclick="widget.signin()">Login</button>
</body>
</html>
```

### 2. Processing the callback response

Now, we need to create the `callback.asp` file. It will implement the basic OAuth 2 flow:

1. Exchanges the **code** for an **access_token**
2- Calls the **Userinfo** endpoint to get the current logged in user profile using the access_token as credentials.

````asp
<%@ Language="VBScript" %>
 
<script language="JScript" runat="server" src='//cdnjs.cloudflare.com/ajax/libs/json2/20130526/json2.js'></script>
 
<%
CLIENT_ID = "@@account.clientId@@"
CLIENT_SECRET = "@@account.clientSecret@@"
REDIRECT_URI = "http://yourserver.com/callback.asp"
 
AUTHORIZATION_CODE = Request.querystring( "code" )
 
access_token = GetAccessToken(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, AUTHORIZATION_CODE)
 
set profile = GetUserProfile( access_token )
 
 
' Do something usefule with the user profile (session, etc), possbily redirect to home
 
Response.Write "UserID = " & profile.user_id
 
 
 
Function GetUserProfile(access_token)
 
  Set http = Server.CreateObject("MSXML2.ServerXMLHTTP") 
 
  http.open "GET", "https://eugeniop.auth0.com/userinfo?access_token=" & access_token, False
 
  http.send
 
  profile = http.responseText
 
  Set GetUserProfile = JSON.parse(profile)
 
  Set http = Nothing
 
End Function
 
 
Function GetAccessToken(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, code)
 
  Set http = Server.CreateObject("MSXML2.ServerXMLHTTP") 
 
  http.open "POST", "https://eugeniop.auth0.com/oauth/token", False
 
  http.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
 
  http.send "client_id=" & CLIENT_ID & "&client_secret=" & CLIENT_SECRET & "&redirect_uri=" & server.UrlEncode(REDIRECT_URI) & "&code=" & AUTHORIZATION_CODE & "&grant_type=authorization_code"
 
  result = http.responseText
 
  Set http = Nothing
 
  set jsonResult = JSON.parse(result)
 
  GetAccessToken = jsonresult.access_token
 
End Function
 
%>
```

### 3. You've nailed it.

You have configured your ASP.Net Classic Webapp to use Auth0. Congrats, you're awesome!
