---
description: How to call an Identity Provider API.
---

# Call an Identity Provider API

Upon successfully authenticating a user with an external Identity Provider such as Facebook or GitHub, the IdP often includes an access token in the user's profile. This token can be used to call the IdP's API.

If you need access to the user's IdP access token, you'll need to call the [Get Users by ID](/api/management/v2#!/Users/get_users_by_id) endpoint of the [Auth0 Management API](/api/management/v2) with the `read:user_idp_tokens` scope. This document details the recommended two-step method for doing so.

## Step 1: Create a Client

You will need to create an Auth0 client that calls the Auth0 Management API on behalf of your app to obtain an access token.

1. Go to the [Clients page of the Auth0 Management Dashboard](${manage_url}/#/clients) and click **Create Client**.

  ![Management Dashboard Clients Page](/media/articles/tutorials/calling-an-external-idp-api/create-client.png)

2. Select **Non Interactive Clients** and click **Create**.

  ![Management Dashboard Clients Type Selection](/media/articles/tutorials/calling-an-external-idp-api/select-ni-client.png)

3. Once you have created the Client, copy the `Client ID` and `Client Secret` from the **Settings** page.

  ![Management Dashboard Client Setting Page](/media/articles/tutorials/calling-an-external-idp-api/client-id-secret.png)

4. Next, go to the [APIs](${manage_url}/#/apis) section of the Auth0 dashboard and select the **Auth0 Management API**.

  **NOTE:** If you do not see the **APIs** option in the left menu, you must enable it. Go to [Account Settings > Advanced](${manage_url}/#/account/advanced) and select **Enable APIs Section**.
  
  ![Management Dashboard API Page](/media/articles/tutorials/calling-an-external-idp-api/api.png)


5. Select the **Non Interactive Clients** tab and authorize the app you just created. You will then be able to choose the required `read:user_idp_tokens` scope. Click **Update**.

![Management Dashboard API Authorization](/media/articles/tutorials/calling-an-external-idp-api/authorize-client.png)

For more information on creating a Client to access the Auth0 API, see [Set up a Client Credentials Grant using the Dashboard](/api-auth/config/using-the-auth0-dashboard).

## Step 2: Configure the Backend Service

You will need to create a service to execute the following three steps:

1. [Obtain an Auth0 access token](#obtain-an-auth0-access-token)
2. [Obtain the User Profile](#obtain-the-user-profile)
3. [Extract the IdP Token](#extract-the-idp-access-token)

### 1. Obtain an Auth0 Access Token

The following code executes a client credentials exchange so that you receive an access token allowing access to the [Auth0 Management API](/api/management/v2#!).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData":{
    "mimeType": "application/json",
    "text": "{ \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\", \"audience\": \"https://${account.namespace}/api/v2/\", \"grant_type\": \"client_credentials\" }"
  }
}
```

### 2. Obtain the User Profile

Using the Auth0 access token, call the [Get a User](/api/management/v2#!/Users/get_users_by_id) endpoint to get the user profile:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users/:user_id",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ]
}
```

**Notes**:

* For Native and Single-Page Applications, you'll need to send the `id_token` to your backend and verify it using the Client Secret. For Web Applications, you can use the `user_id` field from the user profile's `user` property.
* The request must include an `Authorization` header with `Bearer` token, which is the Auth0 access token you obtained in the previous step.

### 3. Extract the IdP Access Token

Within the user's `identities` array, there will be an `access_token` that you can extract and use to make calls to the IdP's API:

  `user.identities[0].access_token`

In most cases, the user will only have one identity, but if you have used the [account linking feature](/link-accounts), there may be more.

:::panel-warning Exposing Your Token
For security reasons, be sure that you don't expose the IdP access token to your client-side application.
:::
