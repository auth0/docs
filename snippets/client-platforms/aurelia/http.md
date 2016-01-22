```js
// app.js

getSecretThing() {
  this.http.fetch('/api/protected-route', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  })
  .then(response => response.json())
  .then(data => this.secretThing = data.text);
}
```