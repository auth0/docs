# Appliance Administration: Automatic Creation of Tenants

If your business needs require you to create tenants regularly, you may automate this process in your Appliance instances. For example, you might need to create one tenant for each customer or project that goes live.

## Creating a Management API Client for the Root Tenant Authority

1. Choose the Root Tenant Authority (RTA) tenant using the drop-down menu located in the top right-hand side of the Dashboard.
2. Go to the Applications page.
3. Create an application called 'Tenant Provisioning.'
4. Once you have created the 'Tenant Provisioning' client, go to the Connections tab and disable **all** Connections for this client.
5. Navigate to `${uiUrl}/#/apis`. Click the link to open the Auth0 Management API.
6. Go to the Non Interactive Clients tab, and enable Tenant Provisioning by moving the associated slide to the right.
7. Create the new client grant.

### Creating the New Client Grant

1. Navigate to the [Management API Explorer](/api/management/v2#!/Client_Grants/post_client_grants) to generate the required `POST` call.
2. Click the bubble that says **'create:client_grants'** to select that Scope.
3. Paste the following payload into the provided `body` box after you have supplied the client ID and the root tenant authority:
    ```text    
    {
     'client_id': '{CLIENT_ID}',
     'audience': 'https://{RTA}/api/v2/',
     'scope': ['create:tenants']
    }
    ```    
4. Click 'Try' to test the provided information. If you receive a `201` response, you may proceed to click on the 'get curl command' link to generate the required `POST` call. It will contain the following information:

    ```har
    {
        "method": "POST",
        "url": "https://{RTA_DOMAIN}/api/v2/client-grants",
        "httpVersion": "HTTP/1.1",
        "cookies": [],
        "headers": [],
        "queryString" : [],
        "postData" : {
            "client_id": "{CLIENT_ID}",
            "audience": "https://{RTA}/api/v2/",
            "scope": ["create:tenants"]
        },
        "headersSize" : -1,
        "bodySize" : -1,
        "comment" : ""
    }
    ```

## Using the New Client grant

Once you have created your New Client Grant, you may use it to complete the following tasks.

### Getting an Access Token

```har
{
    "method": "POST",
    "url": "https://{RTA_DOMAIN}/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "cache-control": "no-cache",
        "content-type": "application/json"
    }],
    "queryString" : [],
    "postData" : {
        "audience": "https://{RTA_DOMAIN}/api/v2/",
        "grant_type": "client_credentials",
        "client_id": "{CLIENT_ID}",
        "client_secret": "{CLIENT_SECRET}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

In return, you will receive the Access token:

```text
{
   'access_token': 'eyJ0eXAiO...'
}
```

### Creating a Tenant

You may use the following call create a tenant. Once the tenant is created, the API responds with a Client ID and Secret that grants access to the Management API for the newly-created tenant (which you can then use to get additional access tokens--see the following section for the sample call).

```har
{
    "method": "POST",
    "url": "https://{RTA_DOMAIN}/api/v2/tenants",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "cache-control": "no-cache",
        "content-type": "application/json",
        "authorization": "Bearer {ACCESS_TOKEN}"
    }],
    "queryString" : [],
    "postData" : {
        "name": "customer-1",
        "owners": ["me@email.com"]
     },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```

#### Getting an Access Token for the Newly-Created Tenant

This snippet shows how you can get an access token for the newly-created tenant, which you can then use to call the Management API.

```har
{
    "method": "POST",
    "url": "https://{NEW_TENANT_DOMAIN}/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "cache-control": "no-cache",
        "content-type": "application/json"
    }],
    "queryString" : [],
    "postData" : {
        "audience": "https://{NEW_TENANT_DOMAIN}/api/v2/",
        "grant_type": "client_credentials",
        "client_id": "{MANAGEMENT_CLIENT_ID}",
        "client_secret": "{MANAGEMENT_CLIENT_SECRET}"
    },
    "headersSize" : -1,
    "bodySize" : -1,
    "comment" : ""
}
```
