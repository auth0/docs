---
description: Learn how to authorize a user while implementing the mobile login flow.
toc: false
topics:
  - api-authentication
  - oidc
  - authorization-code
  - pkce
  - mobile-login-flow
contentType: tutorial
useCase:
  - secure-api
  - call-api
  - add-login
---


# Authorize the User

Once you've created the `code_verifier` and the `code_challenge`, you'll need to get the user's authorization. This is technically the beginning of the authorization flow, and this step may include one or more of the following processes:

* Authenticating the user;
* Redirecting the user to an Identity Provider to handle authentication;
* Checking for active SSO sessions.

To authorize the user, your application must send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) (which includes the `code_challenge` you generated in the previous step, as well as the method you used to generate the `code_challenge`). Your URL should follow this format:

```text
https://${account.namespace}/authorize?
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile
```

Note that the sample Authorization URL doesn't include an `audience` parameter. In this scenario, your app needs to authenticate only the user, not access an API, so we omit `audience`.

For details on the request parameters, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#3-get-the-user-s-authorization).

As an example, your HTML snippet for your authorization URL might look like the following:

```html
<a href="https://${account.namespace}/authorize?
  scope=openid%20profile&
  response_type=code&
  client_id=${account.clientId}&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri=https://${account.namespace}/mobile">
  Sign In
</a>
```

If all goes well, you'll receive an `HTTP 302` response:

```text
HTTP/1.1 302 Found
Location: https://${account.namespace}/mobile?code=AUTHORIZATION_CODE
```

Note the authorization code included at the end of the included URL.



----


To begin an Authorization Code Grant flow, your native application should first send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) including the `code_challenge` and the method used to generate it.

```text
https://${account.namespace}/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.callback}
```

Where:

* `audience`: The unique identifier of the API the native app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.

* `scope`: The [scopes](/scopes) that you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)). The custom scopes must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). For more information on this, refer to the [Namespacing Custom Claims](#optional-customize-the-tokens) panel.

* `response_type`: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code`.

* `client_id`: Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/Applications/${account.clientId}/settings).

* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/Applications/${account.clientId}/settings).

* `code_challenge`: Generated challenge from the `code_verifier`.

* `code_challenge_method`: Method used to generate the challenge.

::: panel PKCE methods
The PKCE spec defines two methods, `S256` and `plain`, the former is used in this example and is the **only** one supported by Auth0 since the latter is discouraged.
:::

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=com.myclientapp://myclientapp.com/callback">
  Sign In
</a>
```
