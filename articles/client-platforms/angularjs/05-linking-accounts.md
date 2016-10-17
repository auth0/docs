---
title: Linking Accounts
description: This tutorial demonstrates how to integrate Auth0 with Angular 1.x to link accounts
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '05-Linking-Accounts
}) %>

<%= include('../../_includes/_linking_accounts') %>

```js
// components/auth/auth.service.js
(function () {

  function authService(lock, authManager, $q, $http) {
	
    function linkAccount() {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var options = {
        rememberLastLogin: false,
        auth: {
          redirect: false,
          params: {
            scope: 'openid'
          }
        }
      };

      var lockLink = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);
      var deferred = $q.defer();

      lockLink.on('authenticated', function (authResult) {

        // do linking accounts

      });

      lockLink.show();

      return deferred.promise;

    }
	
    ...

    return {
	 
      linkAccount: linkAccount,

    }
  }
})();

```

Now that the second user is authenticated, the accounts can be linked.

```js
// components/auth/auth.service.js

lockLink.on('authenticated', function (authResult) {
 
    $http({
          method: 'POST',
          url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities',
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            link_with: authResult.idToken
          }
        })
          .then(function () {
            lockLink.hide();
          
            lock.getProfile(token, function (error, profile) {
              if (!error) {
                localStorage.setItem('profile', JSON.stringify(profile));
                deferred.resolve(profile);
              } else {
                deferred.reject(error);
              }
            });
          
          });

    });  
```

This function posts to the API, passing the `link_with` parameter with the JWT value in the body. It then fetches the profile on success to check that the accounts are linked.

To begin the link process, call the `linkAccount` method.

```js
// components/home/home.controller.js
(function () {

  function HomeController($scope, authService) {

    ...

    function linkAccount() {
      authService.linkAccount()
        .then(function (profile) {
          vm.profile = profile;
          refreshIdentities();
        })
    }

  }

}());
```

## User Profile Linked Accounts Information

The user profile contains an array of identities which includes the profile information from linked providers. 

To view a user's identities, access the [Users](${manage_url}/#/users) page on the Auth0 dashboard, select a user, and scroll down to `identities`. 

This example shows a user with a linked Google account:

![User identities](/media/articles/users/user-identities-linked.png)

If you fetch the profile after linking accounts, this same information will be available. 

You can display this information and provide an **Unlink** button:

```html
<!-- www/components/home/home.html -->
  ...
	
  <div class="identities-wrap" ng-if="isAuthenticated">
    <button class="btn btn-primary" ng-click="vm.linkAccount()">Link Account</button>
    <ul class="list-group identities-list">
      <li class="list-group-item identities-item" ng-repeat="identity in vm.identities">
        <img ng-src="{{identity.profileData.picture}}"/>
        <span>{{ identity.profileData.name || identity.profileData.email }}</span>
        <button class="btn btn-danger" ng-click="vm.unLinkAccount(identity)"><i class="glyphicon glyphicon-trash"></i></button>
      </li>
    </ul>
  </div>
  
  ...
```

The user's primary identity can be filtered by putting in a function to refresh the identities.

```js
// components/home/home.controller.js
(function () {

  function HomeController($scope, authService) {

   ...

    function refreshIdentities() {
      vm.profile.identities.shift();
      vm.identities = vm.profile.identities;
    }

  }

}());
```

## Unlinking Accounts

You can dissociate a linked account by calling the [unlink a user account](/api/management/v2#!/Users/delete_provider_by_user_id) endpoint using the primary `user_id`, and the `provider` and `user_id` of the identity to unlink.

```js
// components/auth/auth.service.js
(function () {

  function authService(lock, authManager, $q, $http) {

    ...

    function unLinkAccount(identity) {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var deferred = $q.defer();

      $http({
        method: 'DELETE',
        url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities/' + identity.provider + '/' + identity.user_id,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(function () {

          lock.getProfile(token, function (error, profile) {
            if (!error) {
              localStorage.setItem('profile', JSON.stringify(profile));
              deferred.resolve(profile);
            } else {
              deferred.reject(error);
            }
          });

        });

      return deferred.promise;

    }

    return {
      unLinkAccount: unLinkAccount
    }
  }
})();
```
