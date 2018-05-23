---
description: API and Mobile Configuration for the Mobile + API architecture scenario
toc: true
---

# Mobile + API: API and Mobile Configuration

<%= include('../_includes/_api-implement.md') %>

## Implement the Mobile App

In this section we will see how we can implement a mobile application for our scenario.

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#1-set-up-the-application)
:::

### Authorize the User

To authorize the user we will implement an [Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce). The mobile application should first send the user to the [authorization URL](/api/authentication#authorization-code-grant-pkce-) along with the `code_challenge` and the method used to generate it:

```text
https://${account.namespace}/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=YOUR_CLIENT_ID&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://YOUR_APP/callback
```

The `GET` request to the authorization URL should include the following values:

Parameter | Description
----------|------------
__client_id__ | The value of your Auth0 Client Id. You can retrieve it from the Settings of your Application at the [Auth0 Dashboard](${manage_url}/#/applications).
__audience__ | The value of your API Identifier. You can retrieve it from the Settings of your API at the [Auth0 Dashboard](${manage_url}/#/apis).
__scope__ | The [scopes](/scopes) which determine the claims to be returned in the `id_token` and `access_token`. For example, a scope of `openid` will return an `id_token` in the response. In our example mobile app, we use the following scopes: `create:timesheets read:timesheets openid profile email offline_access`. These scopes allow the mobile app to call the API, obtain a `refresh_token`, and return the user's `name`, `picture`, and `email` claims in the `id_token`.
__response_type__ | Indicates the Authentication Flow to use. For a mobile application using PKCE, this should be set to `code`.
__code_challenge__ | The generated code challenge from the code verifier. You can find instructions on generating a code challenge [here](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier).
__code_challenge_method__ | Method used to generate the challenge. Auth0 supports only `S256`.
__redirect_uri__ | The URL which Auth0 will redirect the browser to after authorization has been granted by the user. The Authorization Code will be available in the code URL parameter. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications).

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#2-authorize-the-user)
:::

### Get the Credentials

After a successful request to the authorization URL, you should receive the following response:

```text
HTTP/1.1 302 Found
Location: https://${account.namespace}/callback?code=AUTHORIZATION_CODE
```

Next you can exchange the `authorization_code` from the response for an Access Token that can be used to call your API. Perform a `POST` request to the [Token URL](/api/authentication#authorization-code-pkce-) including the following data:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"com.myclientapp://myclientapp.com/callback\", }"
  }
}
```

Parameter | Description
----------|------------
__grant_type__ | This must be set to `authorization_code`.
__client_id__ | The value of your Auth0 Client Id. You can retrieve it from the Settings of your Application at the [Auth0 Dashboard](${manage_url}/#/applications).
__code_verifier__ | Cryptographically random key that was used to generate the `code_challenge` passed to [authorization URL](/api/authentication#authorization-code-grant-pkce-) (`/authorize`).
__code__ | The `authorization_code` received from the previous authorize call.
__redirect_uri__ | The URL must match the `redirect_uri` passed in the previous section to `/authorize`.

The response from the Token URL will contain:

```json
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer",
  "expires_in":86400
}
```

- __access_token__: An `access_token` for the API, specified by the `audience`.
- __refresh_token__: A [Refresh Token](/tokens/refresh-token/current) will only be present if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard.
- __id_token__: An `id_token` JWT containing user profile information.
- __token_type__: A string containing the type of token, this will always be a Bearer token.
- __expires_in__: The amount of seconds until the `access_token` expires.

You will need to store the above credentials in local storage for use in calling your API and retrieving the user profile.

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#store-credentials)
:::

### Get the User Profile

To retrieve the [User Profile](/api/authentication?http#user-profile), your mobile application can decode the [ID Token](/tokens/id-token) using one of the [JWT libraries](https://jwt.io/#libraries-io). This is done by [verifying the signature](/tokens/id-token#verify-the-signature) and [validating the claims](/tokens/id-token#validate-the-claims) of the token. After validating the ID Token, you can access its payload containing the user information:

```json
{
  "email_verified": false,
  "email": "test.account@userinfo.com",
  "clientID": "q2hnj2iu...",
  "updated_at": "2016-12-05T15:15:40.545Z",
  "name": "test.account@userinfo.com",
  "picture": "https://s.gravatar.com/avatar/dummy.png",
  "user_id": "auth0|58454...",
  "nickname": "test.account",
  "created_at": "2016-12-05T11:16:59.640Z",
  "sub": "auth0|58454..."
}
```

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#3-get-the-user-profile)
:::

### Display UI Elements Conditionally Based on Scope

Based on the `scope` of the user, you may want to show or hide certain UI elements. To determine the scope issued to a user, you will need to inspect the the `scope` which was granted when the user was authenticated. This will be a string containing all the scopes, so you therefore need to inspect this string to see whether it contains the required `scope` and based on that make a decision whether to display a particular UI element.

::: note
[See the implementation in Android](/architecture-scenarios/application/mobile-api/mobile-implementation-android#4-display-ui-elements-conditionally-based-on-scope)
:::

### Call the API

To access secured resources from your API, the authenticated user's `access_token` needs to be included in requests that are sent to it. This is accomplished by sending the `access_token` in an `Authorization` header using the `Bearer` scheme.

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#5-call-the-api)
:::

### Renew the Token

::: warning
Refresh Tokens must be stored securely by an application since they do not expire and allow a user to remain authenticated essentially forever. If Refresh Tokens are compromised or you no longer need them, you can revoke the Refresh Tokens using the [Authentication API](/api/authentication#revoke-refresh-token).
:::

To refresh your `access_token`, perform a `POST` request to the `/oauth/token` endpoint using the `refresh_token` from your authorization result.

A [Refresh Token](/tokens/refresh-token/current) will only be present if you included the `offline_access` scope in the previous authorization request and  enabled __Allow Offline Access__ for your API in the Dashboard.

Your request should include:

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
      "text" : "{ \"grant_type\": \"refresh_token\", \"client_id\": \"${account.clientId}\", \"refresh_token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Parameter | Description
----------|------------
__grant_type__ | This must be set to `refresh_token`.
__client_id__ | The value of your Auth0 Client Id. You can retrieve it from the Settings of your Application at the [Auth0 Dashboard](${manage_url}/#/applications).
__refresh_token__ | the `refresh_token` to use, from the previous authentication result.

The response will include the new `access_token`:

```json
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer",
  "expires_in":86400
}
```

::: note
[See the implementation in Android.](/architecture-scenarios/application/mobile-api/mobile-implementation-android#store-the-credentials)
:::

<%= include('./_stepnav', {
 prev: ["2. Auth0 Configuration", "/architecture-scenarios/application/mobile-api/part-2"], next: ["Conclusion", "/architecture-scenarios/application/mobile-api/part-4"]
}) %>