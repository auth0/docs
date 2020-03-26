---
title: "Migration Guide: Management API and ID Tokens"
description: Auth0 is deprecating the usage of ID Tokens as credentials for the Management API. This article will help you migrate your solution from the old implementation to the new one.
toc: true
topics:
  - migrations
  - management-api
  - id-tokens
  - tokens
contentType:
  - concept
  - how-to
  - reference
useCase:
  - manage-accounts
---

# Migration Guide: Management API and ID Tokens

For some use cases you could use [ID Tokens](/tokens/concepts/id-tokens) in order to call some of the [Users](/api/management/v2#!/Users/get_users_by_id) and [Device Credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoints of the Management API. 

This functionality is being deprecated. You will have to use proper <dfn data-key="access-token">[Access Tokens](/tokens/access-token)</dfn> in order to access any of the endpoints of the [Management API](/api/management/v2). Make sure the `Allow ID Tokens for Management API v2 Authentication` toggle is turned off after completing the migration to Access Tokens.

The grace period for this migration started on **March 31, 2018** and at the moment is open-ended. This means that you will still be able to use ID Tokens to access these endpoints. When a mandatory opt-in date is set for this migration customers will be notified beforehand.

Customers are encouraged to migrate to Access Tokens. This guide will help you with that. 

First, we will see which use cases are affected. We will continue with reviewing how you can use <dfn data-key="scope">[scopes](/scopes)</dfn> to get tokens with different access rights, and then see all the ways you can use to get an Access Token. Finally, we will review the changes introduced in the [User Account Linking](/users/concepts/overview-user-account-linking) process.

## Does this affect me?

If you use ID Tokens to call any of the following endpoints, then you are affected by this migration:

| **Endpoint** | **Use Case** |
|-|-|
| [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) | Retrieve a user's information |
| [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) | Retrieve all [Guardian](/multifactor-authentication/factors/push) MFA enrollments for a user |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | Update a user's information |
| [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) | Delete the [multi-factor](/multifactor-authentication) provider settings for a user |
| [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) | Create a public key for a device |
| [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) | Delete a device credential |
| [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) | [Link user accounts](/users/guides/link-user-accounts) from various identity providers |
| [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_user_identity_by_user_id) | [Unlink user accounts](/users/guides/unlink-user-accounts) |

These endpoints can now accept regular [Access Tokens](/tokens/concepts/access-tokens).

Note that the last two endpoints are used for Account Linking. To review these changes, see [Changes in Account Linking](#changes-in-account-linking).

**Nothing else changes in how the endpoints work**. You should expect the same request and response schemas and only need update the token that you use for authorization.

## Changes in scopes

The actions you can perform with the Management API depend on the [scopes](/scopes/current/api-scopes) that your Access Token contains. With this migration you can either get a "limited" Access Token that can update only the logged-in user's data, or an Access Token that can update the data of any user. In the following matrix you can see the scopes that your token needs to have per case and per endpoint.

| **Endpoint** | **Scope for current user** | **Scope for any user** |
|-|-|-|
| [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) | `read:current_user` | `read:users` |
| [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) | `read:current_user` | `read:users` |
| [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) | `update:current_user_identities` | `update:users` |
| [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_user_identity_by_user_id) | `update:current_user_identities` | `update:users` |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | `update:current_user_metadata` | `update:users` |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | `create:current_user_metadata` | `update:users` |
| [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) | `delete:current_user_metadata` | `update:users` |
| [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) | `create:current_user_device_credentials` | `create:device_credentials` |
| [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) | `delete:current_user_device_credentials` | `delete:device_credentials` |

For example, if I get an Access Token that contains the scope `read:users` I can retrieve the data of **any user** using the [GET /api/v2/users/{id} endpoint](/api/management/v2#!/Users/get_users_by_id). But if my token contains the scope `read:current_user` I can only retrieve the information of the **currently logged-in user** (the one that the token was issued for).

## Restrictions

The Access Tokens used to access the Management API **must hold only one value at the `aud` claim**. If your token contains more than one value, then your request to the Management API will error out.

## How to get an Access Token

In this section we will see the changes that are introduced in how you get a token for the aforementioned endpoints. We will see sample scripts side-by-side so you can identify the changes.

There are several variations on how you authenticate a user and get tokens, depending on the technology and the [OAuth 2.0 flow you use to authenticate](/api-auth/which-oauth-flow-to-use):
- Using the [Authorization endpoint](/api/authentication#authorize-application). This is where you redirect your users to login or sign up. You get your tokens from this endpoint if you authenticate users from a [single-page app](/api/authentication#implicit-grant) (running on the browser).
- Using the [Token endpoint](/api/authentication#get-token). You get your tokens from this endpoint if you authenticate users from a [web app](/api/authentication#authorization-code) (running on a server), a [mobile app](/api/authentication#authorization-code-pkce-), a [server process](/api/authentication#client-credentials), or a [highly trusted app](/api/authentication#resource-owner-password).
- Using [Lock](/libraries/lock/v11#cross-origin-authentication) or [auth0.js](/libraries/auth0js/v9#configure-your-auth0-application-for-embedded-login) embedded in your application. In this case you are using [cross-origin authentication](/cross-origin-authentication) (used to authenticate users when the requests come from different domains). 

### The Authorization endpoint

In this section we will use an example to showcase the differences in how you get a token with the [Authorization endpoint](/api/authentication#authorize-application). Keep in mind though that no matter which endpoint you want to migrate, the changes are the same, the only thing that differs is the [scopes](#changes-in-scopes) you will specify in the request.

In the example below, we want to use the [GET User by ID endpoint](/api/management/v2#!/Users/get_users_by_id) to retrieve the full profile information of the logged-in user. To do so, first we will authenticate our user (using the [Implicit grant](/api/authentication?http#implicit-grant)) and retrieve the token(s).

On the `Legacy (ID Token)` panel you can see an implementation of the old approach that gets an ID Token (and then uses it to call the endpoint). On the `Current (Access Token)` panel you can see the new approach that gets an Access Token as well.

<%= include('./_get-token-authorize.md', { scope: 'read:current_user', idPrevious: 'authZ-id-token', idCurrent: 'authZ-access-token' }) %>

Once you have the Access Token you can use it to call the endpoint. This part remains the same, nothing else changes in the request except for the value you use as `Bearer` token. The response remains also the same.

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

### The Token endpoint

In this section we will use an example to showcase the differences in how you get a token with the [Token endpoint](/api/authentication#get-token). Keep in mind though that no matter which endpoint you want to migrate, the changes are the same, the only thing that differs is the [scopes](#changes-in-scopes) you will specify in the request.

In the example below, we want to use the [GET User by ID endpoint](/api/management/v2#!/Users/get_users_by_id) to retrieve the full profile information of the logged-in user. To do so, first we will authenticate our user (using the [Password Exchange grant](/api/authentication?http#resource-owner-password)) and retrieve the token(s).

On the `Legacy (ID Token)` script you can see an implementation of the old approach that gets an ID Token (and then uses it to call the endpoint). On the `Current (Access Token)` script you can see the new approach that gets an Access Token as well.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#token-id-token" data-toggle="tab">Legacy (ID Token)</a></li>
      <li><a href="#token-access-token" data-toggle="tab">Current (Access Token)</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="token-id-token" class="tab-pane active">
      <pre class="text hljs">
        <code>
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded
{
  "grant_type": "password",
  "username": "USERNAME",
  "password": "PASSWORD",
  "scope": "openid",
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
}
        </code>
      </pre>
    </div>
    <div id="token-access-token" class="tab-pane">
      <pre class="text hljs">
        <code>
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded
{
  "grant_type": "password",
  "username": "USERNAME",
  "password": "PASSWORD",
  "audience": "https://${account.namespace}/api/v2/",
  "scope": "read:current_user",
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
}
        </code>
      </pre>
    </div>
  </div>
</div>

In order to get an Access Token that can access the Management API:
- We set the `audience` to `https://${account.namespace}/api/v2/`
- We asked for the scope `read:current_user`

Once you have the Access Token you can use it to call the endpoint. This part remains the same, nothing else changes in the request except for the value you use as `Bearer` token. The response remains also the same.

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

### Lock or auth0.js (embedded)

If you embed either [Lock v11](/libraries/lock/v11) or [auth0.js v9](/libraries/auth0js/v9) in your application, then you are using [cross-origin authentication](/cross-origin-authentication). This is used to authenticate users when the requests come from different domains.

If you use auth0.js to access the Management API and manage your users, then your script will have to be updated.

<%= include('./_get-token-auth0js.md', { scope: 'read:current_user' }) %>

## Changes in Account Linking

The changes in this functionality are the following:

- You can no longer use an ID Token at the `Authorization` header
- If you use an Access Token at the `Authorization` header, with `update:users` as the granted permission, then you can send at the request's body either the `user_id` or the ID Token of the secondary account
- If you use an Access Token at the `Authorization` header, with `update:current_user_metadata` as the granted permission, then you can only send the ID Token of the secondary account in the request's body. The following must apply:
  - The ID Token must be signed using `RS256` (you can set this value at *Dashboard > Applications > Application Settings > Advanced Settings > OAuth*)
  - The claim `aud` of the ID Token, must identify the application, and be the same value with the `azp` claim of the Access Token

For a detailed overview of these changes and migration steps per use case, see [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking).

## Keep reading

- [Get Access Tokens](/tokens/guides/get-access-tokens)
- [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking)
