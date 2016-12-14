---
description: How to execute a Resource Owner Password Grant
---

# Executing the Resource Owner Password Grant
<%=include('../_region-support') %>

::: panel-danger Warning
Support for Refresh Tokens will be available in a future release.
:::

## Configuring your tenant for the Resource Owner Password Grant

The Password Grant relies on a connection capable of authenticating users via username and password. In order to indicate which connection the Password Grant should use you need to set the value of the `default_directory` tenant setting.

1. Open the Management Dashboard and browse to your [Account Settings](${manage_url}/#/account).
1. Scroll down to the Settings section and locate the **Default Directory** setting.
1. Enter the name of the connection you would like to use. Keep in mind that only connections capable of authenticating users via username and password can be used (i.e. database connections, AD, LDAP, Windows Azure AD, ADFS)

  ![](/media/articles/api-auth/default-directory-setting.png)

## Executing the flow

In order to execute the flow the client needs to acquire the Resource Owner's credentials, usually this will be through the use of an interactive form. Once the client has the credentials it needs to forward them to Auth0 with a POST to the token endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"XyD....23S\"}"
  }
}
```

Where:

* `grant_type`: This must be `password`.
* `username`: Resource Owner's identifier.
* `password`: Resource Owner's secret.
* `audience`: API Identifier that the client is requesting access to.
* `client_id`: Client ID of the client making the request
* `scope`: String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace.

The response from `/oauth/token` (if successful) contains an `access_token`, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type": "Bearer"
}
```

::: panel-info A note about user's claims
If the client needs the user's claims you can include the scopes `openid profile` to the `scope` value in the POST to the token endpoint. If the audience uses RS256 as the signing algorithm, the `access_token` will now also include `/userinfo` as a valid audience. You can now send the `access_token` to `https://${account.namespace}/userinfo` to retrieve the user's claims.
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
