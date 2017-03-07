---
description: How to execute an Authorization Code Grant flow from a Regular Web application
---

# Execute an Authorization Code Grant Flow

<div class="alert alert-info">
  This tutorial will help you implement the Authorization Code grant. If you are looking for some theory on the flow refer to <a href="/api-auth/grant/authorization-code">Calling APIs from Server-side Web Apps</a>.
</div>

The __Authorization Code__ is an OAuth 2.0 grant that [regular web apps](/quickstart/webapp) use in order to access an API. In this document we will work through the steps needed in order to implement this: get the user's authorization, get a token and access the API using the token.


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

* `audience`: The unique identifier of the API the web app wants to access. Use the value of the __Identifier__ field at your [API Settings](${manage_url}/#/apis). If you can't see this page, enable the __Enable APIs Section__ toggle at [Account Settings > Advanced](${manage_url}/#/account/advanced).

* `scope`: The [scopes](/scopes) which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a refresh token (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)).

  __NOTE__: In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`.

* `response_type`: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be `code`.

* `client_id`: Your application's Client ID. You can find this value at your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

* `state`: An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks, [click here to learn more](/protocols/oauth-state).

* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

The purpose of this call is to obtain consent from the user to invoke the API (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, Auth0 will require consent to be given again.

## 2. Exchange the Authorization Code for an Access Token

Now that you have an Authorization Code, you must exchange it for an Access Token that can be used to call your API. Using the Authorization Code (`code`) from the previous step, you will need to `POST` to the [Token URL](/api/authentication?http#authorization-code):

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

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard. For more information about Refresh Tokens and how to use them, see [our documentation](/tokens/preview/refresh-token).

::: panel-danger Security Warning
It is important to understand that the Authorization Code flow should only be used in cases such as a Regular Web Application where the Client Secret can be safely stored. In cases such as a Single Page Application, the Client Secret is available to the client (in the web browser), so the integrity of the Client Secret cannot be maintained. That is why the [Implicit Grant flow](/api-auth/grant/implicit) is more appropriate in that case.
:::

## 3. Call the API

Once the `access_token` has been obtained it can be used to make calls to the API by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

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

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

## More reading

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [How to refresh a token](/tokens/preview/refresh-token)
- [How to configure an API in Auth0](/apis)
- [Web App Quickstarts](/quickstart/webapp)
- [Client Authentication for Server-side Web Apps](/client-auth/server-side-web)
- [Authentication API: GET /authorize](/api/authentication?http#authorization-code-grant)
- [Authentication API: POST /oauth/token](/api/authentication?http#authorization-code)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
- [Integrating a Web App with Auth0](/protocols/oauth2/oauth-web-protocol)
- [RFC 6749](https://tools.ietf.org/html/rfc6749)
