---
lodash: true
---

## ASP.Net Classic Tutorial

**Please follow the steps below to configure your existing ASP.Net Classic WebApp to use it with Auth0.**

### 1. Showing the Login Widget

First, we need to create the `default.asp` which will show the Login Widget from Auth0.

````asp
<%= '\<%@ Language="VBScript" %\>' %>
<%= '\<% Option Explicit %\>' %>
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

After logging in with any provider, Auth0 will redirect the user to `/callback.asp`.

### 2. Processing the callback response

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll create the `callback.asp` file. 

It will implement the basic OAuth 2 flow:

1. Exchanges the **code** for an **access_token**
1. Calls the **Userinfo** endpoint to get the current logged in user profile using the access_token as credentials.

````asp
<%= '\<%@ Language="VBScript" %\>' %>
 
<script language="JScript" runat="server" src='//cdnjs.cloudflare.com/ajax/libs/json2/20130526/json2.js'></script>
 
<%= '\<%' %>
CLIENT_ID = "@@account.clientId@@"
CLIENT_SECRET = "@@account.clientSecret@@"
REDIRECT_URI = "http://yourserver.com/callback.asp"
 
AUTHORIZATION_CODE = Request.querystring( "code" )
 
access_token = GetAccessToken(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, AUTHORIZATION_CODE)
 
set profile = GetUserProfile( access_token )
 
 
'Here, you should save the profile in the session or somewhere'
 
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
 
<%= '%\>' %>
```

### 3. You've nailed it.

You have configured your ASP.Net Classic Webapp to use Auth0. Congrats, you're awesome!
