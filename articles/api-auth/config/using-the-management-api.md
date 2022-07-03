---
description: Learn how to set up a Client Credentials Grant using the Management API.
crews: crew-2
topics:
  - client-credentials
  - api-authorization
contentType: how-to
useCase: secure-api
---

# Set Up Client Credentials Grants Using the Management API

Auth0 lets you authorize applications that have the Client Credentials grant type enabled to call APIs using the [Client Credentials Flow](/flows/concepts/client-credentials). 

By default, all Machine-to-Machine Applications and Regular Web Applications have the 'Client Credentials' grant enabled, but they are not authorized to call any API.

If you want to call an API from these applications, you first need to authorize the application to call the API and specify the <dfn data-key="scope">scopes</dfn> that will be granted. You can do that [using the Dashboard](/api-auth/config/using-the-auth0-dashboard), or follow the steps below to use the API.

You will need the following:

- A Management API <dfn data-key="access-token">Access Token</dfn> with the `create:client_grants` scopes. For details on how to get one, refer to [Access Tokens for the Management API](/api/management/v2/tokens).

- The application information (`Client_Id` and `Client_Secret`) for the application you want to authorize [Auth0 dashboard](${manage_url}/#/applications).

- The API identifier for the API you want to invoke (${manage_url}/#/apis).

##  Authorize the Application

To authorize your Application, send a `POST` request to the [/client-grants endpoint of the Management APIv2](/api/management/v2#!/Client_Grants/post_client_grants) with the Management API Access Token.

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

That's it, you are done! Now that all the elements are in place, you can request Access Tokens for your API from Auth0 using the Client Credentials Flow.

## Keep reading

:::next-steps
* [Call API using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)
* [How to change the scopes and add custom claims to a token using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
* [How to add custom claims to a token using Rules](/scopes/current/sample-use-cases#add-custom-claims-to-a-token)
:::
