---
description: Get Access Tokens for single page applications.
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

# Get Access Tokens for Single Page Applications

You cannot get Access Tokens using the other methods for single page applications (SPAs) because we use the **Client Secret** which is sensitive information (same as a password) and cannot be exposed to the browser.

You can still get tokens for the Management API from the frontend, but with some limitations. You can access only certain scopes and update only the logged-in user's data. You can access the following scopes, and hence endpoints:

| **Endpoint** | **Scope for current user** |
| ------ | ----------- |
| [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) | `read:current_user` |
| [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) | `read:current_user` |
| [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) | `update:current_user_identities` |
| [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) | `update:current_user_identities` |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | `update:current_user_metadata` |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | `create:current_user_metadata` |
| [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) | `delete:current_user_metadata` |
| [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) | `create:current_user_device_credentials` | 
| [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) | `delete:current_user_device_credentials` |

If you get an Access Token that contains the scope `read:current_user`, you can retrieve the information of the **currently logged-in user** (the one that the token was issued for).

## Example 

You can get a token, for example to retrieve the information of the currently logged-in user, using the [Authorization endpoint](/api/authentication#authorize-application). This is where you redirect your users to login or sign up.

In the example below, we want to use the [GET User by ID endpoint](/api/management/v2#!/Users/get_users_by_id) to retrieve the full profile information of the logged-in user. To do so, first we will authenticate our user (using the [Implicit grant](/api/authentication?http#implicit-grant)) and retrieve the token(s).

```text
https://${account.namespace}/authorize?
  audience=https://${account.namespace}/api/v2/
  &scope=read:current_user
  &response_type=token%20id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &nonce=CRYPTOGRAPHIC_NONCE
  &state=OPAQUE_VALUE
```

::: note
If you are not familiar with authentication for single-page applications, see [Single-Page Login Flow](/flows/concepts/single-page-login-flow).
:::

Notice the following:
- We set the `audience` to `https://${account.namespace}/api/v2/`
- We asked for the scope `read:current_user`
- We set the `response_type` to `id_token token` so Auth0 will sent us both an ID Token and an Access Token

If we decode the Access Token and review its contents, we can see the following:

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

Notice that the `aud` is set to your tenant's API URI, the `scope` to `read:current_user`, and the `sub` to the user ID of the logged in user.

Once you have the Access Token, you can use it to call the endpoint. Use the Access Token in the `Authorization` header of the request.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users/USER_ID",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  }]
}
```

## Keep reading

* [Management API Explorer](/api/management/v2#!)
* [Management API Access Tokens FAQs](/api/management/v2/faq-management-api-access-tokens)
