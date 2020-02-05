---
title: Get Management API Tokens for Single-Page Applications
description: Learn how to get a specialized Access Token that will allow you to call Auth0's Management API endpoints. For use with Single-Page Applications (SPAs).
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

# Get Management API Tokens for Single-Page Applications

In certain cases, you may want to use Auth0's [Management API](/api/management/v2#!) to manage your applications and APIs rather than the Auth0 Management Dashboard. 

To call any Management API endpoints, you must authenticate using a specialized <dfn data-key="access-token">[Access Token](/tokens/overview-access-tokens)</dfn> called the Management API Token. Management API Tokens are <dfn data-key="json-web-token">[JSON Web Tokens (JWTs)](/tokens/concepts/jwts)</dfn> that contain specific granted permissions (also known as <dfn data-key="scope">scopes</dfn>) for the Management API endpoints you want to call. 

## Limitations

Since single-page applications (SPAs) are public clients and cannot securely store sensitive information (such as a **Client Secret**), they must retrieve Management API Tokens from the frontend, unlike other [application types](/applications).

This means that Management API Tokens for SPAs have certain limitations. Specifically, they are issued in the context of the user who is currently signed in to Auth0 which limits updates to only the logged-in user's data. Although this restricts use of the Management API, it can still be used to perform actions related to updating the logged-in user's user profile.

## Available scopes and endpoints

With a Management API Token issued for a SPA, you can access the following scopes (and hence endpoints). Please note that password changes through the [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) endpoint are not possible with a Management API Token issued for a SPA.

| **Scope for current user** | **Endpoint** |
| -------------------------- | ------------ |
| `read:current_user` | [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) <br /> [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) |
| `update:current_user_identities` | [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) <br /> [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_user_identity_by_user_id) |
| `update:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `create:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `delete:current_user_metadata` | [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) |
| `create:current_user_device_credentials` | [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) |
| `delete:current_user_device_credentials` | [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) |

::: note
The above scopes (and endpoints) are [rate limited](/policies/rate-limits#access-tokens-for-spas).
:::

## Using a Management API Token to call the Management API from a SPA

In this example, we will retrieve a Management API Token from a SPA and use this token to call the Auth0 Management API to retrieve the full user profile of the currently logged-in user.

### 1. Retrieve a Management API Token 

Authenticate the user (using the [Implicit grant](/api/authentication?http#implicit-grant)) by redirecting them to the [Authorization endpoint](/api/authentication#authorize-application), which is where users are directed upon login or sign-up:

```text
https://${account.namespace}/authorize?
  audience=https://${account.namespace}/api/v2/
  &response_type=token%20id_token
  &scope=read:current_user
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &nonce=NONCE
  &state=OPAQUE_VALUE
```

::: note
If you are not familiar with authentication for SPAs, see [Implicit Flow](/flows/concepts/implicit).
:::

Notice:

- The <dfn data-key="audience">`audience`</dfn> is set to `https://${account.namespace}/api/v2/.` By default, an API representing the Auth0 Management API is registered for you when you create your tenant in the Auth0 Dashboard. The `audience` value represents the registered Management API's URI for your tenant.
- The `response_type` is `id_token token` (indicating that we want to receive both an ID Token as well as an Access Token, which represents the Management API Token).
- The requested `scope` is `read:current_user`. This scope will allow us to call either of the two endpoints listed in the [table above](#available-scopes-and-endpoints) for this scope.

#### Response

When we receive our Management API Token, it will be in [JSON Web Token format](/tokens/references/jwt-structure). Decoding it and reviewing its contents will reveal the following:

```text
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|5a620d29a840170a9ef43672",
  "aud": "https://${account.namespace}/api/v2/",
  "iat": 1521031317,
  "exp": 1521038517,
  "azp": "${account.clientId}",
  "scope": "read:current_user"
}
```

Notice:

- The `aud` is set to the `audience` you provided when authenticating (your tenant's Management API URI).
- The granted `scope` is what you requested when you authenticated: `read:current_user`.
- The `sub` is the user ID of the currently logged-in user.

### 2. Call the Auth0 Management API

Call the Auth0 Management API to retrieve the logged-in user's user profile from the [Get User by ID endpoint](/api/management/v2#!/Users/get_users_by_id). We can call this endpoint because we requested and were granted the proper `scope` (`read:current_user`) during authentication. 

To call the endpoint, include the encoded Management API Token you retrieved in the `Authorization` header of the request. Be sure to replace the `USER_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with the logged-in user's user ID (`sub` value from the decoded Management API Token) and the Management API Access Token, respectively.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users/USER_ID",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer MGMT_API_ACCESS_TOKEN"
  }]
}
```

| Value | Description |
| - | - |
| `USER_ID` | ID of the user for which you want to retrieve the user profile. Because of the limitations placed on Management API Tokens for SPAs, this should be the user ID for the logged-in user, which can be found in the `sub` claim of the decoded Management API Token. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:current_user`. |


## Keep reading

* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)
