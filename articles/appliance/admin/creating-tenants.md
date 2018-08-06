---
section: appliance
description: How to automatically create tenants in the PSaaS Appliance
topics:
    - appliance
    - tenants
contentType: how-to
useCase: appliance
applianceId: appliance2
---

# PSaaS Appliance Administration: Automatic Creation of Tenants

If your business needs require you to create tenants regularly, you may automate this process in the PSaaS Appliance. For example, you might need to create one tenant for each customer or project that goes live.

## Creating a Management API Application for the Root Tenant Authority

1. Choose the Root Tenant Authority (RTA) tenant using the drop-down menu located in the top right-hand side of the Dashboard.
2. Go to the Applications page.
3. Create an application called 'Tenant Provisioning.'
4. Once you have created the 'Tenant Provisioning' application, go to the Connections tab and disable **all** Connections for this application.
5. Navigate to `${manage_url}/#/apis`. Click the link to open the Auth0 Management API.
6. Go to the Machine to Machine Applications tab, and enable Tenant Provisioning by moving the associated slide to the right.
7. Create the new application grant.

### Creating the New Application Grant

1. Navigate to the [Management API Explorer](/api/management/v2#!/Client_Grants/post_client_grants) to generate the required `POST` call.
2. Click the bubble that says **'create:client_grants'** to select that Scope.
3. Paste the following payload into the provided `body` box after you have supplied the client ID and the root tenant authority:
    ```text
    {
     'client_id': '${account.clientId}',
     'audience': 'https://ROOT_TENANT_AUTHORITY/api/v2/',
     'scope': ['create:tenants']
    }
    ```
4. Click 'Try' to test the provided information. If you receive a `201` response, you may proceed to click on the 'get curl command' link to generate the required `POST` call. It will contain the following information:

    ```har
    {
        "method": "POST",
        "url": "https://ROOT_TENANT_AUTHORITY/api/v2/client-grants",
        "httpVersion": "HTTP/1.1",
        "cookies": [],
        "headers": [],
        "queryString" : [],
        "postData": {
          "mimeType": "application/json",
          "text" : "{ \"client_id\": \"${account.clientId}\", \"audience\": \"https://ROOT_TENANT_AUTHORITY/api/v2/\", \"scope\": [\"create:tenants\"] }"
        },
        "headersSize" : -1,
        "bodySize" : -1,
        "comment" : ""
    }
    ```

## Using the New Application grant

Once you have created your New Application Grant, you may use it to complete the following tasks.

### Getting an Access Token

```har
{
    "method": "POST",
    "url": "https://ROOT_TENANT_AUTHORITY_DOMAIN/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
        { "name": "cache-control", "value": "no-cache" },
        { "name": "content-type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
        "mimeType": "application/json",
        "text": "{\"audience\": \"https://ROOT_TENANT_AUTHORITY/api/v2/\", \"grant_type\": \"client_credentials\",\"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\"}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

In return, you will receive the Access Token:

```text
{
   'access_token': 'eyJ0eXAiO...'
}
```

### Creating a Tenant

You may use the following call create a tenant. Once the tenant is created, the API responds with a Client ID and Secret that grants access to the Management API for the newly-created tenant (which you can then use to get additional Access Tokens--see the following section for the sample call).

```har
{
    "method": "POST",
    "url": "https://ROOT_TENANT_AUTHORITY_DOMAIN/api/v2/tenants",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
        { "name": "cache-control", "value": "no-cache" },
        { "name": "content-type", "value": "application/json" },
        { "name": "authorization", "value": "Bearer ACCESS_TOKEN" }
    ],
    "queryString" : [],
    "postData" : {
        "mimeType": "application/json",
    "text": "{\"name\": \"customer-1\",\"owners\": [\"me@email.com\"]}"
     },
     "headersSize" : -1,
     "bodySize" : -1,
    "comment" : ""
}
```

#### Getting an Access Token for the Newly-Created Tenant

This snippet shows how you can get an Access Token for the newly-created tenant, which you can then use to call the Management API.

```har
{
    "method": "POST",
    "url": "https://NEW_TENANT_DOMAIN/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
        { "name": "cache-control", "value": "no-cache" },
        { "name": "content-type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
        "mimeType": "application/json",
        "text": "{\"audience\": \"https://NEW_TENANT_DOMAIN/api/v2/\", \"grant_type\": \"client_credentials\", \"client_id\": \"MANAGEMENT_CLIENT_ID\", \"client_secret\": \"MANAGEMENT_CLIENT_SECRET\"}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```
