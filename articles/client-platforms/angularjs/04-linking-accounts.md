---
title: Linking Accounts
description: test
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/05-Linking-Accounts',
}) %>_

In some cases, there could be the need for you to link multiple accounts. One very common situation is when a user signed up with email and password which provides very little information about the user. You can urge the users to link their account to an OAuth provider like Facebook or Google. You will see how you can, with the minimal lines of codes and the help of the SDK link and un-link user accounts.

<!-- TODO: IMAGE OR GIF OF DEMO -->

## Linking Accounts

Accounts can be linked using the `linkAccount()` method provided in the SDK:

```js
/* ====== ./settings/settings.js ======*/

angular.module('app')
.controller('SettingsCtrl', ['$scope', 'auth', 'store', '$window', function settingsCtrlFunc($scope, auth, store, $window){
  var token = store.get('token');
  var profile = store.get('profile');

  var successCallback = function(response){
    // Response with with multiple identities
    $window.alert('Linked');
  }

  var errCallback = function(err){
    $window.alert(err.data.message);
  }

  $scope.linkAccount = function(){

    var options = {connection: $scope.provider};
    auth.linkAccount(token, profile, options, successCallback, errCallback);
  }
}]);

```

The method takes a token, the user profile, options (**MUST** have a connection property) and the callbacks. The connection property in the options specifies which provider (Facebook, Twitter, Github, Google, etc) you want to link with. If you are using Lock, the user can just go ahead to click the provider button which in turn links their account.

User's profile contains an array of identities which is made of profile information from other providers. You can see this by accessing the `Users` page from the dashboard, select a user and scroll down to the identities. This is what it looks like after linking Facebook:

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

<!-- TODO: IMAGE OF USER DASHBOARD HIGHLIGHTING ASSOCIATED ACCOUNTS -->

## Retrieving Linked Account Profiles

From the output above, it is easy to guess that, requesting for the user profile will return the identities as an array. An array that will contain the respective profiles of all the linked accounts. That means that calling `auth.getProfile` as we saw on the previous step will give us a profile with an array of profiles. You can use the following utility method to just fetch a profile for a given provider:

```js
function searchProvider(provider, identities){
    for (var i=0; i < identities.length; i++) {
        if (identities[i].provider === provider) {
            return identities[i];
        }
    }
}
```

So you can do something like:

```js
auth.getProfile(token).then(function(profile){
  var secUserId = searchProvider(provider, profile.identities);
})
```

## Un-Linking Accounts

You can also dissociate a linked account using the `unLinkAccount()` method:

```js
$scope.unLinkAccount = function(){
  var provider = $scope.unLinkProvider;
  var options = {connection: provider}

  auth.getProfile(token).then(function(profile){

    var secUserId = $scope.searchProvider(provider, profile.identities).user_id;
    auth.unLinkAccount(token, profile.user_id, provider, secUserId).then(function(res){
      $window.alert('Unlinked')
    }, function(err){
      $window.alert('Unlink failed')
    });
  })
}
```

## Recap
- Linking accounts
- Retrieving linked account profile
- Un-linking accounts
