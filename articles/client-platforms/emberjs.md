---
lodash: true
title: EmberJS Tutorial
name: EmberJS
image: //auth0.com/lib/platforms-collection/img/emberjs.png
tags:
  - quickstart
---
## EmberJS Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-ember-simple-auth/master/create-package?path=examples/simple&filePath=examples/simple/config&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, if you already have an existing application, please follow the steps below.**

@@includes.callback@@

### 1. Getting started

`auth0-ember-simple-auth` is an add-on for [simple-auth](http://ember-simple-auth.com), which can be installed via [ember-cli](http://www.ember-cli.com).

`cd` to your project directory, then run the following command to install both add-ons and their dependencies:

```
ember install auth0-ember-simple-auth
ember generate simple-lock
```

>>> Note: If you're not already using ember-cli, then you may wish to read the handy ember-cli [guide page.](http://www.ember-cli.com/user-guide/#migrating-an-existing-project-that-doesnt-yet-use-ember-cli)

### 2. Configuration

Once you've installed everything, its just a matter of adding some configuration.

```js
// config/environment.js
ENV['simple-auth'] = {
  authorizer: 'simple-auth-authenticator:lock',
  authenticationRoute: 'sign_in',
  routeAfterAuthentication: 'home',
  routeIfAlreadyAuthenticated: 'home'
}

ENV['simple-lock'] = {
  clientID: "<%= account.clientId %>",
  domain: "<%= account.namespace %>"
}
```

> Note: If you're using a content security policy, you'll also need to add `<%= account.namespace %>` to the `connect-src`, and the following entries:
`https://cdn.auth0.com` to the `font-src` and `script-src` CSP entries.

```js
// config/environment.js
ENV['contentSecurityPolicy'] = {
  'font-src': "'self' data: https://cdn.auth0.com",
  'style-src': "'self' 'unsafe-inline'",
  'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://cdn.auth0.com",
  'connect-src': "'self' http://localhost:* <%= account.namespace %>"
};
```

### 3. Extend your router

```js
// app/routes/application.js
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionRequiresAuthentication: function(){
      // Check out the docs for all the options:
      // https://auth0.com/docs/libraries/lock/customization

      // This will launch lock.js in popup mode
      var lockOptions = {authParams:{scope: 'openid'}};

      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    }
  }
});
```

Now that we've mixed in `ApplicationRouteMixin`, all we need to do is add a route for signing in, and a route for where the user will be directed once signed in.

```js
// app/routes/sign_in.js
import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin);
```


```js
// app/routes/home.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```

### 4. Updating your views

Now that your router is ready, you'll probably want to add some links so that your users can sign in and out. These routes are handled by the configuration that we added for ember simple auth.

```handlebars
{{#if session.isAuthenticated}}
  <a {{ action 'invalidateSession' }}>Logout</a>
{{else}}
  <a {{ action 'authenticateSession' }}>Login</a>
{{/if}}
```

### 5. You're authenticated!

When you authenticate, your application will receive session data from the popup window — Then, session data will be stored in localStorage with a key of `ember_simple_auth:session`. The session object is a JSON object that contains your user profile data, JWT token and access token.

You can access this session information in ember templates by using `{{session.secure}}`. So for example, if you wanted to say Hi to the user and show the associated avatar:

```handlebars
<div class="user-info">
  <span class="user-info__leader">Hi,</span>
  <img class="user-info__avatar" src="{{session.secure.profile.picture}}">
  <span class="user-info__name">{{session.secure.profile.name}}</span>
</div>
```

### 6. Using your JWT token to make API requests

When you want to make an API request, you will need to add the users [JWT token](https://auth0.com/docs/jwt) to an `Authorization` HTTP header:

```js
fetch('/api/foo', {
  method: 'GET',
  cache: false,
  headers: {
    'Authorization': `Bearer ${session.secure.jwt}`
  }
}).then(function (response) {
  // use response
});
```

### 7. You're done!

🙌 You've implemented Sign in & up with Auth0 and Ember. 

------

#### Additional info

To get Additional info on how to use this SDK, check the [readme](http://github.com/auth0/auth0-ember-simple-auth/blob/master/README.md)
