---
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

# Migration Guide: Account Linking with Access Tokens vs. ID Tokens

This guide is part of the [Deprecating the usage of ID Tokens on the Auth0 Management API](/migrations#deprecating-the-usage-of-id-tokens-on-the-auth0-management-api) migration, and focuses on the [account linking process](/users/concepts/overview-user-account-linking).

For some use cases you could use [ID Tokens](/tokens/concepts/id-tokens) to link and unlink user accounts. This functionality is being deprecated. You will have to use <dfn data-key="access-token">Access Tokens</dfn> in all cases.

The changes in account linking are:

- You can no longer use an ID Token at the `Authorization` header, an Access Token must be used instead
- If you use an Access Token at the `Authorization` header, with `update:users` as the granted permission, then you can send at the request's body either the `user_id` or the ID Token of the secondary account.
- If you use an Access Token at the `Authorization` header, with `update:current_user_metadata` as the granted permission, then you can only send the ID Token of the secondary account in the request's body.
- If you send the ID Token of the secondary account in the request's body (that is, the use cases described in the previous two bullets), then the following must apply:
  - The ID Token must be signed using `RS256` (you can set this value at *Dashboard > Clients > Client Settings > Advanced Settings > OAuth*)
  - The claim `aud` of the ID Token, must identify the client, and be the same value with the `azp` claim of the Access Token

The change in the unlinking of accounts is that you can no longer use an ID Token at the `Authorization` header. An Access Token must be used instead. See [#security-considerations] below for details. 

::: warning
This migration is specifically targeted to mitigate a possible security vulnerability. Auth0 strongly recommendeds that you update your code as soon as possible. 
:::

## Are you affected?

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
      <td>You unlink user accounts with the <a href="/api/management/v2#!/Users/delete_user_identity_by_user_id">Unlink a user identity</a> endpoint of the Management API, and you send the primary account's ID Token in the <code>Authorization</code> header</td>
      <td><div class="label label-warning">Affected</div></td>
      <td><a href="#how-to-unlink-accounts">How to unlink accounts</a></td>
    </tr>
    <tr>
      <td>You unlink user accounts with the <a href="/api/management/v2#!/Users/delete_user_identity_by_user_id">Unlink a user identity</a> endpoint of the Management API, and you send an Access Token in the <code>Authorization</code> header</td>
      <td><div class="label label-default">No change</div></td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## Link user accounts

In order to link accounts you can either call directly the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint of the Management API, or use the [Auth0.js library](/auth0js#user-management).

### Link current user accounts with the Management API

A common use case is to allow the logged-in user to link their various accounts using your app. 

Until now you could use the primary user's ID Token or Access Token (which contained the `update:current_user_identities` scope) in order to authenticate with the Management API and use the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint.

With this migration, you must get an Access Token (which must contain the `update:current_user_identities` scope) and use that to authenticate with the API and use the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint. The payload must be the ID Token of the secondary user.

First, you must get an Access Token with the `update:current_user_identities` scope. 

::: note
In the example that follows, we use the [Implicit Flow](/flows/guides/implicit/call-api-implicit), the recommended OAuth 2.0 flow for client-side apps). You can get Access Tokens though for any application type (see [Get Access Tokens](/tokens/get-access-tokens).
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

### Link any user account with the Management API

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

## Unlink user accounts

If you use ID Tokens in order to unlink accounts, then you must update your implementation to use Access Tokens.

First, you must get an Access Token with the `update:current_user_identities` scope.

Use the sample script that follows as a guide. On the **Legacy (ID Token)** panel you can see an implementation of the old approach that gets an ID Token. On the **Current (Access Token)** panel you can see the new approach that gets an Access Token as well.

<%= include('./_get-token-authorize.md', { scope: 'update:current_user_identities', idPrevious: 'unlink-id-token', idCurrent: 'unlink-access-token' }) %>

Once you have the Access Token, you can call the [Unlink a user identity](/api/management/v2#!/Users/delete_user_identity_by_user_id) endpoint of the Management API, using it in the `Authorization` header.

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

## Security considerations

We have identified a weakness in a particular account linking flow that could allow it to be misused in specific circumstances. We have found no evidence that this has been used maliciously but have decided to deprecate the flow to prevent that ever happening.

Therefore, Auth0 requires customers using the affected account linking flow to migrate to a more secure implementation before October 19th, 2018. Migration paths are provided in this guide, which should not result in any lost functionality.

On October 19th, 2018 or anytime after, the affected account linking flow will be disabled and customers using it will experience run-time errors.

### What's the impact

You are impacted if you call the [/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities) endpoint using a token (ID or <dfn data-key="access-token">Access Token</dfn>) with the <dfn data-key="scope">scope</dfn> `update:current_user_identities` in the Authorization header and include the secondary account's `user_id` in the payload.

No other use cases are impacted.

## Next steps

You should review all your calls to the account linking endpoint ([/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities)) and update those that make use of the vulnerable flow described above. You can update your calls to either of the following:

1. **Client-side / user-initiated linking scenarios** -- For client-side linking scenarios, make the call to the [/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities) using an Access Token with the `update:current_user_identities` scope, and provide the ID Token of the secondary account in the payload (`link_with`). This ID Token must be obtained through an OAuth/OIDC-conformant flow. See [Link User Accounts Initiated by Users Scenario](/users/references/link-accounts-user-initiated-scenario) for more details.
2. **Server-side linking scenarios** -- For server-side linking scenarios, make the call to the [/api/v2/users/{USER_ID}/identities](/api/management/v2#!/Users/post_identities) endpoint using an Access Token with the `update:users` scope and provide the `user_id` of the secondary account in the payload. See [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario) for details.

## Keep reading

- [Link User Accounts](/users/guides/link-user-accounts)
- [Link User Accounts Server-Side Code Scenario](/users/references/link-accounts-server-side-scenario)
- [Link User Accounts Client-Side Code Scenario](/user/references/link-accounts-client-side-scenario)
