---
description: How to keep users logged in to your application
---

<%= include('../../_includes/_pipeline2') %>

# Silent Authentication

There are two main participants involved in a [single sign-on (SSO)](/sso) scenario: an Authorization Server (Auth0), and multiple client applications.

For privacy reasons, client applications cannot query Auth0 directly to determine if a user has logged in via SSO. This means that users must be redirected to Auth0 for SSO authentication.

However, redirecting users away from your application is usually considered disruptive and should be avoided, from a UX perspective. **Silent authentication** lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page.

## Initiate a Silent Authentication request

To initiate a silent authentication request, add the `prompt=none` parameter when you redirect a user to the [`/authorize` endpoint of Auth0's authentication API](/api/authentication#authorize-client).

For example:

```text
GET https://${account.namespace}/authorize
    ?response_type=code&
    client_id=...&
    redirect_uri=...&
    state=...&
    scope=openid...&
    prompt=none
```

__NOTE__: The specific parameters on the authentication request will depend on what kind of application is authenticating ([regular web application](/api/authentication#authorization-code-grant), [single page app](/api/authentication#implicit-grant), and so forth).

The `prompt=none` parameter will cause Auth0 to immediately redirect to the specified `redirect_uri` (callback URL) with two possible responses:

* A successful authentication response if the user was already logged in via SSO
* An error response if the user is not logged in via SSO and therefore cannot be silently authenticated

### Successful authentication response

If the user was already logged in via SSO, Auth0 will respond exactly as if the user had authenticated manually through the SSO login page.

For example, when using the [Authorization Code Grant](/api-auth/grant/authorization-code) (`response_type=code`, used for regular web applications), Auth0 will respond with an authorization code that can be exchanged for an ID token and optionally an access token:

```text
GET ${account.callback}
    ?code=...&
    state=...&
    expires_in=...
```

Note that this response is indistinguishable from a login performed directly without the `prompt=none` parameter.

### Error response

If the user was not logged in via SSO or their SSO session had expired, Auth0 will redirect to the specified `redirect_uri` (callback URL) with an error:

```
GET https://your_callback_url/
    ?error=ERROR_CODE&
    error_description=ERROR_DESCRIPTION&
    state=...
```

When using the [Authorization Code Grant](/api-auth/grant/authorization-code), the error response parameters are returned in the query string. When using the [Implicit Grant](/api-auth/grant/implicit), they are returned in the hash fragment instead.

The possible values for `ERROR_CODE` are defined by the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthError):

* `login_required`: The user was not logged in at Auth0, so silent authentication is not possible
* `consent_required`: The user was logged in at Auth0, but needs to give consent to authorize the client
* `interaction_required`: The user was logged in at Auth0 and has authorized the client, but needs to be redirected elsewhere before authentication can be completed; for example, when using a [redirect rule](/rules/redirect).

If any of these errors are returned, the user must be redirected to the Auth0 login page without the `prompt=none` parameter to authenticate.

## Refresh expired tokens

Access tokens are opaque to clients. This means that clients are unable to inspect the contents of access tokens to determine their expiration date.

There are two options to determine when an access token expires:

1. Read the `expires_in` response parameter returned by Auth0
2. Ignore expiration dates altogether. Instead, try to renew the access token if your API rejects a request from the client (e.g. with a 401).

In the case of the [Implicit Grant](/api-auth/grant/implicit), the `expires_in` parameter is returned by Auth0 as a hash parameter following a successful authentication. For the [Authorization Code Grant](/api-auth/grant/code), it is returned to the backend server when performing the authorization code exchange.

The `expires_in` parameter indicates how many seconds the access token will be valid for, and can be used to anticipate expiration of the access token.

When the access token has expired, silent authentication can be used to retrieve a new one without user interaction, assuming the user's SSO session has not expired.

In the case of single-page applications, the [`renewAuth` method from auth0.js](https://github.com/auth0/auth0.js#api) can be used to perform silent authentication within a hidden iframe, which results in no UX disruption at all.
