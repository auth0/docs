---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 EmberJS SDK to add authentication and authorization to your web app.
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow these tutorial steps.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-emberjs-spa',
  path: '00-Starter-Seed',
  requirements: [
    'NodeJS 0.12.7',
    'Ember 1.12.0',
    'jQuery 1.11.1',
    'Ember Simple Auth 1.1.0'
  ]
}) %>

${include('../\_callback')}

## 1. Install the Add-On

Auth0 Ember simple-auth is an add-on for the [simple-auth](http://ember-simple-auth.com) library, and is installed via [ember-cli](http://www.ember-cli.com).

To install this add-on and its dependencies, `cd` to your project directory and execute the following commands:

```bash
ember install auth0-ember-simple-auth
ember generate scaffold-auth0
```

__Note:__ If you are not already using ember-cli, see [ember-cli migration](http://ember-cli.com/user-guide/#migrating-an-existing-ember-project-that-doesnt-use-ember-cli).

## 2. Configure the Add-On

```js
// config/environment.js

ENV['simple-auth'] = {
  authorizer: 'simple-auth-authorizer:jwt',
  authenticationRoute: 'sign_in',
  routeAfterAuthentication: 'home',
  routeIfAlreadyAuthenticated: 'home'
}

ENV['auth0-ember-simple-auth'] = {
  clientID: "<%= account.clientId %>",
  domain: "<%= account.namespace %>"
}
```

If using a content security policy, add
`https://cdn.auth0.com` to both the `font-src` and `script-src` contentSecurityPolicy entries and `<%= account.namespace %>` to the `connect-src` entry:

```js
// config/environment.js
ENV['contentSecurityPolicy'] = {
  'font-src': "'self' data: https://cdn.auth0.com",
  'style-src': "'self' 'unsafe-inline'",
  'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://cdn.auth0.com <%= account.namespace %>",
  'connect-src': "'self' http://localhost:* <%= account.namespace %>"
};
```

## 3. Extend Routes

Extend a route and set [user-configurable options](/libraries/lock/customization):

```js
// app/routes/application.js
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionRequiresAuthentication: function(){
      // For a list of user-configurable options, see:
      // https:///libraries/lock/customization

      // This will launch lock.js in popup mode
      var lockOptions = {
        auth: {
          params: { scope: 'openid' }
        }
      };

      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    }
  }
});
```

Add a route for signing in:

```js
// app/routes/sign_in.js

import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin);
```

and add a route for authenticated users:

```js
// app/routes/home.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```

## 4. Login and Logout

Add login and logout links. These routes are handled according to the simple-auth configuration settings.

```handlebars
{{#if session.isAuthenticated}}
  <a {{ action 'invalidateSession' }}>Logout</a>
{{else}}
  <a {{ action 'sessionRequiresAuthentication' }}>Login</a>
{{/if}}
```

## 5. Authenticated User Session Data

Once a user is authenticated, session data received from the popup window will be stored in `localStorage` under the `ember_simple_auth:session` key. This session object is a JSON object that contains user profile data, a JWT token and an access token.

You can access this session information in the Ember templates by using `{{session.secure}}`. For example, to say "Hi" and show the user's associated avatar:

```handlebars
<div class="user-info">
  <span class="user-info__leader">Hi,</span>
  <img class="user-info__avatar" src="{{session.secure.profile.picture}}">
  <span class="user-info__name">{{session.secure.profile.name}}</span>
</div>
```

## 6. Using a JWT Token to Make API Requests

To make an API request, add the user's [JWT token](/jwt) to an `Authorization` HTTP header:

```js
fetch('/api/foo', {
  method: 'GET',
  cache: false,
  headers: {
    'Authorization': 'Bearer <%= "${session.secure.jwt}" %>'
  }
}).then(function (response) {
  // use response
});
```

<%= include('../_includes/_persisting_state') %>

### Additional information

For Additional information on how to use this SDK, see [Auth0 Ember simple auth](http://github.com/auth0/auth0-ember-simple-auth/blob/master/README.md).
