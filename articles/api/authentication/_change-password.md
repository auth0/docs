# Change Password

```http
POST https://${account.namespace}/dbconnections/change_password
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "email": "EMAIL",
  "connection": "CONNECTION",
  "organization": "ORGANIZATION_ID"
}
```

```shell
curl --request POST \
  --url https://${account.namespace}/dbconnections/change_password \
  --header 'content-type: application/json' \
  --data '{"client_id": "${account.clientId}","email": "EMAIL", "connection": "CONNECTION", "organization": "ORGANIZATION_ID"}'
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
    email:   'EMAIL',
    organization: 'ORGANIZATION_ID'
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

Send a change password email to the user's provided email address and `connection`.

Optionally, you may provide an Organization ID to support Organization-specific variables in [customized email templates](https://auth0.com/docs/customize/email/email-templates#common-variables) and to include the `organization_id` and `organization_name` parameters in the **Redirect To** URL.

Note: This endpoint only works for database connections.

### Request Parameters

| Parameter        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|:-----------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `client_id` | ID of the client (application). If provided for tenants using the New Universal Login experience, the email template and UI displays application details, and the user is prompted to redirect to the application's [default login route](https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes#completing-the-password-reset-flow) after the ticket is used. `client_id` is required to use the [Password Reset Post Challenge](https://auth0.com/docs/customize/actions/flows-and-triggers/post-change-password-flow) trigger. |
| `email` <br/><span class="label label-danger">Required</span> | The user's email address.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the database connection configured to your client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `organization` | The `organization_id` of the Organization associated with the user.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |


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
