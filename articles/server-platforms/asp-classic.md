---
title: ASP Classic Tutorial
name: ASP Classic
image: /media/platforms/asp-classic.jpg
tags:
  - quickstart
snippets:
  setup: server-platforms/asp-classic/setup
  use: server-platforms/asp-classic/use
---

## ASP Classic Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Visual Studio 2015
* .NET Framework 4.5.2
:::

**Please follow the steps below to configure your existing ASP.Net Classic WebApp to use it with Auth0.**

### 1. Showing the Login Widget

First, we need to create the `default.asp` which will show the Login Widget from Auth0.

${snippet(meta.snippets.setup)}

After logging in with any provider, Auth0 will redirect the user to `/callback.asp`.

### 2. Processing the callback response

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll create the `callback.asp` file.

It will implement the basic OAuth 2 flow:

1. Exchanges the **code** for an **access_token**
1. Calls the **Userinfo** endpoint to get the current logged in user profile using the access_token as credentials.

${snippet(meta.snippets.use)}

```asp
Function GetUserProfile(access_token)

  Set http = Server.CreateObject("MSXML2.ServerXMLHTTP")

  http.open "GET", "https://eugeniop.auth0.com/userinfo?access_token=" & access_token, False

  http.send

  profile = http.responseText

  Set GetUserProfile = JSON.parse(profile)

  Set http = Nothing

End Function


Function GetAccessToken(client_id, client_secret, redirect_uri, authorization_code)

  Set http = Server.CreateObject("MSXML2.ServerXMLHTTP")

  http.open "POST", "https://eugeniop.auth0.com/oauth/token", False

  http.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"

  http.send "client_id=" & client_id & "&client_secret=" & client_secret & "&redirect_uri=" & server.UrlEncode(redirect_uri) & "&code=" & authorization_code & "&grant_type=authorization_code"

  result = http.responseText

  Set http = Nothing

  set jsonResult = JSON.parse(result)

  GetAccessToken = jsonresult.access_token

End Function

<%= '%\>' %>
```

### 3. You're done!

You have configured your ASP.Net Classic Webapp to use Auth0. Congrats, you're awesome!
