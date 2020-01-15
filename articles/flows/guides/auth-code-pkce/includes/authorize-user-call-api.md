## Authorize the User

Once you've created the `code_verifier` and the `code_challenge`, you'll need to get the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> sessions;
* Obtaining user consent for the requested permission level, unless consent has been previously given.

To authorize the user, your app must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-), including the `code_challenge` you generated in the previous step and the method you used to generate the `code_challenge`.


### Example authorization URL

```text
https://${account.namespace}/authorize?
    response_type=code&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    client_id=${account.clientId}&
    redirect_uri=YOUR_CALLBACK_URL&
    scope=SCOPE&
    audience=API_AUDIENCE&
    state=STATE
```

#### Parameters

Note that for authorizing a user when calling a custom API, you:

- must include an audience parameter
- can include additional scopes supported by the target API


| Parameter Name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Auth0 will return (`code` or `token`). For this flow, the value must be `code`. |
| `code_challenge` | Generated challenge from the `code_verifier`. |
| `code_challenge_method` | Method used to generate the challenge (e.g., S256). The PKCE spec defines two methods, `S256` and `plain`, the former is used in this example and is the **only** one supported by Auth0 since the latter is discouraged. |
| `client_id`     |Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). <br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments. |
| `scope`         | The [scopes](/scopes) for which you want to request authorization. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, [custom claims](/tokens/concepts/jwt-claims#custom-claims) conforming to a [namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (e.g., `read:contacts`). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn> (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/apis)). |
|`audience`      | The unique identifier of the API your mobile app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial. |
| `state`         | (recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. To see how to use this value to prevent cross-site request forgery (CSRF) attacks, see [Mitigate CSRF Attacks With State Parameters](/protocols/oauth2/mitigate-csrf-attacks). |


As an example, your HTML snippet for your authorization URL when calling an API might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=YOUR_CALLBACK_URL&
  scope=appointments%20contacts&
  audience=appointments:api&
  state=xyzABC123">
  Sign In
</a>
```


### Response

If all goes well, you'll receive an `HTTP 302` response. The authorization code is included at the end of the URL:

```text
HTTP/1.1 302 Found
Location: YOUR_CALLBACK_URL?code=AUTHORIZATION_CODE&state=xyzABC123
```
