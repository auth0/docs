---
description: How to provide a UI for the user to authenticate to their other accounts and link these to their primary account.
crews: crew-2
topics:
  - account-linking
  - client-side
contentType:
  - reference
useCase:
  - manage-accounts
---

# Link User Accounts Client-Side Scenario

Auth0 supports the linking of user accounts from various identity providers.

One way to implement this functionality is to enable the user to explicitly link accounts. In this scenario, the user authenticates and can later on use a link or a button in order to link another account to the first one. The user would click on this link/button and your application would make a call so that when the user logs in with the second provider, the second account is linked with the first.

The following steps implement this scenario for a Single-Page Application (SPA). You can find the sample code at [User Initiated Account Linking within a Single-Page App](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) on Github.

## Step 1: Initial login

Start by logging in the user to your application.

The recommended implementation is to use [Universal Login](/hosted-pages/login). You can find detailed guidance on how to do just that at our [JavaScript Quickstart](/quickstart/spa/vanillajs).

If you choose instead to embed the [Lock](/libraries/lock/v11) widget or the [auth0.js library](/libraries/auth0js/v9) in your app, you can review the sample code for this tutorial in the [Auth0 jQuery Single-Page App Account Linking Sample](https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/SPA) repo on Github.

If you don't use Lock at all, but call the Authentication API directly, follow our tutorial, [Call API Using the Implicit Flow](/flows/guides/implicit/call-api-implicit) tutorial.

## Step 2: User initiates account linking

Your SPA must provide a UI for the user to initiate a link to their other accounts (social, <dfn data-key="passwordless">passwordless</dfn>, and so on). For example, in the user's settings page.

![SPA user setting's page](/media/articles/link-accounts/spa-user-settings.png)

When the user clicks on any of the **Link Account** buttons, your app will trigger authentication to the account selected. After successful authentication, use the obtained token to link the accounts.

### Handle the second authentication with Lock

```js
/*
* Link Accounts.
*/
function linkPasswordAccount(connection) {
  localStorage.setItem('linking','linking');

  // Instantiates Lock, to get a token that will be then used to
  // link the account

  var opts = {
    rememberLastLogin: false,
    auth: {
      responseType: 'token id_token',
    },
    dict: {
      signin: {
        title: 'Link another account'
      }
    }
  };

  if (connection) {
    opts.allowedConnections = [connection];
  }

  lock = new Auth0Lock( AUTH0_CLIENT_ID , AUTH0_DOMAIN, opts);
  lock.show();
}

/*
* Handles the "authenticated" event for all Lock log-ins.
*/
function lockAuthenticated(authResult) {
    if (localStorage.getItem('linking') === 'linking') {
      // The "Link Account" method first saves the "linking" item and then authenticates
      // We identify that flow here, so after each subsequent log-in, we link the accounts
      localStorage.removeItem('linking');
      linkAccount(authResult.idToken);
    } else {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('user_id', authResult.idTokenPayload.sub);
        reloadProfile();
    }
}
```

In the sample you can also find the code in order to handle the second authentication with Passwordless and SMS (see function `linkPasswordlessSMS`), Passwordless and email code (see `linkPasswordlessEmailCode`), or Passwordless and Magic Link (see `linkPasswordlessEmailLink`).

## Step 3: Call the API to link accounts

In the `linkAccount` function, call the Management API V2 [Link a user account endpoint](/api/v2#!/Users/post_identities). Authenticate with the API using the Access Token, and link using the primary user's ID and the secondary user's ID Token.

```js
function linkAccount(secondaryIdToken) {

  // At this point you could fetch the secondary account's user_metadata for merging with the primary account.
  // Otherwise, it will be lost after linking the accounts

  // Uses the Access Token of the primary user as a bearer token to identify the account
  // which will have the account linked to, and the ID Token of the secondary user, to identify
  // the user that will be linked into the primary account.

  var primaryAccessToken = localStorage.getItem('access_token');
  var primaryUserId = localStorage.getItem('user_id');

  $.ajax({
    type: 'POST',
    url: 'https://' + AUTH0_DOMAIN +'/api/v2/users/' + primaryUserId + '/identities',
    data: {
      link_with: secondaryIdToken
    },
    headers: {
      'Authorization': 'Bearer ' + primaryAccessToken
    }
  }).then(function(identities){
    alert('linked!');
    reloadProfile();
  }).fail(function(jqXHR){
    alert('Error linking Accounts: ' + jqXHR.status + " " + jqXHR.responseText);
  });
}
```

If you wish to retain and merge the `user_metadata` from the secondary account, you must retrieve it before calling the API endpoint. It will be discarded when the accounts are linked.

Also, you can select which identity will be used as the primary account and which as the secondary when calling the account linking. This choice will depend on which set of attributes you wish to retain in the primary profile.

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking)
* [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-acounts-user-initiated-scenario)