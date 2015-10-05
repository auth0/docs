---
url: /link-accounts
---

# Linking Accounts

Auth0 supports the association of different accounts. Applications often support multiple identity providers. Through linking, a user can authenticate with one identity provider and later on with another, but appear to the app as being the same.

## Scenarios

Some of the most typicall use cases for linking accounts are:

* Give users the flexibility to login with any identity provider without accidentally creating separate profiles.

* Give users registered with a username & password connection the ability to use a social or passwordless login in order to don't have to remember the password anymore, but continue using the same profile.

* Having an App with the ability to gather and leverage user’s profile data from more than one connection.

* Having an App that interacts with another (or several) identity provider's APIs, like sharing a status over Twitter & Facebook, or invite user's contacts from different social networks to your App. In this case the App will use the `access_token` of each Identity to access other identity provider's APIs. You can read [Calling an API from an IdP (Facebook, Twitter, Google)](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) for more details.

## Who initiates account linking?

Typically the account linking will be a manual process initiated by an authenticated user, and the Application will have to provide a proper UI for doing so. Like a button in the user's profile page with the option to link another accounts.

You can also search for users with same verified email address from within your App's code and suggest the user to link the accounts if results are found.

> You can find [Sample Web Applications for Account Linking on Github](https://github.com/auth0/auth0-link-accounts-sample).

![](/media/articles/link-accounts/link-account-SPA.png)

**Auth0 does not support automatic account linking**. However, you can implement automatic linking by setting up a [Rule](/rules). It is a good practice to link accounts **only if both users' e-mails are verified**.

> There is a sample [Account Linking Rule](https://github.com/auth0/rules/blob/master/rules/link-users-by-email.md) which you can use as starting point.

## The API

The [Auth0 API v2](https://auth0.com/docs/api/v2) provides two methods for linking accounts, depending on where the code will run:

* [Linking Accounts from Client Side Code](/client-side)
* [Linking Accounts from Server Side Code](/server-side)

There is also a [deprecated way of linking accounts](auth-api) using the [Authentication API](https://auth0.com/docs/auth-api#!#get--link), but this method should not be used anymore.

## Resulting Profile

All linked identities will show up in the `User Profile` like in this example:

```
{
  "clientID": "FnMZ8gwv39....ZAeKc",
  "email": "your@mail.com",
  "family_name": "Pace",
  "given_name": "Eugenio",
  "identities": [
    {
      "access_token": "ya29.AHES6.......iNkgkE_ryDsTE",
      "provider": "google-oauth2",
      "user_id": "12345678901234567890",
      "connection": "google-oauth2",
      "isSocial": true
    },
    {
      "access_token": "EwAwAq1DBAAUGCC....qJQloRoZbmCAAA",
      "provider": "windowslive",
      "user_id": "9876543210987654321",
      "connection": "windowslive",
      "isSocial": true
    }
  ],
  "locale": "en",
  "name": "Eugenio Pace",
  "nickname": "eugeniop",
  "user_id": "google-oauth2|12345678901234567890"
}

```

> Notice that the primary `user_id` is referring to the first identity the user authenticated with (Google in the example). Also, all user properties will continue to be those of the primary identity. There's no automatic merging of user profiles with associated identities.

You can go through the [Linking Accounts Walthrough](./link-accounts-walkthrough) for a step by step guide on how to test account linking/unlinking using the API Explorer.

### Unlinking Accounts

To unlink a specific account, POST request to the following url:

`https://${account.namespace}/unlink`

Body should be:

```
{
    access_token: "LOGGED_IN_USER_ACCESS_TOKEN", // Primary identity access_token
    user_id: "LINKED_USER_ID" // (provider|id)
}
```

Using the sample `User Profile` above, to __unlink__ the Windows Live Id identity, you would send, `user_id: 'windowslive|9876543210987654321'`.

You can also unlink the accounts from server side code using the [API V2](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id).

![](/media/articles/link-accounts/unlink-accounts-api-explorer.png)