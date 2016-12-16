# Login

## Social

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=YOUR_CONNECTION&
  redirect_uri=${account.callback}&
  state=OPAQUE_VALUE&
  additional-parameter=YOUR_ADDITIONAL_PARAMETERS
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


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`  | Use `code` for server side flows and `token` for client side flows |
| `client_id`      | The `client_id` of your client |
| `connection`     | The name of a social identity provider configured to your client, for example `google-oauth2` or `facebook`. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget. |
| `redirect_uri`   | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `state`          | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `additional-parameter`  | Use this to send additional parameters to the provider. For example, `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode). |


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
POST https://${account.namespace}/oauth/access_token?
  client_id=${account.clientId}&
  access_token=TOKEN&
  connection=YOUR_CONNECTION&
  scope=YOUR_SCOPE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/access_token' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "access_token":"TOKEN", "connection":"YOUR_CONNECTION", "scope":"YOUR_SCOPE"}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/oauth/access_token';
var params = 'client_id=${account.clientId}&access_token={access_token}&connection={connection}&scope={scope}';

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


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your client |
| `access_token`   | The social provider's `access_token` |
| `connection`     | The name of an identity provider configured to your app |
| `scope`          | Use `openid` to get an `id_token`, or `openid profile email` to include user information in the `id_token`. If null, only an `access_token` will be returned. |


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
  connection=YOUR_CONNECTION&
  redirect_uri=${account.callback}&
  state=OPAQUE_VALUE&
  additional-parameter=YOUR_ADDITIONAL_PARAMETERS
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
Location: https://auth0.com/#/login_page&state=OPAQUE_VALUE
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#database-ad-ldap-passive-"
}) %>

Use this endpoint for browser based (passive) authentication. It returns a `302` redirect to [Auth0 Login Page](https://auth0.com/#/login_page) that will show the Login Widget where the user can login with email and password.

### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`  | Use `code` for server side flows and `token` for client side flows |
| `client_id`      | The `client_id` of your client |
| `connection`     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`   | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `state`          | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |


### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- The main difference between passive and active authentication is that the former happens in the browser through the [Login Page](https://auth0.com/#/login_page) and the latter can be invoked from anywhere (a script, server to server, and so forth).


### More Information
- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)
- [Active Directory/LDAP Connector](/connector)
- [Using the State Parameter](/protocols/oauth2/oauth-state)


## Database/AD/LDAP (Active)

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro?
  client_id=${account.clientId}&
  username=YOUR_USERNAME&
  password=YOUR_PASSWORD&
  connection=YOUR_CONNECTION&
  scope=openid&
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "username":"YOUR_USERNAME", "password":"YOUR_PASSWORD", "connection":"YOUR_CONNECTION", "scope":"openid"}'

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

::: panel-warning Deprecation Notice
This endpoint will be deprecated. Customers will be notified and given ample time to migrate once an official deprecation notice is posted. The [POST /oauth/token { grant_type: password }](#resource-owner-password) should be used instead.
:::

Use this endpoint for API-based (active) authentication. Given the user credentials and the `connection` specified, it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`.

### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your client |
| `username`       | Username/email of the user to login |
| `password`       | Password of the user to login |
| `connection`     | The name of the connection to use for login |
| `grant_type`     | Set to `password`
| `scope`          | Set to `openid` to retrieve also an `id_token`, leave null to get only an `access_token` |


### Remarks

- This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.
- The main difference between passive and active authentication is that the former happens in the browser through the [Login Page](https://auth0.com/#/login_page) and the latter can be invoked from anywhere (a script, server to server, and so forth).


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).


### More Information
- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)
- [Active Directory/LDAP Connector](/connector)



## Enterprise (SAML and Others)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=YOUR_CONNECTION&
  redirect_uri=${account.callback}&
  state=OPAQUE_VALUE&
  additional-parameter=YOUR_ADDITIONAL_PARAMETERS&
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


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`  | `code` for server side flows, `token` for client side flows |
| `client_id`      | The `client_id` of your client |
| `connection`     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`   | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `state`          | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |


### Remarks

- If no `connection` is specified, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget.
- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- Additional parameters can be sent that will be passed to the provider.

### More Information

- [SAML](/protocols/saml)
- [Obtain a ClientId and Client Secret for Microsoft Azure Active Directory](/connections/enterprise/azure-active-directory)
- [Using the State Parameter](/protocols/oauth2/oauth-state)
