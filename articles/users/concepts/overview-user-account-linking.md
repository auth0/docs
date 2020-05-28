---
title: User Account Linking
description: Understand how user accounts can be linked in Auth0 from various identity providers.
crews: crew-2
toc: true
topics:
  - account-linking
contentType:
  - concept
useCase:
  - manage-accounts
---
# User Account Linking

Auth0 supports the linking of user accounts from various identity providers. This allows a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile. This feature requires a paid subscription to the **Developer**, **Developer Pro** or **Enterprise** plan (see [Pricing](https://auth0.com/pricing)).

Auth0 treats all identities as separate by default. For example, if a user logs in first against the Auth0 database and then via Google or Facebook, these two attempts would appear to Auth0 as two separate users. You can implement functionality to enable a user to explicitly link accounts. In this scenario, the user would log in with an initial provider, perhaps Google. Your application would provide a link or button to enable them to link another account to the first one.  The user would click on this link/button and your application would make a call so that when the user logs in with the second provider, the second account is linked with the first.

## Advantages of linking accounts

* Allows users to log in with any identity provider without creating a separate profile for each
* Allows registered users to use a new social or <dfn data-key="passwordless">passwordless</dfn> login but continue using their existing profile
* Allows users that registered using a passwordless login to link to an account with a more complete profile
* Allows your apps to retrieve user profile data stored in various connections

## How it works

The process of linking accounts merges two existing user profiles into a single one. When linking accounts, a **primary account** and a **secondary account** must be specified.

In the example below you can see how the resulting linked profile will be for the sample primary and secondary accounts.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#profile-primary" data-toggle="tab">Profile of primary account</a>
      </li>
      <li><a href="#profile-secondary" data-toggle="tab">Profile of secondary account</a>
      </li>
      <li><a href="#profile-linked" data-toggle="tab">Linked profile</a>
      </li>
    </ul>
  </div>
  <div class="tab-content">
    <div class="tab-pane active" id="profile-primary">
      <pre class="hl">
        <code>{
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
        </code>
      </pre>
    </div>
    <div class="tab-pane" id="profile-secondary">
      <pre class="hl">
        <code>{
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
        </code>
      </pre>
    </div>
    <div class="tab-pane" id="profile-linked">
      <pre class="hl">
        <code>{
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
        </code>
      </pre>
    </div>
  </div>
</div>

Note that:

* The `user_id` and all other main profile properties continue to be those of the primary identity
* The secondary account is now embedded in the `identities` array of the primary profile
* The attributes of the secondary account are placed inside the `profileData` field of the corresponding identity inside the array
* The `user_metadata` and `app_metadata` of the primary account have not changed
* The `user_metadata` and `app_metadata` of the secondary account are discarded
* There is no automatic merging of user profiles with associated identities
* The secondary account is removed from the users list

### Metadata merge

[Metadata](/users/concepts/overview-user-metadata) are not automatically merged during account linking. If you want to merge them you have to do it manually, using the [Auth0 APIv2 Update User endpoint](/api/v2#!/Users/patch_users_by_id).

The [Auth0 Node.js SDK for APIv2](https://github.com/auth0/node-auth0/tree/v2) is also available. 

## Scenarios

There are two different ways of implementing account linking:

* [User-initiated account linking](#user-initiated-account-linking): allow your users to link their accounts using an admin screen in your app.
* [Suggested account linking](#suggested-account-linking): identify accounts with the same email address and prompt the user in your app to link them.

### User-initiated account linking

Typically, account linking will be initiated by an authenticated user. Your app must provide the UI, such as a **Link accounts** button on the user's profile page.

![Sample user profile page](/media/articles/link-accounts/spa-user-settings.png)

You can read more about how to implement user-initiated account linking in a Single Page Application in the [Client-Side Account Linking](/users/references/link-accounts-client-side-scenario) article.

### Suggested account linking

You can find accounts with the same email, and prompt the users to link them. For example, a user can create an account with Google with the user@gmail.com, and then log in with Facebook, with an account linked to the same email. 

If that occurs, you can show users the list of available accounts so they can link them, by first authenticating with the account they will be linking to.

You can also use the [Account Link Extension](/extensions/account-link) to achieve the same outcome. 

![Suggested Account Linking](/media/articles/link-accounts/account-linking-webapp-small.png)

You can read more about how to implement user-initiated account linking in a Regular Web Application in the [Server-Side Account Linking](/users/references/link-accounts-server-side-scenario) article.

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Account Link Extension](/extensions/account-link)
* [Suggested Account Linking - Server-Side Implementation](/users/references/link-accounts-server-side-scenario)
* [User Initiated Account Linking - Client-Side Implementation](/users/references/link-accounts-client-side-scenario)
