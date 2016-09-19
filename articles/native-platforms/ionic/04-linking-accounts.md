---
title: Linking Accounts
description: This tutorial will show you how to integrate Auth0 with Ionic to link accounts.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '04-Linking-Accounts',
  pkgFilePath: '04-Linking-Accounts/www/auth0.variables.js',
  pkgType: 'replace'
}) %>

In some situations, you may want the ability to link multiple user accounts. For example, if a user has signed up with email and password (which provides very little information about the user), you can ask the user to link their account to an OAuth provider like Facebook or Google to gain access to their social profile.

## Linking Accounts

To link accounts, call the [Link a user account](/api/management/v2#!/Users/post_identities) endpoint. You will need the primary account JWT (the `id_token`), the user id (from the JWT or the user profile) and the JWT of the secondary account.

To differentiate the login from the linking login, you will create a second instance of `AuthLock` to obtain the secondary account JWT.

```js
/* ===== www/components/auth/auth.service.js ===== */
(function () {

	...
  
  function authService($rootScope, lock, authManager, jwtHelper, $http, $q) {

	...

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
            scope: 'openid',
            device: 'Mobile device'
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

    return {
      ...
	  
      linkAccount: linkAccount,
	  
      ...
    }
  }
})();
```

Now that the second login is handled, you will need to actually do the linking.

```js
/* ===== www/components/auth/auth.service.js ===== */


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
            deferred.resolve(profile);
          } else {
            deferred.reject(error);
          }
        });
   
      });

});  
```

The function posts to the API, passing the `link_with` parameter with the JWT value in the body. Then it fetches the profile on success to check that the accounts are now linked.

Now to begin the link process, call `linkAccount` method and subscribe on it to update user profile:

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

	...
  function HomeController($state, authService, $scope) {
    ...

    function linkAccount() {
      authService.linkAccount()
        .then(function (profile) {
          vm.profile = profile;
          localStorage.setItem('profile', JSON.stringify(profile));
          refreshIdentities();
        })
    }

    ...

  }

}());

```

## User Profile Linked Accounts Information

The user profile contains an array of identities which includes the profile information from linked providers. 

To view a user's identities, access the [Users](${manage_url}/#/users) page on the Auth0 dashboard, select a user, and scroll down to `identities`. 

This example shows a user with a linked Google account:

![User identities](/media/articles/users/user-identities-linked.png)

Therefore, if you fetch the profile after linking accounts, this same information will be available. 

You can display this information and provide an **Unlink** button:

```html
/* ===== www/components/home/home.html ===== */
...

  <div ng-show="isAuthenticated">
    <div class="list card">

      ...

      <div class="item item-avatar item-button-right assertive" ng-repeat="identity in vm.identities">
        <img src="{{identity.profileData.picture }}">
        <h2>{{ identity.profileData.name || identity.profileData.email }}</h2>
        <button class="button button-assertive" ng-click="vm.unLinkAccount(identity)">
          <i class="icon ion-android-delete" ></i>
        </button>
      </div>

      ...

    </div>
  </div>

...
```

This calls the following `refreshIdentities` helper method to filter the primary identity:

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

	...
  function HomeController($state, authService, $scope) {
    ...

    function refreshIdentities() {
      vm.profile.identities.shift();
      vm.identities = vm.profile.identities;
    }

    ...

  }

}());
```

## Unlinking Accounts

You can dissociate a linked account by calling the [Unlink a user account](/api/management/v2#!/Users/delete_provider_by_user_id) endpoint using the primary `user_id`, and the `provider` and `user_id` of the identity to unlink:

```js
/* ===== www/components/auth/auth.service.js ===== */
(function () {

	...

  function authService($rootScope, lock, authManager, jwtHelper, $http, $q) {

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
        url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities/' + identity .provider + '/' + identity .user_id,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(function () {

          lock.getProfile(token, function (error, profile) {
            if (!error) {
              deferred.resolve(profile);
            } else {
              deferred.reject(error);
            }
          });

        });

      return deferred.promise;

    }

    return {
      ...
	  
      unLinkAccount: unLinkAccount
    }
  }
})();
```
