# Signup

<h5 class="code-snippet-title">Examples</h5>

```http
```

```shell
POST https://${account.namespace}/dbconnections/signup
Content-Type: 'application/json'
{
  "client_id":   "{client_id}",
  "email":       "",
  "password":    "",
  "connection":  "",
}
```

```javascript
```

<!-- ```ruby
ruby
```

```python
python
```

```csharp
csharp
```

```php
php
```

```java
java
``` -->

> This command returns a JSON in this format:

```json
{
  "_id": "",
  "email_verified": false,
  "email": ""
}
```

Given a user's credentials, and a `connection`, this endpoint will create a new user using active authentication. You can then authenticate this user with the [Resource Owner](#resource-owner) endpoint.

### HTTP Request

`POST https://${account.namespace}/dbconnections/signup`

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `email`          | string     | the user's email address |
| `password `      | string     | the user's desired password |
| `connection`     | string     | the name of an identity provider configured to your app |
