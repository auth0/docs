---
title: Linking Accounts
description: Link two accounts with Angular
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/05-Linking-Accounts',
}) %>

In some cases, there could be need for you to link multiple accounts. One very common situation is when a user signed up with email and password which provides very little information about the user. You can suggest to the user to link there account to an OAuth provider like Facebook or Google. You will see how you can, with the minimal lines of codes and the help of the SDK link and un-link user accounts.

<!-- TODO: IMAGE OR GIF OF DEMO -->

## Linking Accounts

To stay clean, let us write a service to handle linking account for us:

```js
/* ====== ./app.js ======*/
.factory('authHelper', ['$http', function authHelperFunction($http){
  return {
    tryLinking: function (authResult, token, user_id) {
      console.log('Linking with ' + authResult.idToken);
      // Return an asynchronous call that tries to perform account linking with HTTP
      return $http(		
              {		
                  method: 'POST',		
                  url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + user_id + '/identities',		
                  headers: {		
                      Authorization: 'Bearer ' + token		
                  },		
                  data:{		
                      link_with: authResult.idToken
                  }		
              }		
          );		
    }
  }
}])
```

Linking account just entails an API call via HTTP. The URL is `https://[DOMAIN]/api/v2/users/[USER_ID]/identities` and it has to be a post request with a bearer
token in the header and the new token to link with in the body.

What we can do then is to call this service in our `authenticated`:
```js
/* ====== .app.js ======*/
// Called when authentication is successful
  auth.lockOn("authenticated", function(authResult) {
    console.log(authResult);
    auth.getProfile(authResult.idToken).then(function (profile) {
      var token = store.get('token');
      console.log(profile);
      if(token === null){
        // Perform a login
        // Save user info to local storage
        saveUserInfo(profile, authResult.idToken);
      } else {
        // We are probably trying to link an account
        profile = store.get('profile');
        //Use authHelper service to try linking
        authHelper.tryLinking(authResult, token, profile.user_id)
          .success(function(linkResult){
            console.log('Link result', linkResult)
            // Go home if it was successful
            $location.path('/');
          }).error(function(err){
            console.log('Error linking', err)
          });
      }
      $rootScope.authenticated = true;
    })
  });
```

All is left is to complete the flow is the controller:

```js
/* ====== ./settings/settings.js ======*/
$scope.linkAccount = function(){
    auth.signin();
  }
```

When compared with the initial implementation of `authenticated` event handler we see that a decision is now made. If a token is available that means we are logged in already and the only reason we could be calling the `sigin()` again is to link another account. If that is not the case then we login.


User's profile contains an array of identities which is made up of profile information from other providers. You can see this by accessing the `Users` page from the dashboard, select a user and scroll down to the identities. This is what it looks like after linking Facebook:

```bash
[
  {
    "user_id": "573beba1f07e78adshfa6bd2",
    "provider": "auth0",
    "connection": "Username-Password-Authentication",
    "isSocial": false
  },
  {
    "profileData": {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "given_name": "John",
      "family_name": "Doe",
      "gender": "male",
      "picture": "[PROFILE_IMAGE_URL]",
      "age_range": {
        "min": 21
      },
      "bio": "[BIO]",
      "birthday": "[BIRTHDAY]",
      "context": {
        "mutual_likes": {
          "data": [],
          "summary": {
            "total_count": 80
          }
        },
        "id": "[ID]"
      },
      "cover": {
        "id": "[ID]",
        "offset_y": 0,
        "source": "[COVER_PHOTO]"
      },
      "devices": [
        {
          "os": "IOS"
        }
      ],
      {"ETC"}
    },
    "provider": "facebook",
    "user_id": "1232974797442046",
    "connection": "facebook",
    "isSocial": true
  }
]
```

You can also see from the user's dashboard all the associated (linked) accounts:

![Linked accounts](/media/articles/angularjs/linked_accounts.png)


## Un-Linking Accounts

You can also dissociate a linked account as well. To do so, update the `authHelper` service with a new method:

```js
/* ====== ./app.js ======*/
.factory('authHelper', ['$http', function authHelperFunction($http){
  return {
    tryLinking: function (authResult, token, user_id) {
      console.log('Linking with ' + authResult.idToken);
      // Return an asynchronous call that tries to perform account linking with HTTP
      return $http(		
              {		
                  method: 'POST',		
                  url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + user_id + '/identities',		
                  headers: {		
                      Authorization: 'Bearer ' + token		
                  },		
                  data:{		
                      link_with: authResult.idToken
                  }		
              }		
          );		
    },
    tryUnlinking: function (token, secondaryProvider, secondaryUserId, user_id) {
      // Return an asynchronous call that tries to unlink an account with HTTP
     return   $http(		
              {		
                    method: 'DELETE',		
                    url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + user_id + '/identities/' + secondaryProvider + '/' + secondaryUserId,		
                  headers: {		
                        Authorization: 'Bearer ' + token		
                    }		
                }		
            );		
    }
  }
}])
```
Just like linking account, we are also making a HTTP request but a delete now not post to `https://[DOMAIN]/api/v2/users/[USER_ID]/identities/[SECONDARY_PROVIDER]/[SECONDARY_USER_ID]` with bearer token in the request header.

Then we can use the service in the controller:

```js
/* ====== ./settings/settings.js ======*/
$scope.providers = [
    {title: 'Facebook', value: 'facebook'},
    {title: 'Github', value: 'github'},
    {title: 'Google', value: 'google-oauth2'},
    {title: 'Twitter', value: 'twitter'}
  ]

   $scope.searchProvider = function(provider, identities){
      for (var i=0; i < identities.length; i++) {
          if (identities[i].provider === provider) {
              return identities[i];
          }
      }
    }

  var token = store.get('token');
  var profile = store.get('profile');

  $scope.unLinkAccount = function(){
    console.log(profile);
    //main provider connection
    var connection = profile.identities[0].connection;
    //secondary provider
    var provider = $scope.unLinkProvider;

    if(connection == provider) {
      $window.alert('You cannot unlink current connection');
      return;
    }

    var secUser = $scope.searchProvider(provider, profile.identities);
      //if user don't have linked account with this provider
      if(!secUser){
        $window.alert('You have no linked account with ' + provider + ' provider');
        return;
      }
    var secUserId = secUser.user_id;

    //Try unlinking
    authHelper.tryUnlinking(token, provider, secUserId, profile.user_id).success(function (unlinkResult) {
      console.log('Unlinked');
    }).error(function (err) {
      console.log('Unlink err', err);
    })
  }
```

We need to get which provider to be unlinked from the user. It's a UI thing:

```html
<!-- ./settings/settings.html -->
<div class="container">
  <h2 class="text-input">Link/Unlink Account</h2>
  <hr />
  <div class="row">
    <div class="col-md-6">
      <form class="form-inline" ng-submit="linkAccount()">
        <div class="form-group">
          <input type="submit" value="Link Account" class="btn btn-primary">
        </div>
      </form>
    </div>

    <div class="col-md-6">
      <form class="form-inline" ng-submit="unLinkAccount()">
        <div class="form-group">
          <label for="">Unlink Account: </label>
          <select class="form-control" name="" ng-model="unLinkProvider">
            <option value="" default>Select Provider</option>
            <option ng-repeat="provider in providers" value="{{provider.value}}">{{provider.title}}</option>
          </select>
        </div>
        <div class="form-group">
          <input type="submit" value="Submit" class="btn btn-warning">
        </div>
      </form>
    </div>
  </div>
</div>
```

That's the UI code required to complete linking and Un-linking accounts.

## Recap
- Linking accounts
- Un-linking accounts
