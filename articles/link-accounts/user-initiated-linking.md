# User Initiated Account Linking

In this scenario the Application provides a UI for the user to be able to autheticate to other accounts and linked them to the primary account.

> You can find the code for the [User Initiated Account Linking within a Single Page App Sample](https://github.com/auth0/auth0-link-accounts-sample/SPA) on Github.

We will follow the implementation steps here for the case of a Single Page Application:

## 1. Initial Login

The user will first authenticate to the Single Page App with any of the available connections, either using [Lock](https://github.com/auth0/lock), [Lock Passwordless](https://github.com/auth0/lock-passwordless), or [Auth0.js](https://auth0.com/docs/libraries/auth0js) and a custom UI.

![](/media/articles/link-accounts/spa-initial-login.png)

Sample Login using Lock:

```html
<script src="${widget_url}"></script>
<script type="text/javascript">  
  //Log in using Lock in Redirect Mode
  function login(){
    lock.show();
  }

  //handle redirection from iDP after login  
  $(document).ready(function() {
    var hash = lock.parseHash();
    if (hash) {
      if (hash.error) {
        alert('There was an error logging in ' + hash.error );
      } else {
        ...
        // the hash comes from the site's first time login
        lock.getProfile(hash.id_token, function(err, profile) {
          if (err) {
            alert('There was an error logging in. ' + err);
          } else {
            // Save the JWT token.
            localStorage.setItem('id_token', hash.id_token);
            localStorage.setItem('user_id', profile.user_id);
            showLoggedInUser(profile);
          }
        });
      }
    }
  });
</script>
<button onclick="javascript:login()">Login</button>
```

In this typical [SPA login](/libraries/lock/types-of-applications#single-page-app), the callback is handled client side by the same page, and a JWT is received after successful authentication. You can refer to [the Single Page Apps Quickstarts](/quickstart/spa) for more details. You can also read the [Passwordless for Single Page Apps Tutorials](https://auth0.com/docs/connections/passwordless/spa) for examples of passwordless login.

## 2. User Initiates Account Linking thru App UI

The SPA will provide a way for the user to link to other accounts (like social, passwordless or any), for example in the user's settings page:

![](/media/articles/link-accounts/spa-user-settings.png)

When the user clicks on any of the Link Account buttons, we will trigger another authentication to the account he wants to link to. After sucessfull authentication, we will use the obtained JWT to link the accounts.

  ### 2.1. Example of handling the second authentication with Lock:

  ```html
  <script src="${widget_url}"></script>
  <script type="text/javascript">
    var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
  
    function linkPasswordAccount(connection){
      var opts = {
        rememberLastLogin: false,
        dict: {
          signin: {
            title: 'Link another account'
          }
        }
      };
      if (connection){
        opts.connections = [connection];
      }
      //open lock in signin mode, with the customized options for linking
      lock.showSignin(opts);
    }

    $(document).ready(function() {
      ...
      var hash = lock.parseHash();
      //handle redirection from iDP after login
      if (hash) {
        if (hash.error) {
          alert('There was an error logging in ' + hash.error );
        } else {
          // there is already a logged in user, the hash comes from a linking account operation, 
          // and we should continue with the linking procedure
          if (isUserLoggedIn){
            linkAccount(hash.id_token);
          } else {
            // the hash comes from the site's first time login
            ...
          }
        }
      }
    });
  </script>
  <button onclick="linkPasswordAccount()">Link Account</button>
  ```

  ### 2.2. Example of handling the second authentication with Lock Passwordless

  ```html
  <script src="${lock_passwordless_url}"></script>
  <script type="text/javascript">
    function linkPasswordlessSMS(){
      // Initialize Passwordless Lock instance
      var lock = new Auth0LockPasswordless( '#{env.AUTH0_CLIENT_ID}', '#{env.AUTH0_DOMAIN}' );
  
      var opts = { 
        autoclose: true, 
        rememberLastLogin: false,
        dict:{
          phone: {
            headerText: "Enter your phone to sign in <br>or create an account to link to."
          }
        }
      };
      // Open the lock in SMS mode with the ability to handle the authentication in page
      lock.sms( opts, function (err, profile, id_token) {
        if (!err){
          linkAccount(id_token);
        }
      });
    }
  </script>
  <button onclick="linkPasswordlessSMS()">SMS</a>
  ```    
## 3. Perform linking by calling the Auth0 API 

In the `linkAccount` function we are calling the [API V2 account linking endpoint](https://auth0.com/docs/api/v2#!/Users/post_identities) using the two JWTs:

```js
function linkAccount(secondaryJWT){
  // At this point you can fetch the secondary user_metadata for merging 
  // with the primary account. Otherwise it will be lost after linking the accounts
  var primaryJWT = localStorage.getItem('id_token');
  var primaryUserId = localStorage.getItem('user_id');
  $.ajax({
    type: 'POST',
    url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + primaryUserId + '/identities',
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

Notice that at this point you are able to grab the `user_metadata` from the secondary account to merge as desired before linking. Otherwise it will be lost after the accounts are linked.

You can also **choose which identity you will use as primary and which as secondary to invoke the account linking**. This decision will depend of the attributes you want to have available in the primary profile.

## 4. Unlinking Accounts

For unlinking the accounts we invoke the [API V2 unlinking accounts endpoint](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id) using the primary account's JWT for authorization:

```js
function unlinkAccount(secondaryProvider, secondaryUserId){
  var primaryUserId = localStorage.getItem('user_id');
  var primaryJWT = localStorage.getItem('id_token');
  $.ajax({
    type: 'DELETE',
    url: 'https://' + AUTH0_DOMAIN +'/api/v2/users/' + primaryUserId +
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