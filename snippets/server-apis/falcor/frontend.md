```js
var token = localStorage.getItem('id_token');

var model = new falcor.Model({
  source: new falcor.HttpDataSource('/api/model.json', {
    // Send the token as an Authorization header
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
});

```