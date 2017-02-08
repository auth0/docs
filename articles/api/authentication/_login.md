# Login

## Social

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE&
  additional-parameter=ADDITIONAL_PARAMETERS
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'code|token'
  });
</script>

//trigger login with google
$('.login-google').click(function () {
  auth0.login({
    connection: 'google-oauth2'
  });
});

//trigger login with github
$('.login-github').click(function () {
  auth0.login({
    connection: 'github'
  });
});

//trigger login popup with google
$('.login-google-popup').click(function (e) {
  e.preventDefault();
  auth0.login({
    connection: 'google-oauth2',
    popup: true,
    popupOptions: {
      width: 450,
      height: 800
    }
  }, function(err, result) {
    if (err) {
      alert("something went wrong: " + err.message);
      return;
    }
    alert('Hello!');
  });
});

//trigger login requesting additional scopes with google
$('.login-google').click(function () {
  auth0.login({
    connection: 'google-oauth2',
    connection_scope: ['https://www.googleapis.com/auth/orkut', 'https://picasaweb.google.com/data/']
  });
});

// alternatively a comma separated list also works
$('.login-google').click(function () {
  auth0.login({
    connection: 'google-oauth2',
    connection_scope: 'https://www.googleapis.com/auth/orkut,https://picasaweb.google.com/data/'
  });
});
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#social"
}) %>

Use this endpoint to authenticate a user with a social provider. It will return a `302` redirect to the social provider specified in `connection`.

**NOTE:** Social connections only support browser-based (passive) authentication because most social providers don't allow a username and password to be entered into applications that they don't own. Therefore, the user will be redirected to the provider's sign in page.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type` <br/><span class="label label-danger">Required</span> | Use `code` for server side flows and `token` for client side flows |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client |
| `connection`     | The name of a social identity provider configured to your client, for example `google-oauth2` or `facebook`. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `additional-parameter` | Use this to send additional parameters to the provider. For example, `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode). |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Client** (select the client you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, click **OAuth2 / OIDC Login**.

### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates on the provider, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.


### More Information

- [Supported Social Identity Providers](/identityproviders#social)
- [Custom Social Connections](/connections/social/oauth2)
- [Using the State Parameter](/protocols/oauth2/oauth-state)


## Social with Provider's Access Token

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/access_token
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "access_token": "ACCESS_TOKEN",
  "connection": "CONNECTION",
  "scope": "SCOPE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/access_token' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "access_token":"ACCESS_TOKEN", "connection":"CONNECTION", "scope":"SCOPE"}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/oauth/access_token';
var params = 'client_id=${account.clientId}&access_token={ACCESS_TOKEN}&connection={CONNECTION}&scope={SCOPE}';

var xhr = new XMLHttpRequest();

xhr.open('POST', url);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
  if (xhr.status == 200) {
    fetchProfile();
  } else {
    alert("Request failed: " + xhr.statusText);
  }
};

xhr.send(params);
```

> RESPONSE SAMPLE:

```JSON
{
  "id_token": "eyJ0eXAiOiJKV1Qi...",
  "access_token": "A9CvPwFojaBI...",
  "token_type": "bearer"
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/access_token",
  "link": "#social-with-provider-s-access-token"
}) %>

Given the social provider's `access_token` and the `connection`, this endpoint will authenticate the user with the provider and return a JSON with the `access_token` and, optionally, an `id_token`. This endpoint only works for Facebook, Google, Twitter and Weibo.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `access_token` <br/><span class="label label-danger">Required</span> | The social provider's `access_token`. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of an identity provider configured to your app. |
| `scope` | Use `openid` to get an `id_token`, or `openid profile email` to include user information in the `id_token`. If null, only an `access_token` will be returned. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Remarks

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.
- The `email` scope value requests access to the `email` and `email_verified` Claims.


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/access_token](#post-oauth-access_token).


### More Information
- [Call an Identity Provider API](/tutorials/calling-an-external-idp-api)
- [Identity Provider Access Tokens](/tokens/idp)
- [Add scopes/permissions to call Identity Provider's APIs](/tutorials/adding-scopes-for-an-external-idp)


## Database/AD/LDAP (Passive)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE&
  additional-parameter=ADDITIONAL_PARAMETERS
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'code|token'
  });
</script>

//trigger login with a db connection
$('.login-dbconn').click(function () {
  auth0.login({
    connection: 'db-conn',
    username:   $('.username').val(),
    password:   $('.password').val(),
  });
});

//trigger login with a db connection and avoid the redirect
$('.login-dbconn').click(function () {
  auth0.login({
    connection: 'db-conn',
    username:   $('.username').val(),
    password:   $('.password').val(),
  },
  function (err, result) {
    // store in cookies
  });
});

//trigger login with offline mode support to get the refresh_token
$('.login-dbconn').click(function () {
  auth0.login({
    connection: 'db-conn',
    username:   $('.username').val(),
    password:   $('.password').val(),
    scope: 'openid offline_access'
  },
  function (err, result) {
    // store in cookies
    // result.refreshToken is sent because offline_access is set as a scope
  });
});
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: https://auth0.com/#/login_page&state=STATE
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#database-ad-ldap-passive-"
}) %>

Use this endpoint for browser based (passive) authentication. It returns a `302` redirect to the [Auth0 Login Page](https://${account.namespace}/login) that will show the Login Widget where the user can login with email and password.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type` <br/><span class="label label-danger">Required</span> | Use `code` for server side flows and `token` for client side flows. |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `connection`     | The name of the connection configured to your client. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget using the first database connection. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Client** (select the client you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, click **OAuth2 / OIDC Login**.


### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- The main difference between passive and active authentication is that the former happens in the browser through the [Auth0 Login Page](https://${account.namespace}/login) and the latter can be invoked from anywhere (a script, server to server, and so forth).


### More Information
- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)
- [Active Directory/LDAP Connector](/connector)
- [Using the State Parameter](/protocols/oauth2/oauth-state)


## Database/AD/LDAP (Active)

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "username": "USERNAME",
  "password": "PASSWORD",
  "connection": "CONNECTION",
  "scope": "openid",
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "username":"USERNAME", "password":"PASSWORD", "connection":"CONNECTION", "scope":"openid"}'

```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'token'
  });
</script>

//trigger login with a db connection
$('.login-dbconn').click(function () {
  auth0.login({
    connection: 'db-conn',
    username:   $('.username').val(),
    password:   $('.password').val(),
  });
});

//trigger login with a db connection and avoid the redirect
$('.login-dbconn').click(function () {
  auth0.login({
    connection: 'db-conn',
    username:   $('.username').val(),
    password:   $('.password').val(),
  },
  function (err, result) {
    // store in cookies
  });
});
```

> RESPONSE SAMPLE:

```json
{
  "id_token": "eyJ0eXAiOiJKV1Qi...",
  "access_token": "sMjTAT...",
  "token_type": "bearer"
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#database-ad-ldap-active-"
}) %>

Use this endpoint for API-based (active) authentication. Given the user credentials and the `connection` specified, it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client |
| `username` <br/><span class="label label-danger">Required</span> | Username/email of the user to login |
| `password` <br/><span class="label label-danger">Required</span> | Password of the user to login |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the connection to use for login |
| `scope` | Set to `openid` to retrieve also an `id_token`, leave null to get only an `access_token` |
| `grant_type` <br/><span class="label label-danger">Required</span> | Set to `password` to authenticate using username/password or `urn:ietf:params:oauth:grant-type:jwt-bearer` to authenticate using an `id_token` (used to [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)) |
| `device` | String value. Required when `grant_type` is `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `id_token` | Used to authenticate using a token instead of username/password, in [TouchID](/libraries/lock-ios/touchid-authentication) scenarios. Required when `grant_type` is `urn:ietf:params:oauth:grant-type:jwt-bearer` |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>

### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Client** (select the client you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set **Username** and **Password**. Click **Resource Owner Endpoint**.


### Remarks

- This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.
- The main difference between passive and active authentication is that the former happens in the browser through the [Auth0 Login Page](https://${account.namespace}/login) and the latter can be invoked from anywhere (a script, server to server, and so forth).


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).


### More Information
- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)
- [Active Directory/LDAP Connector](/connector)
- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)



## Enterprise (SAML and Others)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE&
  additional-parameter=ADDITIONAL_PARAMETERS
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'code|token'
  });
</script>

//trigger login with an enterprise connection
$('.login-microsoft').click(function () {
  auth0.login({
    connection: 'contoso.com'
  });
});
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#enterprise-saml-and-others-"
}) %>

Use this endpoint for passive authentication. It returns a `302` redirect to the SAML Provider (or Windows Azure AD and the rest, as specified in the `connection`) to enter their credentials.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type` <br/><span class="label label-danger">Required</span> | Use `code` for server side flows, `token` for client side flows. |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `connection` | The name of the connection configured to your client. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget using the first database connection. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Client** (select the client you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, click **OAuth2 / OIDC Login**.


### Remarks

- If no `connection` is specified, it will redirect to the [Login Page](https://${account.namespace}/login) and show the Login Widget.
- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- Additional parameters can be sent that will be passed to the provider.

### More Information

- [SAML](/protocols/saml)
- [Obtain a ClientId and Client Secret for Microsoft Azure Active Directory](/connections/enterprise/azure-active-directory)
- [Using the State Parameter](/protocols/oauth2/oauth-state)
