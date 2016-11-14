---
title: User Profile
description: This tutorial demonstrates how to display the user's profile
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '04-User-Profile'
}) %>

Auth0 provides a profile object for your users and you can obtain it from Lock's `getProfile` method.

## Accessing the User's Profile

To get the user's profile, call the `getProfile` method on `lock`, passing in a token and callback function.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService($q, lock, authManager) {
    
    var deferredProfile = $q.defer();

    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          deferredProfile.resolve(profile);
        });

      });
    }

  }

})();
```

The stringified `profile` object is being stored in local storage in the success callback. Once that is done, all that is needed is to retrieve the profile from local storage at a later stage. For example, we might want to show the user's profile information in the home view.

```js
// components/home/home.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController(authService) {

    var vm = this;
    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
    });
  }

})();
```

We get the user profile using the `getProfileDeferred()` method which is implemented in the `authService`.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService($q, lock, authManager) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function getProfileDeferred() {
      return deferredProfile.promise;
    }

    return {
      getProfileDeferred: getProfileDeferred
    }
  }
})();
```

Once the profile is retrieved, it can be bound to the view.

```html
<!-- components/home/home.html -->
<div ng-if="!isAuthenticated">
  <p>You are not yet authenticated. <a ui-sref="login">Log in.</a></p>
</div>
<div ng-if="isAuthenticated">
  <h2>Welcome, {{ vm.profile.nickname }}</h2>
  <img ng-src="{{ vm.profile.picture }}">
</div>
```
