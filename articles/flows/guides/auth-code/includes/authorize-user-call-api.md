## Authorize the User

To begin the flow, you'll need to get the user's authorization. This step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions;
* Obtaining user consent for the requested permission level, unless consent has been previously given.

To authorize the user, your app must send the user to the [authorization URL](/api/authentication#authorization-code-grant).


### Example authorization URL

```text
https://${account.namespace}/authorize?
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    scope=SCOPE&
    audience=API_AUDIENCE&
    state=STATE
```

#### Parameters

Note that for authorizing a user when calling an API, you:

- must include an audience parameter
- can include additional scopes supported by the target API


| Parameter Name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Auth0 will return (`code` or `token`). For this flow, the value must be `code`. |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). <br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments. |
| `scope`         | Specifies the [scopes](/scopes) for which you want to request authorization, which dictate which claims (or user attributes) you want returned. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` or `email`, [custom claims](/scopes/current/custom-claims) conforming to a [namespaced format](/api-auth/tutorials/adoption/scope-custom-claims), or any scopes supported by the target API (e.g., `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/applications)). |
| `audience`      | The unique identifier of the API your web app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial. |
| `state`         | (recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Auth0 includes when redirecting back to your application. To see how to use this value to prevent cross-site request forgery (CSRF) attacks, see [Mitigate CSRF Attacks With State Parameters](/protocols/oauth2/mitigate-csrf-attacks). |

As an example, your HTML snippet for your authorization URL when calling an API might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&  
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
Location: ${account.callback}?code=AUTHORIZATION_CODE&state=xyzABC123
```
