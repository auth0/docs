---
url: /link-accounts
title: Linking User Accounts
description: Auth0 supports the linking of user accounts from various identity providers, allowing a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile.
---

# Linking Accounts

Auth0 supports the linking of user accounts from various identity providers, allowing a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile.

Note that Auth0 will treat all identities as separate by default. For example: if a user logs in first against the Auth0 database and then via Google or Facebook, these two attempts would appear to Auth0 as two separate users.

You can implement functionality to enable a user to explicitly link accounts.  In this scenario, the user would log in with an initial provider, perhaps Google. Your application would provide a link or button to enable them to link another account to the first one.  The user would click on this link/button and your application would make a call so that when the user logs in with the second provider, the 2nd account is linked with the first.

## Advantages of linking accounts

* Allows users to log in with any identity provider without creating a separate profile for each.

* Allows registered users to use a new social or passwordless login but continue using their existing profile.

* Allows users that registered using a passwordless login to link to an account with a more complete profile.

* Allows your apps to retrieve user profile data stored in various connections.

* Allows your app to interact with several identity provider APIs with the user's identity (for example: to share their status over Twitter or Facebook. Learn more at: [Calling an external IdP API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api).)

* Allows your app to gather a user's contacts from their social networks for expanded engagement opportunities.

## The linking process

The process of linking accounts merges two existing user profiles into a single account. When linking accounts, a **primary account** and a **secondary account** must be specified.

For example, if the profile of the **primary account** is:

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

and the profile of the **secondary account** is:

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

after linking, the resulting profile will be:

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

Note that as a result of linking these accounts:

* The `user_id` and all other main profile properties continue to be those of the primary identity.
* The secondary account is now embedded in the `identities` array of the primary profile.
* The attributes of the secondary account are placed inside the `profileData` field of the corresponding identity inside the array.
* The `user_metadata` and `app_metadata` of the primary account is unchanged.
* The `user_metadata` and `app_metadata` of the secondary account is discarded.
* There is no automatic merging of user profiles with associated identities.
* The secondary account is removed from the users list.

#### Merging Metadata

As stated above, [user_metadata and app_metadata](/api/v2/changes#app-_metadata-and-user-_metadata) are not automatically merged during account linking. If you want to merge them you have to do it manually, using the [Auth0 APIv2 Update User endpoint](/api/v2#!/Users/patch_users_by_id).

The [Auth0 Node.js SDK for APIv2](https://github.com/auth0/node-auth0/tree/v2) is also available. You can find sample code for merging metadata before linking using this SDK [here](/link-accounts/suggested-linking#4-verify-and-merge-metadata-before-linking).

## The Management API

The Auth0 Management API V2 provides a [Link a user account endpoint](/api/v2#!/Users/post_identities), which can be invoked in two ways:

 1. With the JWT from both the primary and secondary accounts:

  ```text
  POST https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
  Authorization: 'Bearer PRIMARY_ACCOUNT_JWT'
  {
    link_with: 'SECONDARY_ACCOUNT_JWT'
  }
  ```

  This method requires a token with `update:current_user_identities` scope (which the authenticated user's JWT already has) and is suitable for scenarios where the user initiates the linking process. By requiring both JWTs, you can determine that the user was able to authenticate into both accounts and has the right to merge them.

 2. With the user id from both the primary and secondary accounts:

  ```text
  POST https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
  Authorization: 'Bearer YOUR_API_V2_TOKEN'
  {
    provider: 'SECONDARY_ACCOUNT_PROVIDER',
    user_id: 'SECONDARY_ACCOUNT_USER_ID'
  }
  ```

  This method requires an [API V2 token](/api/v2/tokens) with `update:users` scope and is intended for use in server-side code where you can make sure that both accounts correspond to the same person.

## Scenarios

Below are implementation details for calling the Linking Account API in these scenarios:

* [Automatic account linking](#automatic-account-linking)
* [User-initiated account linking](#user-initiated-account-linking)
* [Suggested account linking](#suggested-account-linking)

### Automatic account linking

**Auth0 does not support automatic linking**, per se. However, you can implement automatic linking by setting up a [Rule](/rules) that will link accounts with the same e-mail address. For security purposes, it is best to link accounts **only if both e-mails are verified**.

The rule is an example of linking accounts in server-side code using the Auth0 Management API [Link a user account endpoint](/api/v2#!/Users/post_identities) where you have both the primary and secondary user ids and an [Management API v2 token](/api/v2/tokens) with `update:users` scope.

**NOTE:** For starting point, see [Link Accounts with Same Email Address](https://github.com/auth0/rules/blob/master/rules/link-users-by-email.md).

### User-initiated account linking

Typically, account linking will be initiated by an authenticated user. Your app must provide the UI, such as a **Link accounts** button on the user's profile page.

![](/media/articles/link-accounts/spa-user-settings.png)

**NOTE:** You can follow the [User-initiated Account Linking](/link-accounts/user-initiated-linking) tutorial or view the [Auth0 jQuery Single Page App Account Linking Sample](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) on Github for implementation details.

### Suggested account linking

As with automatic linking, in this scenario you will set up a [Rule](/rules) that will link accounts with the same verified e-mail address. However, instead of completing the link automatically on authentication, your app will first prompt the user to link their identities.

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

**NOTE:** You can follow the [Account Linking from Server Side Code](/link-accounts/suggested-linking) tutorial or view the [Auth0 Node.js Regular Web App Account Linking Sample](https://github.com/auth0/auth0-link-accounts-sample/tree/master/RegularWebApp) on Github for implementation details.

## Unlinking accounts

The Auth0 Management API V2 also provides an [Unlink a user account endpoint](/api/v2#!/Users/delete_provider_by_user_id) which can be used with either of these two **scopes**:

* `update:current_user_identities`: when calling the endpoint from client-side code where you have the primary user's JWT (which comes with this scope).
* `update:users`: when calling the endpoint from server-side code where you need to generate an [Management API v2 TOKEN](/api/v2/tokens) having this scope.

```text
DELETE https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities/SECONDARY_ACCOUNT_PROVIDER/SECONDARY_ACCOUNT_USER_ID
Authorization: 'Bearer [PRIMARY_ACCOUNT_JWT OR API_V2_TOKEN]'
```

As a result of unlinking the accounts, the secondary account is removed from the identities array of the primary account, and a new secondary user account is created. This means that if, for example, a user was `john@example.com` using Facebook to login, and used the same email address to login via Linkedin, and then unlinked those accounts, then you will end up with two separate accounts; both using `john@example.com`, one for each identity provider in question.

::: panel-warning Unlinking - Metadata
Note that any metadata stored in the primary user account will not be in the secondary account when unlinked. When accounts are linked, the secondary account's metadata is not linked; thus, when unlinked and the secondary account becomes separated again, it will have no metadata.
:::

If your goal is to delete the secondary identity entirely, you'll want to first unlink the accounts, and then delete the newly (re)created secondary account.
