# Signup

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/dbconnections/signup?
  client_id=${account.clientId}&
  email=EMAIL&
  password=PASSWORD&
  connection=CONNECTION
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/dbconnections/signup' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "email":"", "password":"", "connection":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  'https://YOUR_APP_URL/callback',
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


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your client |
| `email`          | the user's email address |
| `password `      | the user's desired password |
| `connection`     | the name of the database configured to your client |


### More Information

- [Password Strength in Auth0 Database Connections](/connections/database/password-strength)
- [Password Options in Auth0 Database Connections](/connections/database/password-options)
- [Adding Username for Database Connections](/connections/database/require-username)
