---
title: How to implement the Resource Owner Password Grant
description: Step-by-step guide on how to implement the OAuth 2.0 Resource Owner Password Grant
toc: true
---
# How to implement the Resource Owner Password Grant

<%= include('../../_includes/_pipeline2') %>

In this tutorial we will go through the steps required to implement the Resource Owner Password Grant.

You should use this flow **only if** the following apply:
- The application is absolutely trusted with the user's credentials. For [client side](/api-auth/grant/implicit) applications and [mobile apps](/api-auth/grant/authorization-code-pkce) we recommend using web flows instead.
- Using a redirect-based flow is not possible. If this is not the case and redirects are possible in your application you should use the [Authorization Code Grant](/api-auth/grant/authorization-code) instead.

## Before you start

* Check that your application's [grant type property](/applications/application-grant-types) is set appropriately
* [Register the API](/apis#how-to-configure-an-api-in-auth0) with Auth0
* Check that the [Default Audience and/or Default Directory](/dashboard/dashboard-tenant-settings#api-authorization-settings) has been set appropriately

## Configure your tenant

The Password Grant relies on a connection capable of authenticating users via username and password. In order to indicate which connection the Password Grant should use you need to set the value of the `default_directory` tenant setting.

1. Open the [Dashboard](${manage_url}) and browse to your [Tenant Settings](${manage_url}/#/tenant).
1. Scroll down to the __Settings__ section and locate the __Default Directory__ setting.
1. Enter the name of the connection you would like to use. Keep in mind that only connections capable of authenticating users via username and password can be used (such as database connections, AD, LDAP, Windows Azure AD, ADFS)

![Update Default Directory](/media/articles/api-auth/default-directory-setting.png)

## Ask for a Token

In order to execute the flow the application needs to acquire the Resource Owner's credentials, usually this will be through the use of an interactive form. Once the application has the credentials it needs to forward them to Auth0 with a `POST` to the [/oauth/token endpoint of Auth0's Authentication API](/api/authentication#resource-owner-password).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\"}"
  }
}
```

Where:

* `grant_type`: This must be `password`.
* `username`: The end user's identifier.
* `password`: The end user's password.
* `audience`: The **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.
* `client_id`: Your application's Client ID. You can find this value at the [Settings tab of the Machine to Machine Application](${manage_url}/#/applications).
* `client_secret`: Your application's Client Secret. You can find this value at the [Settings tab of the Machine to Machine Application](${manage_url}/#/applications). This is required when the **Token Endpoint Authentication Method** field at your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your application is not highly trusted (for example, SPA).
* `scope`: String value of the different [scopes](/scopes) the application is asking for. Multiple scopes are separated with whitespace.

The response contains a [signed JSON Web Token](/jwt), the token's type (which is `Bearer`), and in how much time it expires in [Unix time](https://en.wikipedia.org/wiki/Unix_time) (86400 seconds, which means 24 hours).

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type": "Bearer",
  "expires_in": 36000
}
```

In case the scopes issued to the application differ from the scopes requested, a `scope` parameter will be included in the response JSON, listing the issued scopes.

::: panel Password grant and standard scopes
If **no** API scopes (such as `read:notes`) are included in the request, all API scopes (such as `read:notes`, `create:notes`, and so on.) are included in the `access_token`.
If only the `openid` scope is included in the request, all `openid` standard scopes will be returned, such as `openid profile email address phone`.
In these cases, the `scope` parameter will be included in the response, listing the issued scopes. This happens because a password is equal to full access and hence any password-based exchange gives access to all scopes.
:::

::: panel How to get the user's claims
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
    "text": "{\"grant_type\":\"http://auth0.com/oauth/grant-type/password-realm\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"realm\": \"employees\"}"
  }
}
```

::: panel Auth0 Connections as Realms
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

::: next-steps
* [Call APIs from Highly Trusted Applications](/api-auth/grant/password)
* [How to configure an API in Auth0](/apis)
* [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
* [Tokens used by Auth0](/tokens)
:::
