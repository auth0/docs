```js
// app.js

// The public route can be viewed at any time
var Public = Vue.extend({
  template: `<p>This is a public route</p>`
});

// The private route can only be viewed when
// the user is authenticated. The canActivate hook
// uses checkAuth to return true if the user is authenticated
// or false if not.
var Private = Vue.extend({
  template: `<p>This is a private route. If you are reading this, you are authenticated.</p>`,
  route: {
    canActivate() {
      return checkAuth();
    }
  }
});

var App = Vue.extend({
  template: `
    <h1>Vue.js with Auth0</h1>
    <button @click="login()" v-show="!authenticated">Login</button>
    <button @click="logout()" v-show="authenticated">Logout</button>
    <hr>
    <button v-link="'public'">Public Route</button>
    <button v-link="'private'" v-show="authenticated">Private Route</button>
    <router-view></router-view>
    <hr>
    <div v-show="authenticated">
      <button @click="getSecretThing()">Get Secret Thing</button>
      <h3>{{secretThing}}</h3>
    </div>
  `,
  data() {
    return {
      authenticated: false,
      secretThing: '',
      lock: new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>')
    }
  },
  // Check the user's auth status when the app
  // loads to account for page refreshing
  ready() {
    var self = this;
    this.authenticated = checkAuth();
    this.lock.on("authenticated", function(authResult) {
      self.lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        self.authenticated = true;
        self.lock.hide();
      });
    });
  }
  
  ...
  
});

// Utility to check auth status
function checkAuth() {
  if(localStorage.getItem('id_token')) {
    return true;
  } else {
    return false;
  }
}

var router = new VueRouter();

router.map({
  '/public': {
    component: Public
  },
  '/private': {
    component: Private
  }
});

router.start(App, '#app');
```