---
title: Unlink User Accounts
description: Learn how to link user accounts from various identity providers, so your users can authenticate from any of their accounts and still be recognized by your app and associated with the same user profile
crews: crew-2
topics:
  - account-linking
contentType:
  - how-to
useCase:
  - manage-accounts
---
# Unlink User Accounts

The Auth0 Management API V2 provides an [Unlink a user account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) which can be used with either of these two **scopes**:

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

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Link User Accounts Client-Side Scenario](/users/references/link-accounts-client-side-scenario)
* [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-acounts-user-initiated-scenario)