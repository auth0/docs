<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#coa-id-token" data-toggle="tab">Legacy (ID Token)</a></li>
      <li><a href="#coa-access-token" data-toggle="tab">Current (Access Token)</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="coa-id-token" class="tab-pane active">
      <pre class="text hljs">
        <code>
// get an ID Token
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: '${account.callback}',
  scope: 'openid',
  responseType: 'id_token'
});
// create a new instance
var auth0Manage = new auth0.Management({
  domain: '${account.namespace}',
  token: 'ID_TOKEN'
});
        </code>
      </pre>
      <div class="tab-pane-footer">
        <ul>
          <li>Asks for an ID Token in the response (<code>responseType: 'id_token'</code>)</li>
          <li>Authenticates with the Management API using the ID Token</li>
        </ul>
      </div>
    </div>
    <div id="coa-access-token" class="tab-pane">
      <pre class="text hljs">
        <code>
// get an Access Token
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: '${account.callback}',
  audience: 'https://${account.namespace}/api/v2/',
  scope: '${scope}',
  responseType: 'token id_token'
});
// create a new instance
var auth0Manage = new auth0.Management({
  domain: '${account.namespace}',
  token: 'ACCESS_TOKEN'
});
        </code>
      </pre>
      <div class="tab-pane-footer">
        <ul>
          <li>Asks for both an ID Token and an Access Token in the response (<code>responseType: 'token id_token'</code>)</li>
          <li>Sets the Management API as the intended audience of the token (<code>audience: 'https://${account.namespace}/api/v2/'</code>)</li>
          <li>Asks for the required permission (<code>scope: '${scope}'</code>)</li>
          <li>Authenticates with the Management API using the Access Token</li>
        </ul>
      </div>
    </div>
  </div>
</div>
