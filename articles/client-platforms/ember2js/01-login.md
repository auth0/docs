---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 EmberJS 2 SDK to add authentication and authorization to your web app.
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-emberjs2-sample',
  path: '01-Login'
}) %>

::: panel-info System Requirements
This tutorial and seed project have to be tested with the following:
* Bower 1.7.7
* NodeJS 5.11.0
* Ember 2.5.0
* jQuery 1.11.3
* Ember Simple Auth 1.1.0
:::

__Note:__ This quickstart and seed project are for Ember >= 2.x.x.

${include('../\_callback')}

## 1. Install the add-on

Auth0 Ember simple-auth is an add-on for the [simple-auth](http://ember-simple-auth.com) library, and it's installed via [ember-cli](http://www.ember-cli.com).

To install this add-on and its dependencies, `cd` to your project directory and execute the following commands:

```
ember install ember-simple-auth
ember install auth0/auth0-ember-simple-auth
ember generate scaffold-auth0
bower install auth0-lock#9.2.3 jsrsasign#5.0.1 --save
```

__Note:__ If you are not already using ember-cli, see [ember-cli migration](https://ember-cli.com/user-guide/#migrating-an-existing-ember-project-that-doesnt-use-ember-cli).

## 2. Configure the add-on

```js
// config/environment.js
ENV['ember-simple-auth'] = {
  authenticationRoute: 'index',
  routeAfterAuthentication: 'protected',
  routeIfAlreadyAuthenticated: 'protected'
};

ENV['auth0-ember-simple-auth'] = {
  clientID: "<%= account.clientId %>",
  domain: "<%= account.namespace %>"
}
```

If you are using a content security policy, add
`https://cdn.auth0.com` to both the `font-src` and `script-src` contentSecurityPolicy entries and `<%= account.namespace %>` to the `connect-src` entry:

```js
// config/environment.js
ENV['contentSecurityPolicy'] = {
  'font-src': "'self' data: https://cdn.auth0.com",
  'style-src': "'self' 'unsafe-inline'",
  'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://cdn.auth0.com",
  'connect-src': "'self' http://localhost:* <%= account.namespace %>"
};
```

## 3. Extend routes

Extend a route and set [user-configurable options](/libraries/lock/customization):

```js
// app/routes/application.js
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  actions: {
    login () {
      var lockOptions = {
        auth: {
          params: { scope: 'openid' }
        }
      };
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    },

    logout () {
      this.get('session').invalidate();
    }
  }
});
```

Add a route for signing in:

```js
// app/routes/login.js
import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin);
```

and add a route for authenticated users:

```js
// app/routes/home.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```

## 4. Login and logout

Add login and logout links. These routes are handled according to the simple-auth configuration settings.

```handlebars
{{#if session.isAuthenticated}}
  <a {{ action 'logout' }}>Logout</a>
{{else}}
  <a {{ action 'login' }}>Login</a>
{{/if}}
```

## 5. Authenticated user session data

Once a user is authenticated, session data received from the popup window will be stored in `localStorage` under the `ember_simple_auth:session` key. This session object is a JSON object that contains user profile data, a JWT token and an access token.

You can access this session information in the ember templates by using `{{session.data.authenticated}}`. For example, to say "Hi" and show the user's associated avatar:

```handlebars
<div class="user-info">
  <span class="user-info__leader">Hi,</span>
  <img class="user-info__avatar" src="{{session.data.authenticated.profile.picture}}">
  <span class="user-info__name">{{session.data.authenticated.profile.name}}</span>
</div>
```

## 6. Using a JWT token to make API requests

To make an API request, add the user's [JWT token](/jwt) to an `Authorization` HTTP header:

```js
fetch('/api/foo', {
  method: 'GET',
  cache: false,
  headers: {
    'Authorization': 'Bearer <%= "${session.data.authenticated.jwt}" %>'
  }
}).then(function (response) {
  // use response
});
```

<%= include('../_includes/_persisting_state') %>

### Additional Information

For Additional information on how to use this SDK, see [Auth0 Ember simple auth](http://github.com/auth0/auth0-ember-simple-auth/blob/master/README.md).
