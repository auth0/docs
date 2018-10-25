---
description: Overview of how Auth0 Management APIv2 Access Tokens work and how to use them.
section: apis
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - concept
useCase: invoke-api
---

# Access Tokens for the Management API

To call the [Auth0 Management API v2](/api/management/v2) endpoints, you need to authenticate with a token called the __Auth0 Management API Token__. This token is a [JSON Web Token](/jwt) and it contains specific granted permissions (known as __scopes__).

To call an endpoint for test purposes, you can get a token manually using the Dashboard. For production however, the recommended best practice is to get short-lived tokens programmatically. 

To call endpoints, you will need to do the following:

* [Create and Authorize a Machine-to-Machine Application](/docs/api/management/v2/create-m2m-app). 
* [Get Access Tokens for Testing](/docs/api/management/v2/get-access-tokens-for-test)
* [Get Access Tokens for Production](/docs/api/management/v2/get-access-tokens-for-production)

::: note
For single page applications (SPAs), you will need to [get an Access Token from the frontend](/docs/api/management/v2/get-access-tokens-for-spas).
:::

## Keep reading

* [Access Tokens](/docs/tokens/overview-access-tokens)
* [Management API Access Token FAQs](/docs/api/management/v2/faq-management-api-access-tokens)
* [Changes in Auth0 Management API Tokens](/docs/api/management/v2/tokens-flows)
* [Calling APIs from a Service](/docs/api-auth/grant/client-credentials)
* [Ask for Access Tokens for a Client Credentials Grant](/docs/api-auth/config/asking-for-access-tokens)
* [Information on the query string syntax](/docs/users/search/v3/query-syntax)
* [Search for Users](/docs/users/search/v3)

