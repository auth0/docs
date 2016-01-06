```js
// app.js

...

methods: {
  getSecretThing() {
    // Set up the JWT header
    var jwtHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') };
    this.$http.get('http://example.com/api/foo', (data) => {
      // Handle data returned
      console.log(data);
    }, {
      // Send the JWT as a header
      headers: jwtHeader
      // Handle any errors
    }).error((err) => console.log(err));
  }
}

...

```