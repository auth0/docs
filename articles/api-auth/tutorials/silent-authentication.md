---
description: Learn how to keep users logged in to your application using silent authentication.
toc: true
topics:
  - api-authentication
  - oidc
  - silent-authentication
contentType: how-to
useCase:
  - secure-api
  - call-api
---

# Configure Silent Authentication

The <dfn data-key="openid">OpenID Connect protocol</dfn> supports a `prompt=none` parameter on the authentication request that allows applications to indicate that the authorization server must not display any user interaction (such as authentication, consent or MFA). Auth0 will either return the requested response back to the application or return an error if the user is not already authenticated, or that some type of consent or prompt is required before proceeding.

Use of the [Implicit Flow](/flows/concepts/implicit) in SPAs presents security challenges requiring explicit mitigation strategies. You can use the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce) in conjunction with Silent Authentication to renew sessions in SPAs.

<%= include('../../_includes/_refresh_token_rotation_recommended.md') %>

## Initiate Silent Authentication requests

To initiate a silent authentication request, add the `prompt=none` parameter when you redirect a user to the [`/authorize` endpoint of Auth0's authentication API](/api/authentication#authorize-application). (The individual parameters on the authentication request will vary depending on the specific needs of your app.
)

For example:

```text
GET https://${account.namespace}/authorize
    ?response_type=id_token token&
    client_id=...&
    redirect_uri=...&
    state=...&
    scope=openid...&
    nonce=...&
    audience=...&
    response_mode=...&
    prompt=none
```

The `prompt=none` parameter causes Auth0 to immediately send a result to the specified `redirect_uri` (<dfn data-key="callback">callback URL</dfn>) using the specified `response_mode` with one of two possible responses: success or error. 

::: note
Any applicable [rules](/rules) will be executed as part of the silent authentication process.
:::

### Successful authentication responses

If the user was already logged in to Auth0 and no other interactive prompts are required, Auth0 will respond exactly as if the user had authenticated manually through the login page.

For example, when using the Implicit Flow, (`response_type=id_token token`, used for single-page applications), Auth0 will respond with the requested tokens:

```text
GET ${account.callback}
    #id_token=...&
    access_token=...&
    state=...&
    expires_in=...
```

This response is indistinguishable from a login performed directly without the `prompt=none` parameter.

### Error responses

If the user was not logged in via <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> or their SSO session had expired, Auth0 will redirect to the specified `redirect_uri` (callback URL) with an error:

```
GET https://your_callback_url/
    #error=ERROR_CODE&
    error_description=ERROR_DESCRIPTION&
    state=...
```

The possible values for `ERROR_CODE` are defined by the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthError):

| Response | Description |
| -- | -- |
| `login_required` | The user was not logged in at Auth0, so silent authentication is not possible. This error can occur based on the way the tenant-level **Log In Session Management** settings are configured; specifically, it can occur after the time period set in the **Require log in after** setting. See [Configure Session Lifetime Settings](/dashboard/guides/tenants/configure-session-lifetime-settings) for details. |
| `consent_required` | The user was logged in at Auth0, but needs to give consent to authorize the application. |
| `interaction_required` | The user was logged in at Auth0 and has authorized the application, but needs to be redirected elsewhere before authentication can be completed; for example, when using a [redirect rule](/rules/redirect). |

If any of these errors are returned, the user must be redirected to the Auth0 login page without the `prompt=none` parameter to authenticate.

## Renew expired tokens

You can make a silent authentication request to get new tokens as long as the user still has a valid session at Auth0. The [`checkSession` method from auth0.js](/libraries/auth0js#using-checksession-to-acquire-new-tokens) uses a silent token request in combination with `response_mode=web_message` for SPAs so that the request happens in a hidden iframe. With SPAs, Auth0.js handles the result processing (either the token or the error code) and passes the information through a callback function provided by the application. This results in no UX disruption (no page refresh or lost state).

::: note
See [Renew Tokens When Using Safari](/api-auth/token-renewal-in-safari) for other important limitations and workarounds with the Safari browser. 
:::

### Access Token expiration

<dfn data-key="access-token">Access Tokens</dfn> are opaque to applications. This means that applications are unable to inspect the contents of Access Tokens to determine their expiration date.

There are two options to determine when an Access Token expires:

* Read the `expires_in` response parameter returned by Auth0.
* Ignore expiration dates altogether. Instead, renew the Access Token if your API rejects a request from the application (such as with a 401).

In the case of the [Implicit Flow](/flows/concepts/implicit), the `expires_in` parameter is returned by Auth0 as a hash parameter following a successful authentication. In the [Authorization Code Flow](/flows/concepts/auth-code), it is returned to the backend server when performing the authorization code exchange.

The `expires_in` parameter indicates how many seconds the Access Token will be valid for, and can be used to anticipate expiration of the Access Token.

### Error response

You may receive the `timeout` error response which indicates that timeout during executing `web_message` communication has occurred. This error is typically associated with fallback to cross-origin authentication. To resolve, make sure to add all of the URLs from which you want to perform silent authentication in the **Allowed Web Origins** field for your Application using the Auth0 Dashboard.

## Poll with `checkSession()`

<%= include('../../_includes/_checksession_polling') %>

## Silent authentication with MFA

In some scenarios, you may want to avoid prompting the user for MFA each time they log in from the same browser. To do this, set up a rule so that MFA occurs only once per session. This is useful when performing silent authentication (`prompt=none`) to renew short-lived Access Tokens in a SPA during the duration of a user's session without having to rely on setting `allowRememberBrowser` to `true`.

```js
function (user, context, callback) {
  const completedMfa = !!context.authentication.methods.find(
    (method) => method.name === 'mfa'
  );
 
  if (completedMfa) {
    return callback(null, user, context);
  }
 
  context.multifactor = {
    provider: 'any',
    allowRememberBrowser: false
  };
 
  callback(null, user, context);
}
```

See [Change Authentication Request Frequency](/mfa/guides/customize-mfa-universal-login#change-authentication-request-frequency) for details.

## Keep reading

* [Refresh Token Rotation](/tokens/concepts/refresh-token-rotation)
* [Configure Refresh Token Rotation](/tokens/guides/configure-refresh-token-rotation)

