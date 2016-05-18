---
  description: A description of the /passwordless/start Authentication API v2 endpoint listing its parameters.
---

# POST /passwordless/start

Passwordless connections do not require the user to remember a password. Instead, another mechanism is used to prove identity, such as a one-time password sent every time the user logs in through email or SMS.

## Email

```JSON
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

Given a user's email address, this endpoint will send an email containing either:

* A link (default, "send":"link"). You can then authenticate this user and they will be automatically logged in to your application. Optionally, you can append or override the link parameters (like scope, redirect_uri, protocol, response_type, etc.) using the `authParams` object.

* A verification code ("send":"code"). You can then authenticate this user using the [/oauth/ro](/docs/api/authentication/oauth/ro) endpoint by specifying `email` as the `username` and `code` as the `password`.

### Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `email`          | string     | the user's email address |
| `send`           | string     | `link` (default) to send a URL or `code` to send a verification code |
| `authParams`     | string     | |


## SMS

Given the user's `phone_number`, this endpoint will send an SMS message containing a verification code. You can then authenticate this user using the [/oauth/ro](/docs/api/authentication/oauth/ro) endpoint by specifying `phone_number` as the `username` and `code` as the `password`.

```JSON
POST https://${account.namespace}/passwordless/start
Content-Type: 'application/json'
{
  "client_id":   "{client-id}",
  "connection":  "sms",
  "phone_number":       "",
}
```

### Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `phone_number`          | string     | the user's phone number |

## Error Codes

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

