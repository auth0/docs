```js
// app.js

new Vue({
  el: '#app',
  data() {
    return {
      authenticated: false,
      secretThing: '',
      lock: new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>')
    }
  },
  mounted() {
    var self = this;
    Vue.nextTick(function() {
      self.authenticated = checkAuth();
      self.lock.on('authenticated', (authResult) => {
        console.log('authenticated');
        localStorage.setItem('id_token', authResult.idToken);
        self.lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) {
            // Handle error
            return;
          }
          // Set the token and user profile in local storage
          localStorage.setItem('profile', JSON.stringify(profile));

          self.authenticated = true;
        });
      });
      self.lock.on('authorization_error', (error) => {
        // handle error when authorizaton fails
      });
    });
  },
  methods: {
    login() {
      this.lock.show();
    }
  }
});
```
