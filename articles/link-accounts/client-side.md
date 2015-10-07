# Account Linking from Client Side Code (Single Page App)

Account Linking from client side code is achieved by invoking the [Auth0 API Link Accounts endpoint](https://auth0.com/docs/api/v2#!/Users/post_identities) like this:

```
POST https://${account.namespace}/api/v2/users/YOUR_ROOT_USER_ID/identities
Authorization: 'Bearer YOUR_JWT'
{
  link_with: 'YOUR_OTHER_JWT'
}
```
The endpoint will responde with the new array of user's Identities. 

In order to call this endpoint from client side code you will require a token with `update:current_user_identities` scope, which the authenticated user's JWT already has.

> You can find a sample implementation of account linking from client side in the [jQuery Single Page App Linking Accounts Sample](https://github.com/auth0/auth0-link-accounts-sample/SPA) in Github.

## User Initiating Account Linking thru a UI interaction

1. In this scenario, the user will first authenticate to the Single Page App with any of the available connections, either using [Lock](https://github.com/auth0/lock), [Lock Passwordless](https://github.com/auth0/lock-passwordless), or [Auth0.js](https://auth0.com/docs/libraries/auth0js) and a custom UI.

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

  In this typical [SPA login](/libraries/lock/types-of-applications#single-page-app), the callback is handled client side by the same page, and a JWT is received after successful authentication. You can refer to [the Single Page Apps Quickstarts](/quickstart/spa) for more details. You can also read the [Passwordless for Single Page Apps Tutorials](https://auth0.com/docs/connections/passwordless/spa) for examples of passwordless logins.

2. The SPA will provide a way for the user to link another accounts (like social, passwordless or any), for example in the user's settings page:

  ![](/media/articles/link-accounts/spa-user-settings.png)

3. When the user clicks on any of the Link Account buttons, we will trigger another authentication to the account he wants to link to. After sucessfull authentication, we will use the obtained JWT to link the accounts.

  ### 3.1. Example handling the second authentication with Lock:

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

  ### 3.2. Example of handling the second authentication with Lock Passwordless

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

4. In the 'linkAccount` function we are calling the API v2 endpoint using the two JWTs:

  ```js
  function linkAccount(target_jwt){
    // At this point you could fetch user_metadata for merging with the root account
    // otherwise it will be lost after linking the accounts
    var user_id = localStorage.getItem('user_id');
    var id_token = localStorage.getItem('id_token');
    $.ajax({
      type: 'POST',
      url: 'https://' + AUTH0_DOMAIN +'/api/v2/users/' + user_id + '/identities',
      data: {
        link_with: target_jwt
      },
      headers: {
        'Authorization': 'Bearer ' + id_token
      }
    }).then(function(identities){
      alert('linked!');
      showLinkedAccounts(identities);
    }).fail(function(jqXHR){
      alert('Error linking Accounts: ' + jqXHR.status + " " + jqXHR.responseText);
    });
  }
  ```

> Notice that at this point you are able to grab the `user_metadata` from the target account to merge as desired before linking. Otherwise it will be lost after the accounts are linked.

## Unlinking Accounts

You can unlink accounts from client side code using the [API V2 unlink accounts endpoint](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id) like this:

```
DELETE https://${account.namespace}/api/v2/users/YOUR_ROOT_USER_ID/identities/TARGET_PROVIDER/TARGET_USER_ID
Authorization: 'Bearer YOUR_JWT'
```
The endpoint will return the updated Identities array.

In order to call this endpoint from client side code you will require a token with `update:current_user_identities` scope, which the authenticated user's JWT already has.

Sample Code for invoking the unlink endpoint:

```js
function unlinkAccount(provider,userId){
  var user_id = localStorage.getItem('user_id');
  var id_token = localStorage.getItem('id_token');
  $.ajax({
    type: 'DELETE',
    url: 'https://' + AUTH0_DOMAIN +'/api/v2/users/' + user_id + '/identities/' + provider + '/' + userId,
    headers: {
      'Authorization': 'Bearer ' + id_token
    }
  }).then(function(identities){
    alert('unlinked!');
    showLinkedAccounts(identities);
  }).fail(function(jqXHR){
    alert('Error unlinking Accounts: ' + jqXHR.status + " " + jqXHR.responseText);
  });
}
```