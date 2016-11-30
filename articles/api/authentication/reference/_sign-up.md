# Signup

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/dbconnections/signup
Content-Type: 'application/json'
{
  "client_id":   "${account.client_id}",
  "email":       "",
  "password":    "",
  "connection":  "",
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/dbconnections/signup' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.client_id}", "email":"", "password":"", "connection":""}'
```

```javascript
```

> Response Sample:

```json
{
  "_id": "",
  "email_verified": false,
  "email": ""
}
```

This endpoint only works for database connections.

Given a user's credentials, and a `connection`, this endpoint will create a new user using active authentication.

**Query Parameters**

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your client |
| `email`          | string     | the user's email address |
| `password `      | string     | the user's desired password |
| `connection`     | string     | the name of the database configured to your client |
