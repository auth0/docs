# Signup

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/dbconnections/signup
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "email": "EMAIL",
  "password": "PASSWORD",
  "connection": "CONNECTION",
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/dbconnections/signup' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "email":"EMAIL", "password":"PASSWORD", "connection":"CONNECTION"}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'token'
  });
</script>

<h2>Signup Database Connection</h2>
<input class="signup-username" />
<input type="password" class="signup-password" />
<input type="button" class="signup-db" value="Signup!" />
<script type="text/javascript">
    $('.signup-db').click(function (e) {
        e.preventDefault();
        auth0.signup({
            connection: 'Username-Password-Authentication',
            username: $('.signup-username').val(),
            password: $('.signup-password').val(),
            sso: true,
            popup: true,
            auto_login: false
        }, function (err) {
            if (err) return alert('Something went wrong: ' + err.message);
            return alert('success signup without login!')
        });
    });
</script>
```

> RESPONSE SAMPLE:

```json
{
  "_id": "58457fe6b27...",
  "email_verified": false,
  "email": "test.account@signup.com"
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/dbconnections/signup",
  "link": "#signup"
}) %>

Given a user's credentials, and a `connection`, this endpoint will create a new user using active authentication.

This endpoint only works for database connections.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `email` <br/><span class="label label-danger">Required</span> | The user's email address. |
| `password` <br/><span class="label label-danger">Required</span> | The user's desired password. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the database configured to your client. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### More Information

- [Password Strength in Auth0 Database Connections](/connections/database/password-strength)
- [Password Options in Auth0 Database Connections](/connections/database/password-options)
- [Adding Username for Database Connections](/connections/database/require-username)
