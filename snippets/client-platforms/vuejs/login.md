```js
// app.js

new Vue({
  el: '#app',
  data() {
    return {
      authenticated: false
    }
  },
  methods: {
    login() {
      var self = this;
      var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');
      
      lock.show((err, profile, token) => {
        if(err) {          
          // Handle the error
          console.log(err)          
        } else {
          // Set the token and user profile in local storage
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', token);
          self.authenticated = true;
        }        
      });       
    }
  }
});
```