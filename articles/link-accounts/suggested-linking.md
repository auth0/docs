---
description: How to link user accounts with server-side code.
---

# Account Linking from Server Side Code

In this scenario, you will search for users with same verified email address, (as with an automatic linking rule). However, instead of completing the link automatically on authentication, your app will first prompt the user to link their identities.

**NOTE:** You can find sample code for this at the [Auth0 Node.js Regular Web App Account Linking](https://github.com/auth0/auth0-link-accounts-sample/tree/master/RegularWebApp) sample on Github.

The following steps implement suggested account linking for a Regular Web App:

## 1. Initial Login

First, the user will authenticate to the website using either [Lock](https://github.com/auth0/lock), [Lock Passwordless](https://github.com/auth0/lock-passwordless), or [Auth0.js](/libraries/auth0js) and a custom UI. 
 
![](/media/articles/link-accounts/regular-web-app-initial-login.png)

The following is a sample login using Lock:

```js
<script src="${lock_url}"></script>
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

In the typical Regular Web App usage of Lock, a **redirectUrl** is passed to `Auth0Lock`, which is then handled server-side. After successful authentication, a **session** is created containing the profile of the authenticated user.

**NOTE:** You can refer to the [Regular Web App Node.js Quickstart](/quickstart/webapp/nodejs) for more details. You can also see the [Passwordless for Regular Web Apps Tutorials](/connections/passwordless/regular-web-app) for examples of passwordless login.

## 2. Search for users with same verified email

As the page loads after login, invoke a custom endpoint that returns a list of suggested users for linking:

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

This endpoint will use the Management API v2 [List or search users endpoint](/api/v2#!/Users/get_users) for matching users with same verified email:

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

## 3. Display matches and suggest linking the accounts

At this point the user can choose which account to link to:

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

## 4. Verify and merge metadata before linking

When the user clicks on the **Link** button, your custom endpoint for linking accounts is invoked. Before calling`linkAccounts`, you can implement additional verification or retrieve the secondary account metadata for merging. This metadata is discarded after linking.

Also, you can select which identity will be used as the primary account and which as the secondary when calling the account linking. This choice will depend on which set of attributes you wish to retain in the primary profile.

```js
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const Auth0Client = require('../Auth0Client');
const express = require('express');
const router = express.Router();

router.post('/link-accounts/:targetUserId', ensureLoggedIn, (req,res,next) => {
  // Fetch target user to make verifications and merge metadata
  Auth0Client.getUser(req.params.targetUserId)
  .then( targetUser => {
    // verify email (this is needed because targetUserId came from client side)
    if(! targetUser.email_verified || targetUser.email !== req.user._json.email){
      throw new Error('User not valid for linking');
    }
    //merge metadata
    return _mergeMetadata(req.user._json,targetUser);
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

In the example above, the email is verified again because the `targetUserId` could have been tampered with on the client side.

In the following example, the `user_metada` and `app_metadata` from the secondary account are merged into the primary account using the [node Auth0 SDK for API V2](https://github.com/auth0/node-auth0/tree/v2) for updating the metadata on the primary profile.

```js
const _ = require('lodash');
const auth0 = require('auth0')({
  token: process.env.AUTH0_APIV2_TOKEN
});

/*
* Recursively merges user_metadata and app_metadata from secondary into primary account.
* Data of primary user takes preponderance.
* Array fields are joined.
*/
function _mergeMetadata(primaryUser, secondaryUser){
  const customizerCallback = function(objectValue, sourceValue){
    if (_.isArray(objectValue)){
      return sourceValue.concat(objectValue);
    }
  };
  const mergedUserMetadata = _.merge({}, secondaryUser.user_metadata, primaryUser.user_metadata, customizerCallback);
  const mergedAppMetadata = _.merge({}, secondaryUser.app_metadata, primaryUser.app_metadata, customizerCallback);
  
  return Promise.all([
    auth0.users.updateUserMetadata(primaryUser.user_id, mergedUserMetadata),
    auth0.users.updateAppMetadata(primaryUser.user_id, mergedAppMetadata)
  ]).then(result => {
    //save result in primary user in session
    primaryUser.user_metadata = result[0].user_metadata;
    primaryUser.app_metadata = result[1].app_metadata;
  });
}
```

## 5. Link the accounts

To link accounts, call the Auth0 Management API v2 [Link a user account endpoint](/api/v2#!/Users/post_identities) using a [Management API v2 token](/api/v2/tokens) with `update:users` scope in the Authorization header:

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

## 6. Unlinking Accounts

Unlinking accounts server-side within a Regular Web App requires a custom endpoint to update the user in session with the new array of identities:

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

Then invoke the Management API v2 [Unlink a user account endpoint](/api/v2#!/Users/delete_provider_by_user_id) using an [API v2 token](/api/v2/tokens) with `update:users` scope for authorization:

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
