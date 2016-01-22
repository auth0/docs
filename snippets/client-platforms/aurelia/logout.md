```js
// app.js

logout() {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
  this.isAuthenticated = false;   
}
```