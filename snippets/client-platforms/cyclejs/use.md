```js
function main(sources) {
    const ProtectedTodos = protect(Todos); //here we wrap the Todos component in the protect function
    const protectedTodosInstance = ProtectedTodos(sources);

    return {
        DOM: protectedTodosInstance.DOM,
        HTTP: protectedTodosInstance.HTTP
        //...
    }
}
```
