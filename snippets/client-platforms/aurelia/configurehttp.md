```js
// app.js

constructor(http) {
  this.http = http;
  this.http.configure(config => {
    config.withDefaults({
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }
    });
  });
  ...
}
```