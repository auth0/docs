---
description: How to execute an Authorization Code Grant flow from a Regular Web application
---

# Execute an Authorization Code Grant Flow

<div class="alert alert-info">
  This tutorial will help you implement the Authorization Code grant. If you are looking for some theory on the flow refer to <a href="/api-auth/grant/authorization-code">Calling APIs from Server-side Web Apps</a>.
</div>

The __Authorization Code__ is an OAuth 2.0 grant that [regular web apps](/quickstart/webapp) use in order to access an API.


## 1. Get the User's Authorization

To begin an Authorization Code Grant flow, your Client application should first send the user to the authorization URL:

```text
https://${account.namespace}/authorize?
    audience=API_AUDIENCE&
    scope=SCOPE&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state=OPAQUE_VALUE}
```

Where:

* `audience`: The target API for which the Client Application is requesting access on behalf of the user.
* `scope`: The scopes which you want to request authorization for. These must be separated by a space.
* `response_type`: The response type. For this flow, the value must be `code`. This indicates to Auth0 that you are performing an Authorization Code flow.
* `client_id`: Your application's Client ID.
* `state`: An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks, [click here to learn more](/protocols/oauth-state).
* `redirect_uri`: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the `code` URL parameter. This URL must be specified as a valid callback URL under the Client Settings of your application.

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

The purpose of this call is to obtain consent from the user to invoke the API (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, Auth0 will require consent to be given again.

## 2. Exchange the Authorization Code for an Access Token

Now that you have an Authorization Code, you must exchange it for an Access Token that can be used to call your API. Using the Authorization Code (`code`) from the previous step, you will need to POST to the OAuth Token URL:

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

The response from `/oauth/token` contains `access_token`, `refresh_token`, `id_token`, and `token_type` values, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard. For more information about Refresh Tokens and how to use them, see [our documentation](/tokens/refresh-token).

::: panel-danger Warning
It is important to understand that the Authorization Code flow should only be used in cases such as a Regular Web Application where the Client Secret can be safely stored. In cases such as a Single Page Application, the Client Secret is available to the client (in the web browser), so the integrity of the Client Secret cannot be maintained. That is why the Implicit Grant flow is more appropriate in that case.
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

## More reading

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)
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
