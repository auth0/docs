```js
app.use('/api/model.json', authenticate, falcorExpress.dataSourceRoute(function(req, res) 
  {
    return new Router([
      {...}
    ]);
  }
));
```