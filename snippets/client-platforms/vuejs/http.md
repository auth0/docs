```js
// app.js

methods: {
  // Make a secure call to the server by attaching
  // the user's JWT as an Authorization header
  getSecretThing() {
    var jwtHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') };
    this.$http.get('http://localhost:3001/secured/ping', (data) => {
      console.log(data);
      this.secretThing = data.text;
    }, {
      headers: jwtHeader
    }).error((err) => console.log(err));
  }
}
```