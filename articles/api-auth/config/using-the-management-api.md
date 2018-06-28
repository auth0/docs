---
title: Set up a Client Credentials Grant using the Management API
description: How to set up a Client Credentials Grant using the Management API.
crews: crew-2
topics:
  - client-credentials
  - api-authorization
contentType: how-to
---

# Set up a Client Grant using the Management API

Auth0 lets you authorize applications that have the 'Client Credential' grant type enabled to call APIs using the OAuth Client Credentials Grant. 

By default, all Machine to Machine Applications and Regular Web Applications have it the 'Client Credentials' grant enabled, but they are not authorized to call any API.

If you want to call an API from these applications, you first need to authorize the application to call the API and specify the scopes that will be granted. You can do that [using the Dashboard](/api-auth/config/using-the-dashboard), or follow the steps below to use the API.

You will need the following:

- A Management API access token with the `create:client_grants` scopes. For details on how to get one refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).

- The application information (`Client_Id` and `Client_Secret`) for the application you want to authorize [Auth0 dashboard](${manage_url}/#/applications).

- The API identifier for the API you want to invoke (${manage_url}/#/apis).

##  Authorize the Application

To authorize your Application send a `POST` request to the [/client-grants endpoint of the Management APIv2](/api/management/v2#!/Client_Grants/post_client_grants) with the Management API Access Token.

The following example authorizes the application with Id `${account.clientId}`, to access the API with Identifier `https://my-api-urn`, while granting the scope `sample-scope`.

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

That's it, you are done! Now that all the elements are in place, you can request Access Tokens for your API from Auth0 using the Client Credentials Grant.

## Keep reading

:::next-steps
* [How to implement the Client Credentials Grant](/api-auth/tutorials/client-credentials)
* [How to change the scopes and add custom claims to a token using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
* [How to add custom claims to a token using Rules](/scopes#custom-claims)
:::
