## Authorize the user

To begin the flow, you'll need to get the user's authorization. This step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions;
* Obtaining user consent for the requested permission level, unless consent has been previously given.

To authorize the user, your app must send the user to the [authorization URL](/api/authentication#authorization-code-grant).

### Example authorization URL

```text
https://${account.namespace}/authorize?
    audience=YOUR_API_AUDIENCE&
    scope=YOUR_SCOPE&
    response_type=YOUR_RESPONSE_TYPE&
    client_id=${account.clientId}&
    redirect_uri=${account.namespace}/callback&
    state=YOUR_OPAQUE_VALUE
    nonce=NONCE
```

#### Parameters

| Parameter Name | Description |
| - | - |
| `audience` | The unique identifier of the API the web app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial. |
| `scope` | The [scopes](/scopes) which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)). The custom scopes must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). For more information on this, refer to the [Namespacing Custom Claims](#optional-customize-the-tokens) panel. |
| `response_type` | Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code id_token`, `code token`, or `code id_token token`. More specifically, `token` returns an Access Token, `id_token` returns an ID Token, and `code` returns the Authorization Code. |
| `client_id` | Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings). |
| `state` | An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value must be used by the application to prevent CSRF attacks, [click here to learn more](/protocols/oauth-state). |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings). <br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments.|
| `nonce` | A string value which will be included in the response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`. |

For example, the HTML snippet for your authorization URL when adding login to your app might look as follows:

```html
<a href="https://${account.namespace}/authorize?audience=https://my-api.com&scope=read:tests&response_type=code id_token&client_id=${account.clientId}&redirect_uri=${account.callback}&state=STATE&nonce=NONCE">
  Sign In
</a>
```
