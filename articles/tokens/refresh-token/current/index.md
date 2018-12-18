---
description: What is a Refresh Token and how you can use it.
toc: true
topics:
  - tokens
  - refresh-tokens
contentType:
  - how-to
  - concept
  - index
useCase:
  - invoke-api
---
# Refresh Token

A **Refresh Token** is a special kind of token that contains the information required to obtain a new [Access Token](/tokens/overview-access-tokens) or [ID Token](/tokens/id-token).

Usually, a user will need a new Access Token only after the previous one expires, or when gaining access to a new resource for the first time.

Refresh Tokens are subject to strict storage requirements to ensure that they are not leaked. Also, [Refresh Tokens can be revoked](#revoke-a-refresh-token) by the Authorization Server.

::: panel-warning OIDC-conformant applications
The behaviour in this document is applicable to [OIDC-conformant applications](/api-auth/tutorials/adoption/oidc-conformant). An application can be configured as OIDC-conformant in two ways:

1. By enabling the **OIDC Conformant** flag for an Application
2. By passing an `audience` to the `/authorize` endpoint

For more information on our authentication pipeline, refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).
:::

## Overview

The response of an [authentication request](/api-auth) can result in an Access Token and/or an ID Token being issued by Auth0. The  Access Token is used to make authenticated calls to a secured API, while the ID Token contains user profile attributes represented in the form of _claims_. Both JWTs have an expiration date indicated by the `exp` claim (among other security measures, like signing).

A Refresh Token allows the application to request Auth0 to issue a new Access Token or ID Token directly, without having to re-authenticate the user. This will work as long as the Refresh Token has not been revoked.

## Restrictions

You can only get a Refresh Token if you are implementing the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow), [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow), or [Resource Owner Password Grant](/api-auth/grant/password).

A Single-Page Application (normally implementing [Single-Page Login Flow](/flows/concepts/single-page-login-flow)) should not under any circumstances get a Refresh Token. The reason for that is the sensitivity of this piece of information. You can think of it as user credentials, since a Refresh Token allows a user to remain authenticated essentially forever. Therefore you cannot have this information in a browser, it must be stored securely.

If you are implementing an SPA using [Single-Page Login Flow](/flows/concepts/single-page-login-flow) and you need to renew a token, the only secure option is to use [Silent Authentication](/api-auth/tutorials/silent-authentication).

Another safeguard is that the API should allow offline access. This is configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis). If the switch is disabled, Auth0 will not return a Refresh Token for this API, even if you included the `offline_access` scope.

## Get a Refresh Token

To get a Refresh Token, you must include the `offline_access` [scope](/scopes) when you initiate an authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint.

For example, if you are using the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow), the authentication request would look like the following:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope=offline_access&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state={OPAQUE_VALUE}
```

Once the user authenticates successfully, the application will be redirected to the `redirect_uri`, with a `code` as part of the URL: `${account.callback}?code=BPPLN3Z4qCTvSNOy`. You can exchange this code with an Access Token using the `/oauth/token` endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.callback}\"}"
  }
}
```

The response should contain an Access Token and a Refresh Token.

```text
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "token_type": "Bearer"
}
```

If you are requesting a Refresh Token for a mobile app using the corresponding Native Client (which is public) then you don't need to send the `client_secret` in the request since it's only needed for [confidential applications](/applications/application-types#confidential-applications).

::: warning
Refresh Tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

For more information on how to implement this using the Regular Web App Login Flow, refer to our tutorial, [Call API Using the Regular Web App Login Flow](/flows/guides/regular-web-app-login-flow/call-api-using-regular-web-app-login-flow). For other grants, refer to [API Authorization](/api-auth).

::: note
If the response did not include a Refresh Token, check that you comply with the [Restrictions](#restrictions) listed in this document.
:::

## Use a Refresh Token

To refresh your token, using the Refresh Token you already got during authorization, make a `POST` request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"grant_type\": \"refresh_token\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"refresh_token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Where:
- `grant_type`: The type of grant to execute (the `/token` endpoint is used for various grants, for more information refer to the [Authentication API](/api/authentication#get-token)). To refresh a token, use `refresh_token`.
- `client_id`: Your application's Client ID.
- `client_secret` (optional): Your application's Client Secret. Only required for [confidential applications](/applications/application-types#confidential-applications).
- `refresh_token`: The Refresh Token to use.

The response will include a new Access Token, its type, its lifetime (in seconds), and the granted scopes. If the scope of the initial token included `openid`, then a new ID Token will be in the response as well.

```json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

::: panel Rate limits
You should only ask for a new token if the Access Token has expired or you want to refresh the claims contained in the ID Token. For example, it's a bad practice to call the endpoint to get a new Access Token every time you call an API. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
:::

## Revoke a Refresh Token

Since Refresh Tokens never expire, it is important to be able to revoke them in case they get compromised.

Auth0 handles token revocation as though the token has been potentially exposed to malicious adversaries.
Hence each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and audience will be revoked**.

You can revoke a Refresh Token either by posting a request to [the Authentication API /oauth/revoke endpoint](/api/authentication#revoke-refresh-token) or using the [dashboard](${manage_url}).

### Use the API

To revoke a Refresh Token, you can send a `POST` request to `https://${account.namespace}/oauth/revoke`.

The API first validates the application credentials and then verifies whether the token was issued to the application making the revocation request.  If this validation fails, the request is refused and the application is informed of the error. Next, the API invalidates the token. The invalidation takes place immediately, and the token cannot be used again after the revocation. Note that each revocation request invalidates all the tokens that have been issued for the same authorization grant.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/revoke",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Where:

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. The application should match the one the Refresh Token was issued for. |
| `client_secret` | Your application's Client Secret. Required for [confidential applications](/applications/application-types#confidential-applications). |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

The application should match the one the Refresh Token was issued for.

::: panel Revoke a token without the Client Secret
For applications that cannot keep the Client Secret safe (for example, native apps), the [Revoke endpoint](/api/authentication#revoke-refresh-token) supports access without the Client Secret but the application itself must have the property `tokenEndpointAuthMethod` set to `none`. You can change the `tokenEndpointAuthMethod` value, either from the UI ([Dashboard > Clients > Application Settings](${manage_url}/#/applications/${account.clientId}/settings)), or using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

If the request is valid, the Refresh Token is revoked and the response is `HTTP 200`, with an empty response body. Otherwise, the response body contains the error code and description.

```json
{
  "error": "invalid_request|invalid_client",
  "error_description": "Description of the error"
}
```

The possible responses are:

| HTTP Status | Description |
| --- | --- |
| 200 | The Refresh Token is revoked, does not exist, or was not issued to the application making the revocation request. The response body is empty. |
| 400 | The required parameters were not sent in the request (`"error": "invalid_request"`). |
| 401 | The request is not authorized (`"error": "invalid_client"`). Check that the application credentials (`client_id` and `client_secret`) are present in the request and hold valid values. |

### Use the Dashboard

When you revoke a Refresh Token using the dashboard, you have to revoke the user's authorized access to the application that issued the token. This renders the Refresh Token useless.

To do so, go to the [Users section](${manage_url}/#/users) of the [dashboard](${manage_url}). Click the name of the user to view their *Details* page.

Select the *Authorized Applications* tab. This page lists all the applications to which the user has authorized access. Revoking an authorized application revokes also its associated Refresh Tokens.

To revoke the user's access to an authorized application, and hence invalidate the Refresh Token, click **Revoke**.

![Revoke a Refresh Token using the dashboard](/media/articles/tokens/dashboard-revoke-refresh-token.png)

## Rules

Rules will run for the [Refresh Token Exchange](#use-a-refresh-token). To execute special logic, you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then this is the indication that the rule is running during the [Refresh Token Exchange](#use-a-refresh-token).

::: warning
If you try to do a <a href="/rules/redirect">redirect</a> with <code>context.redirect</code>, the authentication flow will return an error.
:::

## SDK Support

### Web Apps

All our main SDKs support Refresh Tokens out of the box. Some are [Node.js](/quickstart/webapp/nodejs), [ASP.NET Core](/quickstart/webapp/aspnet-core), [PHP](/quickstart/webapp/php), [Java](/dev-centers/java), and many more. For a complete listing refer to our [Quickstarts page](/quickstart/webapp).

### Single Page Apps

For web apps that execute on the browser, the way to refresh a token is using [Silent Authentication](/api-auth/tutorials/silent-authentication). [Auth0.js](/libraries/auth0js), our client-side library, provides methods for this out of the box.

- The `authorize` method, redirects the user to the `/authorize` endpoint, in order to login and provide consent.
- The `parseHash` method, parses a URL hash fragment to extract the result of an Auth0 authentication response.
- The `checkSession` method, attempts to get a new token from Auth0, using [silent authentication](/api-auth/tutorials/silent-authentication). For more details refer to [Using checkSession to Acquire New Tokens](/libraries/auth0js#using-checksession-to-acquire-new-tokens).

More information on the library:
- [Auth0.js Reference](/libraries/auth0js)
- [Auth0.js GitHub repo](https://github.com/auth0/auth0.js#api)

### Mobile / Native Apps

For more information on using Refresh Tokens with our mobile SDKs refer to:

* [Mobile / Native Quickstarts](/quickstart/native)

* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)

* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/v2)

## Next steps

* [Refresh Tokens: When to use them and how they interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
* [Using a Refresh Token with an Access Token](/tokens/set-access-token-lifetime)
