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

> RESPONSE SAMPLE:

```json
{
  "_id": "",
  "email_verified": false,
  "email": ""
}
```

Given a user's credentials, and a `connection`, this endpoint will create a new user using active authentication. This endpoint only works for database connections.


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your client |
| `email`          | the user's email address |
| `password `      | the user's desired password |
| `connection`     | the name of the database configured to your client |
