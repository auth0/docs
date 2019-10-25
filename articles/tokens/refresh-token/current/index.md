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
# Refresh Tokens

Refresh Tokens contain the information required to obtain a new <dfn data-key="access-token">Access Token</dfn> or [ID Token](/tokens/id-tokens).

Typically, a user needs a new Access Token when gaining access to a resource for the first time, or after the previous Access Token granted to them expires.

Refresh Tokens:

* Are subject to strict storage requirements to ensure that they are not leaked
* [Can be revoked](#revoke-a-refresh-token) by the Authorization Server

::: panel-warning OIDC-conformant applications
The behavior in this document is applicable to [OIDC-conformant applications](/api-auth/tutorials/adoption/oidc-conformant). You can configure an application to be OIDC-conformant in one of the following two ways:

1. Enabling the **OIDC Conformant** flag for an Application
2. Passing an <dfn data-key="audience">`audience`</dfn> to the `/authorize` endpoint of the Authentication API 

For more information on our authentication pipeline, see [Introducing OIDC-Conformant Authentication](/api-auth/intro).
:::

## Overview

Auth0 can issue an Access Token and/or an ID Token in response to an [authentication request](/api-auth). You can use Access Tokens to make authenticated calls to a secured API, while the ID Token contains user profile attributes represented in the form of *claims*. Both are [JWTs](/jwt) and therefore have expiration dates indicated using the `exp` claim, as well as security measures, like signatures.

A Refresh Token allows the application to ask Auth0 to issue a new Access Token or ID Token without having to re-authenticate the user. This will work as long as the Refresh Token has not been revoked.

## Restrictions on Refresh Token Usage

You can only get a Refresh Token if you are implementing the [Authorization Code Flow](/flows/concepts/auth-code), [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), [Resource Owner Password Grant](/api-auth/grant/password), or [Device Authorization Flow](/flows/concepts/device-auth).

A Single-Page Application (normally implementing [Implicit Flow](/flows/concepts/implicit) or [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)) should not ever receive a Refresh Token. A Refresh Token is essentially a user credential that allows a user to remain authenticated indefinitely. This sensitive information should be stored securely and *not* exposed client-side in a browser.

If you are implementing an SPA using [Implicit Flow](/flows/concepts/implicit) and you need to renew a token, the only secure option for doing so is to use [Silent Authentication](/api-auth/tutorials/silent-authentication).

If you limit offline access to your API, a safeguard configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis), Auth0 will not return a Refresh Token for the API (even if you include the `offline_access` <dfn data-key="scope">scope</dfn> in your request).

## Get a Refresh Token

To get a Refresh Token, you must include the `offline_access` [scope](/scopes) when you initiate an authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint.

For example, if you are using the [Authorization Code Flow](/flows/concepts/auth-code), the authentication request would look like the following:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope=offline_access&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state={OPAQUE_VALUE}
```

The Refresh Token is stored in session. Then, when a session needs to be refreshed (for example, a preconfigured timeframe has passed or the user tries to perform a sensitive operation), the app uses the Refresh Token on the backend to obtain a new ID Token, using the `/oauth/token` endpoint with `grant_type=refresh_token`.

Once the user authenticates successfully, the application will be redirected to the `redirect_uri`, with a `code` as part of the URL: `${account.callback}?code=BPPLN3Z4qCTvSNOy`. You can exchange this code with an Access Token using the `/oauth/token` endpoint.

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

The response should contain an Access Token and a Refresh Token.

```text
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "token_type": "Bearer"
}
```

If you are requesting a Refresh Token for a mobile app using the corresponding Native Client (which is public), then you don't need to send the `client_secret` in the request since it's only required for [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications).

::: warning
Refresh Tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

For more information on how to implement this using the Authorization Code Flow, refer to our tutorial, [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code). For other grants, see [API Authorization](/api-auth).

::: note
If the response did not include a Refresh Token, check that you comply with the [Restrictions](#restrictions-on-refresh-token-usage) listed in this document.
:::

## Use a Refresh Token

To exchange the Refresh Token you received during authorization for a new Access Token, make a `POST` request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
    ],
    "postData" : {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "refresh_token"
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
          "name": "refresh_token",
          "value": "YOUR_REFRESH_TOKEN"
        }
      ]
    }
}
```

| Parameter | Description |
| - | - |
| `grant_type` | The type of grant to execute (the `/token` endpoint is used for various grants, for more information refer to the [Authentication API](/api/authentication#get-token)). To refresh a token, use `refresh_token` |
| `client_id` | Your application's Client ID |
| client_secret | Optional. Your application's Client Secret. Only required for [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications) |
| `refresh_token` | The Refresh Token to use |

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
You should only ask for a new token if the Access Token has expired or you want to refresh the claims contained in the ID Token. For example, it's a bad practice to call the endpoint to get a new Access Token every time you call an API. There are rate limits in Auth0 that will throttle the number of requests to this endpoint that can be executed using the same token from the same IP.
:::

## Revoke a Refresh Token

Since Refresh Tokens never expire, it is essential to be able to revoke them in case they get compromised.

For the Device Authorization Flow, the only way to force a device to reauthorize is to revoke the Refresh Token assigned to the device. To learn how, see [Unlink Devices from Users](/dashboard/guides/users/unlink-user-devices). Note that the device will not be forced to reauthorize until the current Access Token expires and the application tries to use the revoked Refresh Token.

Auth0 handles token revocation as though the token has been potentially exposed to malicious adversaries. Therefore, each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and audience will be revoked**.

You can revoke a Refresh Token by:

* Posting a request to [the Authentication API's /oauth/revoke endpoint](/api/authentication#revoke-refresh-token)
* Posting a request to [the Management API's /api/v2/device-credentials endpoint](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) 
* Using the [dashboard](${manage_url}).

### Use the Authentication API

To revoke a Refresh Token, you can send a `POST` request to `https://${account.namespace}/oauth/revoke`.

The API first validates the application credentials and then verifies whether the token was issued to the application making the revocation request.  If this validation fails, the request is refused, and the application is informed of the error. Next, the API invalidates the token. The invalidation takes place immediately, and the token cannot be used again after the revocation. Each revocation request invalidates all the tokens that have been issued for the same authorization grant.

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
| `client_secret` | Your application's Client Secret. Required for [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications). |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

The application should match the one for which the Refresh Token was issued.

::: panel Revoke a token without the Client Secret
For applications that cannot keep the Client Secret safe (e.g., native apps), the [Revoke endpoint](/api/authentication#revoke-refresh-token) supports access without the Client Secret. However, the application itself must have the property `tokenEndpointAuthMethod` set to `none`. You can change the `tokenEndpointAuthMethod` value, either from the UI ([Dashboard > Clients > Application Settings](${manage_url}/#/applications/${account.clientId}/settings)), or using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

If the request is valid, the Refresh Token is revoked, and the response is `HTTP 200`, with an empty response body. Otherwise, the response body contains the error code and description.

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

### Use the Management API

To revoke a Refresh Token using the Auth0 Management API, you need the `id` of the Refresh Token you wish to revoke. To obtain a list of existing Refresh Tokens, call the [List device credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoint, specifying `type=refresh_token` with an Access Token containing `read:device_credentials` scope. To narrow the results, you can also specify the `client_id` and `user_id` associated with the token (if known).

```text
GET https://${account.namespace}/api/v2/device-credentials?
  type=refresh_token
  &client_id={}
  &user_id={}

{
  "Authorization":   "Bearer {your_access_token}"
}
```

Response body:

```text
[
  {
    "id": "dcr_dFJiaAxbEroQ5xxx",
    "device_name": "my-device" // the value of 'device' provided in the /authorize call when creating the token
  }
]
```

To revoke a __Refresh Token__, call the [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) endpoint with an Access Token containing `delete:device_credentials` scope and the value of `id` obtained above:

```text
DELETE https://${account.namespace}/api/v2/device-credentials/{id}

{
  "Authorization":   "Bearer {your_access_token}"
}

```

The response will be an **HTTP 204**: The credential no longer exists.

### Use the Dashboard

Strictly speaking, the following process shows you how to revoke a user's authorized access to the application that issued the token. This renders the Refresh Token invalid, which is functionally identical to revoking the token itself.

To do this, go to the [Users section](${manage_url}/#/users) of the [dashboard](${manage_url}). Click the name of the user to view their *Details* page.

Select the *Authorized Applications* tab. This page lists all the applications to which the user has authorized access. Revoking an authorized application also revokes its associated Refresh Tokens.

To revoke the user's access to an authorized application, and hence invalidate the Refresh Token, click **Revoke**.

![Revoke a Refresh Token using the dashboard](/media/articles/tokens/dashboard-revoke-refresh-token.png)

## Rules

Rules will run for the [Refresh Token Exchange](#use-a-refresh-token). To execute special logic, you can look at the `context.protocol` property in your rule. If the value is `oauth2-refresh-token`, then this is the indication that the rule is running during the [Refresh Token Exchange](#use-a-refresh-token).

::: warning
If you try to do a <a href="/rules/redirect">redirect</a> with <code>context.redirect</code>, the authentication flow will return an error.
:::

## Custom Claims

If you have added custom claims to your tokens using a rule, the custom claims will appear in new tokens issued when using a Refresh Token for as long as your rule is in place. Although new tokens do not automatically inherit custom claims, rules run during the Refresh Token flow, so the same code will be executed. This allows you to add or change custom claims in newly-issued tokens without forcing previously-authorized applications to obtain a new Refresh Token.

## SDK Support

### Web Apps

All our main SDKs support Refresh Tokens out of the box. Some are [Node.js](/quickstart/webapp/nodejs), [ASP.NET Core](/quickstart/webapp/aspnet-core), [PHP](/quickstart/webapp/php), [Java](/dev-centers/java), and many more. For a complete listing, see [Quickstarts](/quickstart/webapp).

### Single-Page Apps

[Silent Authentication](/api-auth/tutorials/silent-authentication) is the method that is used to refresh a token for web apps that execute in a browser. [Auth0.js](/libraries/auth0js), our client-side library, provides methods for this functionality:

- The `authorize` method, redirects the user to the `/authorize` endpoint, to log in and provide consent.
- The `parseHash` method, parses a URL hash fragment to extract the result of an Auth0 authentication response.
- The `checkSession` method, attempts to get a new token from Auth0, using [silent authentication](/api-auth/tutorials/silent-authentication). For more details refer to [Using checkSession to Acquire New Tokens](/libraries/auth0js#using-checksession-to-acquire-new-tokens). An example is as follows:

```js
auth0.checkSession({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order'
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

### Mobile / Native Apps

For information on using Refresh Tokens with our mobile SDKs, see:

* [Mobile / Native Quickstarts](/quickstart/native)

* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)

* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/v2)

## Next steps

* [Refresh Tokens: When to use them and how they interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
