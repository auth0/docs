---
description: How to execute an Authorization Code Grant flow from a Regular Web application
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Execute an Authorization Code Grant Flow

::: note
This tutorial will help you implement the Authorization Code grant. If you are looking for some theory on the flow refer to [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code).
:::

The __Authorization Code__ is an OAuth 2.0 grant that [regular web apps](/quickstart/webapp) use in order to access an API. In this document we will work through the steps needed in order to implement this: get the user's authorization, get a token and access the API using the token.

Before beginning this tutorial, please:

* Check that your Application's [Grant Type property](/applications/concepts/application-grant-types) is set appropriately
* [Register the API](/apis#how-to-configure-an-api-in-auth0) with Auth0

## 1. Get the User's Authorization

To begin an Authorization Code flow, your web application should first send the user to the [authorization URL](/api/authentication#authorization-code-grant):

```text
https://${account.namespace}/authorize?
    audience=YOUR_API_AUDIENCE&
    scope=YOUR_SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state=YOUR_OPAQUE_VALUE
```

Where:

* `audience`: The unique identifier of the API the web app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.

* `scope`: The <dfn data-key="scope">scopes</dfn> which you want to request authorization for. These must be separated by a space. You can request any of the [standard OpenID Connect (OIDC) scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn> (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)).

* `response_type`: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code`.

* `client_id`: Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

* `state`: An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value must be used by the application to prevent CSRF attacks. For more information, see [State Parameter](/protocols/oauth-state).

* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

The purpose of this call is to obtain consent from the user to invoke the API (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, Auth0 will require consent to be given again.

## 2. Exchange the Authorization Code for an Access Token

Now that you have an Authorization Code, you must exchange it for an <dfn data-key="access-token">Access Token</dfn> that can be used to call your API. Using the Authorization Code (`code`) from the previous step, you will need to `POST` to the [Token URL](/api/authentication?http#authorization-code):

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "authorization_code"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "code",
        "value": "YOUR_AUTHORIZATION_CODE"
      },
      {
        "name": "redirect_uri",
        "value": "${account.callback}"
      }
    ]
  }
}
```

Where:

* `grant_type`: This must be `authorization_code`.
* `client_id`: Your application's Client ID.
* `client_secret`: Your application's Client Secret.
* `code`: The Authorization Code received from the initial `authorize` call.
* `redirect_uri`: The URL must match exactly the `redirect_uri` passed to `/authorize`.

The response contains the `access_token`, `refresh_token`, `id_token`, and `token_type` values, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard. See [Refresh Tokens](/tokens/concepts/refresh-tokens) for more information.

::: panel-warning Security Warning
It is important to understand that the Authorization Code flow should only be used in cases such as a Regular Web Application where the Client Secret can be safely stored. In cases such as a Single-Page Application, the Client Secret is available to the application (in the web browser), so the integrity of the Client Secret cannot be maintained. That is why the [Authorization Code Flow with PKCE ](/flows/concepts/auth-code-pkce) is more appropriate in that case.
:::

## 3. Call the API

Once the Access Token has been obtained it can be used to make calls to the API by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

```har
{
  "method": "GET",
  "url": "https://someapi.com/api",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" }
  ]
}
```

## 4. Verify the Token

Once your API receives a request with a Bearer Access Token, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed, see [Validate Access Tokens](/tokens/guides/validate-access-tokens).

## Optional: Customize the Tokens

<%= include('../../_includes/_api-auth-customize-tokens') %>

If you wish to execute special logic unique to the Authorization Code grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-basic-profile`, then the rule is running during the Authorization Code grant.

## Keep Reading

- [Refresh Tokens](/tokens/concepts/refresh-token)
- [How to configure an API in Auth0](/apis)
- [Application Authentication for Server-side Web Apps](/application-auth/server-side-web)
- [Tokens](/tokens)
