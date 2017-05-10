---
description: How to execute a Resource Owner Password Grant
---

<%= include('../../_includes/_pipeline2') %>

# How to implement the Resource Owner Password Grant

## Configure your tenant

The Password Grant relies on a connection capable of authenticating users via username and password. In order to indicate which connection the Password Grant should use you need to set the value of the `default_directory` tenant setting.

1. Open the [Dashboard](${manage_url}) and browse to your [Account Settings](${manage_url}/#/account).
1. Scroll down to the _Settings_ section and locate the __Default Directory__ setting.
1. Enter the name of the connection you would like to use. Keep in mind that only connections capable of authenticating users via username and password can be used (i.e. database connections, AD, LDAP, Windows Azure AD, ADFS)

![Update Default Directory](/media/articles/api-auth/default-directory-setting.png)

## Ask for a Token

In order to execute the flow the client needs to acquire the Resource Owner's credentials, usually this will be through the use of an interactive form. Once the client has the credentials it needs to forward them to Auth0 with a `POST` to the [/oauth/token endpoint of Auth0's Authentication API](/api/authentication#resource-owner-password).

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
* `username`: The end user's identifier.
* `password`: The end user's password.
* `audience`: The value of the **Identifier** field on the [Settings tab of the API](${manage_url}/#/apis).
* `client_id`: Your application's Client ID. You can find this value at the [Settings tab of the Non Interactive Client](${manage_url}/#/clients).
* `client_secret`: Your application's Client Secret. You can find this value at the [Settings tab of the Non Interactive Client](${manage_url}/#/clients). This is required when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA).
* `scope`: String value of the different [scopes](/scopes) the client is asking for. Multiple scopes are separated with whitespace.

The response contains a [signed JSON Web Token](/jwt), the token's type (which is `Bearer`), and in how much time it expires in [Unix time](https://en.wikipedia.org/wiki/Unix_time) (86400 seconds, which means 24 hours).

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

## Use the token

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

## Verify the token

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed by the API, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

## Optional: Customize the Tokens

<%= include('../../_includes/_api-auth-customize-tokens') %>

If you wish to execute special logic unique to the Password exchange, you can look at the `context.protocol` property in your rule. If the value is `oauth2-password`, then the rule is running during the password exchange.

## Optional: Configure MFA

In case you need stronger authentication, than username and password, you can configure MultiFactor Authentication (MFA) using the Resource Owner Password Grant. For details on how to implement this refer to [Multifactor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password).

## Optional: Configure Anomaly Detection

When using this flow from server-side applications, some anomaly detection features might fail because of the particularities of this scenario. For details on how to implement this, while avoiding some common issues, refer to [Using Resource Owner Password from Server side](/api-auth/tutorials/using-resource-owner-password-from-server-side).

## Keep reading

<i class="notification-icon icon-budicon-345"></i>&nbsp;[Call APIs from Highly Trusted Clients](/api-auth/grant/password)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to configure an API in Auth0](/apis)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to use MFA with Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to use Resource Owner Password Grant from the server side together with Anomaly Detection](/api-auth/tutorials/using-resource-owner-password-from-server-side)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Authentication API: POST /oauth/token](/api/authentication#resource-owner-password)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[The OAuth 2.0 protocol](/protocols/oauth2)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[The OpenID Connect protocol](/protocols/oidc)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Tokens used by Auth0](/tokens)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[RFC 6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)<br/>
