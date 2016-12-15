# Change Password

<h5 class="code-snippet-title">Examples</h5>

```http
```

```shell
POST https://${account.namespace}/dbconnections/change_password
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

Given a user's `email` address and a `connection`, Auth0 will send a change password email.

<aside class="notice">
For more information, see: <a href='/connections/database/password-change'>Changing a User's Password</a>.
</aside>

### HTTP Request

`POST https://${account.namespace}/dbconnections/change_password`

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `email`          | string     | the user's email address |
| `password `      | string     | the new password (optional, see remarks) |
| `connection`     | string     | the name of an identity provider configured to your app |

<aside class="warning">
If you are using Lock version 9 and above, do not set the password field, or you will receive a *password is not allowed* error. You can only set the password if you are using Lock version 8.
</aside>

### Remarks

* If a password is provided, when the user clicks on the confirm password change link, the new password specified in this POST will be set for this user.
* If a password is NOT provided, when the user clicks on the password change link they will be redirected to a page asking them for a new password.
