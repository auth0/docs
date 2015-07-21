```asp
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
```
