# Signup

```http
POST https://${account.namespace}/dbconnections/signup
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "email": "EMAIL",
  "password": "PASSWORD",
  "connection": "CONNECTION",
  "username": "johndoe",
  "given_name": "John",
  "family_name": "Doe",
  "name": "John Doe",
  "nickname": "johnny",
  "picture": "http://example.org/jdoe.png"
  "user_metadata": { plan: 'silver', team_id: 'a111' }
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/dbconnections/signup' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "email":"test.account@signup.com", "password":"PASSWORD", "connection":"CONNECTION", "username": "johndoe", "given_name": "John", "family_name": "Doe", "name": "John Doe", "nickname": "johnny", "picture": "http://example.org/jdoe.png", "user_metadata":{ "plan": "silver", "team_id": "a111" }}'
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize client
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });
  
  webAuth.signup({ 
    connection: 'CONNECTION', 
    email: 'EMAIL', 
    password: 'PASSWORD',
    username: "johndoe",
    given_name: "John",
    family_name: "Doe",
    name: "John Doe",
    nickname: "johnny",
    picture: "http://example.org/jdoe.png",
    user_metadata: { plan: 'silver', team_id: 'a111' }
  }, function (err) { 
    if (err) return alert('Something went wrong: ' + err.message); 
      return alert('success signup without login!') 
  });
</script>
```

> RESPONSE SAMPLE:

```json
{
  "_id": "58457fe6b27...",
  "email_verified": false,
  "email": "test.account@signup.com",
  "username": "johndoe",
  "given_name": "John",
  "family_name": "Doe",
  "name": "John Doe",
  "nickname": "johnny",
  "picture": "http://example.org/jdoe.png"
}
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/dbconnections/signup",
  "link": "#signup"
}) %>

Given a user's credentials and a `connection`, this endpoint creates a new user.

This endpoint only works for database connections. 


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `email` <br/><span class="label label-danger">Required</span> | The user's email address. |
| `password` <br/><span class="label label-danger">Required</span> | The user's desired password. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the database configured to your client. |
| `username` | The user's username. Only valid if the connection requires a username. |
| `given_name` | The user's given name(s). |
| `family_name` | The user's family name(s). |
| `name` | The user's full name. |
| `nickname` | The user's nickname. |
| `picture` | A URI pointing to the user's picture. |
| `user_metadata` | The [user metadata](/users/concepts/overview-user-metadata) to be associated with the user. If set, the field must be an object containing no more than ten properties. Property names can have a maximum of 100 characters, and property values must be strings of no more than 500 characters. |


### Remarks
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).


### Learn More

- [Password Strength in Auth0 Database Connections](/connections/database/password-strength)
- [Password Options in Auth0 Database Connections](/connections/database/password-options)
- [Adding Username for Database Connections](/connections/database/require-username)
- [Metadata Overview](/users/concepts/overview-user-metadata)
