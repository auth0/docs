```js
// app.js

methods: {
  // Make a secure call to the server by attaching
  // the user's JWT as an Authorization header
  getSecretThing() {
    var jwtHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') };
    this.$http.get('http://localhost:3001/secured/ping',{
        headers: jwtHeader
      }).then((data) => {
        console.log(data);
        this.secretThing = data.text;
      },
      (err) => console.log(err));
  }
}
```