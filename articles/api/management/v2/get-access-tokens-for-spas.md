---
description: Describes available scopes and endpoints for Management API tokens for Single-page Applications (SPAs).
section: apis
topics:
  - apis
  - management-api
  - tokens
contentType: 
    - how-to
useCase: invoke-api
---

# Get Management API Tokens for Single-page Applications

In certain cases, you may want to use Auth0's [Management API](/api/management/v2#!) to manage your applications and APIs rather than the Auth0 Management Dashboard. 

To call any Management API endpoints, you must authenticate using a specialized <dfn data-key="access-token">[Access Token](/tokens/overview-access-tokens)</dfn> called the Management API Token. Management API Tokens are <dfn data-key="json-web-token">[JSON Web Tokens (JWTs)](/tokens/concepts/jwts)</dfn> that contain specific granted permissions (also known as <dfn data-key="scope">scopes</dfn>) for the Management API endpoints you want to call. 

## Limitations

Since single-page applications (SPAs) are public clients and cannot securely store sensitive information (such as a **Client Secret**), they must retrieve Management API Tokens from the frontend, unlike other [application types](/applications). This means that Management API Tokens for SPAs have certain limitations. Specifically, they are issued in the context of the user who is currently signed in to Auth0 which limits updates to only the logged-in user's data. Although this restricts use of the Management API, it can still be used to perform actions related to updating the logged-in user's user profile.

::: warning
Auth0 does not recommend putting Management API Tokens on the frontend that allow users to change user metadata. This can allow users to manipulate their own metadata in a way that could be detrimental to the functioning of the applications. It also allows a customer to do a DoS attack against someone's management API by just spamming it and hitting rate limits.
:::

## Available scopes and endpoints

With a Management API Token issued for a SPA, you can access the following scopes (and hence endpoints). 

::: note
Password changes through the [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) endpoint are **not possible** with a Management API Token issued for a SPA.
:::

| **Scope for Current User** | **Endpoint** |
| -------------------------- | ------------ |
| `read:current_user` | [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) <br /> [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) |
| `update:current_user_identities` | [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) <br /> [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_user_identity_by_user_id) |
| `update:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `create:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `delete:current_user_metadata` | [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) |
| `create:current_user_device_credentials` | [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) |
| `delete:current_user_device_credentials` | [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) |

::: note
The above scopes and endpoints are subject to [rate limits](/policies/rate-limits#access-tokens-for-spas).
:::

## Use Management API Token to call Management API from a SPA

You can retrieve a Management API Token from a SPA and use the token to call the Management API to retrieve the full user profile of the currently logged-in user.

1. Retrieve a Management API token. Authenticate the user by redirecting them to the Authorization endpoint, which is where users are directed upon login or sign-up. When you receive the Management API Token, it will be in [JSON Web Token format](/tokens/references/jwt-structure). Decode it and review its contents.

2. Call the Management API to retrieve the logged-in user's user profile from the [Get User by ID](/api/management/v2#!/Users/get_users_by_id) endpoint. To call the endpoint, include the encoded Management API Token you retrieved in the `Authorization` header of the request. Be sure to replace the `USER_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with the logged-in user's user ID (`sub` value from the decoded Management API Token) and the Management API Access Token, respectively.

## Keep reading

* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)
