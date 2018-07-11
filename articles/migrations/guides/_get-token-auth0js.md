<code-block>
  <code-block-tab data-title="Legacy (ID Token)">
  
  ```js
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
  ```

  - Asks for an ID Token in the response (`responseType: 'id_token'`)
  - Authenticates with the Management API using the ID Token

  </code-block-tab>
  <code-block-tab data-title="Current (Access Token)">

  ```js
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
  ```

  - Asks for both an ID Token and an Access Token in the response (`responseType: 'token id_token'`)
  - Sets the Management API as the intended audience of the token (`audience: 'https://${account.namespace}/api/v2/'`)
  - Asks for the required permission (`scope: '${scope}'`)
  - Authenticates with the Management API using the Access Token
  
  </code-block-tab>
</code-block>