# Account Linking from Server Side Code

In this scenario we search for users with same verified email address on authentication (like in the automatic linking rule), but instead of automatically linking the accounts we suggest the user to link the identities.

> You can find the code for this [Suggested Account Linking within a Regular Web Application Sample](https://github.com/auth0/auth0-link-accounts-sample/RegularWebApp) on Github.

We will follow the implementation steps here:

## 1. Initial Login

At first the user will authenticate to the web site with any of the available connections, either using [Lock](https://github.com/auth0/lock), [Lock Passwordless](https://github.com/auth0/lock-passwordless), or [Auth0.js](https://auth0.com/docs/libraries/auth0js) and a custom UI. 
 
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

You can refer to [the Node.js Regular Web App Quickstart](/quickstart/webapp/nodejs) for more details. You can also read the [Passwordless for Regular Web Apps Tutorials](https://auth0.com/docs/connections/passwordless/regular-web-app) for examples of passwordless logins.

## 2. App searches for other users with same verified email

When page loads after login, we trigger an invocation to a custom endpoint that returns a list of suggested users for linking:

```js
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const Auth0Client = require('../Auth0Client');
const express = require('express');
const router = express.Router();

router.get('/suggested-users',ensureLoggedIn, (req,res) => {
  let suggestedUsers = [];
  Auth0Client.getUsersWithSameVerifiedEmail(req.user._json)
    .then(identities => {
      suggestedUsers = identities;
    }).catch( err => {
      console.log('There was an error retrieving users with the same verified email to suggest linking',err);
    }).then(() => {
      res.send(suggestedUsers);
    });
});
```
This endpoint will use the [API V2 search users endpoint](https://auth0.com/docs/api/v2#!/Users/get_users) for getting users with same (verified) email:

```js
const request = require('request');
class Auth0Client {
  ...
  getUsersWithSameVerifiedEmail(user) {
    return new Promise((resolve, reject) => {
      if (! user.email_verified){
        reject('User email is not verified');
      }
      const reqOpts = {
        url: 'https://${account.namespace}/api/v2/users',
        headers: {
          'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN
        },
        qs: {
          search_engine: 'v2',
          q: 'email:"' + user.email +'" AND email_verified:true -user_id:"' + user.user_id +'"'
        }
      };
      request(reqOpts, (error, response, body) => {
        if (error) {
          return reject(error);
        } else if (response.statusCode !== 200) {
          return reject('Error getting users: ' + response.statusCode + ' ' + body);
        } else {
          resolve(JSON.parse(body));
        } 
      });
    });
  }
```

## 3. The App displays the matches and suggests the user to link the accounts:

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

## 4. The user accepts linking an account

On the server side, we are exposing an endpoint for linking accounts. At this point you are free to implement any desired verification before linking, or grab the secondary account metadata for merging. Otherwise, it will be lost after the linking occurs.

```js
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const Auth0Client = require('../Auth0Client');
const express = require('express');
const router = express.Router();

router.post('/link-accounts/:targetUserId',ensureLoggedIn, (req,res,next) => {
  // Fetch target user to verify email address matches again
  // (this is needed because targetUserId comes from client side)
  Auth0Client.getUser(req.params.targetUserId)
    .then( targetUser => {
      if(! targetUser.email_verified || targetUser.email !== req.user._json.email){
        throw new Error('User not valid for linking');
      }
      // At this point we can apply any other verification 
      // or save target user's metadata for merging
    })
    .then(() => {
      return Auth0Client.linkAccounts(req.user.id,req.params.targetUserId);
    })
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

Our API in turn calls the [Auth0 API V2 endpoint for linking accounts](https://auth0.com/docs/api/v2#!/Users/post_identities). In order to call the endpoint we require an [API V2 token](/tokens/apiv2) with `update:users` scope. 

```js
const request = require('request');

class Auth0Client {
  linkAccounts(rootUserId,targetUserId) {

    const provider = targetUserId.split('|')[0];
    const user_id = targetUserId.split('|')[1];

    return new Promise((resolve, reject) => {
      var reqOpts = {
        method: 'POST',
        url: 'https://${account.namespace}/api/v2/users/' + rootUserId +'/identities',
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

## 5. Unlinking Accounts

For unlinking accounts from server side code within a Regular Web App we provide a custom endpoint:

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

Which in turn invokes the [API V2 unlinking accounts endpoint](https://auth0.com/docs/api/v2#!/Users/delete_provider_by_user_id) using an [API V2 TOKEN](/tokens/apiv2) with `update:users` scope for authorization:

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
