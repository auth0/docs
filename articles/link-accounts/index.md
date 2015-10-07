---
url: /link-accounts
---

# Linking Accounts

Auth0 supports the association of different accounts. Applications often support multiple identity providers. Through linking, a user can authenticate with one identity provider and later on with another, but appear to the app as being the same.

## Scenarios

Some of the most typicall use cases for linking accounts are:

* Give users the flexibility to log in with any identity provider without accidentally creating separate profiles.

* Give already registered users the ability to use a social or passwordless login in order to don't have to remember the password anymore, but continue using the same profile.

* Give users that registered using a Passwordless connection the ability to link to an account with more richer profile data.

* Having an App with the ability to gather and leverage user’s profile data from more than one connection.

* Having an App that interacts with several identity provider's APIs, like sharing a status over Twitter & Facebook, or invite user's contacts from different social networks to your App. In this case the App will use the `access_token` of each Identity to access other identity provider's APIs. You can read [Calling an API from an IdP (Facebook, Twitter, Google)](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) for more details.

## Who initiates account linking?

Typically the account linking will be a manual process initiated by an authenticated user, and the Application will have to provide a proper UI for doing so. Like a button in the user's profile page with the option to link another accounts.

![](/media/articles/link-accounts/regular-web-app-user-settings.png)

You can also search for users with same verified email address from within your App's code and suggest the user to link the accounts if results are found.

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

**Auth0 does not support automatic account linking**. However, you can implement automatic linking by setting up a [Rule](/rules) that link accounts with same e-mail address. It is a good practice to link accounts **only if both e-mails are verified**. There is a sample [Link Users by Email Rule](https://github.com/auth0/rules/blob/master/rules/link-users-by-email.md) which you can use as starting point.

## Implementation

The Auth0 API V2 provides [an endpoint for linking accounts](https://auth0.com/docs/api/v2#!/Users/post_identities), which can be invoked in two ways. One requires the JWT of the authenticated user and the JWT of the target account to link to, and is meant to use by client-side code (Single Page Apps or mobile Apps). The other method requires an API V2 Token and is thus intended to use from server side code.

Both methods are explained in detail in these sections:

* [Linking Accounts from Client Side Code (Single Page App)](/link-accounts/client-side)
* [Linking Accounts from Server Side Code (Regular Web App)](/link-accounts/server-side)

> You can find implementation examples of Linking Accounts within both Single Page Apps and Regular Web Apps in [this github repository](https://github.com/auth0/auth0-link-accounts-sample)

There is also a [deprecated way of linking accounts](/link-accounts/auth-api) using the [Authentication API](https://auth0.com/docs/auth-api#!#get--link), but this method should not be used anymore.

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

Notice that the primary `user_id` is referring to the first identity the user authenticated with (Google in the example). Also, all user properties will continue to be those of the primary identity. There's no automatic merging of user profiles with associated identities.

> You can go through the [Linking Accounts Walthrough](/link-accounts/link-accounts-walkthrough) for a step by step guide on how to test account linking/unlinking using the API Explorer.

## Unlinking Accounts

The Auth0 API V2 provides also [an endpoint for unlinking accounts](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id). Again you can invoke within client side code using the JWT of the authenticated user and the JWT of the account to unlink, or you can invoke if from server side code using an API V2 Token with the proper scope. See:

* [Unlinking Accounts from Client Side Code (Single Page App)](/link-accounts/client-side#unlinking-accounts)
* [Unlinking Accounts from Server Side Code (Regular Web App)](/link-accounts/server-side#unlinking-accounts)