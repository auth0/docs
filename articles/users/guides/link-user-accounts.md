---
title: Link User Accounts
description: Learn how to link user accounts from various identity providers, so your users can authenticate from any of their accounts and still be recognized by your app and associated with the same user profile
crews: crew-2
toc: true
topics:
  - account-linking
contentType:
  - how-to
useCase:
  - manage-accounts
---
# Link User Accounts

## Use the Management API

The Auth0 Management API provides the [Link a user account](/api/v2#!/Users/post_identities) endpoint, which can be invoked in two ways.

1. With an Access Token that contains the `update:current_user_identities` scope, the `user_id` of the primary account as part of the URL, and the secondary account's ID Token in the payload:

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

  An Access Token that contains the `update:current_user_identities` scope, can only be used to update the information of the currently logged-in user. Therefore this method is suitable for scenarios where the user initiates the linking process.

  The following **must** apply:
  - The secondary account's ID Token must be signed with `RS256`
  - The `aud` claim in the secondary account's ID Token must identify the client, and hold the same value with the `azp` claim of the Access Token used to make the request.

2. With an Access Token that contains the `update:users` scope, the `user_id` of the primary account as part of the URL, and the `user_id` of the secondary account in the payload:

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
      "text": "{\"provider\":\"SECONDARY_ACCOUNT_PROVIDER\", \"user_id\": \"SECONDARY_ACCOUNT_USER_ID\"}"
    }
  }
  ```

  The `SECONDARY_ACCOUNT_USER_ID` and `SECONDARY_ACCOUNT_PROVIDER` can be deduced by the unique ID of the user. So for example, if the user ID is `google-oauth2|108091299999329986433`, set the `google-oauth2` part as the `provider`, and the `108091299999329986433` part as the `user_id` at your request.

  Instead of the `provider` and `user_id`, you can send the secondary account's ID Token as part of the payload:

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

  The following **must** apply in case you send the ID Token as part of the payload:
  - The secondary account's ID Token must be signed with `RS256`
  - The `aud` claim in the secondary account's ID Token must identify the client, and hold the same value with the `azp` claim of the Access Token used to make the request.

  Note also that since the Access Token contains the `update:users` scope, it can be used to update the information of **any** user. Therefore this method is intended for use in server-side code only.

## Use Auth0.js

Instead of calling directly the API, you can use the [Auth0.js](/libraries/auth0js) library.

First, you must get an Access Token that can be used to call the Management API. You can do it by specifying the `https://${account.namespace}/api/v2/` audience when initializing Auth0.js. You will get the Access Token as part of the authentication flow. Alternatively, you can use the `checkSession` method.

Once you have the Access Token, you can create a new `auth0.Management` instance by passing it the account's Auth0 domain, and the Access Token.

For more information and sample scripts, see [Auth0.js > User management](/libraries/auth0js/v9#user-management).

## Fill-in missing properties from secondary identities

When a user logs in, applications receive user information from the **primary identity**. Auth0 will not attempt to automatically complete any missing profile field with information from the secondary identities. For example, if the primary identity comes from a database connection and is missing the `given_name` and `family_name` properties, and the secondary identity comes from a Google social connection that includes the first and last name of the user, then by default, the application will **not** receive data contained in the second identity.

To fill in the missing info in primary identities with information from secondary identities, you can write a [rule](/rules):

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

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Link User Accounts Client-Side Scenario](/users/references/link-accounts-client-side-scenario)
* [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-acounts-user-initiated-scenario)