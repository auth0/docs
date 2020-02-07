---
description: Learn how to execute the Hybrid Flow so your app can use an ID token to access information about the user while obtaining an authorization code that can be exchanged for an Access Token. 
toc: true
topics:
  - api-authentication
  - oidc
  - hybrid
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Implement the Hybrid Flow

The [Hybrid Flow](/api-auth/grant/hybrid) is an <dfn data-key="openid">OpenID Connect (OIDC)</dfn> grant that enables use cases where your application can immediately use an ID token to access information about the user while obtaining an authorization code that can be exchanged for an Access Token (therefore gaining access to protected resources for an extended period of time).

In this article, we will show you how you can use the Hybrid Flow in Auth0.

## Prerequisites

Before you begin this tutorial, please:

* Check that your Application's [Grant Type property](/applications/concepts/application-grant-types) is set appropriately
* [Register your API](/apis#how-to-configure-an-api-in-auth0) with Auth0

## 1. Get the User's Authorization

The first step is to get the user's consent for authentication (and possibly authorization). You can initiate the flow by sending the user to the [authorization URL](/api/authentication#authorization-code-grant)

```text
https://${account.namespace}/authorize?
    audience=YOUR_API_AUDIENCE&
    scope=YOUR_SCOPE&
    response_type=YOUR_RESPONSE_TYPE&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state=YOUR_OPAQUE_VALUE
    nonce=NONCE
```

Where:

* `audience`: The unique identifier of the API the web app wants to access. Use the **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.

* `scope`: The <dfn data-key="scope">scopes</dfn> which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn> (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)).

* `response_type`: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code id_token`, `code token`, or `code id_token token`. More specifically, `token` returns an Access Token, `id_token` returns an ID Token, and `code` returns the Authorization Code.

* `client_id`: Your application's Client ID. You can find this value at your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

* `state`: An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value must be used by the application to prevent CSRF attacks. For more information, see [State Parameter](/protocols/oauth-state).

* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

  ::: warning
  Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Auth0 removes everything after the hash and does *not* honor any fragments.
  :::

* `nonce`: A string value which will be included in the response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`.

For example:

```html
<a href="https://${account.namespace}/authorize?audience=https://my-api.com&scope=read:tests&response_type=code id_token&client_id=${account.clientId}&redirect_uri=${account.callback}&state=STATE&nonce=NONCE">
  Sign In
</a>
```

The purpose of this call is to obtain consent from the user to invoke the API (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, Auth0 will require consent to be given again.

## 2. Parsing the Response

If your call to the `/authorize` endpoint is successful, Auth0 redirects you to a URL similar to the following:

```text
https://YOUR_REDIRECT_URI
  /#access_token=ey...MhPw
  &expires_in=7200
  &token_type=Bearer
  &code=AUTHORIZATION_CODE
  &id_token=ey...qk
```

The URL contains the following components:

* The redirect URI you provided for this application
* The Authorization Code provided by Auth0
* The ID Token
* The Access Token

If you've returned an Access Token, you'll also receive `expires_in` and `token_type` values.

More specifically, here's what you will get back (depending on the value provided in `response_type`):

| Response Type | Components |
| - | - |
| code id_token | Authorization Code, ID Token |
| code token | Authorization Code, Access Token |
| code id_token token | Authorization Code, ID Token, Access Token |

### Access Tokens

There are two ways to get Access Tokens in the Hybrid Flow.

First, all calls include the `code` value in the `response_type` parameter (e.g., `code id_token`, `code token`, or `code id_token token`). As such, you'll receive an Authorization Code from Auth0 that you can then exchange for an Access Token.

Second, you can explicitly request an Access Token directly by setting the `response_type` parameter to `code token` or `code id_token token`.

You can therefore receive two Access Tokens for a given transaction. However, it is important to keep the two separate -- we do not recommend that an Access Token obtained when `response_type=code token` or `code token` or `code id_token token` be used to call APIs.

## 3. Exchange the Authorization Code for an Access Token

You can exchange the Authorization Code for an Access Token that will allow you to call the API specified in your initial authorization call. 

Using the Authorization Code (`code`) from the first step, you will need to `POST` to the [Token URL](/api/authentication?http#authorization-code):

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
It is important to understand that the Authorization Code flow should only be used in cases such as a Regular Web Application where the Client Secret can be safely stored. In cases such as a Single-Page Application, the Client Secret is available to the application (in the web browser), so the integrity of the Client Secret cannot be maintained. That is why the [Implicit Flow](/flows/concepts/implicit) is more appropriate in that case.
:::

## 4. Call the API

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

## 5. Verify the Token

Once your API receives a request with a Bearer Access Token, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed, see [Validate Access Tokens](/tokens/guides/validate-access-tokens).

## Keep reading

- [Tokens](/tokens)
- [Refresh Tokens](/tokens/concepts/refresh-token)
- [Configure an API in Auth0](/apis)
- [Authorization Code Flow](/flows/concepts/auth-code)
- [Implicit Flow](/flows/concepts/implicit)

