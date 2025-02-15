# Implicit Flow
## Authorize

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=token|id_token|id_token token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  state=STATE&
  nonce=NONCE
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}#access_token=TOKEN&state=STATE&token_type=TYPE&expires_in=SECONDS
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#implicit-grant"
}) %>

This is the OAuth 2.0 grant that web apps utilize in order to access an API.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The <dfn data-key="scope">scopes</dfn> which you want to request authorization for. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`. Custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). |
| `response_type` <br/><span class="label label-danger">Required</span> | This will specify the type of token you will receive at the end of the flow. Use `token` to get only an <dfn data-key="access-token">Access Token</dfn>, `id_token` to get only an ID token (if you don't plan on accessing an API), or `id_token token` to get both an ID token and an Access Token. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's ID. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value must be used by the application to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `nonce` <br/><span class="label label-primary">Recommended</span> | A string value which will be included in the ID token response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`. |
| `connection` | The name of the connection configured for your application. |
| `prompt` | To initiate a [silent authentication](/api-auth/tutorials/silent-authentication) request, use `prompt=none` (To learn more, read the Remarks). |
| `organization` | ID of the [organization](/organizations) to use when authenticating a user. When not provided, if your application is configured to **Display Organization Prompt**, the user will be able to enter the organization name when authenticating. |
| `invitation` | Ticket ID of the organization invitation. When [inviting a member to an Organization](/organizations/invite-members), your application should handle invitation acceptance by forwarding the invitation and organization key-value pairs when the user accepts the invitation. |

### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications).
- If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` in the address `location.hash`. This is used for Single-Page Apps and on Native Mobile SDKs.
- The Implicit Grant does not support the issuance of Refresh Tokens. Use [Silent Authentication](/api-auth/tutorials/silent-authentication) instead.
- In order to improve compatibility for applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or Access Tokens, they must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims) to avoid possible collisions with standard OIDC claims.
- Silent Authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. When an Access Token has expired, silent authentication can be used to retrieve a new one without user interaction, assuming the user's <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> session has not expired.

### Learn More

- [Implicit Flow](/flows/concepts/implicit)
- [State Parameter](/protocols/oauth2/oauth-state)
- [Mitigate replay attacks when using the Implicit Grant](/api-auth/tutorials/nonce)
- [Silent Authentication](/api-auth/tutorials/silent-authentication)