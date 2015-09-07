```js
var App = React.createClass({
  // ...
  componentWillMount: function() {
      this.lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
  },
  // ...
});
```
