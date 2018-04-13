---
title: Set up a Client Credentials Grant using the Management API
description: How to set up a Client Credentials Grant using the Management API.
crews: crew-2
---

# Set up a Client Credentials Grant using the Management API

<%= include('../../_includes/_pipeline2') %>

If you do not want to use the Auth0 Dashboard to create a Resource Server or you need to create one programmatically, you can use our Management API v2.

You will need the following:

- A Management APIv2 token with the appropriate scopes. For details on how to get one refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).
- The Application information (`Client_Id` and `Client_Secret`) for the Machine to Machine Application that should already be created and visible in your [Auth0 dashboard](${manage_url}/#/applications).

## 1. Create your Resource Server

Let's start by creating the Resource Server. This is the entity that represents the API that you want to issue Access Tokens for, identified by a friendly name and a URN identifier.

The following restrictions apply to the identifier:
- It must be a valid URN.
- It cannot be modified after creation.
- It must be unique throughout your tenant.

We recommend using your public API endpoint as an identifier.

To create a Resource Server send a `POST` request to the [/resource-servers endpoint of the Management APIv2](/api/management/v2#!/Resource_Servers/post_resource_servers) with an `access_token` that has the resource server scope (`scope:resource_server`).

The following example uses _"My Sample API"_ as the name and _"https://my-api-uri"_ as the identifier.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/resource-servers",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "authorization", "value": "Bearer Auth0_MGMT_API_ACCESS_TOKEN" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"name\":\"My Sample API\",\"identifier\": \"https://my-api-urn\",\"signing_alg\": \"RS256\",\"scopes\": [{ \"value\": \"sample-scope\", \"description\": \"Description for Sample Scope\"}]}"
  }
}
```

::: note
  You can include multiple scopes. This array represents the universe of scopes your API will support. You can modify this later by issuing a <code>PATCH</code> operation.
:::

Sample response:

```json
{
    "id": "56f0131ffdf1c311694f4cc7",
    "name": "My Sample API",
    "identifier": "https://my-api-urn",
    "scopes": [
        {
            "value": "sample-scope",
            "description": "Description for Sample Scope"
        }
    ],
    "signing_alg": "RS256",
    "signing_secret": "FF1prn9UxZotnolsDVwEJhqqyRmwdSu5",
    "token_lifetime": 86400
}
```

Note the following:
- The `identifier` value (`https://my-api-urn`) will be used from now on as the `audience` for any OAuth 2.0 grant, that wants to access this API.
- The algorithm that your API will use to sign tokens will be the __RS256__ (`signing_alg`).
- The secret used to sign the tokens will be `FF1prn9UxZotnolsDVwEJhqqyRmwdSu5` (`signing_secret`).
- The generated tokens will expire after `86400` seconds (`token_lifetime`).

## 2. Authorize the Application

Now that the API and the Application are defined in Auth0, you can create a trust relationship between them. To do so, authorize the Application to access the API, while defining the scopes that should be given to the Application (meaning the actions the Application will be able to perform on the API).

To authorize your Application send a `POST` request to the [/client-grants endpoint of the Management APIv2](/api/management/v2#!/Client_Grants/post_client_grants) with an `access_token` that has the create application grants scope (`create:client_grantss`).

The following example authorizes the Application with Id `${account.clientId}`, to access the API with Identifier `https://my-api-urn`, while granting the scope `sample-scope`.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/client-grants",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "authorization", "value": "Bearer Auth0_MGMT_API_ACCESS_TOKEN" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"audience\": \"https://my-api-urn\",\"scope\":[\"sample-scope\"]}"
  }
}
```

Sample response:

```json
{
    "id": "cgr_JGa6ZckLjnt60rWe",
    "client_id": "${account.clientId}",
    "audience": "https://test-api",
    "scope": [
        "sample-scope"
    ]
}
```

## 3. That's it!

Now that all the elements are in place, you can request Access Tokens for your API from Auth0.

For details on how to do so, refer to [Execute a Client Credentials Grant](/api-auth/tutorials/client-credentials).
