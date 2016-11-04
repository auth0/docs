```js
// app.js

// Intercept responses and check for anything
// unauthorized. If there is an unauthorized response,
// log the user out and redirect to the home route
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
```