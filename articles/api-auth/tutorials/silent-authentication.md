---
description: How to keep users logged in to your application
topics:
  - api-authentication
  - oidc
  - silent-authentication
contentType: tutorial
useCase:
  - secure-api
  - call-api
---

# Silent Authentication

<%= include('../../_includes/_pipeline2') %>

The OpenID Connect protocol supports a `prompt=none` parameter on the authentication request that allows applications to indicate that the authorization server must not display any user interaction (such as authentication, consent or MFA). Auth0 will either return the requested response back to the application or return an error if the user is not already authenticated, or some type of consent or prompt is required before proceeding.

This flow can be used by Single Page Applications to renew tokens as explained below.

## Initiate a Silent Authentication request

To initiate a silent authentication request, add the `prompt=none` parameter when you redirect a user to the [`/authorize` endpoint of Auth0's authentication API](/api/authentication#authorize-application).

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

::: note
  The individual parameters on the authentication request will depend on the specific needs of the application.
:::

The `prompt=none` parameter will cause Auth0 to immediately send a result to the specified `redirect_uri` (callback URL) using the specified `response_mode` with one of two possible responses:

* A successful authentication response if the user already has a valid session in Auth0 and no consent or other prompts are needed.
* An error response if the user doesn't have a valid session or some interactive prompt is required.

::: note
Any applicable [rules](/rules) will be executed as part of the silent authentication process.
:::

### Successful authentication response

If the user was already logged in into Auth0 and no other interactive prompts are required, Auth0 will respond exactly as if the user had authenticated manually through the login page.

For example, when using the [Implicit Flow](/api-auth/grant/implicit) (`response_type=id_token token`, used for single page applications), Auth0 will respond with the requested tokens:

```text
GET ${account.callback}
    #id_token=...&
    access_token=...&
    state=...&
    expires_in=...
```

Note that this response is indistinguishable from a login performed directly without the `prompt=none` parameter.

### Error response

If the user was not logged in via SSO or their SSO session had expired, Auth0 will redirect to the specified `redirect_uri` (callback URL) with an error:

```
GET https://your_callback_url/
    #error=ERROR_CODE&
    error_description=ERROR_DESCRIPTION&
    state=...
```

The possible values for `ERROR_CODE` are defined by the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthError):

* `login_required`: The user was not logged in at Auth0, so silent authentication is not possible
* `consent_required`: The user was logged in at Auth0, but needs to give consent to authorize the application
* `interaction_required`: The user was logged in at Auth0 and has authorized the application, but needs to be redirected elsewhere before authentication can be completed; for example, when using a [redirect rule](/rules/redirect).

If any of these errors are returned, the user must be redirected to the Auth0 login page without the `prompt=none` parameter to authenticate.

## Renew expired tokens

::: note
Please review [our notes on token renewal for Safari users](/api-auth/token-renewal-in-safari).
:::

Since Single Page Applications cannot request or use Refresh Tokens to renew an expired token, a silent authentication request can be used instead to get new tokens as long as the user still has a valid session at Auth0.


The [`checkSession` method from auth0.js](/libraries/auth0js#using-checksession-to-acquire-new-tokens) uses a silent token request in combination with `response_mode=web_message` so that the request happens in a hidden iframe. Auth0.js handles the result processing (either the token or the error code) and passes the information through a callback function provided by the application. This results in no UX disruption (no page refresh or lost state).

### Access Token expiration
Access Tokens are opaque to applications. This means that applications are unable to inspect the contents of Access Tokens to determine their expiration date.

There are two options to determine when an Access Token expires:

1. Read the `expires_in` response parameter returned by Auth0
2. Ignore expiration dates altogether. Instead, try to renew the Access Token if your API rejects a request from the application (such as with a 401).

In the case of the [Implicit Grant](/api-auth/grant/implicit), the `expires_in` parameter is returned by Auth0 as a hash parameter following a successful authentication. For the [Authorization Code Grant](/api-auth/grant/code), it is returned to the backend server when performing the authorization code exchange.

The `expires_in` parameter indicates how many seconds the Access Token will be valid for, and can be used to anticipate expiration of the Access Token.

## Polling with checkSession()

<%= include('../../_includes/_checksession_polling') %>

### How to implement

Implementation of token renewal will depend on the type of application and framework being used. Sample implementations for some of the common platforms can be found below:

* [Plain JavaScript](/quickstart/spa/vanillajs/05-token-renewal)
* [React](/quickstart/spa/react/05-token-renewal)
* [Angular](/quickstart/spa/angular2/05-token-renewal)
