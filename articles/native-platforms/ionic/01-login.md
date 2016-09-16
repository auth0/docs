---
title: Login
description: This tutorial will show you how to use the Auth0 Ionic SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/www/app/auth0.variables.js',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ionic 1.3.1
* NodeJS 6.5.0
:::

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `01-Login` folder of the sample project and running `ionic serve`
:::

### 1. Add the module dependencies and configure the service

Add the `auth0`, `angular-storage` and `angular-jwt` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `lockProvider`.

${snippet(meta.snippets.appsetup)}

> Note: there are more properties available in `lockProvider.init({...})`. For more details [check the GitHub repo](https://github.com/auth0/angular-lock#usage).

### 2. Implement the login

To implement the login, you must add code to the `run()` method of your app:

${snippet(meta.snippets.login)}

The code sample above handles actions that would be executed after successfully login.

Notice success callback will store the `profile`, `id_token` variables in the Local Storage. These values can be retrieved at a later stage, for example when you want to display the user's profile which will be done in Step 3.

After that you should add a Login Controller:

${snippet(meta.snippets.logincontroller)} 

Next we will need to create the view for this controller:

${snippet(meta.snippets.loginview)}

The view simply contains an `ion-view` component and inside that we have a `div`.

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

We already saved the user profile and tokens into `localStorage`. Inject `authManager` into your app and add to the `run` function of your app:

${snippet(meta.snippets.autologin)}

