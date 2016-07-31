---
title: Login
description: This tutorial will show you how to use the Auth0 Ionic SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-ionic-samples',
  githubUrl:'https://github.com/auth0-samples/auth0-ionic-samples/tree/master/00-Starter-Seed',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: '00-Starter-Seed/www/app',
  pkgType: 'js'
}) %>

}) %>

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `01-Login` folder of the sample project and running `ionic serve`
:::

### 1. Add the module dependencies and configure the service

Add the `auth0`, `angular-storage` and `angular-jwt` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `authProvider`. You will also net to add a call to `auth.hookEvents()` in the `run()` method of the app. 

${snippet(meta.snippets.appsetup)}

> Note: there are more properties available in `authProvider.init({...})`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#authproviderinitoptions--authinitoptions).

### 2. Implement the login

To implement the login, you must add a Login Controller. Be sure to inject the `auth` service into the controller, and then call the `signin` methods to display the Login / Signup screen:

${snippet(meta.snippets.login)}

The code sample above defines a `LoginController` controller which has a `doLogin()` function that gets called when the controller gets instantiated. This `doLogin()` function initializes Lock by calling the `signin()` method and passing as an option the container in which the Lock widget will be hosted.

Notice the success callback which will store the `profile`, `token`, `accessToken` and `refreshToken` in the Local Storage. These values can be retrieved at a later stage, for example when you want to display the user's profile which will be done in Step 3.

Next we will need to create the view for this controller:

${snippet(meta.snippets.loginview)}

The view simply contains an `ion-view` component and inside that we have a `div` tag with the id `lock-container`. This is the container which was passed to the `signin()` method in the controller and is where Lock will be hosted.  

Lastly you must add the state for the login to the State Provider. Head back to the `app.js` file, and in the `config` method be sure to add the state for the `/login` path:

${snippet(meta.snippets.loginroute)}

### 3. Implement a Logout button

To log the user out you simply need to call the `signout` method of Auth0. Remember to also clear the information from the Local Storage. In the example below we have add a `logout` method to the `HomeController`:

${snippet(meta.snippets.logout)}

Remember to also add a Logout button which calls this function. In our example we added this function to the `HomeController`, so in our `home.html` file we add a logout button.

```html
<button class="button button-full button-dark" ng-click="vm.logout()">
  Log Out
</button>
```

### 4. Keep the user logged in after app switching

When the user exits your app, the mobile OS (iOS or Android) may unload your app at will to recover some RAM.

We already saved the user profile and tokens into `localStorage`. We just need to check for their existence and, if possible, fetch them when your app loads and let `auth0-angular` know that the user is already authenticated.

${snippet(meta.snippets.autologin)}

