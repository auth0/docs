---
title: Refresh Token
description: What is a Refresh Token and how you can use it.
toc: true
---

# Refresh Token (API Authorization)

<div class="alert alert-info">
  <strong>Heads up!</strong> This article describes the new Refresh Token story, according to the <a href="/api-auth">API Authorization flows</a>. If you are looking for the legacy Refresh Token doc refer to <a href="/tokens/refresh-token">Refresh Token</a>.
</div>

A **Refresh Token** is a special kind of token that contains the information required to obtain a new [access token](/tokens/access-token) or [ID token](/tokens/id-token).

Usually, a user will need a new access token only after the previous one expires, or when gaining access to a new resource for the first time.

Refresh tokens are subject to strict storage requirements to ensure that they are not leaked. Also, [Refresh tokens can be revoked](#revoke-a-refresh-token) by the Authorization Server.

## Overview

The response of an [authentication request](/api-auth) can result in an `access_token` and/or an `id_token` being issued by Auth0. The  `access_token` is used to make authenticated calls to a secured API, while the `id_token` contains user profile attributes represented in the form of _claims_. Both JWTs have an expiration date indicated by the `exp` claim (among other security measures, like signing).

A refresh token allows the application to request Auth0 to issue a new `access_token` or `id_token` directly, without having to re-authenticate the user. This will work as long as the refresh token has not been revoked.

## Restrictions

You can only get a refresh token if you are implementing: [Authorization Code Grant](/api-auth/grant/authorization-code), [Authorization Code Grant (PKCE)](/api-auth/grant/authorization-code-pkce) or [Resource Owner Password Grant](/api-auth/grant/password).

A Single Page Application (normally implementing [Implicit Grant](/api-auth/grant/implicit)) should not under any circumstances get a refresh token. The reason for that is the sensitivity of this piece of information. You can think of it as user credentials, since a refresh token allows a user to remain authenticated essentially forever. Therefore you cannot have this information in a browser, it must be stored securely.

If you are implementing an SPA using [Implicit Grant](/api-auth/grant/implicit) and you need to renew a token, the only secure option is to use [Silent Authentication](/api-auth/tutorials/silent-authentication).

Another safeguard is that the API should allow offline access. This is configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis). If the switch is disabled, Auth0 will not return a refresh token for this API, even if you included the `offline_access` scope.

## Get a Refresh Token

To get a refresh token, you must include the `offline_access` [scope](/scopes) when you initiate an authentication request through the [authorize](/api/authentication/reference#authorize-client) endpoint.

For example, if you are using [Authorization Code Grant](/api-auth/grant/authorization-code), the authentication request would look like the following:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope=offline_access&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state={OPAQUE_VALUE}
```

Once the user authenticates successfully, the client will be redirected to the `redirect_uri`, with a `code` as part of the URL: `${account.callback}?code=BPPLN3Z4qCTvSNOy`. You can exchange this code with an access token using the `/oauth/token` endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.callback}\"}"
  }
}
```

The response should contain an access token and a refresh token.

```text
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "token_type": "Bearer"
}
```

::: panel-warning Security Warning
Refresh tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

For more information on how to implement this using Authorization Code Grant refer to [Execute an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant). For other grants refer to [API Authorization](/api-auth).

::: panel-info Troubleshooting
If the response did not include a refresh token, check that you comply with the [Restrictions](#restrictions) listed in this document.
:::

## Use a Refresh Token

To refresh your token, using the `refresh_token` you already got during authorization, make a `POST` request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"grant_type\": \"refresh_token\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\", \"refresh_token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Where:
- `grant_type`: The type of grant to execute (the `/token` endpoint is used for various grants, for more information refer to the [Authentication API](/api/authentication#get-token)). To refresh a token use `refresh_token`.
- `client_id`: Your application's Client ID.
- `client_secret`: Your application's Client Secret.
- `refresh_token`: The refresh token to use.

The response will include a new `access_token`, its type, its lifetime (in seconds), and the granted scopes. If the scope of the initial token included `openid`, then a new `id_token` will be in the response as well.

```json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

::: panel-info Rate limits
You should only ask for a new token if the `access_token` has expired or you want to refresh the claims contained in the `id_token`. For example, it's a bad practice to call the endpoint to get a new `access_token` every time you call an API. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
:::


## Revoke a Refresh Token

Since refresh tokens never expire it is important to be able to revoke them. You can revoke a refresh token either by posting a revocation request to `https://${account.namespace}/oauth/revoke` or using the [dashboard](${manage_url}).

### Use the API

To revoke a refresh token you can send a `POST` request to `https://${account.namespace}/oauth/revoke`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/revoke",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\", \"token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Where:
- `client_id`: Your application's Client ID.
- `client_secret`: Your application's Client Secret.
- `token`: The refresh token you want to revoke.

The client should match the one the refresh token was issued for.

If the request is valid, the refresh token is revoked and the response is `HTTP 200`, with an empty response body. Otherwise, the response body contains the error code and description.

```json
{
  "error": "invalid_request|invalid_client",
  "error_description": "Description of the error"
}
```

The possible responses are:

| HTTP Status | Description |
| --- | --- |
| 200 | The refresh token is revoked or does not exist. The response body is empty. |
| 400 | The required parameters were not sent in the request or the refresh token was not issued to the client making the revocation request (`"error": "invalid_request"`). |
| 401 | The request is not authorized (`"error": "invalid_client"`). Check that the client credentials (`client_id` and `client_secret`) are present in the request and hold valid values. |

### Use the Dashboard

When you revoke a refresh token using the dashboard, you have to revoke the user's authorized access to the application that issued the token. This renders the refresh token useless.

To do so, go to the [Users section](${manage_url}/#/users) of the [dashboard](${manage_url}). Click the name of the user to view their *Details* page.

Select the *Authorized Applications* tab. This page lists all the clients to which the user has authorized access. Revoking an authorized application revokes also its associated refresh tokens.

To revoke the user's access to an authorized application, and hence invalidate the refresh token, click **Revoke**.

![Revoke a refresh token using the dashboard](/media/articles/tokens/dashboard-revoke-refresh-token.png)

## Rules

Rules will run for the [Refresh Token Exchange](#use-a-refresh-token). There are two key differences in the behavior of rules in this flow:

- If you try to do a [redirect](/rules/redirect) with `context.redirect`, the authentication flow will return an error.
- If you try to do MFA by setting `context.multifactor`, the authentication flow will return an error.

If you wish to execute special logic unique to the [Refresh Token Exchange](#use-a-refresh-token), you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then this is the indication that the rule is running during the Refresh Token exchange.

## SDK Support

### Web Apps

All our main SDKs support refresh tokens out of the box. Some are [Node.js](/quickstart/webapp/nodejs), [ASP.NET Core](/quickstart/webapp/aspnet-core), [PHP](/quickstart/webapp/php), [Java](/dev-centers/java), and many more. For a complete listing refer to our [Quickstarts page](/quickstart/webapp).

### Single Page Apps

For web apps that execute on the browser, the way to refresh a token is using [Silent Authentication](/api-auth/tutorials/silent-authentication). [Auth0.js](/libraries/auth0js), our client-side library, provides methods for this out of the box.

- The `authorize` method, redirects the user to the `/authorize` endpoint, in order to login and provide consent.
- The `parseHash` method, parses a URL hash fragment to extract the result of an Auth0 authentication response.
- The `renewAuth` method, attempts to get a new token from Auth0, using [silent authentication](/api-auth/tutorials/silent-authentication). For more details refer to [Using renewAuth to Acquire New Tokens](/libraries/auth0js#using-renewauth-to-acquire-new-tokens).

More information on the library:
- [Auth0.js v8 Reference](/libraries/auth0js)
- [Auth0.js GitHub repo](https://github.com/auth0/auth0.js#api)

### Mobile / Native Apps

For more information on using refresh tokens with our mobile SDKs refer to:

* [Mobile / Native Quickstarts](/quickstart/native)
* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)
* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/save-and-refresh-jwt-tokens)
* [Using Refresh Tokens in Mobile Applications](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)


## More information

* [Refresh Tokens: When to use them and how they interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
* [Using a refresh token with an ID token](/tokens/id_token#lifetime)
* [Using a refresh token with an access token](/tokens/access_token#lifetime)
