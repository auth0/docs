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
    this.authenticated = checkAuth();
    this.lock.on('authenticated', (authResult) => {
      console.log('authenticated');
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }
        // Set the token and user profile in local storage
        localStorage.setItem('profile', JSON.stringify(profile));

        this.authenticated = true;
      });
    });
    this.lock.on('authorizaton_error', (error) => {
      // handle error when authorizaton fails
    });
  },
  methods: {
    login() {
      this.lock.show();
    },
    logout() {
      // To log out, we just need to remove the token and profile
      // from local storage
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      this.authenticated = false;
    },
    // Make a secure call to the server by attaching
    // the user's JWT as an Authorization header
    getSecretThing() {
      var jwtHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') };
      this.$http.get('http://localhost:3001/secured/ping', (data) => {
        console.log(data);
        this.secretThing = data.text;
      }, {
        headers: jwtHeader
      }).error((err) => console.log(err));
    }
  }
});

// Utility to check auth status
function checkAuth() {
  return !!localStorage.getItem('id_token');
}

var router = new VueRouter({
  history: true
});

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