# Authorization Code Flow
## Authorize

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  state=STATE
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}?code=AUTHORIZATION_CODE&state=STATE
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant"
}) %>

This is the OAuth 2.0 grant that regular web apps utilize in order to access an API.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The <dfn data-key="scope">scopes</dfn> which you want to request authorization for. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn>. |
| `response_type` <br/><span class="label label-danger">Required</span> | Indicates to Auth0 which OAuth 2.0 flow you want to use. Use `code` for Authorization Code Grant Flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's ID. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the application adds to the initial request that Auth0 includes when redirecting the back to the application. This value must be used by the application to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `connection` | The name of the connection configured to your application. |
| `prompt` | To initiate a [silent authentication](/api-auth/tutorials/silent-authentication) request, use `prompt=none` (To learn more, read the Remarks). |
| `organization` | ID of the [organization](/organizations) to use when authenticating a user. When not provided, if your application is configured to **Display Organization Prompt**, the user will be able to enter the organization name when authenticating. |
| `invitation` | 	Ticket ID of the organization invitation. When [inviting a member to an Organization](/organizations/invite-members), your application should handle invitation acceptance by forwarding the invitation and organization key-value pairs when the user accepts the invitation. |

## Get Token

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'authorization_code',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     code: 'AUTHORIZATION_CODE',
     redirect_uri: '${account.callback}' }
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
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#authorization-code"
}) %>

This is the flow that regular web apps use to access an API. Use this endpoint to exchange an Authorization Code for a token.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Authorization Code, use `authorization_code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `code` <br/><span class="label label-danger">Required</span> | The Authorization Code received from the initial `/authorize` call. |
| `redirect_uri`| This is required only if it was set at the [GET /authorize](#authorization-code-grant) endpoint. The values from `/authorize` must match the value you set at `/oauth/token`. |

### Learn More

- [Authorization Code Flow](/flows/concepts/auth-code)
- [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code)
- [State Parameter](/protocols/oauth2/oauth-state)
- [Silent Authentication](/api-auth/tutorials/silent-authentication)