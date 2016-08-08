---
  description: A description of the /dbconnections/change_password Authentication API v2 endpoint listing its parameters.
---

# POST /dbconnections/change_password

Given a user's `email` address and a `connection`, Auth0 will send a change password email. This endpoint only works for database connections.

```JSON
POST https://${account.namespace}/dbconnections/change_password
Content-Type: 'application/json'
{
  "client_id":   "{client_id}",
  "email":       "",
  "password":    "",
  "connection":  "",
}
```

## Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `email`          | string     | the user's email address |
| `password `      | string     | the new password (optional, see remarks) |
| `connection`     | string     | the name of an identity provider configured to your app |

## Remarks

* If a password is provided, when the user clicks on the confirm password change link, the new password specified in this POST will be set for this user.
* If a password is NOT provided, when the user clicks on the password change link they will be redirected to a page asking them for a new password.

::: panel-warning Warning
If you are using Lock version 9 and above, do not set the password field, or you will receive a *password is not allowed* error. You can only set the password if you are using Lock version 8. See: [Changing a User's Password](/docs/connections/database/password-change).
:::

