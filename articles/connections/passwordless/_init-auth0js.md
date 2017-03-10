Construct a new instance of the Auth0 client as follows:

```html
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  'use strict';
  const auth0 = new Auth0({
    clientID: '${account.clientId}',
    domain: '${account.namespace}'<% if (withCallbackURL) { %>,
    callbackURL: '${account.callback}'<%}%>
  });
  //...
</script>
```