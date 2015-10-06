```js
var token = localStorage.getItem('id_token');

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
);
```