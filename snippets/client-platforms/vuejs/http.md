```js
// app.js

...

methods: {
  getSecretThing() {
    // Set up the JWT header
    var jwtHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') };
    this.$http.get('http://localhost:3001/secured/ping',{}, {
        // Send the JWT as a header
        headers: jwtHeader                    
    }).then(
    //successfull callback
    (response) => {
        // Handle data returned
        console.log(response.data);
    },
    //error callback
    (err) => console.log(err));
  }
}

...

```