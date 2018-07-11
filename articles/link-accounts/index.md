---
title: Linking User Accounts
description: Learn how to link user accounts from various identity providers, so your users can authenticate from any of their accounts and still be recognized by your app and associated with the same user profile
crews: crew-2
toc: true
topics:
  - account-linking
contentType:
  - concept
  - how-to
  - index
useCase:
  - manage-accounts
---
# Linking User Accounts

::: warning
We recently introduced some changes in Account Linking. For all the details see [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking).
:::

Auth0 supports the linking of user accounts from various identity providers. This allows a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile. This feature requires a paid subscription to the **Developer**, **Developer Pro** or **Enterprise** plan (see [Pricing](https://auth0.com/pricing)).

Note that Auth0 will treat all identities as separate by default. For example, if a user logs in first against the Auth0 database and then via Google or Facebook, these two attempts would appear to Auth0 as two separate users.

You can implement functionality to enable a user to explicitly link accounts.  In this scenario, the user would log in with an initial provider, perhaps Google. Your application would provide a link or button to enable them to link another account to the first one.  The user would click on this link/button and your application would make a call so that when the user logs in with the second provider, the second account is linked with the first.

## Advantages of linking accounts

* Allows users to log in with any identity provider without creating a separate profile for each
* Allows registered users to use a new social or passwordless login but continue using their existing profile
* Allows users that registered using a passwordless login to link to an account with a more complete profile
* Allows your apps to retrieve user profile data stored in various connections

## The linking process

The process of linking accounts merges two existing user profiles into a single one. When linking accounts, a **primary account** and a **secondary account** must be specified.

In the example below you can see how the resulting linked profile will be for the sample primary and secondary accounts.

<code-block>
  <code-block-tab data-title="Profile of primary account">

  ```json
  {
    "email": "your0@email.com",
    "email_verified": true,
    "name": "John Doe",
    "given_name": "John",
    "family_name": "Doe",
    "picture": "https://lh3.googleusercontent..../photo.jpg",
    "gender": "male",
    "locale": "en",
    "user_id": "google-oauth2|115015401343387192604",
    "identities": [
      {
          "provider": "google-oauth2",
          "user_id": "115015401343387192604",
          "connection": "google-oauth2",
          "isSocial": true
      }
    ],
    "user_metadata": {
      "color": "red"
    },
    "app_metadata": {
      "roles": [
          "Admin"
      ]
    },
    ...
  }
  ```

  </code-block-tab>
  <code-block-tab data-title="Profile of secondary account">

  ```json
  {
    "phone_number": "+14258831929",
    "phone_verified": true,
    "name": "+14258831929",
    "updated_at": "2015-10-08T18:35:18.102Z",
    "user_id": "sms|560ebaeef609ee1adaa7c551",
    "identities": [
      {
          "user_id": "560ebaeef609ee1adaa7c551",
          "provider": "sms",
          "connection": "sms",
          "isSocial": false
      }
    ],
    "user_metadata": {
        "color": "blue"
    },
    "app_metadata": {
        "roles": [
            "AppAdmin"
        ]
    },
    ...
  }
  ```

  </code-block-tab>
  <code-block-tab data-title="Linked profile">

  ```json
  {
    "email": "your@email.com",
    "email_verified": true,
    "name": "John Doe",
    "given_name": "John",
    "family_name": "Doe",
    "picture": "https://lh3.googleusercontent.../photo.jpg",
    "gender": "male",
    "locale": "en",
    "user_id": "google-oauth2|115015401343387192604",
    "identities": [
      {
        "provider": "google-oauth2",
        "user_id": "115015401343387192604",
        "connection": "google-oauth2",
        "isSocial": true
      },
      {
        "profileData": {
            "phone_number": "+14258831929",
            "phone_verified": true,
            "name": "+14258831929"
        },
        "user_id": "560ebaeef609ee1adaa7c551",
        "provider": "sms",
        "connection": "sms",
        "isSocial": false
      }
    ],
    "user_metadata": {
        "color": "red"
    },
    "app_metadata": {
        "roles": [
            "Admin"
        ]
    },
    ...
  }
  ```

  </code-block-tab>
</code-block>

Note that:

* The `user_id` and all other main profile properties continue to be those of the primary identity
* The secondary account is now embedded in the `identities` array of the primary profile
* The attributes of the secondary account are placed inside the `profileData` field of the corresponding identity inside the array
* The `user_metadata` and `app_metadata` of the primary account have not changed
* The `user_metadata` and `app_metadata` of the secondary account are discarded
* There is no automatic merging of user profiles with associated identities
* The secondary account is removed from the users list

### Merging Metadata

[Metadata](/metadata) are not automatically merged during account linking. If you want to merge them you have to do it manually, using the [Auth0 APIv2 Update User endpoint](/api/v2#!/Users/patch_users_by_id).

The [Auth0 Node.js SDK for APIv2](https://github.com/auth0/node-auth0/tree/v2) is also available. You can find sample code for merging metadata before linking using this SDK [here](/link-accounts/suggested-linking#4-verify-and-merge-metadata-before-linking).

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

## Scenarios

In this section we will see some scenarios that implement account linking:
* [Automatic account linking](#automatic-account-linking): automatically link accounts with the same e-mail address
* [User-initiated account linking](#user-initiated-account-linking): allow your users to link their accounts using an admin screen in your app
* [Suggested account linking](#suggested-account-linking): identify accounts with the same e-mail address and prompt the user in your app to link them

::: warning
For security purposes, link accounts **only if both e-mails are verified**.
:::

### Automatic account linking

You can implement automatic linking by setting up a [Rule](/rules) that will run upon user login and link accounts with the same e-mail address.

The rule is an example of linking accounts in server-side code using the Auth0 Management API [Link a user account endpoint](/api/v2#!/Users/post_identities) where you have both the primary and secondary user IDs and an [Management API Access Token](/api/v2/tokens) with `update:users` scope.

Note, that if the primary account changes during the authorization transaction (for example, the account the user has logged in with, becomes a secondary account to some other primary account), you could get an error in the Authorization Code flow or an ID Token with the wrong `sub` claim in the token flow. To avoid this, set `context.primaryUser = 'auth0|user123'` in the rule after account linking. This will tell the authorization server to use the user with id `auth0|user123` for the rest of the flow.

For a rule template on automatic account linking, see [Link Accounts with Same Email Address](https://github.com/auth0/rules/blob/master/rules/link-users-by-email.md). If you want to merge metadata as well, see [Link Accounts with Same Email Address while Merging Metadata](https://github.com/auth0/rules/blob/master/rules/link-users-by-email-with-metadata.md).

### User-initiated account linking

Typically, account linking will be initiated by an authenticated user. Your app must provide the UI, such as a **Link accounts** button on the user's profile page.

![Sample user profile page](/media/articles/link-accounts/spa-user-settings.png)

You can follow the [Account Linking Using Client Side Code](/link-accounts/user-initiated-linking) tutorial or view the [Auth0 jQuery Single Page App Account Linking Sample](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) on Github for implementation details.

### Suggested account linking

As with automatic linking, in this scenario you will set up a [Rule](/rules) that will link accounts with the same verified e-mail address. However, instead of completing the link automatically on authentication, your app will first prompt the user to link their identities.

![Sample linking suggestion](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

You can follow the [Account Linking Using Server Side Code](/link-accounts/suggested-linking) tutorial or view the [Auth0 Node.js Regular Web App Account Linking Sample](https://github.com/auth0/auth0-link-accounts-sample/tree/master/RegularWebApp) on Github for implementation details.

## Unlinking accounts

The Auth0 Management API V2 also provides an [Unlink a user account endpoint](/api/v2#!/Users/delete_provider_by_user_id) which can be used with either of these two **scopes**:

* `update:current_user_identities`: when you call the endpoint from client-side code where you have an Access Token with this scope
* `update:users`: when you call the endpoint from server-side code where you have an Access Token with this scope

```har
{
  "method": "DELETE",
  "url": "https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities/SECONDARY_ACCOUNT_PROVIDER/SECONDARY_ACCOUNT_USER_ID",
  "httpVersion": "HTTP/1.1",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer ACCESS_TOKEN"
  }]
}
```

The result of the unlinking process is the following:
* The secondary account is removed from the identities array of the primary account
* A new secondary user account is created
* The secondary account will have no metadata

If your goal is to delete the secondary identity entirely, you must first unlink the accounts, and then delete the newly created secondary account.
