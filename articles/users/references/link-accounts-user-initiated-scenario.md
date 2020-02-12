---
description: Describes how to authenticate users to their other accounts and link these to their primary account using a user initiated scenario with a SPA.
crews: crew-2
topics:
  - account-linking
  - client-side
contentType:
  - reference
useCase:
  - manage-accounts
---

# Link User Accounts Initiated by Users Scenario

In this scenario, your SPA provides a UI for the user to authenticate to their other accounts and to link these to their primary account. See [User Initiated Account Linking within a Single-Page App](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) for sample code.

1. The user authenticates to the SPA using either [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) and a custom UI.

    In the typical SPA login, the callback is handled client-side by the same page and a JWT is received after successful authentication. You can refer to the [Single-Page Apps Quickstarts](/quickstart/spa) for more details. You can also see the [Implement Passwordless](/connections/passwordless) tutorial for examples of <dfn data-key="passwordless">passwordless</dfn> login.

2. User initiates account linking. Your SPA must provide a UI for the user to initiate a link to their other accounts (social, passwordless, and so on). For example, in the user's settings page:

    ![SPA User Settings Example](/media/articles/link-accounts/spa-user-settings.png)

When the user clicks on any of the **Link Account** buttons, your app triggers authentication to the account selected. After successful authentication, use the obtained JWT to link the accounts.

3. Perform linking by calling the Management API [Link a user account endpoint](/api/v2#!/Users/post_identities). 

    ::: note
    To retain and merge the `user_metadata` from the secondary account, you must retrieve it before calling the API endpoint. It will be discarded when the accounts are linked. You can select which identity will be used as the primary account and which as the secondary when calling the account linking. This choice will depend on which set of attributes you wish to retain in the primary profile.
    :::

    In the `linkAccount` function, call the Management API using both of the JWTs:

    ```js
    function linkAccount(secondaryJWT){
      // At this point you can fetch the secondary user_metadata for merging
      // with the primary account. Otherwise it will be lost after linking the accounts
      var primaryJWT = localStorage.getItem('id_token');
      var primaryUserId = localStorage.getItem('user_id');
      $.ajax({
        type: 'POST',
        url: 'https://' + '${account.namespace}' + '/api/v2/users/' + primaryUserId + '/identities',
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
* [Link User Accounts Client-Side Scenario](/users/references/link-accounts-client-side-scenario)
* [Link User Accounts Server-Side Scenario](/users/references/link-accounts-server-side-scenario)
