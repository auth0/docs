```js
// app.js

login() {
  this.lock.show((err, profile, token) => {
    if(err) {
      console.log(err);
    }
    else {
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.isAuthenticated = true;
    }
  });   
}
```