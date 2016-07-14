---
title: Custom Login
description: Learn how to login with custom widget rather than Lock
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/03-Session-Handling',
}) %>

Modern flow of authentication does not actually require session like we used to know. Everything boils down to using some token and the most important thing is retrieving, storing and providing these tokens when needed. This step will show us how to:

- Store tokens from profile
- Retrieve stored tokens
- Remove stored tokens to perform logout

We will use an already provided library, `angular-storage` which uses `localStorage` by default or `sessionStorage` if otherwise configured.

#### 1: Token storage

The best time to store tokens is immediately after a successfully authentication:

```js
var saveUserInfo = function(profile, token) {
   store.set('profile', profile);
   store.set('token', token);
 };

// Called when authentication is successful
  auth.lockOn("authenticated", function(authResult) {
    auth.getProfile(authResult.idToken).then(function (profile) {

      // Save user info to local storage
      saveUserInfo(profile, authResult.idToken);
      // Track authentication status
      $rootScope.authenticated = true;
    })
  });
```
![Session storage](/media/articles/angularjs/session_storage.png)

#### 2: Retrieve stored tokens

At any point in time, you can retrieve the stored token:

```js
// Retrieve token
var token = store.get('token');
// Use token to retrieve user profile
auth.getProfile(token).then(function (profile) {

  $rootScope.userEmail = profile.email;

})
```

Any item stored can be retrieved with `store.get('key')`. The key is the identifier that was used when storing the token.

### 3: Remove stored token
To perform a logout, you just simply remove the stored tokens, update tracking state and do a redirect if needed:

```js
$rootScope.logOut = function () {
  // Remove profile from storage
  store.remove('profile');
  // Remove token from storage
  store.remove('token');
  $rootScope.authenticated = false;
  $location.url('/login');  
}
```

Then you can update your navigation UI for better user experience:

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#/">Auth0</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav" ng-show="authenticated">
        <li><a href="#/">Home</a></li>
        <li><a href="#/settings">Settings</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right" ng-show="authenticated">
        <li><a style="cursor:pointer" ng-click="logOut()">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
```
