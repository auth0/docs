---
title: Link User Accounts Client-Side Code Scenario
description: Learn how to provide a client-side UI that allows users to authenticate to their other accounts and link these to their primary account using a SPA.
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

Auth0 supports the linking of user accounts from various identity providers. One way to implement this functionality is to enable the user to explicitly link accounts. In this scenario, the user authenticates through the UI of your Single Page Application (SPA) and can later use a link or button to link another account to the first one. When the user clicks on this link/button, your application makes a call so that when the user logs in with the second provider, the second account is linked with the first.

When calling account linking, you can select which identity to use as the primary account and which to use as the secondary. This choice depends on which set of attributes you want to retain in the primary profile.

1. Log the user in to your application. 

    The user authenticates to your SPA using either [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) and a custom UI. We recommend using [Universal Login](/universal-login).

    In the typical SPA login, the callback is handled client-side by the same page, and a JWT is received after successful authentication. For details, see the [Single-Page App Quickstarts](/quickstart/spa) or, if you want to call the Authentication API directly, see [Call Your API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce). You can also see the [Implement Passwordless](/connections/passwordless) tutorial for examples of <dfn data-key="passwordless">passwordless</dfn> login.

2. The user initiates account linking. Your SPA must provide a UI for the user to initiate a link to their other accounts (e.g., social, <dfn data-key="passwordless">passwordless</dfn>). For example, your SPA could contain a user's settings page:

    ![SPA User Settings Example](/media/articles/link-accounts/spa-user-settings.png)

    When the user clicks on any of the **Link Account** buttons, your app triggers authentication to the selected account. After successful authentication, use the obtained token to link the accounts.

3. Link accounts by calling the Auth0 Management API's [Link a User Account endpoint](/api/v2#!/Users/post_identities).

    ::: warning
    To retain and merge the `user_metadata` from the secondary account, you must retrieve and merge it into the metadata for the primary account before calling the API endpoint. After the accounts are linked, the metadata for the secondary account is discarded. 
    
    When calling account linking, you can select which identity will be used as the primary account and which as the secondary. This choice will depend on which set of attributes you want to retain in the primary profile.
    :::

    In the `linkAccount` function, call the Management API. Authenticate with the API using the primary JWT, which is the Access Token, and link using the primary user's ID and the secondary JWT, which is the secondary user's ID Token.

    ```js
    function linkAccount(secondaryJWT) {

      // At this point you can fetch the secondary account's user_metadata for merging with the primary account.
      // Otherwise, it will be lost after linking the accounts.

      // Uses the Access Token of the primary user as a bearer token to identify the account
      // to which you will link, and the ID Token of the secondary user to identify
      // the user that will be linked into the primary account.

      var primaryJWT = localStorage.getItem('access_token');
      var primaryUserId = localStorage.getItem('user_id');

      $.ajax({
        type: 'POST',
        url: 'https://' + AUTH0_DOMAIN +'/api/v2/users/' + primaryUserId + '/identities',
        data: {
          link_with: secondaryJWT
        },
        headers: {
          'Authorization': 'Bearer ' + primaryJWT
        }
      }).then(function(identities){
        alert('linked!');
        showLinkedAccounts(identities);
      }).fail(function(jqXHR){
        alert('Error linking Accounts: ' + jqXHR.status + " " + jqXHR.responseText);
      });
    }
    ```
## Example using Lock

```js
<script src="${lock_url}"></script>
<script type="text/javascript">
  var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

  function linkPasswordAccount(connection){
    var opts = {
      rememberLastLogin: false,
      languageDictionary: {
        title: 'Link with another account'
      },
      auth: {
        responseType: 'token id_token'
      }
    };

    if (connection) {
      opts.connections = [connection];
    }

    // open lock in signin mode with the customized options for linking
    lock = new Auth0Lock('${account.clientId}', '${account.namespace}', opts);
    lock.show();
  }

  function lockAuthenticated(authResult)
  {
      if (isUserLoggedIn) {
        linkAccount(authResult.idToken, authResult.idTokenPayload.sub);
      } else {
        // handle authentication for the first login
      }
  }

  $(document).ready(function() {
    lock.on("authenticated", lockAuthenticated);
  });
  
</script>
<button onclick="linkPasswordAccount()">Link Account</button>
```

## Example using Passwordless Mode

```js
<script src="${lock_url}"></script>
<script type="text/javascript">
  function linkPasswordlessSMS(){
    
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}',
    {
      autoclose: true,
      allowedConnections: ["sms"],
      languageDictionary: {
        passwordlessSMSInstructions: "Enter your phone to sign in <br>or create an account to link to."
      }
    });

    lock.on("authenticated", function(authResult)) {
      linkAccount(authResult.idToken);
    }

    lock.show();
  }
</script>
<button onclick="linkPasswordlessSMS()">SMS</a>
```

<%= include('../_includes/_account-linking-id-tokens.md') %>

## Keep reading

* [User Account Linking Overview](/users/concepts/overview-user-account-linking)
* [Link User Accounts](/users/guides/link-user-accounts)
* [Unlink User Accounts](/users/guides/unlink-user-accounts)
* [Link User Accounts Server-Side Code Scenario](/users/references/link-accounts-server-side-scenario)
