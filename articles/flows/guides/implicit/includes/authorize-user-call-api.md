## Authorize the user

To begin the flow, you'll need to get the user's authorization. This step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> sessions;
* Obtaining user consent for the requested permission level, unless consent has been previously given.

To authorize the user, your app must send the user to the authorization URL.

### Example authorization URL

```text
https://${account.namespace}/authorize?
    response_type=YOUR_RESPONSE_TYPE&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    scope=YOUR_SCOPE&
    audience=YOUR_API_AUDIENCE&
    state=STATE&
    nonce=NONCE
```

#### Parameters

| Parameter Name | Description |
| -------------- | ----------- |
| `response_type` | Denotes the kind of credential that Auth0 will return (code or token). For the Implicit Flow, the value can be `id_token`, `token`, or `id_token token`. Specifically, `id_token` returns an ID Token, and `token` returns an Access Token. |
| `client_id` | Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). <br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments. |
| `scope` | Specifies the [scopes](/scopes) for which you want to request authorization, which dictate which claims (or user attributes) you want returned. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, [custom claims](/tokens/concepts/jwt-claims#custom-claims) conforming to a [namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). |
| `audience` | The unique identifier of the API the web app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial. |
| `state`         | (recommended) An opaque arbitrary alphanumeric string that your app adds to the initial request and Auth0 includes when redirecting back to your application. To see how to use this value to prevent cross-site request forgery (CSRF) attacks, see [Mitigate CSRF Attacks With State Parameters](/protocols/oauth2/mitigate-csrf-attacks). |
| `nonce` | (required for `response_type` containing  `id_token token`, otherwise recommended) A cryptographically random string that your app adds to the initial request and Auth0 includes inside the ID Token, [used to prevent token replay attacks](/api-auth/tutorials/nonce). |

As an example, your HTML snippet for your authorization URL when adding login to your app might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=id_token token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  scope=read:tests&
  audience=https://myapi.com&
  state=xyzABC123&
  nonce=eq...hPmz">
  Sign In
</a>
```


### Response

If all goes well, you'll receive an `HTTP 302` response. The requested credentials are included in a hash fragment at the end of the URL:

```text
HTTP/1.1 302 Found
Location: ${account.callback}#access_token=ey...MhPw&expires_in=7200&token_type=Bearer&id_token=ey...Fyqk&state=xyzABC123
```

Note that the returned values depend on what you requested as a `response_type`.

| Response Type       | Components |
| ------------------- | ---------- |
| id_token       | ID Token |
| token          | Access Token (plus `expires_in` and `token_type` values) |
| id_token token | ID Token, Access Token (plus `expires_in` and `token_type` values) |

Auth0 will also return any state value you included in your call to the authorization URL.

::: warning
You should validate your tokens before saving them. To learn how, see [Validate ID Tokens](/tokens/guides/validate-id-tokens) and [Validate Access Tokens](/tokens/guides/validate-access-tokens).
:::

[ID Tokens](/tokens/concepts/id-tokens) contain user information that must be [decoded and extracted](/tokens/concepts/id-tokens#id-token-payload). 

[Access Tokens](/tokens/concepts/access-tokens) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/tokens/guides/validate-access-tokens).
