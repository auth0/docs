---
  description: A description of the /oauth/ro Authentication API v2 endpoint listing its parameters.
---

# POST /oauth/ro

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON with the `access_token` and an `id_token`. 


## Database & Active Directory / LDAP Authentication

Login a user with username and password (active authentication).

This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.

```JSON
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "{client_id}",
  "connection":  "",
  "grant_type":  "",
  "username":    "",
  "password":    "",
  "scope":       "",
  "id_token":    "",
  "device":      ""
}
```

### Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of the AD connection configured to your app |
| `grant_type`     | string     | `password` |
| `username`       | string     | the user's username |
| `password`       | string     | the user's password |
| `scope`         | string     | `openid || openid name email || openid offline_access` |
| `id_token`       | string     |  |
| `device`         | string     |  |

## SMS

Login a user with their phone number and verification code (active authentication).

```JSON
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

### Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | `sms` |
| `grant_type`     | string     | `password` |
| `username`      | string     | the user's phone number |
| `password`      | string     | the user's verification code  |
| `scope`          | string     | `openid || openid name email` |

I