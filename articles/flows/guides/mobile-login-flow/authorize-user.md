## Authorize the User

Once you've created the `code_verifier` and the `code_challenge`, you'll need to get the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions.

To authorize the user, your app must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-), including the `code_challenge` you generated in the previous step and the method you used to generate the `code_challenge`.



### Authorize a user when adding login to your app

An example authorization URL:

```text
https://${account.namespace}/authorize?
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile&
    scope=SCOPE
```

#### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Auth0 will return (`code` or `token`). For this flow, the value must be `code`. |
| `client_id`     |Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `code_challenge` | Generated challenge from the `code_verifier`. |
| `code_challenge_method` | Method used to generate the challenge (e.g., S256). The PKCE spec defines two methods, `S256` and `plain`, the former is used in this example and is the **only** one supported by Auth0 since the latter is discouraged. |
| `scope`         | Specifies the [scopes](/scopes) for which you want to request authorization, which dictate which claims (or user attributes) you want returned. These must be separated by a space. To get an ID Token in the response, you need to specify a scope of at least `openid`. If you want to return the user's full profile, you can request `openid profile`. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `email`, or [custom claims](/scopes/current/custom-claims) conforming to a [namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/applications)). |
| `connection`    | (optional) Forces the user to sign in with a specific connection. For example, you can pass a value of `github` to send the user directly to GitHub to log in with their GitHub account. When not specified, the user sees the Auth0 Lock screen with all configured connections. You can see a list of your configured connections on the **Connections** tab of your application. |


As an example, your HTML snippet for your authorization URL when adding login to your app might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=https://${account.namespace}/mobile&
  scope=openid%20profile">
  Sign In
</a>
```

If all goes well, you'll receive an `HTTP 302` response. The authorization code is included at the end of the URL:

```text
HTTP/1.1 302 Found
Location: https://${account.namespace}/mobile?code=AUTHORIZATION_CODE
```


### Authorize a user when calling an API

An example authorization URL:

```text
https://${account.namespace}/authorize?
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.callback}&
    scope=SCOPE&
    audience=API_AUDIENCE
```

#### Parameters

Note that for authorizing a user when calling an API, you:

- must include an audience parameter
- can include additional scopes supported by the target API


| Parameter Name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Auth0 will return (`code` or `token`). For this flow, the value must be `code`. |
| `client_id`     |Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `redirect_uri`  | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. You must specify this URL as a valid callback URL in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `code_challenge` | Generated challenge from the `code_verifier`. |
| `code_challenge_method` | Method used to generate the challenge (e.g., S256). The PKCE spec defines two methods, `S256` and `plain`, the former is used in this example and is the **only** one supported by Auth0 since the latter is discouraged. |
| `scope`         | The [scopes](/scopes) for which you want to request authorization. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, [custom claims](/scopes/current/custom-claims) conforming to a [namespaced format](/api-auth/tutorials/adoption/scope-custom-claims), or any scopes supported by the target API (e.g., `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [Application Settings](${manage_url}/#/apis)). For more information on this, refer to the [Namespacing Custom Claims](#optional-customize-the-tokens) panel.|
|`audience`      | The unique identifier of the API your mobile app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial. |


As an example, your HTML snippet for your authorization URL when calling an API might look like:

```html
<a href="https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=com.myclientapp://myclientapp.com/callback&
  scope=appointments%20contacts&
  audience=appointments:api">
  Sign In
</a>
```
