---
description: How to provide a UI for the user to authenticate to their other accounts and link these to their primary account.
crews: crew-2
tags:
  - account-linking
  - client-side
---

# User Initiated Account Linking

In this scenario, your app provides a UI for the user to authenticate to their other accounts and to link these to their primary account.

::: note
You can find sample code at [User Initiated Account Linking within a Single Page App](https://github.com/auth0/auth0-link-accounts-sample/tree/master/SPA) on Github.
:::

The following steps implement user-initiated account linking for a Single Page Application.

## 1. Initial login

First, the user will authenticate to the Single Page App using either [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) and a custom UI.

![](/media/articles/link-accounts/spa-initial-login.png)

The following is a sample login using Lock:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">

  //Log in using Lock in Redirect Mode
  function login(){
    lock.show();
  }

  function lockAuthenticated(authResult) {
    // Called when the user is authenticated
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        alert('There was an error getting user info. ' + error);
        return;
      }

      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('user_id', profile.user_id);
      showLoggedInUser(profile);
    });
  }

  $(document).ready(function() {
    lock.on("authenticated", lockAuthenticated);
  });

</script>
<button onclick="javascript:login()">Login</button>
```

In the typical SPA login, the callback is handled client-side by the same page and a JWT is received after successful authentication. You can refer to the [Single Page Apps Quickstarts](/quickstart/spa) for more details. You can also see the [Passwordless for Single Page Apps](/connections/passwordless/spa) tutorials for examples of passwordless login.

## 2. User initiates account linking

Your SPA must provide a UI for the user to initiate a link to their other accounts (social, passwordless, and so on). For example, in the user's settings page:

![](/media/articles/link-accounts/spa-user-settings.png)

When the user clicks on any of the **Link Account** buttons, your app will trigger authentication to the account selected. After successful authentication, use the obtained JWT to link the accounts.

### Handle the second authentication with Lock

```html
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

### Handle the second authentication with Passwordless Mode

```html
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

## 3. Perform linking by calling the Auth0 Management API

In the `linkAccount` function, call the Management API V2 [Link a user account endpoint](/api/v2#!/Users/post_identities) using both of the JWTs:

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

If you wish to retain and merge the `user_metadata` from the secondary account, you must retrieve it before calling the API endpoint. It will be discarded when the accounts are linked.

Also, you can select which identity will be used as the primary account and which as the secondary when calling the account linking. This choice will depend on which set of attributes you wish to retain in the primary profile.

## 4. Unlinking accounts

For unlinking accounts, invoke the Management API v2 [Unlink a user account endpoint](/api/v2#!/Users/delete_provider_by_user_id) using the JWT from the primary account for authorization:

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
