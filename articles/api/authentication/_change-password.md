# Change Password

```http
POST https://${account.namespace}/dbconnections/change_password
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "email": "EMAIL",
  "connection": "CONNECTION",
}
```

```shell
curl --request POST \
  --url https://${account.namespace}/dbconnections/change_password \
  --header 'content-type: application/json' \
  --data '{"client_id": "${account.clientId}","email": "EMAIL", "connection": "CONNECTION"}'
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });
  
  webAuth.changePassword({
    connection: 'CONNECTION',
    email:   'EMAIL'
  }, function (err, resp) {
    if(err){
      console.log(err.message);
    }else{
      console.log(resp);
    }
  });
</script>
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/dbconnections/change_password",
  "link": "#change-password"
}) %>

> RESPONSE SAMPLE:

```JSON
"We've just sent you an email to reset your password."
```

Given a user's `email` address and a `connection`, Auth0 will send a change password email.

This endpoint only works for database connections.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` | The `client_id` of your client. We strongly recommend including a Client ID so that the email template knows from which client the request was triggered. |
| `email` <br/><span class="label label-danger">Required</span> | The user's email address. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the database connection configured to your client. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Remarks

- When the user clicks on the password change link they will be redirected to a page asking them for a new password.
- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  * `X-RateLimit-Limit`: Number of requests allowed per minute.
  * `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  * `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).


### More Information

- [Changing a User's Password](/connections/database/password-change)
- [Password Strength in Auth0 Database Connections](/connections/database/password-strength)
- [Password Options in Auth0 Database Connections](/connections/database/password-options)
- [Auth0 API Rate Limit Policy](/policies/rate-limits)
