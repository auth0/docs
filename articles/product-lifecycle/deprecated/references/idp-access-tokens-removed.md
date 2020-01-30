---
description: Describes how the identity provider access tokens have been removed from the user profile and ID Tokens. 
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---
# Deprecation Notice: Identity Provider Access Tokens 

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | 2016-07-11 | 2016-08-18 |

The format of the user profile JSON object (ID Token) that is returned by Auth0 Authentication APIs has been changed to remove the Identity Provider's Access Token, which had been included in the user profile `identities` array.

Now, to obtain a user's IdP Access Token, you will need to make an HTTP GET call to the `/api/v2/users/{user-id}` endpoint containing an API token generated with  `read:user_idp_tokens` <dfn data-key="scope">scope</dfn>.

::: note
You will still have access to the Identity Provider Access Token in the `user` argument in Auth0 [rules](/rules).
:::

## Am I affected by the change?

You are affected by the change only if you are using the Identity Provider Access Token (`identities[0].access_token` in the user profile) outside of rules to call other services from the Identity Provider (such as Facebook Graph API, Google APIs, and so on).

For more information on how to obtain an Access Token, see: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) and [Identity Provider Access Tokens](/tokens/overview-idp-access-tokens).

::: note
If your tenant was created after the change, this update will be applied automatically.
:::
