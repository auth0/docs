## Authorize the user

To begin the flow, you'll need to get the user's authorization. This step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions;
* Obtaining user consent for the requested permission level, unless consent has been previously given.

To authorize the user, your app must send the user to the authorization URL.

### Example authorization URL

```text
https://${account.namespace}/authorize?
    response_type=YOUR_RESPONSE_TYPE&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state=STATE&
    nonce=NONCE
```

#### Parameters

| Parameter Name | Description |
| -------------- | ----------- |
| `response_type` | Denotes the kind of credential that Auth0 will return (code or token). If your SPA has a back-end and you are using the Hybrid Flow, the value can be `code id_token`, `code token`, or `code id_token token`. If it does not and you are using the Implicit Flow, the value can be `id_token`, `token`, or `id_token token`. Specifically, `code` returns an authorization code, `id_token` returns an ID Token, and `token` returns an Access Token. |
| `client_id` | Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). <br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments. |
| `scope` | Specifies the [scopes](/scopes) for which you want to request authorization, which dictate which claims (or user attributes) you want returned. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, [custom claims](/scopes/current/custom-claims) conforming to a [namespaced format](/api-auth/tutorials/adoption/scope-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/applications)). |
| `state`         | (recommended) An opaque arbitrary alphanumeric string that your app adds to the initial request and Auth0 includes when redirecting back to your application. To see how to use this value to prevent cross-site request forgery (CSRF) attacks, see [Use the State Parameter Against CSRF Attacks](/protocols/oauth2/oauth-state#how-to-use-the-parameter-against-csrf-attacks). |
| `nonce` | (required for `response_type` containing  `id_token token`, otherwise recommended) A cryptographically random string that your app adds to the initial request and Auth0 includes inside the ID Token, [used to prevent token replay attacks](/api-auth/tutorials/nonce). |
| `connection`    | (optional) Forces the user to sign in with a specific connection. For example, you can pass a value of `github` to send the user directly to GitHub to log in with their GitHub account. When not specified, the user sees the Auth0 Lock screen with all configured connections. You can see a list of your configured connections on the **Connections** tab of your application. |

As an example, your HTML snippet for your authorization URL when adding login to your app might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=code id_token token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  scope=read:tests&
  state=xyzABC123&
  nonce=eq...hPmz">
  Sign In
</a>
```

### Response

If all goes well, you'll receive an `HTTP 302` response. The requested credentials are included in a hash fragment at the end of the URL:

```text
HTTP/1.1 302 Found
Location: ${account.callback}#access_token=ey...MhPw&expires_in=7200&token_type=Bearer&code=AUTHORIZATION_CODE&id_token=ey...Fyqk&state=xyzABC123
```

Note that the returned values depend on what you requested as a `response_type`.

For SPAs with a back-end, using the Hybrid Flow:

| Response Type       | Components |
| ------------------- | ---------- |
| code id_token       | Authorization Code, ID Token |
| code token          | Authorization Code, Access Token (plus `expires_in` and `token_type` values) |
| code id_token token | Authorization Code, ID Token, Access Token (plus `expires_in` and `token_type` values) |

For SPAs without a back-end, using the Implicit Flow:

| Response Type       | Components |
| ------------------- | ---------- |
| id_token       | ID Token |
| token          | Access Token (plus `expires_in` and `token_type` values) |
| id_token token | ID Token, Access Token (plus `expires_in` and `token_type` values) |

Auth0 will also return any state value you included in your call to the authorization URL.

[ID Tokens](/tokens/id-token) contain user information that must be [decoded and extracted](/tokens/id-token#id-token-payload). 

[Access Tokens](/tokens/access-token) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/api-auth/tutorials/verify-access-token).

::: warning
If the SPA has a back-end, we do not recommend that the Access Token obtained in this step be used to call protected APIs.
:::

[Refresh Tokens](/tokens/refresh-token) are used to obtain a new Access Token or ID Token after the previous one has expired. The `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled __Allow Offline Access__ for your API in the Dashboard.

::: warning
Refresh Tokens must be stored securely since they allow a user to remain authenticated essentially forever.
:::

