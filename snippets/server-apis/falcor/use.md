```js
// server.js

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.use('/api/private-scoped/model.json', checkJwt, checkScopes, falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      route: 'private_scoped.message',
      get: function(pathSet) {
        return { path:['private_scoped', 'message'], value: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' };
      }
    }
  ]);
}));
```

```js
// api.js

app.get('/api/private-scoped', checkJwt, async function(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  const model = new falcor.Model(
    {
      source: new HttpDataSource(
        'http://localhost:3000/api/private-scoped/model.json',
        {
          headers: { 'Authorization': 'Bearer ' + token }
        })
    });

  try {
    const message = await model.getValue(['private_scoped', 'message']);

    res.json({ message: message });
  } catch(err) {
    res.status(403).json(err[0].value);
  }
});
```