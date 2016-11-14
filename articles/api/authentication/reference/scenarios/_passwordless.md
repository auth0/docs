# Passwordless

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time password sent every time the user logs in through email or SMS.

## Email

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

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `email`          | string     | the user's email address |
| `send`           | string     | `link` (default) to send a URL or `code` to send a verification code |
| `authParams`     | object     | |

### Remarks

Given a user's email address, this endpoint will send an email containing either:

* A link (default, "send":"link"). You can then authenticate this user and they will be automatically logged in to your application. Optionally, you can append or override the link parameters (like scope, redirect_uri, protocol, response_type, etc.) using the `authParams` object.

* A verification code ("send":"code"). You can then authenticate this user using the [`/oauth/ro`](#ro) endpoint by specifying `email` as the `username` and `code` as the `password`.

## SMS: Start

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

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `phone_number`          | string     | the user's phone number |

### Error Codes

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



## SMS: Authorize

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

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | `sms` |
| `grant_type`     | string     | `password` |
| `username`      | string     | the user's phone number |
| `password`      | string     | the user's verification code  |
| `scope`          | string     | `openid or openid name email` |
