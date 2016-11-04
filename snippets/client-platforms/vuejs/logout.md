```js
// app.js

methods: {
  logout() {
    // To log out, we just need to remove the token and profile
    // from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.authenticated = false;
  },
}

```