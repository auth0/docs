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
Each machine-to-machine application that accesses an API must be granted a set of <dfn data-key="scope">scopes</dfn>. Scopes are permissions that should be granted by the owner. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. To see the required scopes/permissions for each endpoint, go to the [Management API Explorer](/api/management/v2#!) and find the endpoint you want to call. Each endpoint has a section called **Scopes** listing all the scopes that the endpoint accepts.
:::

## Example: Get All Connections Endpoint

The [Get all connections](/api/management/v2#!/Connections/get_connections) endpoint accepts the `read:connections` scope, whilst the [Create a connection](/api/management/v2#!/Connections/post_connections) endpoint accepts the `write:connections` scope. Using that we now know that our machine-to-machine token should only need the `read:connections` scope in order to get that data.

If you have multiple applications that should access the Management API then you should create separate machine-to-machine applications for each application in Auth0, instead of just a single machine-to-machine application.
## Keep reading

* [Get Access Tokens for Testing](/api/management/v2/get-access-tokens-for-test)
* [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production)
* [Get Management API Tokens for Single-page Applications](/api/management/v2/get-access-tokens-for-spas)
* [Applications](/applications)
* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)
