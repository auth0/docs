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

## Back-Channel Login

:::note
This feature is currently in Early Access. To request access, contact your Technical Account Manager.
:::

The Back-Channel Login endpoint enables applications to send an authentication request to a user’s phone, or the authentication device, provided they have an app installed and are enrolled for [push notifications using the Guardian SDK](/secure/multi-factor-authentication/auth0-guardian#enroll-in-push-notifications).

Use the Back-Channel Login endpoint to authenticate users for the following use cases:

- Users are not in front of the application that requires authentication, such as when they're telephoning a call center.
- The consumption device, or the device that helps the user consume a service, is insecure for sensitive operations e.g. web browser for financial transactions.
- The consumption device has limited interactive capability e.g. e-bicycles or e-scooters.

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/bc-authorize",
  "link": "#back-channel-login"
}) %>

```http
curl --location 'https://[TENANT_DOMAIN]/bc-authorize' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT ID]' \
--data-urlencode 'client_secret=[CLIENT SECRET]' \
--data-urlencode 'binding_message=[YOUR BINDING MESSAGE]' \
--data-urlencode 'login_hint={ "format": "iss_sub", "iss":
"https://[TENANT].auth0.com/", "sub": "auth0|[USER ID]" }' \
--data-urlencode 'scope=openid'
```

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Client ID of your application. |
| `binding_message` <br/><span class="label label-danger">Required</span> | Human-readable string displayed on both the device calling `/bc-authorize` and the user’s authentication device (e.g. phone) to ensure the user is approves the correct request. For example: `ABC-123-XYZ`. |
| `login_hint` <br/><span class="label label-danger">Required</span> | String containing information about the user to contact for authentication. It uses the [IETF9493 standard for Subject Identifiers for Security Event Tokens](https://datatracker.ietf.org/doc/html/rfc9493). Auth0 only supports the [Issuer and Identifier format](https://datatracker.ietf.org/doc/html/rfc9493#name-issuer-and-subject-identifi). For an example login hint, review the [Remarks](#remarks). |
| `scope` <br/><span class="label label-danger">Required</span> | Space-separated list of OIDC and custom API scopes. For example: `openid read:timesheets edit:timesheets`. Include `offline_access` to get a refresh token. At a minimum, you must include the scope `openid`. |
| `audience` <br/><span class="label label-danger">Optional</span> | Unique identifier of the audience for an issued token. If you require an access token for an API, pass the unique identifier of the target API you want to access. |
| `request_expiry` <br/><span class="label label-danger">Optional</span> | To configure a custom expiry time in seconds for this request, pass a number between 1 and 300. If not provided, expiry defaults to 300 seconds. |

### Response Body

If the request is successful, you should receive a response like the following:

```http
{
  "auth_req_id": "eyJh...",
  "expires_in": 300,
  "interval": 5
}
```

The `auth_req_id` value should be kept as it is used later in the flow to identify the authentication request.

The `expires_in` value tells you how many seconds you have until the authentication request expires. 

The `interval` value tells you how many seconds you must wait between poll requests.

The request should be approved or rejected on the user’s authentication device using the Guardian SDK.

### Remarks

The following code sample is an example login hint: 

  ```http
  { 
    "format": "iss_sub", 
    "iss": "https://[TENANT_DOMAIN]/", 
    "sub": "auth0|[USER ID]" 
  }
  ```

White space is not significant. Replace the `[TENANT_DOMAIN]` with your tenant domain or custom domain. Replace the `[USER ID]` with a valid `user_id` for the authorizing user returned from the [User Search APIs](https://auth0.com/docs/manage-users/user-search).

Include an optional parameter for application authentication in the request:

- Client Secret with HTTP Basic auth, in which case no parameters are required. The `client_id` and `client_secret` are passed in a header.
- Client Secret Post, in which case the `client_id` and `client_secret` are required.
- Private Key JWT, where the `client_id`, `client_assertion` and `client_assertion` type are required.
- mTLS, where the `client_id` parameter is required and the `client-certificate` and `client-certificate-ca-verified` headers are required.

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#post-token"
}) %>

```http
curl --location 'https://[TENANT_DOMAIN]/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT ID]' \
--data-urlencode 'client_secret=[CLIENT SECRET]' \
--data-urlencode 'auth_req_id=[FROM THE BC-AUTHORIZE RESPONSE]' \
--data-urlencode 'grant_type=urn:openid:params:grant-type:ciba'
```

To check on the status of a Back-Channel Login flow, poll the `/oauth/token` endpoint at regular intervals by passing the following:

- `auth_req_id` returned from the call to `/bc-authorize`
- `urn:openid:params:grant-type:ciba` grant type 

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Client ID of your application |
| `auth_req_id` <br/><span class="label label-danger">Required</span> | Used to reference the authentication request. Returned from the call to `/bc-authorize` | 
| `grant_type` <br/><span class="label label-danger">Required</span> | Must be set to `urn:openid:params:grant-type:ciba` | 

### Response Body

If the authorizing user has not yet approved or rejected the request, you should receive a response like the following: 

```http
{ 
  "error": "authorization_pending", 
  "error_description": "The end-user authorization is pending"
}
```

If the authorizing user rejects the request, you should receive a response like the following:

```http
{
  "error": "access_denied",
  "error_description": "The end-user denied the authorization request or it
has been expired"
}
```

If you are polling too quickly (faster than the interval value returned from `/bc-authorize`), you should receive a response like the following:

```http
{
  "error": "slow_down",
  "error_description": "You are polling faster than allowed. Try again in 10 seconds."
}
```

In addition, Auth0 will add the the [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header to the response indicating how many seconds to wait before attempting to poll again. If you consistently poll too frequently, the number of seconds you must wait increases.

If the authorizing user has approved the push notification, the call returns the ID token and access token (and potentially a refresh token):

```http
{
  "access_token": "eyJh...",
  "id_token": "eyJh...",
  "expires_in": 86400,
  "scope": "openid"
}
```

Once you have exchanged an `auth_req_id` for an ID or access token, it is no longer usable.

### Remarks

Include an optional parameter for application authentication in the request:

- Client Secret with HTTP Basic auth, in which case no parameters are required. The `client_id` and `client_secret` are passed in a header.
- Client Secret Post, in which case the `client_id` and `client_secret` are required.
- Private Key JWT, where the `client_id`, `client_assertion` and `client_assertion` type are required.
- mTLS, where the `client_id` parameter is required and the `client-certificate` and `client-certificate-ca-verified` headers are required.