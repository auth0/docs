<!-- markdownlint-disable MD024 MD034 MD041-->
Click on **Install Debugger** to go to the article that explains how (you only have to do this once).

<%
  var urlUS = 'https://' + account.tenant + '.us.webtask.io/auth0-authentication-api-debugger';
  var urlEU = 'https://' + account.tenant + '.eu.webtask.io/auth0-authentication-api-debugger';
  var urlAU = 'https://' + account.tenant + '.au.webtask.io/auth0-authentication-api-debugger';
%>

<div class="test-endpoint-box">
  <a href="/extensions/authentication-api-debugger" class="btn btn-primary" target="_blank">Install Debugger</a>
</div>

**If you have already installed the extension, skip to the Authentication API Debugger.**

The link varies according to your tenant's region: <a href="${urlUS}" target="_blank">US West</a>, <a href="${urlEU}" target="_blank">Europe Central</a> or <a href="${urlAU}" target="_blank">Australia</a>.
