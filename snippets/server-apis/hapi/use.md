```js
server.route({
  method: 'GET',
  path: '/path_to_your_api',
  config: { auth: 'token' },
  handler: function(request, reply) {
    // Your handler
  }
});
```
