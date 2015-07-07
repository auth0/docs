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

### 2. Configuration

Once you've installed simple-auth, and the add-on, its just a matter of adding some configuration.

```js
// config/environment.js
ENV['simple-auth'] = {
  authenticationRoute: 'sign_in',
  routeAfterAuthentication: 'home',
  routeIfAlreadyAuthenticated: 'home'
}

ENV['simple-lock'] = {
  clientID: "<%= account.clientId %>",
  domain: "<%= account.namespace %>"
}
```

> Note: If you're using a content security policy, you'll also need to add `<%= account.namespace %>` to the `connect-src` CSP entry.

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

      // These options will request a refresh token and launch lock.js in popup mode
      var lockOptions = {authParams:{scope: 'openid offline_access'}};

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

### 4. You're done!

You've implemented Sign in & up with Auth0 and Ember.

------

#### Additional info

To get Additional info on how to use this SDK, check the [readme](http://github.com/auth0/auth0-ember-simple-auth/blob/master/README.md)
