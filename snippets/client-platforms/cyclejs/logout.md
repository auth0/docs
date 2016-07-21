```js
function main(sources) {
    const logoutAction$ = sources
        .DOM
        .select(".logout")
        .events("click")

    return {
        auth0: logoutAction$.mapTo({ action: "logout" })
    }
}
```
