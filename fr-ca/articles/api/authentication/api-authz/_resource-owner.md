# Resource Owner Password Flow
## Get Token

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=USERNAME&password=PASSWORD&audience=API_IDENTIFIER&scope=SCOPE&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=password&username=USERNAME&password=PASSWORD&audience=API_IDENTIFIER&scope=SCOPE&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'password',
     username: 'USERNAME',
     password: 'PASSWORD',
     audience: 'API_IDENTIFIER',
     scope: 'SCOPE',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' }
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#resource-owner-password"
}) %>

:::warning
This flow should only be used from highly-trusted applications that **cannot do redirects**. If you can use redirect-based flows from your app, we recommend using the [Authorization Code Flow](#regular-web-app-login-flow) instead.
:::

This is the OAuth 2.0 grant that highly-trusted apps use to access an API. In this flow, the end-user is asked to fill in credentials (username/password), typically using an interactive form in the user-agent (browser). This information is sent to the backend and from there to Auth0. It is therefore imperative that the application is absolutely trusted with this information. For [single-page applications and native/mobile apps](/flows/concepts/auth-code-pkce), we recommend using web flows instead.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Resource Owner Password use  `password`. To add realm support use `http://auth0.com/oauth/grant-type/password-realm`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. Required when the Token Endpoint Authentication Method field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `audience` | The unique identifier of the target API you want to access. |
| `username` <br/><span class="label label-danger">Required</span> | Resource Owner's identifier, such as a username or email address. |
| `password` <br/><span class="label label-danger">Required</span> | Resource Owner's secret. |
| `scope` | String value of the different <dfn data-key="scope">scopes</dfn> the application is asking for. Multiple scopes are separated with whitespace. |
| `realm` | String value of the realm the user belongs. Set this if you want to add realm support at this grant. For more information on what realms are refer to [Realm Support](/api-auth/grant/password#realm-support). |

### Request headers

| Parameter        | Description |
|:-----------------|:------------|
| `auth0-forwarded-for` | End-user IP as a string value. Set this if you want brute-force protection to work in server-side scenarios. For more information on how and when to use this header, refer to [Using resource owner password from server-side](/api-auth/tutorials/using-resource-owner-password-from-server-side). |

### Remarks

- The <dfn data-key="scope">scopes</dfn> issued to the application may differ from the scopes requested. In this case, a `scope` parameter will be included in the response JSON.
- If you don't request specific scopes, all scopes defined for the audience will be returned due to the implied trust to the application in this grant. You can customize the scopes returned in a rule. For more information, refer to [Calling APIs from Highly Trusted Applications](/api-auth/grant/password).
- To add realm support set the `grant_type` to `http://auth0.com/oauth/grant-type/password-realm`, and the `realm` to the realm the user belongs. This maps to a connection in Auth0. For example, if you have configured a database connection for your internal employees and you have named the connection `employees`, then use this value. For more information on how to implement this refer to: [Realm Support](/api-auth/tutorials/password-grant#realm-support).
- In addition to username and password, Auth0 may also require the end-user to provide an additional factor as proof of identity before issuing the requested scopes. In this case, the request described above will return an `mfa_required` error along with an `mfa_token`. You can use these tokens to request a challenge for the possession factor and validate it accordingly. For details refer to [Resource Owner Password and MFA](#resource-owner-password-and-mfa).

### Learn More
- [Calling APIs from Highly-Trusted Applications](/api-auth/grant/password)
- [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant)
- [Multi-factor Authentication and Resource Owner Password](/mfa/guides/mfa-api/multifactor-resource-owner-password)