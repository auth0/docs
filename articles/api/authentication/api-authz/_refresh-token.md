# Refresh Token

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&refresh_token=YOUR_REFRESH_TOKEN
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=refresh_token&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&refresh_token=YOUR_REFRESH_TOKEN'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'refresh_token',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     refresh_token: 'YOUR_REFRESH_TOKEN'}
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
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#refresh-token"
}) %>

Use this endpoint to refresh an <dfn data-key="access-token">Access Token</dfn> using the <dfn data-key="refresh-token">Refresh Token</dfn> you got during authorization.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. To refresh a token, use  `refresh_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. Required when the **Token Endpoint Authentication Method** field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `refresh_token` <br/><span class="label label-danger">Required</span> | The refresh token to use. |
| `scope` | A space-delimited list of requested scope permissions. If not sent, the original scopes will be used; otherwise you can request a reduced set of scopes. Note that this must be URL encoded. |

### Learn More

- [Refresh Tokens](/tokens/concepts/refresh-tokens)

## Token Exchange for Native Social

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=SUBJECT_TOKEN&subject_token_type=SUBJECT_TOKEN_TYPE&client_id=${account.clientId}&audience=API_IDENTIFIER&scope=SCOPE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=SUBJECT_TOKEN&subject_token_type=SUBJECT_TOKEN_TYPE&client_id=${account.clientId}&audience=API_IDENTIFIER&scope=SCOPE'
 }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
     subject_token: 'SUBJECT_TOKEN',
     subject_token_type: 'SUBJECT_TOKEN_TYPE',
     client_id: '${account.clientId}',
     audience: 'API_IDENTIFIER',
     scope: 'SCOPE',
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
  "access_token": "eyJz93a...k4laUWw",
  "id_token": "eyJ...0NE",
  "refresh_token": "eyJ...MoQ",
  "expires_in":86400,
  "token_type":"Bearer"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#token-exchange-native-social"
}) %>

:::warning
This flow is intended for use with native social interactions **only**. Use of this flow outside of a native social setting is highly discouraged.
:::

When a non-browser-based solution (such as a mobile platform's SDK) authenticates the user, the authentication will commonly result in artifacts being returned to application code. In such situations, this grant type allows for the Auth0 platform to accept artifacts from trusted sources and issue tokens in response. In this way, apps making use of non-browser-based authentication mechanisms (as are common in native apps) can still retrieve Auth0 tokens without asking for further user interaction.

Artifacts returned by this flow (and the contents thereof) will be determined by the `subject_token_type` and the tenant's configuration settings.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Token Exchange for Native Social, use `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `subject_token` <br/><span class="label label-danger">Required</span> | Externally-issued identity artifact representing the user. |
| `subject_token_type` <br/><span class="label label-danger">Required</span> | Identifier that indicates the type of `subject_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `audience` | The unique identifier of the target API you want to access. |
| `scope` | String value of the different <dfn data-key="scope">scopes</dfn> the application is requesting. Multiple scopes are separated with whitespace. |
| `user_profile` <br/><span class="label label-info">Only For `apple-authz-code`</span>  | Optional element used for native iOS interactions for which profile updates can occur.  Expected parameter value will be JSON in the form of: `{ name: { firstName: 'John', lastName: 'Smith }}` |

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `auth0-forwarded-for` | End user IP as a string value. Set this if you want brute-force protection to work in server-side scenarios. To learn more about how and when to use this header, read [Using resource owner password from server-side](/api-auth/tutorials/using-resource-owner-password-from-server-side). |

### Remarks

- The <dfn data-key="scope">scopes</dfn> issued to the application may differ from the requested scopes. In this case, a `scope` parameter will be included in the response JSON.
- If you don't request specific scopes, all scopes defined for the audience will be returned due to the implied trust to the application in this grant. You can customize the scopes returned in a rule. To learn more, read [Calling APIs from Highly Trusted Applications](/api-auth/grant/password).

### Learn More
- [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
- [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)

## Revoke Refresh Token

```http
POST https://${account.namespace}/oauth/revoke
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "token": "YOUR_REFRESH_TOKEN",
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/revoke' \
  --header 'content-type: application/json' \
  --data '{ "client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET", "token": "YOUR_REFRESH_TOKEN" }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/revoke',
  headers: { 'content-type': 'application/json' },
  body: 
   { client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     token: 'YOUR_REFRESH_TOKEN' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:

```JSON
HTTP/1.1 200 OK
(empty-response-body)
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/revoke",
  "link": "#revoke-refresh-token"
}) %>

Use this endpoint to invalidate a <dfn data-key="refresh-token">Refresh Token</dfn> if it has been compromised.

The behaviour of this endpoint depends on the state of the [Refresh Token Revocation Deletes Grant](https://auth0.com/docs/tokens/refresh-tokens/revoke-refresh-tokens#refresh-tokens-and-grants) toggle.
If this toggle is enabled, then each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and <dfn data-key="audience">audience</dfn> will be revoked**.
If this toggle is disabled, then only the refresh token is revoked, while the grant is left intact.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is your application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method.|
| `client_secret` | The `client_secret` of your application. Required when Client Secret Basic or Client Secret Post is the application authentication method. Specifically required for Regular Web Applications **only**. |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

### Remarks

- For non-confidential applications that cannot keep the Client Secret safe (for example, native apps), the endpoint supports passing no Client Secret but the application itself must have the property `tokenEndpointAuthMethod` set to `none`. You can do this either from the UI ([Dashboard > Applications > Application Settings](${manage_url}/#/applications)) or using the [Management API](/api/management/v2#!/Applications/patch_applications_by_id).

### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/revoke](#post-oauth-revoke).

### Learn More

- [Refresh Tokens](/tokens/concepts/refresh-tokens)
