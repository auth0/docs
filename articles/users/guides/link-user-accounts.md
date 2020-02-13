---
title: Link User Accounts
description: Learn how to link user accounts from various identity providers, so your users can authenticate from any of their accounts and still be recognized by your app and associated with the same user profile.
topics:
  - account-linking
contentType:
  - how-to
useCase:
  - manage-accounts
---
# Link User Accounts

Link user accounts together to form a primary and secondary relationship. On successful linking, the endpoint returns the new array of the primary account identities. 

Auth0 supports the linking of user accounts from various identity providers. This allows a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile. This feature requires a paid subscription to the **Developer**, **Developer Pro** or **Enterprise** plan (see [Pricing](https://auth0.com/pricing)).

::: note
Auth0 treats all identities as separate by default. For example, if a user logs in first against the Auth0 database and then via Google or Facebook, these two attempts would appear to Auth0 as two separate users.
:::

There are three ways to link accounts:

* Use the Account Link extension
* Use the Management API 
* Use Auth0.js 

Use the tabs below to see the details for each option.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#extension" data-toggle="tab">Account Link Extension</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
      <li><a href="#auth0js" data-toggle="tab">Auth0 js</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="extension" class="tab-pane active">

## Account Link extension

Install and configure the [Account Link Extension](/extensions/account-link) extension in the Dashboard to prompt users that may have created a second account to link the new account with their old one on their first login. The user can choose to either link the two accounts or keep them separate if it was intentional.
    </div>
    <div id="mgmt-api" class="tab-pane">

## Management API endpoint

The Auth0 Management API provides the [Link a user account](/api/v2#!/Users/post_identities) endpoint, which can be invoked in two ways:

* User initiated account linking using Access Tokens with the `update:current_user_identities` scope
* Server-side account linking using Access Token that contains the `update:users` scope

### User initiated client-side account linking 

For user initiated account linking from client-side code, use an Access Token that contains the following items in the payload:
- `update:current_user_identites` scope
- `user_id` of the primary account as part of the URL
- ID Token of the secondary account must be signed with `RS256` and an `aud` claim identifying the client that matches the value of the requesting Access Token's `azp` claim. 

An Access Token that contains the `update:current_user_identities` scope can **only** be used to update the information of the currently logged-in user. Therefore, this method is suitable for scenarios where the user initiates the linking process.

```js
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

### Server-side account linking 

For server-side account linking, use an Access Token that contains the following items in the payload:
- `update:users` scope
- `user_id` of the primary account as part of the URL
- `user_id` of the secondary account 
- ID Token of the secondary account must be signed with `RS256` and an `aud` claim identifying the client that matches the value of the requesting Access Token's `azp` claim. 

Access Tokens that contain the `update:users` scope can be used to update the information of **any** user. Therefore, this method is intended for use in server-side code only.

```js
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
    "text": "{\"provider\":\"SECONDARY_ACCOUNT_PROVIDER\", \"user_id\": \"SECONDARY_ACCOUNT_USER_ID\"}"
  }
}
```

The `SECONDARY_ACCOUNT_USER_ID` and `SECONDARY_ACCOUNT_PROVIDER` can be deduced by the unique ID of the user. For example, if the user ID is `google-oauth2|108091299999329986433`, set the `google-oauth2` part as the `provider`, and the `108091299999329986433` part as the `user_id` at your request.

Instead of the `provider` and `user_id`, you can send the secondary account's ID Token as part of the payload:

```js
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

  </div>
  <div id="auth0js" class="tab-pane">

## Auth0.js library

You can use the [Auth0.js](/libraries/auth0js) library.

First, you must get an Access Token that can be used to call the Management API. You can do it by specifying the `https://${account.namespace}/api/v2/` audience when initializing Auth0.js. You will get the Access Token as part of the authentication flow. Alternatively, you can use the `checkSession` method.

Once you have the Access Token, you can create a new `auth0.Management` instance by passing it the account's Auth0 domain, and the Access Token.

For more information and sample scripts, see [Auth0.js > User management](/libraries/auth0js/v9#user-management).
    </div>
  </div>
</div>

## Add missing information with Rules

When a user logs in, apps receive user information from the **primary identity**. Auth0 does not attempt to automatically complete missing profile fields with information from the secondary identities. For example, if the primary identity comes from a database connection and is missing the `given_name` and `family_name` properties, and the secondary identity comes from a Google social connection that includes the first and last name of the user, then the application will **not** receive data contained in the second identity.

To add missing information to primary identities with information from secondary identities, you can write a [rule](/rules) like the following example:

```js
function(user, context, callback) {
  
  const propertiesToComplete = ["given_name", "family_name", "name"];

  // go over each property and try to get missing
  // information from secondary identities
  for(var property of propertiesToComplete) {
    if (!user[property]) {
      for(var identity of user.identities) {
        if (identity.profileData && identity.profileData[property]) {
          user[property] = identity.profileData[property];
          break;
        }
      }
    }
  }
  
  callback(null, user, context);
}
```

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Account Link Extension](/extensions/account-link)
* [Link User Accounts Client-Side Scenario](/users/references/link-accounts-client-side-scenario)
* [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-accounts-user-initiated-scenario)
