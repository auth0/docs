```javascript
// ...config
//Configure Auth0 with credentials
authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>'
    // Fallback URL if authentication fails
    loginUrl: '/login'
});
// ...config
```
