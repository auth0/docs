---
title: Login
default: true
description: This tutorial will demonstrates how to add authentication to your Ember.js application using Auth0
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ember-samples',
  path: '01-Login',
  requirements: [
    'Ember 2.5.0',
    'jQuery 1.11.3',
    'Ember Simple Auth 3.0'
  ]
}) %>

__Note:__ This quickstart and seed project are for Ember >= 2.x.x.

${include('../\_callback')}

## Install the Add-On

ember-simple-auth-auth0 is an add-on for the [simple-auth](http://ember-simple-auth.com) library, and it's installed via [ember-cli](http://www.ember-cli.com).

To install this add-on and its dependencies, `cd` to your project directory and execute the following commands:

```
ember install auth0/ember-simple-auth-auth0
ember generate scaffold-auth0
```

__Note:__ If you are not already using ember-cli, see [ember-cli migration](https://ember-cli.com/user-guide/#migrating-an-existing-ember-project-that-doesnt-use-ember-cli).

## Configure the Add-On

**In your `config/environment.js` file, you must provide the following properties**

1. (REQUIRED) - _clientID_ - Grab from your [Auth0 Dashboard](https://manage.auth0.com/#/clients)
2. (REQUIRED) - _domain_ - Grab from your [Auth0 Dashboard](https://manage.auth0.com/#/clients)

```js
// config/environment.js
module.exports = function(environment) {
  let ENV = {
    'ember-simple-auth': {
      authenticationRoute: 'login', 
      auth0: {
        clientID: '${account.clientId}',
        domain: '${account.namespace}',
      }
    }
  };
  
  return ENV;
};
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

## Extend Routes

Extend a route and set [user-configurable options](/libraries/lock/customization):

```js
// app/routes/application.js

import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  beforeSessionExpired() {
    // Do async logic
    // Notify the user that they are about to be logged out.
    
    return RSVP.resolve();
  }
});

```

__Add the session service to your application controller:__

```js
// app/controllers/application.js

import Ember from 'ember';

const {
  Controller,
  inject: {
    service
  },
  get
} = Ember;

export default Controller.extend({
  session: service(),
  actions: {
    login () {
      // Check out the docs for all the options:
      // https://auth0.com/docs/libraries/lock/customization
      const lockOptions = {
       auth: {
         params: {
           scope: 'openid user_metadata'
         }
       }
      };
      
      get(this, 'session').authenticate('authenticator:auth0-lock', lockOptions);
    },

    logout () {
      get(this, 'session').invalidate();
    }
  }
});
```

__Add a route for signing in__

```js
// app/routes/login.js
import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin);
```

__Add a route for authenticated users__

```js
// app/routes/home.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```

## 4. Login and logout

Add login and logout links. These routes are handled according to the simple-auth configuration settings.

```html
// app/templates/application.hbs

{{#if session.isAuthenticated}}
  <div>
    You are currently logged as: {{session.data.authenticated.profile.email}}
  </div>
  <a href="" {{ action "logout" }}>Logout</a>
{{else}}
  <a href="" {{ action "login" }}>Login</a>
{{/if}}
```

## Get Session Data

Once a user is authenticated, session data received from the popup window will be stored in `localStorage` under the `ember_simple_auth:session` key. This session object is a JSON object that contains user profile data, a JWT token and an access token.

You can access this session information in the ember templates by using `{{session.data.authenticated}}`. For example, to say "Hi" and show the user's associated avatar:

The following is what the session object looks like after the user has been authenticated.

__Note: all keys coming back from auth0 are transformed to camelcase for consistency__

```json
{
  "authenticated": {
    "authenticator": "authenticator:auth0-lock",
    "profile": {
      "email": "bob@simplymeasured.com",
      "app_metadata": {
        "is_sm_admin": true,
        "api_access": true,
        "sm3_eligible": true
      },
      "user_metadata": {
        "profile_image": "https://s.gravatar.com/avatar/aaafe9b3923266eacb178826a65e92d1?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatar2%2Fcw.png",
        "email": "bob@domain.com",
        "first_name": "bob",
        "last_name": "johnson"
      },
      "email_verified": true,
      "clientID": "Yw2Y9D433veMHCred7j0BESjlnwF7ry8",
      "updated_at": "2016-11-15T00:49:16.663Z",
      "user_id": "auth0|0ca04c34-2247-40f9-b918-292a4bab8995",
      "identities": [
        {
          "user_id": "0bc04c32-2247-40f9-b918-292a4bab8995",
          "provider": "auth0",
          "connection": "social",
          "isSocial": false
        }
      ],
      "created_at": "2016-03-29T18:47:22.112Z",
      "global_client_id": "IW1j1MbdaRIz0pOwPdN2Ciuh2uIdzfyQ"
    },
    "accessToken": "BS72xWcch5x2KZQu",
    "idToken": "eyJ0eXAiOiJKV1Q1LCJhbGciOiJIUzI1NiJ9.1yJpc3MiOiJodHRwczovL3NpbXBseW1lYXN1cmVkLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHwwYmEwNGMzNC0yMjQ3LTQwZjktYjkxOC0yOTJhNGJhYjg5OTUiLCJhdWQiOiJZd0RZOUQ0MzN2ZU1IQ3JlZDdqMEJFU2psbndGN3J5OCIsImV4cCI6MTQ3OTY3MDk1NywiaWF0IjoxNDc5MTcwOTU3fQ.JFHqL1GElPgY86ujjECXX3TOYjiTiIn-tXB1AV0-j2s",
    "idTokenPayload": {
      "iss": "https://domain.auth0.com/",
      "sub": "auth0|0ba01134-2247-40f9-b918-292a4bab8995",
      "aud": "YwDY9D431v1MHCred7j0BESjlnwF7ry8",
      "exp": 1479670957,
      "iat": 1479170957
    }
  }
}
```

```handlebars
<div class="user-info">
  <span class="user-info__leader">Hi,</span>
  <img class="user-info__avatar" src="{{session.data.authenticated.profile.picture}}">
  <span class="user-info__name">{{session.data.authenticated.profile.name}}</span>
</div>
```

## Make an API Call

If you are using [ember-data](https://github.com/emberjs/data)

`ember g adapter application`

```js
import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const {
  computed
} = Ember;

const {
  JSONAPIAdapter
} = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:jwt',
});

```

```js
// app/routes/application.js

import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  model() {
    return this.store.findAll('my-model');
  }
});
```

This will make the following request

```js
GET
http://localhost:4200/my-model

Accept: application/vdn+json-api
Authorization: Bearer 123.123123.1231
```

To make an API request without ember-data, add the user's [JWT token](/jwt) to an `Authorization` HTTP header:

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

## Handling Errors

__Errors come back as a hash in the url. These will be automatically parsed and ember will transition to the error route with two variables set on the model. error and errorDescription__

`ember g template application-error`

```hbs
// app/templates/application-error.hbs

Encountered an error from auth0 - {{model.error}} -- {{model.errorDescription}}
```

See [template](./tests/dummy/app/templates/application-error.hbs) for an example

<%= include('../_includes/_persisting_state') %>

### Additional Information

For Additional information on how to use this SDK, see [ember-simple-auth-auth0](http://github.com/auth0/ember-simple-auth-auth0/blob/master/README.md).
