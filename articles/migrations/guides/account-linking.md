---
title: Migration Guide: Account Linking and ID Tokens
description: Auth0 is deprecating the usage of ID Tokens in the Account Linking process. This article will help you migrate your solution from the old implementation to the new one.
toc: true
topics:
  - account-linking
  - migrations
contentType:
  - concept
  - how-to
useCase:
  - manage-accounts
---

# Migration Guide: Account Linking and ID Tokens

This guide is part of the [Deprecating the usage of ID Tokens on the Auth0 Management API](/migrations#deprecating-the-usage-of-id-tokens-on-the-auth0-management-api) migration, and focuses on the [account linking process](/link-accounts).

For some use cases you could use [ID Tokens](/tokens/id-token) to [link and unlink user accounts](/link-accounts). This functionality is being deprecated. You will have to use [Access Tokens](/tokens/overview-access-tokens) in all cases.

The functionality is available and affected users are encouraged to migrate. However the ability to use ID Tokens will **not** be disabled in the foreseeable future so the mandatory opt-in date for this migration remains open. When this changes, customers will be notified beforehand.

This article will help you migrate your implementation. First, we will see which use cases are affected. We will continue with reviewing how you can use [scopes](/scopes) to get tokens with different access rights, and how you can use them in the account linking process.

## Summary of changes

The changes in account linking are:

- You can no longer use an ID Token at the `Authorization` header, an Access Token must be used instead
- If you use an Access Token at the `Authorization` header, with `update:users` as the granted permission, then you can send at the request's body either the `user_id` or the ID Token of the secondary account.
- If you use an Access Token at the `Authorization` header, with `update:current_user_metadata` as the granted permission, then you can only send the ID Token of the secondary account in the request's body.
- If you send the ID Token of the secondary account in the request's body (that is, the use cases described in the previous two bullets), then the following must apply:
  - The ID Token must be signed using `RS256` (you can set this value at *Dashboard > Clients > Client Settings > Advanced Settings > OAuth*)
  - The claim `aud` of the ID Token, must identify the client, and be the same value with the `azp` claim of the Access Token

The change in the unlinking of accounts is that you can no longer use an ID Token at the `Authorization` header. An Access Token must be used instead.

## Does this affect me?

There are several ways you can link and unlink accounts. Some change, some remain the same, and a new variation is introduced. In the following matrix you can see a list of the use cases and their status based on this migration.

<table class="table table-fixed">
  <thead>
    <tr>
      <th width="50%">Use case</th>
      <th width="20%">Status</th>
      <th width="30%">More info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>You link user accounts with the <a href="/api/management/v2#!/Users/post_identities">Link a user account</a> endpoint of the Management API, and you send the primary account's ID Token in the <code>Authorization</code> header.</td>
      <td><div class="label label-warning">Affected</div></td>
      <td><a href="#link-current-user-accounts-with-the-api">Link current user accounts with the API</a></td>
    </tr>
    <tr>
      <td>You link user accounts with the <a href="/api/management/v2#!/Users/post_identities">Link a user account</a> endpoint of the Management API, you send an Access Token (with scope <code>update:users</code>) in the <code>Authorization</code> header, and the secondary account's <code>user_id</code> in the payload</td>
      <td><div class="label label-default">No change</div></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>You link user accounts with the <a href="/api/management/v2#!/Users/post_identities">Link a user account</a> endpoint of the Management API, you send an Access Token (with scope <code>update:current_user_identities</code>) in the <code>Authorization</code> header, and the secondary account's <code>user_id</code> in the payload</td>
      <td><div class="label label-warning">Affected</div></td>
      <td><a href="#link-current-user-accounts-with-the-api">Link current user accounts with the API</a></td>
    </tr>
    <tr>
      <td>You link user accounts with the <a href="/api/management/v2#!/Users/post_identities">Link a user account</a> endpoint of the Management API, you send an Access Token in the <code>Authorization</code> header, and the secondary account's ID Token in the payload</td>
      <td><div class="label label-primary">New use case</div></td>
      <td><a href="#link-any-user-account-with-the-api">Link any user account with the API</a></td>
    </tr>
    <tr>
      <td>You link user accounts with the <a href="/auth0js#user-management">Auth0.js library</a>, and you use the primary account's ID Token to instantiate <code>auth0.Management</code></td>
      <td><div class="label label-warning">Affected</div></td>
      <td><a href="#link-current-user-accounts-with-auth0-js">Link current user accounts with Auth0.js</a></td>
    </tr>
    <tr>
      <td>You link user accounts with the <a href="/auth0js#user-management">Auth0.js library</a>, and you use an Access Token (with scope <code>update:users</code>) to instantiate <code>auth0.Management</code></td>
      <td><div class="label label-default">No change</div></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>You link user accounts with the <a href="/auth0js#user-management">Auth0.js library</a>, and you use an Access Token (with scope <code>update:current_user_identities</code>) to instantiate <code>auth0.Management</code></td>
      <td><div class="label label-warning">Affected</div></td>
      <td><a href="#link-current-user-accounts-with-auth0-js">Link current user accounts with Auth0.js</a></td>
    </tr>
    <tr>
      <td>You unlink user accounts with the <a href="/api/management/v2#!/Users/delete_provider_by_user_id">Unlink a user identity</a> endpoint of the Management API, and you send the primary account's ID Token in the <code>Authorization</code> header</td>
      <td><div class="label label-warning">Affected</div></td>
      <td><a href="#how-to-unlink-accounts">How to unlink accounts</a></td>
    </tr>
    <tr>
      <td>You unlink user accounts with the <a href="/api/management/v2#!/Users/delete_provider_by_user_id">Unlink a user identity</a> endpoint of the Management API, and you send an Access Token in the <code>Authorization</code> header</td>
      <td><div class="label label-default">No change</div></td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## How to link accounts

In order to link accounts you can either call directly the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint of the Management API, or use the [Auth0.js library](/auth0js#user-management).

### Link current user accounts with the API

A common use case is to allow the logged-in user to link their various accounts using your app. 

Until now you could use the primary user's ID Token or Access Token (which contained the `update:current_user_identities` scope) in order to authenticate with the Management API and use the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint.

With this migration, you must get an Access Token (which must contain the `update:current_user_identities` scope) and use that to authenticate with the API and use the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint. The payload must be the ID Token of the secondary user.

First, you must get an Access Token with the `update:current_user_identities` scope. 

::: note
In the example that follows, we use the [Single-Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow), the recommended OAuth 2.0 flow for client-side apps). You can get Access Tokens though for any application type (see [Get Access Tokens](/tokens/get-access-tokens).
:::

<%= include('./_get-token-authorize.md', { scope: 'update:current_user_identities', idPrevious: 'authZ-id-token', idCurrent: 'authZ-access-token' }) %>

**The following must apply:**
- The secondary account's ID Token must be signed with `RS256`
- The `aud` claim in the secondary account's ID Token must identify the client, and hold the same value with the `azp` claim of the Access Token used to make the request.

Once you have the Access Token you can use it to link user accounts. This part remains the same, nothing else changes in the request except for the value you use as `Bearer` token. The response remains also the same.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities",
  "httpVersion": "HTTP/1.1",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer ACCESS_TOKEN"
  },
  {
    "name": "content-type",
    "value": "application/json"
  }],
  "postData" : {
    "mimeType": "application/json",
    "text": "{\"link_with\":\"SECONDARY_ACCOUNT_ID_TOKEN\"}"
  }
}
```

### Link current user accounts with Auth0.js

If you use [Auth0.js library](/libraries/auth0js#user-management) to access the Management API and link accounts, then you probably use the ID Token of the user's primary identity to instantiate `auth0.Management` and use it to link accounts.

With this migration, you must get an Access Token (with the `update:current_user_identities` scope) and use that to instantiate the object.

First, you must get an Access Token with the `update:current_user_identities` scope. Then use this token to instantiate `auth0.Management`. The final call to `linkUser` remain the same.

<%= include('./_get-token-auth0js.md', { scope: 'update:current_user_identities' }) %>

### Link any user account with the API

If you get an Access Token for account linking, that contains the `update:users` scope, and send the secondary account's `user_id` and `provider` in the request, then you don't have to make any changes.

However, this migration does introduce an alternative to this. You still use an Access Token that contains the `update:users` scope to authenticate with the API, but in the request's payload you can send the secondary's account ID Token (instead of `user_id` and `provider`).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities",
  "httpVersion": "HTTP/1.1",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer ACCESS_TOKEN"
  },
  {
    "name": "content-type",
    "value": "application/json"
  }],
  "postData" : {
    "mimeType": "application/json",
    "text": "{\"link_with\":\"SECONDARY_ACCOUNT_ID_TOKEN\"}"
  }
}
```

**The following must apply:**
- The secondary account's ID Token must be signed with `RS256`
- The `aud` claim in the secondary account's ID Token must identify the client, and hold the same value with the `azp` claim of the Access Token used to make the request.

## How to unlink accounts

If you use ID Tokens in order to unlink accounts, then you must update your implementation to use Access Tokens.

First, you must get an Access Token with the `update:current_user_identities` scope.

Use the sample script that follows as a guide. On the **Legacy (ID Token)** panel you can see an implementation of the old approach that gets an ID Token. On the **Current (Access Token)** panel you can see the new approach that gets an Access Token as well.

<%= include('./_get-token-authorize.md', { scope: 'update:current_user_identities', idPrevious: 'unlink-id-token', idCurrent: 'unlink-access-token' }) %>

Once you have the Access Token, you can call the [Unlink a user identity](/api/management/v2#!/Users/delete_provider_by_user_id) endpoint of the Management API, using it in the `Authorization` header.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#unlink2-id-token" data-toggle="tab">Legacy (ID Token)</a></li>
      <li><a href="#unlink2-access-token" data-toggle="tab">Current (Access Token)</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="unlink2-id-token" class="tab-pane active">
      <pre class="text hljs">
        <code>
DELETE https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities/SECONDARY_ACCOUNT_PROVIDER/SECONDARY_ACCOUNT_USER_ID
Authorization: 'Bearer ID_TOKEN-OR-ACCESS_TOKEN'
        </code>
      </pre>
    </div>
    <div id="unlink2-access-token" class="tab-pane">
      <pre class="text hljs">
        <code>
DELETE https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities/SECONDARY_ACCOUNT_PROVIDER/SECONDARY_ACCOUNT_USER_ID
Authorization: 'Bearer ACCESS_TOKEN'
        </code>
      </pre>
    </div>
  </div>
</div>

## Keep reading

:::next-steps
- [Link User Accounts](/link-accounts)
- [Account Linking Using Server Side Code](/link-accounts/suggested-linking)
- [Account Linking Using Client Side Code](/link-accounts/user-initiated-linking)
- [Migration Guide: Management API and ID Tokens](/migrations/guides/calling-api-with-idtokens)
:::
