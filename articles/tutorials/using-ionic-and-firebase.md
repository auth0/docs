---
description: A tutorial for using Ionic Framework and Firebase.
---

## Ionic Framework + Firebase Tutorial

You can either download the sample project, or follow the instructions below.

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="http://cdn.auth0.com/auth0-ionic-firebase-sample.zip" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a sample project</span>
    </a>
  </blockquote>
</div>

### 1. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following values:</p>

<pre><code>https://${account.namespace}/mobile, file://*, http://localhost:8100
</pre></code>

</div>

### 2. Configure Auth0 to work with Firebase

You need to add your Firebase account information to Auth0. Once the user logs in to the App, Auth0 will use this information to issue a Firebase authentication token.

Go to [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) and click on Addons. In there, turn on the __Firebase Addon__ and enter your Firebase secret.

![Firebase secret](/media/articles/tutorials/firebase-config.gif)


### 3. Adding the needed dependencies

Add the following dependencies to the `bower.json` and run `bower install`:

```json
"dependencies" : {
  "auth0-angular": "4.*",
  "a0-angular-storage": ">= 0.0.6",
  "angular-jwt": ">= 0.0.4",
  "angularfire": "~0.9.2"
},
```

### 4. Add the references to the scripts in the `login.html`

```html
<!-- Auth0 Lock -->
<script src="lib/auth0-lock/build/auth0-lock.js"></script>
<!-- auth0-angular -->
<script src="lib/auth0-angular/build/auth0-angular.js"></script>
<!-- angular storage -->
<script src="lib/a0-angular-storage/dist/angular-storage.js"></script>
<!-- angular-jwt -->
<script src="lib/angular-jwt/dist/angular-jwt.js"></script>
<!-- Firebase dependencies -->
<script src="lib/firebase/firebase.js"></script>
<script src="lib/angularfire/dist/angularfire.js"></script>
```

### 5. Add `InAppBrowser` plugin

You must install the `InAppBrowser` plugin from Cordova to be able to show the Login popup. Run the following command:

```bash
ionic plugin add org.apache.cordova.inappbrowser
```

Add the following configuration to the `config.xml` file:

```xml
<feature name="InAppBrowser">
  <param name="ios-package" value="CDVInAppBrowser" />
  <param name="android-package" value="org.apache.cordova.inappbrowser.InAppBrowser" />
</feature>
```

### 6. Add the module dependency and configure the service

Add the `auth0`, `angular-storage`, `angular-jwt` and `firebase` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `authProvider`

```js
// app.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'firebase'])
.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {


  $stateProvider
  // This is the state where you'll show the login
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
  })
  // Your app states
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    data: {
      // This tells Auth0 that this state requires the user to be logged in.
      // If the user isn't logged in and he tries to access this state
      // he'll be redirected to the login page
      requiresLogin: true
    }
  })

  ...

  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    loginState: 'login'
  });

  ...

})
.run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
});
```


### 7. Implementing login

Now you're ready to implement the Login. You can inject the `auth` service in any controller and just call `signin` method to show the Login / SignUp popup.
In this case, add the call in the `login` method of the `LoginCtrl` controller.
After a successful login, you will:

1. Save the __user profile__.
2. Save the __token__ and __[refresh token](/refresh-token)__
3. Call Auth0 to issue a __Firebase token__ and save it as well.

> All these artifacts are persisted into `localStorage` in the browser. The Firebase token is obtained through Auth0's [Delegation endpoint](/auth-api#delegated).

```js
// LoginCtrl.js
function LoginCtrl(store, $scope, $location, auth) {
  $scope.login = function() {
    auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      auth.getToken({
        api: 'firebase'
      }).then(function(delegation) {
        store.set('firebaseToken', delegation.id_token);
        $state.go('dashboard');
      }, function(error) {
        // Error getting the firebase token
      })
    }, function() {
      // Error callback
    });
  }
}
```

```html
<!-- login.html -->
<!-- ... -->
<input type="submit" ng-click="login()" />
<!-- ... -->
```

> Note: there are multiple ways of implementing login. The example above uses the __Auth0 Lock__ a component that implements a ready to use login UI. You can build your own UI changing the `<script src="//cdn.auth0.com/js/auth0-lock-6.js">` for `<script src="${auth0js_url}">`. This is just a non-visual authentication library. For more details [check out the GitHub repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 8. Adding a logout button

Just call the `signout` method in Auth0 to log the user out. You should also remove the information saved into `localStorage`:

```js
$scope.logout = function() {
  auth.signout();
  store.remove('token');
  store.remove('profile');
  store.remove('refreshToken');
  store.remove('firebaseToken');
  $state.go('login');
}
```

```html
<input type="submit" ng-click="logout()" value="Log out" />
```
### 9. Configuring secure calls to Firebase

Now that you have the Firebase token, you simply pass it to the AngularFire module using the `authWithCustomToken` function:

```js
var friendsRef = new Firebase("https://<your-account>.firebaseio.com/<your collection>");
// Here we're using the Firebase Token we stored after login
friendsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
  if (error) {
    // There was an error logging in, redirect the user to login page
    $state.go('login');
  }
});

var friendsSync = $firebase(friendsRef);
var friends = friendsSync.$asArray();
friends.$add({name: 'Hey John'});
```

> Check the [AngularFire documentation](https://www.firebase.com/docs/web/libraries/angular/guide.html) for more information on all of its features.

### 10. Showing user information

After the user has logged in, you can get the `profile` property from the `auth` service. You can access all logged-in user properties:

```html
<span>His name is {{auth.profile.nickname}}</span>
```

```js
// UserInfoCtrl.js
function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
}
```

[Click here](/user-profile) to find out all of the available properties from a user's profile. Note that some of these depend on the social provider being used.

### 11. Keeping the user logged-in after page refreshes

The user profile and the tokens are saved in `localStorage`. If the page os refreshed, you just need to fetch them from the store and let `auth0-angular` know that the user is already authenticated:

```js
angular.module('myApp', ['auth0', 'angular-storage', 'angular-jwt'])
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          // Use the refresh token we had
          auth.refreshIdToken(refreshToken).then(function(idToken) {
            store.set('token', idToken);
            auth.authenticate(store.get('profile'), token);
          });
        }
      }
    }
  });
});
```


### 12. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0, Ionic and Firebase.


### Troubleshooting

#### Command failed with exit code 65 when running ionic build

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. Try any of the following steps to fix this:

* Reinstall the `InAppBrowser` plugin:

```bash
ionic plugin remove org.apache.cordova.inappbrowser
ionic plugin add org.apache.cordova.inappbrowser
```
* Remove the platform and add it again:

```bash
ionic platform remove ios
ionic platform add ios
```

* Copy the contents from the plugin to the platform plugins

```bash
cp plugins/org.apache.cordova.inappbrowser/src/ios/* platforms/ios/[yourAppName]/Plugins/org.apache.cordova.inappbrowser/
```

#### Get a blank page with an OK after signin

This means that the `InAppBrowser` plugin wasn't installed successfully by Cordova. See the previous section to learn how to solve this.
