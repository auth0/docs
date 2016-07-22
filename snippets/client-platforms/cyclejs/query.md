```js
function Component(sources) {
    const token$ = sources.props.token$; //the token$ added by the protect function

    const userProfile$ = sources
        .auth0
        .select("getProfile") //read to response of the lock to the getProfile method call

    return {
        auth0: token$
            .filter(token => !!token) //filter empty tokens
            //send the getProfile action to the auth0 driver
            .map(token => ({ action: "getProfile", params: token })

        DOM: userProfile$ //displays the user profile once fetched
            .map(user => p([
                "Welcome",
                span(".nickname", user.nickname)
            ]))
    };
}
```
