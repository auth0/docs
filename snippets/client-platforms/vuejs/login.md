```js
// app.js

new Vue({
  el: '#app',
  data() {
    return {
      authenticated: false,
      lock: new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>')
    }
  },
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
  },
  methods: {
    login() {
      this.lock.show();
    }
  }
});
```