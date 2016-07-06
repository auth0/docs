---
description: How to call an Identity Provider API.
---

# Call an Identity Provider API

Upon successful authentication of a user with an external Identity Provider (Facebook, Github, etc.), the IdP often provides an access token with the appropriate scope in the user profile that can be used to call their API. 

To avoid leaking in the browser, this access token has been removed from the user profile. If you need to get the user's IDP access token, you will need to call the [Get Users by ID](/api/management/v2#!/Users/get_users_by_id) endpoint with `read:user_idp_tokens` scope.

This document details the recommended method for calling a third-party IdP without exposing the access token. 

The basic flow is the following:

* Create a client that will be used to get an access token with the `read:user_idp_tokens` scope valid to obtain authorized access to the Auth0 Management API. 
* Create a service to handle your request to the external IdP API which will: 
    1. Execute the client credentials exchange to obtain a valid Auth0 access token.
    2. Use the Auth0 access token to execute the request to the `/api/v2/users/{user_id}` endpoint.
    3. Use the IdP access token extracted from the user profile to make calls to the IdP API.

## Create the client

To create a client to interact with the Auth0 Management API, see: [API Authorization: Using the Management API](/api-auth/config/using-the-auth0-dashboard).

**NOTE:** Make sure that you create the client under the Auth0 Management API and that this new client can be granted the `read:user_idp_tokens` scope.

## Create a service

Create a service to execute the following three steps:

### 1. Obtain an Auth0 access token

Execute a client credentials exchange to obtain an access token to get authorized access to the Auth0 Management API. 

```har
{
  "method": "POST",
  "url": "https://${account.namespace}.auth0.com/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData":{
    "mimeType": "application/json",
    "text": "{ \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\", \"audience\": \"https://${account.namespace}.auth0.com/api/v2/\", \"grant_type\": \"client_credentials\" }"
  }
}
```

The body of the request must include the following:

- `audience`: APIv2 base url - `https://${account.namespace}.auth0.com/api/v2/` 
- `client_id`: The client id of the new client you just created.
- `client_secret`:  The client secret of the new client you just created.
- `grant_type`: Grant type should be `client_credentials`.

### 2. Get the user profile

With the Auth0 access token, call the `/api/v2/users/{user-id}` endpoint to get the user profile containing the IdP access token:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}.auth0.com/api/v2/users/{user-id}",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ]
}
```

The request must include an `Authorization` header with `Bearer bearer-token`, where `bearer-token` is the Auth0 token you obtained in the previous step. 

The body of the request must include the following:

- `user-id`: The value of the `user_id` property of the user profile.

### 3. Extract the IdP access token

Use the IdP access token extracted from `user.identities[0].access_token` to make calls to the IdP API.

**NOTE:** In most cases, there will be only one identity in the identities array, but if you've used the [account linking feature](/link-accounts), there may be several.

The IdP `access_token` obtained here will have access to call the APIs you specified in the Auth0 dashboard when creating the connection.

## Call your service

Now, in your application, you can call your service to execute requests to the IdP API.

**NOTE:** To prevent leaking the token, make sure not to expose the IdP access token to your client-side application.