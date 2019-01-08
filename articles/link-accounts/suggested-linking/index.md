---
description: How to link user accounts using server-side code.
crews: crew-2
toc: true
topics:
  - account-linking
  - server-side
contentType:
  - concept
  - how-to
useCase:
  - manage-accounts
---

# Account Linking Using Server Side Code

::: warning
We recently introduced some changes in Account Linking. For all the details see [Migration Guide: Account Linking and ID Tokens](/migrations/guides/account-linking).
:::

In this tutorial, you will use server-side code to facilitate account linking on a regular web application. Rather than automating the entire account linking process, you're engaging the user and asking them for permission before proceeding. Your code will:

1. Authenticate the user
2. Search for and identify users using their email addresses
3. Prompt the user to link their accounts
4. Verify and merge metadata
5. Link the accounts

Additionally, this tutorial will show you how you can unlink accounts at a later time.

You can find sample code for this tutorial in the [Auth0 Node.js Regular Web App Account Linking](https://github.com/auth0/auth0-link-accounts-sample/tree/master/RegularWebApp) repo on Github.

## Step 1: Authenticate the user

Start by logging in the user to your application.

The recommended implementation is to use [Universal Login](/hosted-pages/login). You can find detailed guidance on how to do just that at our [Node.js Quickstart](/quickstart/webapp/nodejs).

If you choose instead to embed the [Lock](/libraries/lock/v11) widget in your app, you can review the sample code for this tutorial in the [Auth0 Node.js Regular Web App Account Linking](https://github.com/auth0/auth0-link-accounts-sample/tree/master/RegularWebApp) repo on Github.

If you don't use Lock at all, but call the Authentication API directly, follow our tutorial, [Call API Using the Regular Web App Login Flow](/flows/guides/regular-web-app-login-flow/call-api-using-regular-web-app-login-flow).

## Step 2: Search for users with identical email addresses

During the post-login page load, your app invokes a custom endpoint that returns a list of users that could be linked together. This is done using the following code:

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

To get a list of all of the user records with the same email address, your app calls the Management API's [Get Users By Email endpoint](/api/v2#!/users-by-email/) using a [Management API Access Token](/api/management/v2/tokens) with the `read:users` scope.

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
        url: 'https://${account.namespace}/api/v2/users-by-email',
        headers: {
          'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN
        },
        qs: {
          email: user.email
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
}
```

## Step 3: Prompt the user to link accounts

If Auth0 returns one or more records with matching email addresses, the user sees the list, as well as the following message prompting them to link the accounts: `We noticed there are other registered users with the same verified email address as EMAIL_ADDRESS. Do you want to link the accounts?`.

If the user wants to link a given account, they can click **Link** next to the appropriate account.

![](/media/articles/link-accounts/regular-web-app-suggest-linking.png)

## Step 4: Verify and merge metadata

The user clicking on **Link** invokes your custom endpoint for account linking. However, before calling `linkAccounts`, you can verify or retrieve metadata from secondary accounts and merge them into the metadata fields for the primary account. After the accounts are linked, the metadata for the secondary accounts is discarded.

Additionally, when calling `linkAccounts`, you can select the primary account identity. Your choice will depend on which set of attributes you want to retain in the user's profile.

The following code snippet shows how you can implement both features.

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

In the example above, you'll notice that the email address is verified a second time. This is to ensure that `targetUserId` hasn't been tampered with on the client side.

### Merging metadata

The following example shows explicitly how the `user_metadata` and `app_metadata` from the secondary account gets merged into the primary account using the [Node.js Auth0 SDK for API V2](https://github.com/auth0/node-auth0/tree/v2).

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

## Step 5: Link accounts

Once you've found the user accounts, prompted the user to merge the selected accounts, and verified/merged the metadata associated with the primary and secondary identities, you're ready to actually link the accounts.

To link accounts, your app needs to call the Management API's [Link a User Account endpoint](/api/v2#!/Users/post_identities). You need to call the API using a [Management API Access Token](/api/management/v2/tokens) with the `update:users` scope.

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

## Unlinking accounts

If you need to unlink two or more user accounts, you can do so.

First, you need to update the user in session with the new array of identities (each of which represent a separate user account).

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

Then, call the Management API v2 [Unlink a User Account endpoint](/api/v2#!/Users/delete_provider_by_user_id) using an [Management API Access Token](/api/v2/tokens) with the `update:users` scope.

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

That's it, you are done!
