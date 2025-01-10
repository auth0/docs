---
description: How to get an Access Token manually for testing purposes.
section: apis
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - How-to
useCase: invoke-api
---

# Get Access Tokens for Testing

::: warning
This method for obtaining <dfn data-key="access-token">Access Tokens</dfn> is **only for test purposes**. Do not get manually long-lived tokens and use them in your applications, because that nullifies the security advantages that tokens offer. 
:::

## Prerequisite

* [Create and Authorize a Machine-to-Machine Application](/api/management/v2/create-m2m-app). 

## Get Access Tokens Manually

1. Go to [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer). 
A token is automatically generated and displayed there. 

2. Click __Copy Token__. 
You can now make authorized calls to the [Management API](/api/management/v2) using this token.

![Test Application](/media/articles/api/tokens/copy-token.png)

3. Set expiration time.
This token has, by default, an expiration time of __24 hours__ (86400 seconds). After that period, the token expires and you will need to get a new one. To change the expiration time, update the __Token Expiration (Seconds)__ field and click __Update & Regenerate Token__.

:::warning
These tokens **cannot be revoked** so long expiration times are not recommended. Instead we recommend that you use short expiration times and issue a new one every time you need it.
:::

## Use Access Tokens for Testing

To use the Access Token you just created for testing purposes, use the [Management API v2 explorer page](/api/management/v2) to manually call an endpoint with the token.

1. Go to the [Management API v2 explorer page](/api/management/v2#!).
1. Click the __Set API Token__ button at the top left.
1. Set the __API Token__ field, and click __Set Token__.
1. Under the __Set API Token__ button at the top left, some new information is now displayed: the domain and token set, and the <dfn data-key="scope">scopes</dfn> that have been granted to this application.
1. Go to the endpoint you want to call, fill any parameters that might be required and click __Try__.

![Set the Token](/media/articles/api/tokens/set-token.png)

## Keep reading

* [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production)
- [Applications](/applications)
* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)
