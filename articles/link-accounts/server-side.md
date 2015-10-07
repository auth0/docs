# Account Linking from Server Side Code (Regular Web App)

Account Linking from server side code is achieved by invoking the [Auth0 API Link Accounts endpoint](https://auth0.com/docs/api/v2#!/Users/post_identities) like this:

```
POST https://${account.namespace}/api/v2/users/YOUR_ROOT_USER_ID/identities
Authorization: 'Bearer YOUR_API_V2_TOKEN'
{ 
	provider: 'TARGET_USER_PROVIDER', 
	user_id: 'TARGET_USER_ID' 
} 
```

In order to call this endpoint from server side code, you will require an [API V2 token](/tokens/apiv2) with `update:users` scope. 

> You can find a sample implementation of Account Linking from server side code in the [Node.js Regular Web App Linking Accounts Sample](https://github.com/auth0/auth0-link-accounts-sample/RegularWebApp) in Github.

## Account Linking Initiated by Authenticated User

1. In this scenario, the user will first authenticate to the web site with any of the available connections, either using [Lock](https://github.com/auth0/lock), [Lock Passwordless](https://github.com/auth0/lock-passwordless), or [Auth0.js](https://auth0.com/docs/libraries/auth0js) and a custom UI. 
 
	![](/media/articles/link-accounts/regular-web-app-initial-login.png)

	Sample login with Lock:

	```html
	<script src="${widget_url}"></script>
	<script type="text/javascript">
	  function signin() {    
		  var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
		  lock.show({
		      callbackURL: '${account.callback}'
		    , responseType: 'code'
		    , authParams: {
		      scope: 'openid'
		    }
		  });
		}
	</script>
	<button onclick="signin()">Login</a>
	```

	In this typical [Regular Web App login](/libraries/lock/types-of-applications#regular-webapp), a **callbackURL** is passed to `lock.show`, which needs to be handled server side. After sucessful authentication a **session** is created, containing the authenticated user's profile.

	You can refer to [the Node.js Regular Web App Quickstart](/quickstart/webapp/nodejs) for more details.

	You can also read the [Passwordless for Regular Web Apps Tutorials](https://auth0.com/docs/connections/passwordless/regular-web-app) for examples of passwordless logins.

2. The web site will provide a way for the user to link another accounts (like social, passwordless or any), for example in the user's settings page.

	![](/media/articles/link-accounts/regular-web-app-user-settings.png)

3. When the user clicks on any of the Link Account buttons, we will ask him to authenticate with the account he wants to link to. But this time we will handle the callback client side because we don't want to start a new session. We only need the target user's id in order to link the accounts.

	### 3.1. Example handling the second authentication with Lock:

  	```html
  	<script src="${widget_url}"></script>
  	<script type="text/javascript">
  		var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

  		// when user clicks the Link Account button, 
  		// we open lock with options customized for linking
      function linkNewAccount(){
        lock.showSignin({
          rememberLastLogin:false,
          dict: {
            signin: {
              title: 'Link another account'
            }
          }
        });
      }

      // the linkAccount function will call the server side endpoint 
      // with the target userId
      function linkAccount(targetUserId) {
        $.ajax({
          type: 'POST',
          url: '/user/link-accounts/' + targetUserId,
        }).then(function(){
          alert('linked!!');
          location.reload(); //reload to update the user profile in the UI
        }).fail(function(err){
          alert('error ' + JSON.stringify(err));
        });
      }
      
      $(document).ready(function() {
        //handle redirection from the iDP after login to a new account for linking
        var hash = lock.parseHash();
        if (hash) {
          if (hash.error) {
            alert('There was an error logging in ' + hash.error );
          } else {
            //call to link accounts using the newly authenticated user's id
            linkAccount(hash.profile.sub);
          }
        }
      });
    </script>
    <button onclick="linkNewAccount()">Link to another Account</button>
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
        lock.sms( opts , function (err, profile) {
          if (!err){
            // link account using user_id
            linkAccount(profile.user_id);
          }
        });
      }
  	</script>
  	<button onclick="linkPasswordlessSMS()">Link to SMS account</a>
  	```

4. On the server side, we are exposing an endpoint for linking accounts. At this point you are free to implement any desired verification before linking, or grab the target user's metadata for merging. Otherwise, it will be lost after the linking the accounts.

	```js
	const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
	const Auth0Client = require('../Auth0Client');
	const express = require('express');
	const router = express.Router();

	router.post('/link-accounts/:targetUserId',ensureLoggedIn, (req,res,next) => {
	  // At this point you could get the target user's profile and apply any desired verification prior to linking
	  // or save target user's profile data for merging with session user's data after successfully linking
	  Auth0Client.linkAccounts(req.user.id,req.params.targetUserId)
	  .then( identities => {
	    req.user.identities = req.user._json.identities = identities;
	    res.send(identities);
	  })
	  .catch( err => {
	    console.log('Error linking accounts!',err);
	    next(err);
	  });
	});
	```

	Our API in turn calls the [Auth0 API V2 endpoint for linking accounts](https://auth0.com/docs/api/v2#!/Users/post_identities). In order to call the endpoint you will require an [API V2 token](/tokens/apiv2) with `update:users` scope. 

	```js
	const request = require('request');

	class Auth0Client {
		linkAccounts(rootUserId,targetUserId) {

			const provider = targetUserId.split('|')[0];
			const user_id = targetUserId.split('|')[1];

			return new Promise((resolve, reject) => {
				var reqOpts = {
					method: 'POST',
					url: 'https://${process.env.AUTH0_DOMAIN}/api/v2/users/' + rootUserId + '/identities',
					headers: {
						'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN
					},
					json: {
			      provider,
			      user_id
			    }
			  };
			  request(reqOpts,(error, response, body) => {
					if (error) {
						return reject(error);
					} else if (response.statusCode !== 201) {
						return reject('Error linking accounts. Status code: ' + response.statusCode + '. Body: ' + JSON.stringify(body));
					} else {
						resolve(body);
					}	
				});
			});
		}
    ...
	}

	module.exports = new Auth0Client();
	```

## Scenario of linking accounts initiated server side

In this scenario you already have the `user_id` you want to link the account to, so it's just a matter of invoking the [Auth0 API V2 endpoint for linking accounts](https://auth0.com/docs/api/v2#!/Users/post_identities). 

This is the case of the [Link Users by Email Rule](https://github.com/auth0/rules/blob/master/rules/link-users-by-email.md). 

It is also the case shown in the [Regular Web App Linking Accounts Sample](https://github.com/auth0/auth0-link-accounts-sample/RegularWebApp), where it searchs for users with same verified email address after the user is authenticated, and suggests the user to link the accounts.

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

## Unlinking Accounts

You can unlink the accounts from server side code using the [API V2](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id). You will require an [API V2 token](/tokens/apiv2) with `update:users` scope. 

```js
const request = require('request');

class Auth0Client {
	...
	unlinkAccounts(rootUserId,targetUserId){
		const provider = targetUserId.split('|')[0];
		const user_id = targetUserId.split('|')[1];

		return new Promise((resolve,reject) => {
			var reqOpts = {
				method: 'DELETE',
				url: 'https://' + process.env.AUTH0_DOMAIN +'/api/v2/users/' + rootUserId +'/identities/' + provider + '/' + user_id,
				headers: {
					'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN
				}
			};
			request(reqOpts,(error, response, body) => {
				if (error) {
					return reject(error);
				} else if (response.statusCode !== 200) {
					return reject('Error unlinking accounts. Status code: ' + response.statusCode + '. Body: ' + JSON.stringify(body)};
				} else {
					resolve(JSON.parse(body));
				}	
			});
		});
	}
}

module.exports = new Auth0Client();
```