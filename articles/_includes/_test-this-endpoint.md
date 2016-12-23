Your can use our **Authentication API Debugger** extension to test this endpoint. Click on **Try** to go to the article that explains how to install it (you only have to do this once).

<%
  if(account.tenant.indexOf('.') !== -1){
    var debugURL = 'https://' + account.tenant + '.webtask.io/auth0-authentication-api-debugger';
  } else {
    var debugURL = 'https://' + account.tenant + '.us.webtask.io/auth0-authentication-api-debugger';
  }
%>

<div class="test-endpoint-box">
  <a href="/extensions/authentication-api-debugger" class="btn btn-primary">Try</a>
</div>

If you have already installed the extension, skip to the [Authentication API Debugger](${debugURL}).
