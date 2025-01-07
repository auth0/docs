<!-- markdownlint-disable MD024 MD033 -->
# Login

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#social"
}) %>

## Social

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE&
  ADDITIONAL_PARAMETERS
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize app
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Trigger login with google
  webAuth.authorize({
    connection: 'google-oauth2'
  });

  // Trigger login with github
  webAuth.authorize({
    connection: 'github'
  });

  // Trigger login popup with twitter
  webAuth.popup.authorize({
    connection: 'twitter'
  });
</script>
```

You can connect your Auth0 service to a social identity provider and allow your users to log in to your application via Facebook, Google, Apple, or other supported providers. To learn more about supported providers, visit [Marketplace](https://marketplace.auth0.com/features/social-connections). 

To authenticate users with a social provider, make a `GET` call to the `/authorize` endpoint. It will return a `302` redirect to the social provider specified in the `connection` parameter.

::: note
Social connections only support browser-based (passive) authentication because most social providers don't allow a username and password to be entered into applications that they don't own. Therefore, the user will be redirected to the provider's sign in page.
:::

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type` <br/><span class="label label-danger">Required</span> | Specifies the token type. Use `code` for server side flows and `token` for application side flows |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application |
| `connection`     | The name of a social identity provider configured to your application, for example `google-oauth2` or `facebook`. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. Specify the `redirect_uri` under your [Application's Settings](${manage_url}/#/applications).|
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the applications adds to the initial request that the authorization server includes when redirecting the back to the application. This value must be used by the application to prevent CSRF attacks. |
| `ADDITIONAL_PARAMETERS` | Append any additional parameter to the end of your request, and it will be sent to the provider. For example, `access_type=offline` (for Google <dfn data-key="refresh-token">Refresh Tokens</dfn>) , `display=popup` (for Windows Live popup mode). |

### Remarks

- If `response_type=token`, after the user authenticates on the provider, it will redirect to your application `callback URL` passing the <dfn data-key="access-token">Access Token</dfn> and ID Token in the address `location.hash`. This is used for Single-Page Apps and also on Native Mobile SDKs.

- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

### Learn More

- [Supported Social Identity Providers](https://marketplace.auth0.com/features/social-connections)
- [Custom Social Connections](/connections/social/oauth2)
- [State Parameter](/secure/attack-protection/state-parameters)
- [Auth0.js /authorize Method Reference](/libraries/auth0js#webauth-authorize-)

## Database/AD/LDAP (Passive)

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  scope=openid%20profile%20email&
  state=STATE
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize app
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Calculate URL to redirect to
  var url = webAuth.client.buildAuthorizeUrl({
    clientID: '${account.clientId}', // string
    responseType: 'token', // code or token
    redirectUri: '${account.callback}',
    scope: 'openid profile email'
    state: 'YOUR_STATE'
  });

  // Redirect to url
  // ...
</script>
```

Use the Auth0 user store or your own database to store and manage username and password credentials. If you have your own user database, you can use it as an identity provider in Auth0 to authenticate users. When you make a `GET` call to the `/authorize` endpoint for browser based (passive) authentication. It returns a `302` redirect to the [Auth0 Login Page](https://${account.namespace}/login) that will show the Login Widget where the user can log in with email and password.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type` <br/><span class="label label-danger">Required</span> | Specifies the token type. Use `code` for server side flows and `token` for application side flows. |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `connection`     | The name of the connection configured to your application. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget using the first database connection. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. Specify the `redirect_uri` under your [Application's Settings](${manage_url}/#/applications).|
| `scope` <br/><span class="label label-primary">Recommended</span> | OIDC scopes and custom API scopes. For example: `openid read:timesheets`. Include `offline_access` to get a Refresh Token.|
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the applications adds to the initial request that the authorization server includes when redirecting the back to the application. This value must be used by the application to prevent CSRF attacks. |

### Remarks

- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the <dfn data-key="access-token">Access Token</dfn> and ID Token in the address `location.hash`. This is used for Single-Page Apps and also on Native Mobile SDKs.
- The main difference between passive and active authentication is that the former happens in the browser through the [Auth0 Login Page](https://${account.namespace}/login) and the latter can be invoked from anywhere (a script, server to server, and so forth).
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

### Learn More

- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/policies/rate-limit-policy/database-connections-rate-limits)
- [Active Directory/LDAP Connector](/connector)
- [State Parameter](/protocols/oauth2/oauth-state)
- [Auth0.js /authorize Method Reference](/libraries/auth0js#webauth-authorize-)

## Enterprise (SAML and Others)

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize application
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Calculate URL to redirect to
  var url = webAuth.client.buildAuthorizeUrl({
    clientID: 'YOUR_CLIENT_ID', // string
    responseType: 'token', // code or token
    redirectUri: 'https://YOUR_APP/callback',
    scope: 'openid profile email'
    state: 'YOUR_STATE'
  });

  // Redirect to url
  // ...
</script>
```

You can connect your Auth0 service to an enterprise identity provider and allow your users to log in to your application via Microsoft Azure Active Directory, Google Workspace, Okta Workforce, or other supported providers. To learn more about supported providers, visit [Auth0 Marketplace](https://marketplace.auth0.com/features/enterprise-connections). 

Make a `GET` call to the `/authorize` endpoint for passive authentication. It returns a `302` redirect to the <dfn data-key="security-assertion-markup-language">SAML</dfn> Provider (or Windows Azure AD and the rest, as specified in the `connection`) to enter their credentials.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type` <br/><span class="label label-danger">Required</span> | Specifies the token type. Use `code` for server side flows, `token` for application side flows. |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `connection` | The name of the connection configured to your application. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget using the first database connection. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. Specify the `redirect_uri` under your [Application's Settings](${manage_url}/#/applications).|
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the applications adds to the initial request that the authorization server includes when redirecting the back to the application. This value must be used by the application to prevent CSRF attacks. |

### Remarks

- If no `connection` is specified, it will redirect to the [Login Page](https://${account.namespace}/login) and show the Login Widget.
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the <dfn data-key="access-token">Access Token</dfn> and ID Token in the address `location.hash`. This is used for Single-Page Apps and also on Native Mobile SDKs.
- Additional parameters can be sent that will be passed to the provider.
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

### Learn More

- [SAML](/protocols/saml)
- [Obtain a Client Id and Client Secret for Microsoft Azure Active Directory](/connections/enterprise/azure-active-directory)
- [State Parameter](/protocols/oauth2/oauth-state)
- [Auth0.js /authorize Method Reference](/libraries/auth0js#webauth-authorize-)