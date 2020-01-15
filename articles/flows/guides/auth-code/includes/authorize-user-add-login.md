## Authorize the User

To begin the flow, you'll need to get the user's authorization. This step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Obtaining user consent for the requested permission level, unless consent has been previously given.

To authorize the user, your app must send the user to the [authorization URL](/api/authentication#authorization-code-flow).

### Example authorization URL

```text
https://${account.namespace}/authorize?
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    scope=SCOPE&
    state=STATE
```

#### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Auth0 will return (`code` or `token`). For this flow, the value must be `code`. |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). <br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments. |
| `scope`         | Specifies the [scopes](/scopes) for which you want to request authorization, which dictate which claims (or user attributes) you want returned. These must be separated by a space. To get an ID Token in the response, you need to specify a scope of at least `openid`. If you want to return the user's full profile, you can request `openid profile`. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `email`, or [custom claims](/tokens/concepts/jwt-claims#custom-claims) conforming to a [namespaced format](/tokens/guides/create-namespaced-custom-claims). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn> (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/applications)). |
| `state`         | (recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. To see how to use this value to prevent cross-site request forgery (CSRF) attacks, see [Mitigate CSRF Attacks With State Parameters](/protocols/oauth2/mitigate-csrf-attacks). |
| `connection`    | (optional) Forces the user to sign in with a specific connection. For example, you can pass a value of `github` to send the user directly to GitHub to log in with their GitHub account. When not specified, the user sees the Auth0 Lock screen with all configured connections. You can see a list of your configured connections on the **Connections** tab of your application. |

As an example, your HTML snippet for your authorization URL when adding login to your app might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  scope=openid%20profile&
  state=xyzABC123">
  Sign In
</a>
```

### Response

If all goes well, you'll receive an `HTTP 302` response. The authorization code is included at the end of the URL:

```text
HTTP/1.1 302 Found
Location: ${account.callback}?code=AUTHORIZATION_CODE&state=xyzABC123
```
