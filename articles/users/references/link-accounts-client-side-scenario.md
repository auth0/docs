---
description: Describes how to provide a client-side UI for the user to authenticate to their other accounts and link these to their primary account using a SPA scenario.
crews: crew-2
topics:
  - account-linking
  - client-side
contentType:
  - reference
useCase:
  - manage-accounts
---

# Link User Accounts Client-Side Code Scenario

Auth0 supports the linking of user accounts from various identity providers. One way to implement this functionality is to enable the user to explicitly link accounts. In this scenario, the user authenticates and can later on use a link or a button to link another account to the first one. When the user clicks on this link/button, your application makes a call so that when the user logs in with the second provider, the second account is linked with the first.

You can select which identity to use as the primary account and which as the secondary when calling the account linking. This choice depends on which set of attributes you want to retain in the primary profile.

The following steps implement this scenario for a Single-Page Application (SPA). See [User Initiated Account Linking within a Single-Page App](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) for sample code.

1. Log in the user to your application. 

    - Auth0 recommends using [Universal Login](/hosted-pages/login). 
    - If you choose to embed the [Lock](/libraries/lock/v11) widget or the [auth0.js library](/libraries/auth0js/v9) in your app, see [Auth0 jQuery Single-Page App Account Linking Sample](https://github.com/auth0-samples/auth0-link-accounts-sample/tree/master/SPA) for sample code.
    - If you call the Authentication API directly, see [Call API Using the Implicit Flow](/flows/guides/implicit/call-api-implicit).

2. User initiates account linking. Your SPA must provide a UI for the user to initiate a link to their other accounts (social, <dfn data-key="passwordless">passwordless</dfn>, and so on). For example, in the user's settings page.

    ![SPA user setting's page](/media/articles/link-accounts/spa-user-settings.png)

    When the user clicks on any of the **Link Account** buttons, your app will trigger authentication to the account selected. After successful authentication, use the obtained token to link the accounts.

    In the sample you can also find the code in order to handle the second authentication with Passwordless and SMS (see function `linkPasswordlessSMS`), Passwordless and email code (see `linkPasswordlessEmailCode`), or Passwordless and Magic Link (see `linkPasswordlessEmailLink`).

3. Call the API to link accounts. In the `linkAccount` function, call the Management API V2 [Link a user account endpoint](/api/v2#!/Users/post_identities). Authenticate with the API using the Access Token, and link using the primary user's ID and the secondary user's ID Token.

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

4. To retain and merge the `user_metadata` from the secondary account, you must retrieve it before calling the API endpoint. It will be discarded when the accounts are linked.

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Link User Accounts Server-Side Code Scenario](/users/references/link-accounts-server-side-scenario)
* [Link User Accounts Initiated by Users Scenario](/users/references/link-accounts-user-initiated-scenario)
