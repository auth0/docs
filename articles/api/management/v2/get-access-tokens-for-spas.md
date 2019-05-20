---
description: Get Access Tokens for single-page applications.
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

To call Auth0's [Management API](/api/management/v2#!) endpoints, you need to authenticate with a specialized Access Token called the Auth0 Management API Token. This token is a [JSON Web Token (JWT)](/jwt) and contains specific granted permissions (also known as [scopes](/scopes)). Because single-page applications (SPAs) are public clients, they cannot securely store sensitive information, such as the **Client Secret**, so they cannot retrieve this token in the same way as other application types.

SPAs can still retrieve tokens for the Management API, but they must do so from the frontend, and the Access Token will be issued in the context of the user who is currently signed in to Auth0. Although this restricts the token to certain scopes and limits updates to only the logged-in user's data, it can be useful for actions such as updating the user profile. 

With a Management API Token issued for a SPA, you can access the following scopes, and hence endpoints:

| **Scope for current user** | **Endpoint** |
| -------------------------- | ------------ |
| `read:current_user` | [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id)<br>
[GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) |
| `update:current_user_identities` | [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) <br> [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) |
| `update:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `create:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `delete:current_user_metadata` | [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) |
| `create:current_user_device_credentials` | [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) |
| `delete:current_user_device_credentials` | [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) |

## Example: Get Management API Token to retrieve user profile

In this example, we retrieve a Management API Token and use it to retrieve the full user profile of the currently logged-in user.

1. Authenticate the user (using the [Implicit grant](/api/authentication?http#implicit-grant)) by redirecting them to the [Authorization endpoint](/api/authentication#authorize-application), which is where users are directed upon login or sign-up:

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

Notice the following:

- The `audience` is set to `https://${account.namespace}/api/v2/` (representing your tenant's Management API URI)
- The `response_type` is `id_token token` (indicating that we want to receive both an ID Token and an Access Token)
- The requested `scope` is `read:current_user`

If all goes well, we will receive a Management API Token. Decoding the token and reviewing its contents reveals the following:

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

Notice the following:

- The `aud` is set to the `audience` you provided when authenticating (your tenant's API URI)
- The granted `scope` is `read:current_user`
- The `sub` is the user ID of the currently logged-in user

2. Retrieve the user profile from the [Get User by ID endpoint](/api/management/v2#!/Users/get_users_by_id). Include the Management API Token in the `Authorization` header of the request:

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
