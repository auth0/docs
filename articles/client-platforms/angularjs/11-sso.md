---
title: SSO
description: This tutorial demonstrates how to use single sign on in Angular 1.x applications
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '11-SSO
}) %>


## How to Implement SSO with Auth0

To enable SSO for one of your Clients (recall that each Client is independent of one another), navigate to the [Clients section of the Auth0 Management Dashboard](${manage_url}/#/clients). Click on **Settings** (represented by the gear icon) for the Client with which you want to use SSO.

![](/media/articles/sso/single-sign-on/clients-dashboard.png)

Near the bottom of the *Settings* page, toggle **Use Auth0 instead of the IdP to do Single Sign On**.

![](/media/articles/sso/single-sign-on/sso-flag.png)

You can set the Client's SSO flag using the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).

Once you have set the SSO flag in Auth0, you must add logic to your Client to check the user's SSO status. This logic can be implemented either client-side (using JavaScript) or server-side:

* [Client-Side SSO (Single Page Apps)](/sso/single-page-apps-sso)
* [Server-Side SSO (Regular Web Apps)](/sso/regular-web-apps-sso)

> Please see the [Auth0 SSO Sample](https://github.com/auth0/auth0-sso-sample) repo for an example of SSO with both Single Page Apps and Regular Web Apps.

### Length of SSO Sessions

If the SSO flag is set for a Client, Auth0 will maintain an SSO session for any user authenticating via that Client. If the user remains active, the session will last no more than **7 days**, but if not, the session will terminate after **3 days**. To be considered active, the user must access the Client that created the session within the given timeframe.

## What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, etc.

There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.

## Client-side SSO (Single Page Apps)

Let's say you have two applications:

App 1: app1.com (single page app) <br/>
App 2: app2.com (single page app)

The user logs in on app1.com and tries to access app2.com. Since app2.com is a Single Page App you need to have some code like the following to do SSO. This code should be on every SPA you have (In this case App1 and App2).:

```js
// components/auth/auth.service.js

(function () {

	...

  function authService($rootScope, lock, angularAuth0, authManager, jwtHelper, $q) {

	...

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

...

})();
```

To use the `angularAuth0` service you need to install it as the bower dependency:

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

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'angularAuth0Provider'];

  function config($stateProvider, lockProvider, $urlRouterProvider, angularAuth0Provider) {

    ...

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });

    ...
	
  }

})();
```

To guarantee that lock `onAuthenticated` callback function is called before auth checking is started, wrap the `authService.checkAuthOnRefresh` method with `$timeout` in `app.run.js`:

```js
// app.run.js

(function () {

  function run($rootScope, authService, lock, $timeout) {
    ...
	
    $timeout(authService.checkAuthOnRefresh);

   ...
   
  }

})();
```
