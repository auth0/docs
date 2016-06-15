---
title: MFA on a Resource Owner endpoint
description: How to enable MFA on the Resource Owner endpoint.
---

# MFA on a Resource Owner endpoint

To enable MFA on the Resource Owner [/ro](/api/authentication#!#post--oauth-ro) endpoint, include the `options.mfa.active` flag in the connection and set it to `true`. 

To enable enrollment, also include the `options.mfa.return_enroll_settings` flag in the connection.

### Scenario 1 - Enrolled user with Google authentication and a valid code

Path: `/oauth/ro`

Payload: 

```txt
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid",
  "mfa_code": 99999
}
```

#### Response

HTTP 200

```
{
  "id_token": "[id_token}",
  "access_token": "[token]"
  "token_type": "bearer"
}
```

### Scenario 2 - Enrolled user with Google authentication and an invalid or expired code

Path: `/oauth/ro`

Payload:

```
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid",
  "mfa_code": "999999"
}
```

#### Response

HTTP 401

```
{
  "error": "a0.mfa_invalid_code",
  "error_description": "Wrong or expired code."
}
```

### Scenario 3 - MFA is enabled but `mfa_code` is missing

Path: `/oauth/ro`

Payload:

```
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid"
}
```

#### Response

HTTP 401

```
{
  "error": "a0.mfa_required",
  "error_description": "missing mfa_code parameter"
}
```

### Scenario 4 - MFA is enabled but user is not enrolled

The account has Google Authenticator multifactor authentication is enabled for the `client_id` but the user has not yet enrolled.

Path: `/oauth/ro`

Payload:

```
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid"
}
```

#### Response

HTTP 401

```
{
  "error": "a0.mfa_registration_required",
  "error_description": "User is not enrolled with Google Authenticator"
}
```


### Scenario 5 - MFA is enabled, enroll is enabled, but user is not enrolled

The account has Google Authenticator multifactor authentication enabled for the `client_id` but the user has not yet enrolled.

Path: `/oauth/ro`

Payload:

```
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid"
}
```

#### Response

HTTP 401

```
{
  "error": "a0.mfa_registration_required",
  "error_description": "MFA registration is required. Generated keys for enrollement",
  "mfa_settings" : {
    "qr": "url",
    "key": "key",
    "provder": "google-authenticator"
  }
}
```

### Scenario 6 - MFA is enabled but provider is not supported

The account has Guardian or DUO multifactor authentication enabled for the `client_id`.

Path: `/oauth/ro`

Payload:

```
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid"
}
```

#### Response

HTTP 400

```
{
  "error": "invalid_request",
  "error_description": "Provider ${provider} not supported"
}
```

### Scenario 7 - MFA is disabled but `mfa_code` is provided

The account does not have multifactor authentication enabled for the `client_id` and the `mfa_code` property is sent in the payload.

Path: `/oauth/ro`

Payload:

```
{
  "client_id": "12345",
  "connection": "myDbConn",
  "grant_type": "password",
  "username": "jdoe@example.org",
  "password": "shhh",
  "scope": "openid",
  "mfa_code": "999999"
}
```

#### Response

HTTP 400

```
{
  "error": "invalid_request",
  "error_description": "mfa_code not allowed"
}
```

