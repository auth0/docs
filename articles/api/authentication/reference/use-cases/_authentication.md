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
  "scope":        "",
  ""
}
```

```shell
ruby
```

```javascript
python
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
| `scope`          | string     | `openid` or `openid name email` |

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

This endpoint only works for database connections, ss connections, Active Directory/LDAP, Windows Azure AD and ADFS.

For the error code reference for this endpoint refer to [Error Codes for /oauth/ro](#error-codes-for-oauth-ro).

## Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time code sent through email or SMS, every time the user logs in.

### Get Verification Code

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start
Content-Type: 'application/json'
{
  "client_id":   "{client-id}",
  "connection":  "email or sms",
  "email": "", //set for connection=email
  "phone_number": "". //set for connection=sms
  "send": "link or code", //if left null defaults to link
  "authParams":
}
```

```shell
shell
```

```javascript
javascript
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
shell
```

```javascript
javascript
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
| `scope`          | string     | `openid or openid name email` |

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

## SAML

### Login

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/${account.client_id}?connection=
```

```shell
shell
```

```javascript
javascript
```

```csharp
csharp
```

Redirect a user to the login page for the specified connection.

The SAML protocol is mostly used for third-party SaaS applications (e.g. Salesforce, Box, etc.). Auth0 supports SP and IDP Initiated Sign On.

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app (optional, see remarks) |

<aside class="notice">
All the parameters of the SAML response can be modified with <a href='/rules'>rules </a>
</aside>

#### Remarks

* This endpoint optionally accepts a `connection` parameter to login with the specified provider. If no connection is specified, the [Auth0 Login Page](/login_page) is shown.

* The SAML request `AssertionConsumerServiceURL` will be used to `POST` back the assertion. It must match the application's `callback_URL`.


### Callback

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/login/callback?connection=
```

```shell
shell
```

```javascript
javascript
```

```csharp
csharp
```

This endpoint accepts an IdP-Initiated Sign On SAMLResponse from a SAML Identity Provider. The connection corresponding to the identity provider is specified in the querystring. The user will be redirected to the application that is specified in the SAML Provider IdP-Initiated Sign On section.

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `connection`     | string     | the name of an identity provider configured to your app |
| `SAMLResponse`   | string     | an IdP-Initiated Sign On SAML Response |


## Ws-Fed

The WS-Fed protocol is used for Microsoft applications (e.g.: Office365, Dynamics CRM, etc.).

### Login

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/wsfed/{client-id}
```

```shell
shell
```

```javascript
javascript
```

```csharp
csharp
```

This endpoint accepts a WS-Fed request to initiate a login.

<aside class="notice">
For more information, see: <a href="/protocols#ws-federation">WS-Federation Protocols</a>.
</aside>

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client-id`      | string     | the `client-id` of your app (optional) |
| `wtrealm`        | string     | can be used in place of `client-id` |
| `whr `           |            | the name of the connection (to skip the login page, optional) |
| wctx             |            | your application's state (optional) |
| wreply           |            | the callback URL (optional) |

<aside class="notice">
All the parameters of the SAML assertion can be modified through <a href='/rules'>rules</a>.
</aside>

#### Remarks

* The `wtrealm` parameter must be in one of these formats:
  * `urn:clientID` (e.g. urn:{client-id})
  * If this parameter does not begin with a urn, the `client.clientAliases` array is used for look-up. (This can only be set with the [/api/v2/clients](/api/management/v2#!/Clients/get_clients) Management API)
* The `whr` parameter is mapped to the connection like this: `urn:{connection_name}`. For example, `urn:google-oauth2` indicates login with Google. If there is no `whr` parameter included, the user will be directed to the [Auth0 Login Page](/login_page).
