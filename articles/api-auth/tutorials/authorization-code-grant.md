---
description: How to execute an Authorization Code Grant flow from a Regular Web application
---

# Executing an Authorization Code Grant Flow
<%=include('../_region-support') %>

To begin an Authorization Code Grant flow, your Client application should first send the user to the authorization URL:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope={SCOPE}&
    response_type=code&
    client_id={AUTH0_CLIENT_ID}&
    redirect_uri={CALLBACK_URL}&
    state={OPAQUE_VALUE}
```

Where:

* `audience`: The target API for which the Client Application is requesting access on behalf of the user.
* `scope`: The scopes which you want to request authorization for. These must be separated by a space.
* `response_type`: The response type. For this flow, the value must be `code`. This indicates to the Authorization Server that you are performing an Authorization Code flow.
* `client_id`: Your application's Client ID.
* `state`: An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks, [click here to learn more](/protocols/oauth-state).
* `redirect_uri`: The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. The Authorization Code will be available in `code` URL parameter. This URL must be specified as a valid callback URL under the Client Settings of your application.

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${account.clientId}&redirect_uri=https://myclientapp.com/callback">
  Sign In
</a>
```

The purpose of this call is to obtain consent from the user to invoke the Resource Server (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. The Authorization Server will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, the Authorization Server will require consent to be given again.

## Exchanging the Authorization Code for an Access Token

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
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"https://myclientapp.com/callback\"}"
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

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled "Allow Offline Access" for your Resource Server (API) in the Dashboard. For more information about Refresh Tokens and how to use them, see [our documentation](
 https://auth0.com/docs/tokens/refresh-token).

::: panel-danger Warning
It is important to understand that the Authorization Code flow should only be used in cases such as a Regular Web Application where the Client Secret can be safely stored. In cases such as a Single Page Application, the Client Secret is available to the client (in the web browser), so the integrity of the Client Secret cannot be maintained. That is why the Implicit Grant flow is more appropriate in that case.
:::

## Using the Access Token

Once the `access_token` has been obtained it can be used to make calls to the Resource Server by passing it as a Bearer Token in the `Authorization` header of the HTTP request:

```har
{
  "method": "GET",
  "url": "https://someapi.com/api",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer {ACCESS_TOKEN}" }
  ]
}
```
