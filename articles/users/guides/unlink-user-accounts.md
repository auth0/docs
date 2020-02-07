---
title: Unlink User Accounts
description: Learn how to unlink user accounts.
topics:
  - account-linking
contentType:
  - how-to
useCase:
  - manage-accounts
---
# Unlink User Accounts

The Auth0 Management API V2 provides an [Unlink a user account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) which can be used with either of these two **scopes**:

* `update:current_user_identities`: when you call the endpoint from [client-side code](/users/references/link-accounts-client-side-scenario).
* `update:users`: when you call the endpoint from [server-side code](/users/references/link-accounts-server-side-scenario).

The result of the unlinking process is the following:
* The secondary account is removed from the identities array of the primary account
* A new secondary user account is created
* The secondary account will have no metadata

::: panel Delete Secondary Identity
If your goal is to delete the secondary identity entirely, you must first unlink the accounts, and then delete the newly created secondary account.
:::

## Use JWT from the primary account

To unlink accounts, invoke the Management API v2 [Unlink a user account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) using the JWT from the primary account for authorization:

```js
function unlinkAccount(secondaryProvider, secondaryUserId){
  var primaryUserId = localStorage.getItem('user_id');
  var primaryJWT = localStorage.getItem('id_token');
  $.ajax({
    type: 'DELETE',
    url: 'https://' + '${account.namespace}' + '/api/v2/users/' + primaryUserId +
         '/identities/' + secondaryProvider + '/' + secondaryUserId,
    headers: {
      'Authorization': 'Bearer ' + primaryJWT
    }
  }).then(function(identities){
    alert('unlinked!');
    showLinkedAccounts(identities);
  }).fail(function(jqXHR){
    alert('Error unlinking Accounts: ' + jqXHR.status + ' ' + jqXHR.responseText);
  });
}
```

## Use Access Toke with the `update:users` scope

If you need to unlink two or more user accounts, call the Management API v2 [Unlink a User Account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) using an [Management API Access Token](/api/v2/tokens) with the `update:users` scope.

```js
function unlinkAccount(secondaryProvider, secondaryUserId) {
  var primaryUserId = localStorage.getItem('user_id');
  var primaryAccessToken = localStorage.getItem('access_token');

  // Uses the Access Token of the primary user as a bearer token to identify the account
  // which will have the account unlinked to, and the user id of the secondary user, to identify
  // the user that will be unlinked from the primary account.

  $.ajax({
    type: 'DELETE',
    url: 'https://' + AUTH0_DOMAIN +'/api/v2/users/' + primaryUserId +
         '/identities/' + secondaryProvider + '/' + secondaryUserId,
    headers: {
      'Authorization': 'Bearer ' + primaryAccessToken
    }
  }).then(function(identities){
    alert('unlinked!');
    showLinkedAccounts(identities);
  }).fail(function(jqXHR){
    alert('Error unlinking Accounts: ' + jqXHR.status + ' ' + jqXHR.responseText);
  });
}
```

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Link User Accounts Client-Side Scenario](/users/references/link-accounts-client-side-scenario)
* [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-acounts-user-initiated-scenario)