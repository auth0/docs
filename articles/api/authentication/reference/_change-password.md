# Change Password

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/dbconnections/change_password
Content-Type: 'application/json'
{
  "client_id":   "${account.clientId}",
  "email":       "",
  "password":    "",
  "connection":  "",
}
```

```shell
curl --request POST \
  --url https://${account.namespace}/dbconnections/change_password \
  --header 'content-type: application/json' \
  --data '{"client_id": "${account.clientId}","email": "", "password": "", "connection": ""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

$('.change_password').click(function () {
  auth0.changePassword({
    connection: 'db-conn',
    email:   'foo@bar.com'
  }, function (err, resp) {
    if(err){
      console.log(err.message);
    }else{
      console.log(resp);
    }

  });
});
```

Given a user's `email` address and a `connection`, Auth0 will send a change password email.

**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your client |
| `email`          | the user's email address |
| `password `      | the new password (optional) |
| `connection`     | the name of the database connection configured to your client |

**Remarks**

- This endpoint only works for database connections.
- If a password is provided, when the user clicks on the confirm password change link, the new password specified in this POST will be set for this user.
- If a password is NOT provided, when the user clicks on the password change link they will be redirected to a page asking them for a new password.
- If you are using Lock version 9 and above, do not set the password field, or you will receive a *password is not allowed* error. You can only set the password if you are using Lock version 8.


**More Information**

- [Changing a User's Password](/connections/database/password-change)
- [Password Strength in Auth0 Database Connections](/connections/database/password-strength)
- [Password Options in Auth0 Database Connections](/connections/database/password-options)
