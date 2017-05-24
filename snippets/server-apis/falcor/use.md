```js
const checkScopes = jwtAuthz([ 'read:messages' ]);

app.use('/api/model.json', authenticate, checkScopes, falcorExpress.dataSourceRoute(function(req, res) 
  {
    return new Router([
      {...}
    ]);
  }
));
```