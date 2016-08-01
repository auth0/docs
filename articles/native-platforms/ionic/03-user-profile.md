---
title: User Profile
description: test
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples/tree/master/03-User-Profile',
}) %>

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `03-Custom-Login` folder of the sample project and running `ionic serve`
:::

You can access obtain a user's profile from the success callback when calling the `signin()` method, or alternatively you can call the `getProfile()` method.

### Accessing the user profile from the signin method

Callbacks can be used to get a user's profile if the authentication is successful. We have already done this in the code we completed in Step 1 and stored it in Localstorage. Here is a refresher on how to do that:

```js
/* ===== ./www/app/account/login.controller.js ===== */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', '$state', 'auth', 'store'];

  function LoginController($scope, $state, auth, store) {
    var vm = this;

    function doLogin() {
      auth.signin({
        container: 'lock-container',
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function (profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        store.set('accessToken', accessToken);
        store.set('refreshToken', refreshToken);
        
         $state.go("home");
      }, function () {
        // Error callback
      });
    }

    doLogin();
  }
  
} ());
```

As you can see we are storing the `profile`, `token`, `accessToken` and `refreshToken` in Local storage in the success callback. Once that is done, all you need to do is to retrieve the profile from Localstorage at a later stage. An example can be found in the `HomeController`:

```js
/* ===== ./www/app/home/home.controller.js ===== */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$scope', '$state', 'auth', 'store'];

    function HomeController($scope, $state, auth, store) {
        var vm = this;

        $scope.$on("$ionicView.beforeEnter", function() {
            vm.profile = store.get('profile'); 
        });
    }
} ());
```

::: panel-info This is info
Note that you must retrieve the profile in the Ionic `beforeEnter` event to ensure it is read everytime the home view is activated. You can read more about View LifeCycle and Events in the [Ionic Documentation](http://ionicframework.com/docs/api/directive/ionView/).
:::

Once the profile is retrieved you can bind it to the view:

```html
<!-- ===== ./www/app/home/home.html ===== -->
 <ion-view view-title="Auth0 Ionic Quickstart" ng-controller="HomeController as vm">
  <ion-content class="padding">
    <div ng-hide="vm.auth.isAuthenticated">
      <p>Welcome to the Auth0 Ionic Sample! Please log in:</p>
      <button class="button button-full button-positive" ng-click="vm.login()">
        Log In
      </button>
    </div>
    <div ng-show="vm.auth.isAuthenticated">

      <div class="list card">

        <div class="item item-avatar">
          <img src="{{ vm.profile.picture }}">
          <h2>{{ vm.profile.name }}</h2>
        </div>

        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>

      </div>
    </div>
  </ion-content>
</ion-view>
```

### Accessing user profile with `auth.getProfile()`

At any given time, you can call `getProfile` on `auth` passing in a token as the only argument. This method returns a promise which you can wait to resolve and grab the profile data:

```js
auth.getProfile(token).then(function(profile){
  // Profile can be used from here
})
```

Once you have the profile data you can store it in your controller and bind it to the view in exactly the same way as before.
