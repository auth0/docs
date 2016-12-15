# Authentication

## Social

Use this endpoint to authenticate a user with a social provider. This endpoint will return a 302 redirect to the social provider specified in `connection`.

Social connections only support browser-based (passive) authentication because most social providers don't allow a username and password to be entered into applications that they don't own. Therefore, the user will be redirected to the provider's sign in page.

### Use Social Provider's Access Token

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/access_token
Content-Type: 'application/json'
{
  "client_id":    "{client_id}",
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

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `access_token`   | string     | the social provider's `access_token` |
| `connection`     | string     | the name of an identity provider configured to your app |
| `scope`          | string     | `openid` or `openid name email` |

## Database

## Active Directory / LDAP

## Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time password sent every time the user logs in through email or SMS.

### Get Verification Code 1

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start
Content-Type: 'application/json'
{
  "client_id":   "{client-id}",
  "connection":  "email",
  "email":       "",
  "send":        "",
  "authParams":
}
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

Passwordless authentication by email is done by calling the `passwordless/start` endpoint as shown here. Upon calling this endpoint, Auth0 will send an email to the provided address with a code or a link to click to complete the authorization process. More information can be found on in our [documentation](/docs/connections/passwordless/email).

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `email`          | string     | the user's email address |
| `send`           | string     | `link` (default) to send a URL or `code` to send a verification code |
| `authParams`     | object     | |

#### Remarks

Given a user's email address, this endpoint will send an email containing either:

* A link (default, "send":"link"). You can then authenticate this user and they will be automatically logged in to your application. Optionally, you can append or override the link parameters (like scope, redirect_uri, protocol, response_type, etc.) using the `authParams` object.

* A verification code ("send":"code"). You can then authenticate this user using the [`/oauth/ro`](#ro) endpoint by specifying `email` as the `username` and `code` as the `password`.

### Get Verification Code 2

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/passwordless/start
Content-Type: 'application/json'
{
  "client_id":   "{client-id}",
  "connection":  "sms",
  "phone_number":       "",
}
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

Given the user's `phone_number`, this endpoint will send an SMS message containing a verification code. You can then authenticate this user using the [`/oauth/ro`](#ro) endpoint by specifying `phone_number` as the `username` and `code` as the `password`.

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `phone_number`          | string     | the user's phone number |

#### Error Codes

HTTP 400

| Error            | Code       |
|:-----------------|:-----------|
| Invalid tenant | {"error":"bad.tenant","error\_description":"error in tenant - tenant validation failed: invalid\_tenant"} |
| Missing client_id | {"error":"bad.client\_id","error\_description":"Missing required property: client_id"} |
| Missing connection | {"error":"bad.connection","error_description":"Missing required property: connection"} |
| Connection does not exist | {"error":"bad.connection","error_description":"Connection does not exist"} |
| Disabled&nbsp;connection | {"error":"bad.connection","error_description":"Connection is disabled"} |
| Invalid connection | {"error":"bad.connection","error_description":"Invalid connection strategy. It must either be a passwordless connection"} |
| Invalid authParams | {"error":"bad.authParams","error_description":"error in authParams - invalid type: string (expected object)"} |
| Invalid paramaters | {"error":"bad.request","error\_description":"the following properties are not allowed: <INVALID_PARAMETER_VALUE>"} |
| Missing phone_number | {"error":"bad.phone\_number","error\_description":"Missing required property: phone_number"} |
| Invalid phone_number format | {"error":"bad.phone\_number","error_description":"String does not match pattern: ^\\+[0-9]{1,15}$"} |
| SMS Provider errors | {"error":"sms\_provider\_error","error\_description":"<SPECIFIC_PROVIDER_MESSAGE> (Code: <SPECIFIC_PROVIDER_CODE>)"} |



### Authorize User

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "{client_id}",
  "connection":  "sms",
  "grant_type":  "password",
  "username":    "",
  "password":    "",
  "scope":       ""
}
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

Login a user with their phone number and verification code (active authentication).

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

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | `sms` |
| `grant_type`     | string     | `password` |
| `username`      | string     | the user's phone number |
| `password`      | string     | the user's verification code  |
| `scope`          | string     | `openid or openid name email` |

## SAML

### Login

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/{client_id}?connection=
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

### Get Metadata

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/samlp/metadata/{client_id}
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

This endpoint returns the SAML 2.0 metadata.

#### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |


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

### Get Metadata

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/wsfed/{client-id}/FederationMetadata/2007-06/FederationMetadata.xml
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

This endpoint returns the WS-Federation metadata.
