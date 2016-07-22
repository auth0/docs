```js
const ProtectedComponent = protect(Component, {
    auth0ShowParams: {
        authParams: { scope: "openid nickname" },
        responseType: "token"
    }
});
```
