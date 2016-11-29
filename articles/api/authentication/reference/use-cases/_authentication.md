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

```javascript

```

Use the endpoint `GET https://${account.namespace}/authorize` to authenticate a user with a social provider. This endpoint will return a `302` redirect to the social provider specified in `connection`.

Social connections only support browser-based (passive) authentication because most social providers don't allow a username and password to be entered into applications that they don't own. Therefore, the user will be redirected to the provider's sign in page.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `response_type`  | string     | `code` for server side flows, `token` for client side flows |
| `client_id`      | string     | the `client_id` of your client |
| `connection`     | string     | The name of an identity provider configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget. |
| `redirect_uri`   | string     | `http://localhost/callback` |
| `state`          | string     | The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url). |

If `response_type=token`, after the user authenticates on the provider, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.

Additional parameters can be sent that will be passthrough to the provider. For example, `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode).

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

<aside class="notice">
For more information, see: <a href="/tokens/id_token">Auth0 id_token</a>.
</aside>

> This command returns a JSON object in this format:

```json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `access_token`   | string     | the social provider's `access_token` |
| `connection`     | string     | the name of an identity provider configured to your app |
| `scope`          | string     | `openid` or `openid profile email` |

## Database / Active Directory / LDAP

Database, Active Directory and LDAP connections support browser based (passive) authentication and API-based (active) authentication. The main difference between passive and active authentication is that the former happens in the browser through the [Login Page](https://auth0.com/#/login_page) and the latter can be invoked from anywhere (a script, server to server, etc.).

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

```

Use the endpoint `GET https://${account.namespace}/authorize` for passive authentication. It returns a `302` redirect to [Auth0 Login Page](https://auth0.com/#/login_page) that will show the Login Widget where the user can login with email and password.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `response_type`  | string     | `code` for server side flows, `token` for client side flows |
| `client_id`      | string     | The `client_id` of your client |
| `connection`     | string     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`   | string     | `http://localhost/callback` |
| `state`          | string     | The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url). |

If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.

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

```

Use the endpoint `POST https://${account.namespace}/oauth/ro` for active authentication. Given the user credentials and the `connection` specified, it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your client |
| `username`       | string     |  |
| `password`       | string     |  |
| `id_token`       | string     |  |
| `connection`     | string     | the name of the connection configured to your client |
| `grant_type`     | string     |  |
| `scope`          | string     |  |
| `device`         | string     |  |

This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.

For the error code reference for this endpoint refer to [Error Codes for /oauth/ro](#error-codes-for-oauth-ro).

## Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time code sent through email or SMS, every time the user logs in.

### Get Verification Code

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

```

You have three options for [passwordless authentication](/connections/passwordless):
- Send a verification code using email.
- Send a link using email.
- Send a verification code using SMS.

Depending on the method you choose some query parameters vary:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | The `client_id` of your app. |
| `connection`     | string     | `email` or `sms` |
| `email`          | string     | The user's email address. Applicable when `connection=email`. |
| `phone_number`   | string     | The user's phone number. Applicable when `connection=sms`. |
| `send`           | string     | `link` (default) to send a link or `code` to send a verification code |
| `authParams`     | object     | |

Note the following:
- When you are sending a link using email, you can append or override the link parameters (like `scope`, `redirect_uri`, `protocol`, `response_type`, etc.) using the `authParams` object.
- If you sent a verification code, using either email or SMS, after you get the code, you have to authenticate the user using the `/oauth/ro` endpoint, using `email` or `phone_number` as the `username`, and the verification code as the `password`.

For the error code reference for this endpoint refer to [Error Codes for /passwordless/start](#error-codes-for-passwordless-start).


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

```

Once you have a verification code, use this endpoint to login the user with their phone number/email and verification code. This is active authentication, so the user must enter the code in your app.

> {TO-BE-REMOVED} This command returns a JSON object in this format:

```json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

Depending on the method you choose to get the verification code, some query parameters vary:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | The `client_id` of your client. |
| `connection`     | string     | `sms` or `email` |
| `grant_type`     | string     | `password` |
| `username`      | string     | The user's phone number if `connection=sms`, or the user's email if `connection=email`. |
| `password`      | string     | The user's verification code.  |
| `scope`          | string     | `openid or openid profile email` |

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

```

Use the endpoint `GET https://${account.namespace}/authorize` for passive authentication. The user will be redirected (`302` redirect) to the SAML Provider (or Windows Azure AD and the rest, as specified in the `connection`) to enter their credentials.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `response_type`  | string     | `code` for server side flows, `token` for client side flows |
| `client_id`      | string     | The `client_id` of your client |
| `connection`     | string     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`   | string     | `http://localhost/callback` |
| `state`          | string     | The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url). |

Note the following:
- If no `connection` is specified, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget.
- If `response_type=token`, after the user authenticates, it will redirect to your application `callback URL` passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and also on Native Mobile SDKs.
- Additional parameters can be sent that will be passthrough to the provider.
- The `state` parameter will be sent back should be used for XSRF and contextual information (like a return url).
