---
  description: A description of the /dbconnections/signup Authentication API v2 endpoint listing its parameters.
---

# POST /dbconnections/signup

Given a user's credentials, and a `connection`, this endpoint will create a new user using active authentication. You can then authenticate this user with the [`/oauth/ro`](/docs/api/authentication/oauth/ro) endpoint. This endpoint only works for database connections.

```JS
POST https://${account.namespace}/dbconnections/signup
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
| `password `      | string     | the user's desired password |
| `connection`     | string     | the name of an identity provider configured to your app |
