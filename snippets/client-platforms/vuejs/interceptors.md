```js
// app.js

...

Vue.http.interceptors.push({
  response: function (response) {
    if(response.status === 401) {
      this.logout();
      this.authenticated = false;      
      router.go('/');
    }
    return response;
  }
});

...
```