---
title: Single Sign-On
description: This tutorial demonstrates how to use single sign on in Angular 1.x applications
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '11-SSO'
}) %>

Single sign-on (SSO) makes it possible for a user to log into one client and then automatically be logged into other clients, regardless of the platform, technology, or domain the user is using. It works by means of a central authentication service, which Auth0 provides, which means you can easily implement SSO in your Angular apps.

## How to Implement Single Sign-On with Auth0

To enable SSO for one of your **clients** (recall that each client is independent of one another), navigate to the [clients section](${manage_url}/#/clients) of the Auth0 Management Dashboard. Click on **Settings** for the client you would like to enable SSO for.

![](/media/articles/sso/single-sign-on/clients-dashboard.png)

Near the bottom of the **Settings** page, toggle **Use Auth0 instead of the IdP to do Single Sign On**.

![](/media/articles/sso/single-sign-on/sso-flag.png)

You can also set the client's SSO flag using the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).

Once you have set the SSO flag in Auth0, you must add logic to your client to check the user's SSO status. This logic can be implemented either client-side (using JavaScript) or server-side.

* [Client-Side SSO (Single Page Apps)](/sso/single-page-apps-sso)
* [Server-Side SSO (Regular Web Apps)](/sso/regular-web-apps-sso)

### Length of SSO Sessions

If the SSO flag is set for a client, Auth0 will maintain an SSO session for any user authenticating via that client. If the user remains active, the session will last no more than **7 days**, but if not, the session will terminate after **3 days**. To be considered active, the user must access the client that created the session within the given timeframe.

## What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.

## Client-Side SSO

It may be the case that you'd like to enable SSO in two or more Angular 1.x applications. In this flow, the user would log into one of them (app1.com) and then try to access the second one (app2.com).

To use SSO in your Angular apps, you will first need to have `angular-auth0` installed and loaded.

```bash
bower install --save angular-auth0
```

And then add the `auth0.auth0` module and configure the `angularAuth0Provider` provider:

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config(angularAuth0Provider) {

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}'
    });
	
  }

})();
```

To determine whether the user has a valid SSO session in Auth0, a check needs to be made by sending a request to Auth0 with the `getSSOData` method from `auth0.js`. If there is SSO data present (meaning the user has an SSO session), then the user can be logged in by calling `signin`.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService($rootScope, angularAuth0, authManager, jwtHelper) {

    function checkAuthOnRefresh() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      } else {
        angularAuth0.getSSOData(function (err, data) {
          if (!err && data.sso) {
            angularAuth0.signin({
              scope: 'openid name picture',
              responseType: 'token'
            });
          }
        });
      }
    }
  }

})();
```

To guarantee that the callback for Lock's `authenticated` event is called before auth checking has started, wrap the `authService.checkAuthOnRefresh` method with `$timeout` in `app.run.js`:

```js
// app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  function run($timeout, authService) {
	
    $timeout(authService.checkAuthOnRefresh);
   
  }

})();
```

With SSO enabled in both applications, the user can log into one of them and then be automatically logged into the other.

## Log Out from Auth0

To log the user out of their SSO session completely, call `logout` from `auth0.js`. You may optionally pass a `returnTo` key so that the user is token back to the app once logout is complete. Your logout domain needs to be whitelisted in your [Auth0 settings](https://manage.auth0.com/#/account/advanced).

Note that you will also likely need to call the existing `logout` method from the `authService` that was created in the earlier steps so that the user's token and profile are removed from local storage for the app being used.

```js
// components/home/home.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController(authService, angularAuth0) {

    vm.logoutFromAuth0 = function() {
      angularAuth0.logout({returnTo: 'http://localhost:3000/'});
      authService.logout();
    }

  }

}());
```

