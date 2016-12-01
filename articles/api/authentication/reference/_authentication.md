# Authentication

## Social

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "response_type": {code or token},
  "client_id": "${account.client_id}",
  "connection": "",
  "redirect_uri": "http://localhost/callback",
  "state": "",
  "additional-parameter": ""
}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"response_type":"code or token", "client_id":"${account.clientId}", "connection":"", "redirect_uri":"http://localhost/callback", "state":"", "additional-parameter":""}'
```

```js
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
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

Use the endpoint `GET https://${account.namespace}/authorize` to authenticate a user with a social provider. This endpoint will return a `302` redirect to the social provider specified in `connection`.

Social connections only support browser-based (passive) authentication because most social providers don't allow a username and password to be entered into applications that they don't own. Therefore, the user will be redirected to the provider's sign in page.


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`  | `code` for server side flows, `token` for client side flows |
| `client_id`      | the `client_id` of your client |
| `connection`     | The name of an identity provider configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget. |
| `redirect_uri`   | `http://localhost/callback` |
| `state`          | The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url). |


**Remarks**

- If `response_type=token`, after the user authenticates on the provider, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- Additional parameters can be sent that will be passthrough to the provider. For example, `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode).


**More Information**

- [Custom Social Connections](/connections/social/oauth2)


### Use Social Provider's Access Token

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/access_token
Content-Type: 'application/json'
{
  "client_id":    "${account.client_id}",
  "access_token": "",
  "connection":   "",
  "scope":        ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/access_token' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.client_id}", "access_token":"", "connection":"", "scope":""}'
```

```javascript
```

Given the social provider's `access_token` and the `connection`, this endpoint will authenticate the user with the provider and return a JSON with the `access_token` and an `id_token`. This endpoint only works for Facebook, Google, Twitter and Weibo.


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your app |
| `access_token`   | the social provider's `access_token` |
| `connection`     | the name of an identity provider configured to your app |
| `scope`          | `openid` or `openid profile email` |

**More Information**
- [Identity Provider Access Tokens](/tokens/idp)
- [Call an Identity Provider API](/tutorials/calling-an-external-idp-api)
- [Add scopes/permissions to call Identity Provider's APIs](/tutorials/adding-scopes-for-an-external-idp)


## Database & Active Directory/LDAP

Database and Active Directory/LDAP connections support browser based (passive) authentication and API-based (active) authentication. The main difference between passive and active authentication is that the former happens in the browser through the [Login Page](https://auth0.com/#/login_page) and the latter can be invoked from anywhere (a script, server to server, etc.).

### Passive

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "response_type": {code or token},
  "client_id": "${account.client_id}",
  "connection": "",
  "redirect_uri": "http://localhost/callback",
  "state": "",
  "additional-parameter": ""
}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"response_type":"code or token", "client_id":"${account.client_id}", "connection":"", "redirect_uri":"http://localhost/callback", "state":"", "additional-parameter":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
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

Use the endpoint `GET https://${account.namespace}/authorize` for passive authentication. It returns a `302` redirect to [Auth0 Login Page](https://auth0.com/#/login_page) that will show the Login Widget where the user can login with email and password.

**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`  | `code` for server side flows, `token` for client side flows |
| `client_id`      | The `client_id` of your client |
| `connection`     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`   | `http://localhost/callback` |
| `state`          | The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url). |


**Remarks**

- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.


**More Information**
- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)
- [Active Directory/LDAP Connector](/connector)

### Active

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id": "${account.client_id}",
  "username": "",
  "password": "",
  "id_token": "",
  "connection": "",
  "grant_type": "password",
  "scope": "openid",
  "device": ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"", "username":"", "password":"", "id_token":"", "connection":"", "grant_type":"password", "scope":"openid", "device":""}'

```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
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

Use the endpoint `POST https://${account.namespace}/oauth/ro` for active authentication. Given the user credentials and the `connection` specified, it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`.

**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your client |
| `username`       | |
| `password`       | |
| `id_token`       | |
| `connection`     | the name of the connection configured to your client |
| `grant_type`     | |
| `scope`          | |
| `device`         | |


**Remarks**

- This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.


**Error Codes**

For the complete error code reference for this endpoint refer to [Error Codes for /oauth/ro](#error-codes-for-oauth-ro).


**More Information**
- [Database Identity Providers](/connections/database)
- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)
- [Active Directory/LDAP Connector](/connector)


## Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time code sent through email or SMS, every time the user logs in.

### Get Code or Link

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start
Content-Type: 'application/json'
{
  "client_id":   "${account.clientId}",
  "connection":  "email or sms",
  "email": "", //set for connection=email
  "phone_number": "". //set for connection=sms
  "send": "link or code", //if left null defaults to link
  "authParams":
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/passwordless/start' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "connection":"email or sms", "email":"", "phone_number":"", "send":"link or code", "authParams":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

//EMAIL: request a link to be sent via email
$('.request-email-link').click(function (ev) {
  ev.preventDefault();
  auth0.requestMagicLink({
    email: $('.email-input').val()
  }, function (err) {
    if (err) {
      alert(err.error_description);
      return;
    }
    // the request was successful and you should receive
    // an email with the link at the specified address
  });
});

//EMAIL: request a code to be sent via email
$('.request-email-code').click(function (ev) {
  ev.preventDefault();

  auth0.requestEmailCode({
    email: $('.email-input').val()
  }, function (err) {
    if (err) {
      alert(err.error_description);
      return;
    }
    // the request was successful and you should receive
    // an email with the code at the specified address
  });
});

//SMS: request a code to be sent via SMS
$('.request-sms-code').click(function (ev) {
  ev.preventDefault();

  auth0.requestSMSCode({
    phoneNumber: $('.phone-input').val()
  }, function (err) {
    if (err) {
      alert(err.error_description);
      return;
    }
    // the request was successful and you should receive
    // a SMS with the code at the specified phone number
  });
});
```

You have three options for [passwordless authentication](/connections/passwordless):
- Send a verification code using email.
- Send a link using email.
- Send a verification code using SMS.


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your app. |
| `connection`     | `email` or `sms` |
| `email`          | The user's email address. Applicable when `connection=email`. |
| `phone_number`   | The user's phone number. Applicable when `connection=sms`. |
| `send`           | `link` (default) to send a link or `code` to send a verification code |
| `authParams`     | |


**Remarks**

- When you are sending a link using email, you can append or override the link parameters (like `scope`, `redirect_uri`, `protocol`, `response_type`, etc.) using the `authParams` object.
- If you sent a verification code, using either email or SMS, after you get the code, you have to authenticate the user using the `/oauth/ro` endpoint, using `email` or `phone_number` as the `username`, and the verification code as the `password`.


**Error Codes**

For the complete error code reference for this endpoint refer to [Error Codes for /passwordless/start](#error-codes-for-passwordless-start).


**More Information**

- [Passwordless Authentication](/connections/passwordless)
- [Authenticate users with using Passwordless Authentication via Email](/connections/passwordless/email)
- [Authenticate users with a one-time code via SMS](/connections/passwordless/sms)
- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)
- [Passwordless FAQ](/connections/passwordless/faq)


### Authenticate User

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "${account.client_id}",
  "connection":  "email or sms",
  "grant_type":  "password",
  "username":    "", //email or phone number
  "password":    "", //the verification code
  "scope":       ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.client_id}", "connection":"email or sms", "grant_type":"password", "username":"", "password":"", "scope":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

//EMAIL: authenticate the user when you get the code, using email and code
auth0.verifyEmailCode({
  email: $('.email-input').val(),
  code: $('.email-code-input').val()
}, function (err, result) {
  if (err) {
    alert("something went wrong: " + err.error_description);
    return;
  }
  alert('Hello');
});

//SMS: authenticate the user when you get the code, using phoneNumber and code
auth0.verifySMSCode({
  phoneNumber: $('.phone-input').val(),
  code: $('.sms-code-input').val()
}, function (err, result) {
  if (err) {
    alert("something went wrong: " + err.error_description);
    return;
  }
  alert("Hello");
});
```

Once you have a verification code, use this endpoint to login the user with their phone number/email and verification code. This is active authentication, so the user must enter the code in your app.


**Query Parameters**

| Parameter        |Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your client. |
| `connection`     | `sms` or `email` |
| `grant_type`     | `password` |
| `username`      | The user's phone number if `connection=sms`, or the user's email if `connection=email`. |
| `password`      | The user's verification code.  |
| `scope`          | `openid or openid profile email` |


**More Information**
- [Passwordless Authentication](/connections/passwordless)
- [Authenticate users with using Passwordless Authentication via Email](/connections/passwordless/email)
- [Authenticate users with a one-time code via SMS](/connections/passwordless/sms)
- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)
- [Passwordless FAQ](/connections/passwordless/faq)

## Enterprise (SAML and Others)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "response_type": {code or token},
  "client_id": "${account.client_id}",
  "connection": "",
  "redirect_uri": "http://localhost/callback",
  "state": "",
  "additional-parameter": ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"response_type":"code or token", "client_id":"${account.client_id}", "connection":"", "redirect_uri":"http://localhost/callback", "state":"", "additional-parameter":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

//trigger login with an enterprise connection
$('.login-microsoft').click(function () {
  auth0.login({
    connection: 'contoso.com'
  });
});
```

Use the endpoint `GET https://${account.namespace}/authorize` for passive authentication. The user will be redirected (`302` redirect) to the SAML Provider (or Windows Azure AD and the rest, as specified in the `connection`) to enter their credentials.


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`  | `code` for server side flows, `token` for client side flows |
| `client_id`      | The `client_id` of your client |
| `connection`     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`   | `http://localhost/callback` |
| `state`          | The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url). |


**Remarks**

- If no `connection` is specified, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget.
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- Additional parameters can be sent that will be passthrough to the provider.
- The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url).

**More Information**
- [SAML](/protocols/saml)
- [Obtain a ClientId and Client Secret for Microsoft Azure Active Directory](/connections/enterprise/azure-active-directory)
