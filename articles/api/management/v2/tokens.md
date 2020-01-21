---
description: Overview of how Auth0 Management APIv2 Access Tokens work and how to use them.
section: apis
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - concept
useCase: invoke-api
---

# Access Tokens for the Management API

To call the [Auth0 Management API v2](/api/management/v2) endpoints, you need to authenticate with a token called the __Auth0 Management API Token__. This token is a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> and it contains specific granted permissions (known as <dfn data-key="scope">__scopes__</dfn>).

To call an endpoint for test purposes, you can get a token manually using the Dashboard. For production however, the recommended best practice is to get short-lived tokens programmatically. 

To call endpoints, you will need to do the following:

* [Create and Authorize a Machine-to-Machine Application](/api/management/v2/create-m2m-app)
* [Get Access Tokens for Testing](/api/management/v2/get-access-tokens-for-test)
* [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production)

::: note
For single-page applications (SPAs), you will need to [get an Access Token from the frontend](/api/management/v2/get-access-tokens-for-spas).
:::

## Keep reading

* [Access Tokens](/tokens/concepts/access-tokens)
* [Management API Access Token FAQs](/api/management/v2/faq-management-api-access-tokens)
* [Changes in Auth0 Management API Tokens](/api/management/v2/tokens-flows)
* [Client Credentials Flow](/flows/concepts/client-credentials)
* [Ask for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
* [User Search](/users/search)
* [User Search Query Syntax](/users/search/v3/query-syntax)

