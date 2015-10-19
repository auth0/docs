---
url: /link-accounts
---

# Linking Accounts

Auth0 supports the association of different accounts. Applications often support multiple identity providers. Through linking, a user can authenticate with one identity provider and later on with another, but appear to the app as being the same.

## Benefits

* Give users the flexibility to log in with any identity provider without accidentally creating separate profiles.

* Give already registered users the ability to use a social or passwordless login in order to don't have to remember the password anymore, but continue using the same profile.

* Give users that registered using a Passwordless connection the ability to link to an account with more richer profile data.

* Give your Apps the ability to gather and leverage user’s profile data from more than one connection.

* Give your App the possibility to interact with several identity provider's APIs, like sharing a status over Twitter & Facebook. [Lear more...](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api).

* Expand engagement opportunities by inviting user's contacts from different social networks to your App.

## The Linking Process

The linking account process will take two existing users and merge them into a single account. When linking the accounts you have to specify a **primary account** and a **secondary account**.

Suppose this is the profile of the **primary account**:

```js
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
        "access_token": "ya29.BgIckzs2irmP...moC2xqsGbTRWI1ZSIBSTLQZw",
        "expires_in": 3596,
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

And suppose this is the profile of the **secondary account**:

```js
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

After linking the accounts the **resulting profile** is:

```js
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
      "access_token": "ya29.BgIckzs2irmP...moC2xqsGbTRWI1ZSIBSTLQZw",
      "expires_in": 3599,
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

As a result of linking the accounts you will notice that:

* The `user_id` and all other main profile properties will continue to be those of the primary identity.
* The secondary account is now embeded in the `identities` array of the primary profile.
* The **identity provider attributes** of the secondary account are placed inside the `profileData` field of the corresponding identity inside the array.
* `user_metadata` and `app_metadata` of the primary account remains the same.
* `user_metadata` and `app_metadata` associated to the secondary account is lost.
* There's no automatic merging of user profiles with associated identities.
* The secondary account is removed from the users list.

## The API

The Auth0 API V2 provides [an endpoint for linking accounts](https://auth0.com/docs/api/v2#!/Users/post_identities), which can be invoked in two ways:

  1. With the primary and secondary accounts' JWTs

  ```
  POST https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
  Authorization: 'Bearer PRIMARY_ACCOUNT_JWT'
  {
    link_with: 'SECONDARY_ACCOUNT_JWT'
  }
  ```
  This method requires a token with `update:current_user_identities` scope (which the authenticated user's JWT already has) and is suitable for the scenarios where the user initiates the linking process. By requiring the two JWTs you can make sure that the user was able to authenticate to both accounts, and has the right to merge them.

  2. With the primary and secondary accounts' user ids

  ```
  POST https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
  Authorization: 'Bearer YOUR_API_V2_TOKEN'
  {
    provider: 'SECONDARY_ACCOUNT_PROVIDER',
    user_id: 'SECONDARY_ACCOUNT_USER_ID'
  }
  ```
  This method requires an [API V2 token](/tokens/apiv2) with `update:users` scope and is intended to use from server side code, where you can make sure that both users correspond to the same person.

## Scenarios

You can find implementation details of calling the Linking Account API for the different scenarios:

* [Automatic Account Linking](#automatic-account-linking)
* [User Initiated Account Linking](#user-initiated-account-linking)
* [Suggested Account Linking](#suggested-account-linking)

### Automatic Account Linking

**Auth0 does not support automatic linking per se**. However, you can implement automatic linking by setting up a [Rule](/rules) that link accounts with same e-mail address. For security purposes, it is a good practice to link accounts **only if both e-mails are verified**.

The rule is an example of linking accounts from server side code using the [Auth0 API Link Accounts endpoint](https://auth0.com/docs/api/v2#!/Users/post_identities), where you have the primary and secondary user ids and an [API V2 token](/tokens/apiv2) with `update:users` scope.

> There is a sample [Link Users by Email Rule](https://github.com/auth0/rules/blob/master/rules/link-users-by-email.md) which you can use as starting point.

### User Initiated Account Linking

Typically the account linking will be a manual process initiated by an authenticated user, and the Application will have to provide a proper UI for doing so, like a button in the user's profile page with the option to link to other accounts.

![](/media/articles/link-accounts/spa-user-settings.png)

> You can follow the [User Initiated Account Linking within a Single Page App Tutorial](/link-accounts/user-initiated-linking) or view the [jQuery Single Page App Linking Accounts Sample](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) on Github to see implementation details.

### Suggested Account Linking

In this scenario we search for users with same verified email address on authentication (like in the automatic linking rule), but instead of automatically linking the accounts we suggest the user to link the identities.

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

> You can follow the [Suggested Account Linking within a Regular Web App Tutorial](/link-accounts/suggested-linking) or view the [Suggested Account Linking Sample](https://github.com/auth0/auth0-link-accounts-sample/RegularWebApp) on Github for more implementation details.

## Unlinking Accounts

The Auth0 API V2 also provides an [endpoint for unlinking accounts](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id), which can be used with any of these two **scopes** for authorization:
* `update:current_user_identities`: Used in the case of calling the endpoint **from client side code**, where you have the primary user's JWT which counts with this scope.
* `update:users`: Used in the case of calling the endpoint **from server side code**, where you need to generate an [API V2 TOKEN](/tokens/apiv2) having this scope.

```
DELETE https://${account.namespace}/api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities/SECONDARY_ACCOUNT_PROVIDER/SECONDARY_ACCOUNT_USER_ID
Authorization: 'Bearer [PRIMARY_ACCOUNT_JWT OR API_V2_TOKEN]'
```

The endpoint will return the updated array of identities.
