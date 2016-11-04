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
  ready() {
    var self = this;
    
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
    }
  }
});
```