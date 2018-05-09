```js
const ProtectedComponent = protect(Component, {
    decorators: {
        HTTP: (request, token) => {
            return {
                ...request,
                headers: {
                    ...request.headers,
                    //Will add the Authorization header to
                    //any of the http request sent by the component
                    "Authorization": "Bearer " + token
                }
            }
        }
    }
});
```
