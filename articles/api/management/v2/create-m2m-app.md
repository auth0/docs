---
description: How to create and authorize a machine-to-machine application for calling Management API endpoints using Access Tokens.
section: apis
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - how-to
useCase: invoke-api
---

# Create and Authorize a Machine-to-Machine Application

The first time you get a token for the Management API is when you complete the configuration in the Auth0 [Dashboard](${manage_url}). You won't have to do this again unless you create a new tenant. We recommend that you create a token exclusively for authorizing access to the Management API instead of reusing another one you might have.

To create and authorize a Machine-to-Machine Application for the Management API:

1. Go to [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer)
2. Click the button __Create & Authorize a Test Application__. A new application has been created and it's authorized to access the Management API.

![Create and Authorize Application](/media/articles/api/tokens/create-authorize-client.png)

The application created in the steps above has been granted __all__ the Management API <dfn data-key="scope">scopes</dfn>. This means that it can access all endpoints.

::: panel How can I find out which scopes/permissions are required?
Each machine-to-machine application that accesses an API must be granted a set of <dfn data-key="scope">scopes</dfn>. Scopes are permissions that should be granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. To see the required scopes/permissions for each endpoint, go to the [Management API Explorer](/api/management/v2#!) and find the endpoint you want to call. Each endpoint has a section called **Scopes** listing all the scopes that the endpoint requires. For example, the [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`.
:::

## Example: Get All Clients Endpoint

The [Get all clients](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create an application](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. From that we can deduce that if we need to read _and_ create applications, then our token should include three scopes: `read:clients`, `read:client_keys` and `create:clients`.

If you have multiple applications that should access the Management API, and you need different sets of scopes per app, we recommend creating a new machine-to-machine application for each one. For example, if one application is to read and create users (`create:users`, `read:users`) and another to read and create applications (`create:clients`, `read:clients`) create two applications (one for user scopes, one for applications) instead of one.

## Keep reading

* [Get Access Tokens for Testing](/api/management/v2/get-access-tokens-for-test)
* [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production)
* [Get Access Tokens for SPAs](/api/management/v2/get-access-tokens-for-spas)
* [Applications](/applications)
* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)
