---
title: Unlink User Accounts
description: Learn how to use the Management API Unlink a User Account endpoint to unlink an identity from the target user account making it a separate user account again.
topics:
  - account-linking
contentType:
  - how-to
useCase:
  - manage-accounts
---
# Unlink User Accounts

Use the Auth0 Management API [Unlink a user account](/api/management/v2#!/Users/delete_user_identity_by_user_id) endpoint or the Auth0.js library to unlink an identity from the target user account making it a separate user account again. 

The result of the unlinking process is the following:
* The secondary account is removed from the identities array of the primary account.
* A new secondary user account is created.
* The secondary account will have no metadata.

::: note
If your goal is to delete the secondary identity entirely, you must first unlink the accounts, and then [delete the newly created secondary account](/users/guides/delete-users).
:::

Depending on from where you call the endpoint, use one of these two scopes:

* `update:current_user_identities` from [client-side code](/users/references/link-accounts-client-side-scenario)
* `update:users` from [server-side code](/users/references/link-accounts-server-side-scenario)

The endpoint uses the following parameters:

| Parameter | Type | Description |
| -- | -- | -- | 
| `id` | `string` | ID of the primary user account (required) |
| `provider` | `string` | identity provider name of the secondary linked account (e.g. `google-oauth2`) |
| `user_id` | `string` | ID of the secondary linked account (e.g. `123456789081523216417` part after the `|` in `google-oauth2|123456789081523216417`) |

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Response example

```js
[
  {
    "connection": "Initial-Connection",
    "user_id": "5457edea1b8f22891a000004",
    "provider": "auth0",
    "isSocial": false,
    "access_token": "",
    "profileData": {
      "email": "",
      "email_verified": false,
      "name": "",
      "username": "johndoe",
      "given_name": "",
      "phone_number": "",
      "phone_verified": false,
      "family_name": ""
    }
  }
]
```

## Use JWT from the primary account

To unlink accounts, call the Management API [Unlink a User Account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) using the JWT from the primary account for authorization:

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

## Use Access Token with the `update:users` scope

If you need to unlink two or more user accounts, call the Management API [Unlink a User Account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) using an [Management API Access Token](/api/v2/tokens) with the `update:users` scope.

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

## Unlink accounts from server-side code

1. Update the user in session with the new array of identities (each of which represent a separate user account).

    ```js
    const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
    const Auth0Client = require('../Auth0Client');
    const express = require('express');
    const router = express.Router();
    ...
    router.post('/unlink-accounts/:targetUserProvider/:targetUserId',ensureLoggedIn, (req,res,next) => {
      Auth0Client.unlinkAccounts(req.user.id, req.params.targetUserProvider, req.params.targetUserId)
      .then( identities => {
        req.user.identities = req.user._json.identities = identities;
        res.send(identities);
      })
      .catch( err => {
        console.log('Error unlinking accounts!',err);
        next(err);
      });
    });
    ```

2. Call the Management API v2 [Unlink a User Account endpoint](/api/v2#!/Users/delete_user_identity_by_user_id) using an [Management API Access Token](/api/v2/tokens) with the `update:users` scope.

    ```js
    const request = require('request');

    class Auth0Client {
      ...
      unlinkAccounts(rootUserId, targetUserProvider, targetUserId){
        return new Promise((resolve,reject) => {
          var reqOpts = {
            method: 'DELETE',
            url: 'https://${account.namespace}/api/v2/users/' + rootUserId +
                '/identities/' + targetUserProvider + '/' + targetUserId,
            headers: {
              'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN
            }
          };
          request(reqOpts,(error, response, body) => {
            if (error) {
              return reject(error);
            } else if (response.statusCode !== 200) {
              return reject('Error unlinking accounts. Status: '+ response.statusCode + ' ' + JSON.stringify(body));
            } else {
              resolve(JSON.parse(body));
            }
          });
        });
      }
    }

    module.exports = new Auth0Client();
    ```

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Account Link Extension](/extensions/account-link)
* [Link User Accounts Client-Side Code Scenario](/users/references/link-accounts-client-side-scenario)
* [Link User Accounts Server-Side Code Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-acounts-user-initiated-scenario)
* [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking)
