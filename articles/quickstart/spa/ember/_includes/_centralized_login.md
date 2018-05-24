<%= include('../../_includes/_login_preamble', { library: 'Ember' } )%>

### Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for it is at your discretion, but in these examples it will be called `auth` and the filename will be `auth.js`. An instance of the `WebAuth` object from **auth0.js** can be created in the service.

Create a service and instantiate `auth0.WebAuth`. Provide a method called `login` which calls the `authorize` method from auth0.js.

```js
// app/services/auth.js

import Ember from 'ember';
import config from 'auth0-ember-samples/config/environment';

const {
  computed,
  Service,
  get
} = Ember;

export default Service.extend({
  auth0: computed(function () {
    return new auth0.WebAuth({
      domain: '${account.namespace}',
      clientID: '${account.clientId}',
      redirectUri: 'http://localhost:3000',
      audience: 'https://${account.namespace}/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });
  }),

  login() {
    get(this, 'auth0').authorize();
  }
});
```

::: note
**Checkpoint:** Try calling the `login` method from somewhere in your application. This could be from a button click or in some lifecycle event, just something that will trigger the method so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Authentication Tokens

Add some additional methods to the `auth` service to fully handle authentication in the app.

```js
// app/services/auth.js

import Ember from 'ember';
import config from 'auth0-ember-samples/config/environment';

const {
  computed,
  Service,
  get,
  RSVP,
  isPresent,
} = Ember;

export default Service.extend({

  // ...
  handleAuthentication() {
    return new RSVP.Promise((resolve, reject) => {
      get(this, 'auth0').parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        } else if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  },

  isAuthenticated: computed(function() {
    return isPresent(this.getSession().access_token) && this.isNotExpired();
  }).volatile(),

  getSession() {
    return {
      access_token: localStorage.getItem('access_token'),
      id_token: localStorage.getItem('id_token'),
      expires_at: localStorage.getItem('expires_at')
    };
  },

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
  },

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  },

  isNotExpired() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = this.getSession().expires_at;
    return new Date().getTime() < expiresAt;
  }
});

```

The file now includes several other methods for handling authentication.

* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

### About the Authentication Service

<%= include('../../_includes/_auth_service_method_description_auth0js') %>

### Provide a Login Control

Provide a template with controls for the user to log in and log out.

```html
<!-- app/templates/index.hbs -->

<div>
  <a href="#" class="login" {{action "login"}}>Log In</a>
</div>
```

The `action` added to the **Log In** control makes the appropriate call to the `login` method in `auth.js` to allow the user to log in. When the **Log In** control is clicked, the user will be redirected to the login page.

<%= include('../../_includes/_hosted_login_customization' }) %>

### Process the Authentication Result

When a user authenticates at the login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` function in `auth.js` is responsbile for processing the hash.

Call `handleAuthentication` in `app.js` so that the authentication hash fragment can be processed when the app first loads after the user is redirected back to it.

```js
// app/routes/application.js

import Ember from 'ember';

const {
  Route,
  inject: {
    service,
  },
  get,
} = Ember;

export default Route.extend({
  auth: service(),
  beforeModel() {
    if (get(this, 'auth.isAuthenticated')) {
      return;
    }

    return get(this, 'auth')
      .handleAuthentication()
      .then(() => {
        if (get(this, 'auth.isAuthenticated')) {
          this.transitionTo('protected')
        }
      });
  },
});
```

### Create a Protected Route

After a user authenticates and returns to your application, you may wish to send them to a protected route. The transition logic is demonstrated above in the `transitionTo` call after authentication. Add a new route called `protected` and check whether the user is authenticated before allowing them to see it.

```js
// app/routes/protected.js

import Ember from 'ember';

const {
  Route,
  inject: {
    service,
  },
  get,
} = Ember;

export default Route.extend({
  auth: service(),
  beforeModel() {
    if (!get(this, 'auth.isAuthenticated')) {
      return this.replaceWith('application');
    }
  }
});
```

Add a template for this route.

```html
<!-- app/templates/protected.hbs -->

<a href="#" {{action "logout"}}>
    Log Out
</a>
<br/>
<h2>You are logged in!</h2>
```

Notice that there is also a `Log Out` control in this route which has an `action` of `logout`. This will call the `logout` method on the `auth` service allowing the user to log out.
