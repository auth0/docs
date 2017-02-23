```js
// app.js

// Intercept responses and check for anything
// unauthorized. If there is an unauthorized response,
// dispatch an event to let the app handle it
Vue.http.interceptors.push(function(request, next) {
  let self = this;
  next((response) => {
    if (response.status === 401) {
      self.$dispatch('logout');
    }
  });
});
```