You can use our **Authentication API Debugger** extension to test this endpoint. In order to do so you need to be logged in and have installed the [Authentication API Debugger extension](/extensions/authentication-api-debugger).

Click on **Install Debugger** to go to the article that explains how (you only have to do this once).

<%
  var tenantWithLoc = account.namespace.slice(0, account.namespace.length - 10);
%>

<%
  if(tenantWithLoc.indexOf('.') !== -1){
    var debugURL = 'https://' + tenantWithLoc + '.webtask.io/auth0-authentication-api-debugger';
  } else {
    var debugURL = 'https://' + tenantWithLoc + '.us.webtask.io/auth0-authentication-api-debugger';
  }
%>

<div class="test-endpoint-box">
  <a href="/extensions/authentication-api-debugger" class="btn btn-primary" target="_blank">Install Debugger</a>
</div>

**If you have already installed the extension, skip to the <a href="${debugURL}" target="_blank">Authentication API Debugger</a>.**

