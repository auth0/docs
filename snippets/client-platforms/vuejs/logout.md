```js
// app.js

...

methods: {
  logout() {
    var self = this;
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    self.authenticated = false;      
  }
}

...

```