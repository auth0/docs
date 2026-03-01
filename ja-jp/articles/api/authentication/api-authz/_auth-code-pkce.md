# Authorization Code Flow with PKCE
## Authorize

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}?code=AUTHORIZATION_CODE
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant-pkce-"
}) %>

This is the OAuth 2.0 grant that mobile apps utilize in order to access an API. Before starting with this flow, you need to generate and store a `code_verifier`, and using that, generate a `code_challenge` that will be sent in the authorization request.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The <dfn data-key="scope">scopes</dfn> which you want to request authorization for. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn>. |
| `response_type` <br/><span class="label label-danger">Required</span> | Indicates to Auth0 which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant (PKCE) Flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `code_challenge_method` <br/><span class="label label-danger">Required</span> | Method used to generate the challenge. The PKCE spec defines two methods, `S256` and `plain`, however, Auth0 supports only `S256` since the latter is discouraged. |
| `code_challenge` <br/><span class="label label-danger">Required</span> | Generated challenge from the `code_verifier`. |
| `connection` | The name of the connection configured to your application. |
| `prompt` | To initiate a [silent authentication](/api-auth/tutorials/silent-authentication) request, use `prompt=none` (To learn more, read the Remarks). |
| `organization` | ID of the [organization](/organizations) to use when authenticating a user. When not provided, if your application is configured to **Display Organization Prompt**, the user will be able to enter the organization name when authenticating. |
| `invitation` | Ticket ID of the organization invitation. When [inviting a member to an Organization](/organizations/invite-members), your application should handle invitation acceptance by forwarding the invitation and organization key-value pairs when the user accepts the invitation. |

## Get Token
```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&client_id=${account.clientId}&code_verifier=CODE_VERIFIER&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=${account.clientId}&code_verifier=CODE_VERIFIER&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    grant_type:"authorization_code",
    client_id: "${account.clientId}",
    code_verifier: "CODE_VERIFIER",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "${account.callback}", } };

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
  "link": "#authorization-code-pkce-"
}) %>

This is the flow that mobile apps use to access an API. Use this endpoint to exchange an Authorization Code for a token.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Authorization Code (PKCE) use  `authorization_code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `code` <br/><span class="label label-danger">Required</span> | The Authorization Code received from the initial `/authorize` call. |
| `code_verifier` <br/><span class="label label-danger">Required</span> | Cryptographically random key that was used to generate the `code_challenge` passed to `/authorize`. |
| `redirect_uri` | This is required only if it was set at the [GET /authorize](#authorization-code-grant-pkce-) endpoint. The values from `/authorize` must match the value you set at `/oauth/token`. |

### Remarks

- In order to improve compatibility for applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims) to avoid possible collisions with standard OIDC claims.
- Include `offline_access` to the `scope` request parameter to get a refresh token from [POST /oauth/token](#authorization-code-pkce-). Make sure that the **Allow Offline Access** field is enabled in the [API Settings](${manage_url}/#/apis).
- The `redirect_uri` value must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications).
- Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. When an Access Token has expired, silent authentication can be used to retrieve a new one without user interaction, assuming the user's <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> session has not expired.

### Learn More
- [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
- [Call API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce)
- [Silent Authentication](/api-auth/tutorials/silent-authentication)