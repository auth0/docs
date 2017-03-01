---
description: How to execute a Resource Owner Password Grant
---

# Execute the Resource Owner Password Grant

::: panel-danger Warning
Support for Refresh Tokens will be available in a future release.
:::

## Configure your tenant for the Resource Owner Password Grant

The Password Grant relies on a connection capable of authenticating users via username and password. In order to indicate which connection the Password Grant should use you need to set the value of the `default_directory` tenant setting.

1. Open the Management Dashboard and browse to your [Account Settings](${manage_url}/#/account).
1. Scroll down to the Settings section and locate the "Default Directory" setting.
1. Enter the name of the connection you would like to use. Keep in mind that only connections capable of authenticating users via username and password can be used (i.e. database connections, AD, LDAP, Windows Azure AD, ADFS)

  ![Update Default Directory](/media/articles/api-auth/default-directory-setting.png)

## Execute the flow

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
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\"}"
  }
}
```

Where:

* `grant_type`: This must be `password`.
* `username`: Resource Owner's identifier.
* `password`: Resource Owner's secret.
* `audience`: API Identifier that the client is requesting access to.
* `client_id`: Client ID of the client making the request.
* `client_secret`: Client Secret of the client making the request. Required when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA).
* `scope`: String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace.

The response from `/oauth/token` (if successful) contains an `access_token`, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type": "Bearer",
  "expires_in": 36000
}
```

In case the scopes issued to the client differ from the scopes requested, a `scope` parameter will be included in the response JSON, listing the issued scopes.

::: panel-info Password grant and standard scopes
If **no** API scopes (such as `read:notes`) are included in the request, all API scopes (such as `read:notes`, `create:notes`, etc.) are included in the `access_token`.
If only the `openid` scope is included in the request, all `openid` standard scopes will be returned, such as `openid profile email address phone`.
In these cases, the `scope` parameter will be included in the response, listing the issued scopes. This happens because a password is equal to full access and hence any password-based exchange gives access to all scopes.
:::

::: panel-info How to get the user's claims
If you need the user's claims you can include the scope `openid` to your request. If the API uses `RS256` as the signing algorithm, the `access_token` will now also include `/userinfo` as a valid audience. You can use this `access_token` to invoke the [/userinfo endpoint](/api/authentication#get-user-info) and retrieve the user's claims.
:::

### Realm Support

A extension grant that offers similar functionality with the **Resource Owner Password Grant**, including the ability to indicate a specific realm, is the `http://auth0.com/oauth/grant-type/password-realm`.

Realms allow you to keep separate user directories and specify which one to use to the token endpoint.

To use this variation you will have to change the following request parameters:
* Set the `grant_type` to `http://auth0.com/oauth/grant-type/password-realm`.
* Set the new request parameter `realm` to the realm the user belongs. This maps to a connection in Auth0. For example, if you have configured a database connection for your internal employees and you have named the connection `employees`, then use this value.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"http://auth0.com/oauth/grant-type/password-realm\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\", \"realm\": \"employees\"}"
  }
}
```

::: panel-info Auth0 Connections as Realms
You can configure Auth0 Connections as realms, as long as they support active authentication. This includes [Database](/connections/database), [Passwordless](/connections/passwordless), [Active Directory/LDAP](/connections/enterprise/active-directory), [Windows Azure AD](/connections/enterprise/azure-active-directory) and [ADFS](/connections/enterprise/adfs) connections.
:::

## Use the Access Token

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

## Verify the Token

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed by the API, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).
