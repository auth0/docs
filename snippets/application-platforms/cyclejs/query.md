```js
// app/index.js

function Component(sources) {
    const tokens$ = sources.props.tokens$; //the token$ added by the protect function

    const userProfile$ = sources
        .auth0
        .select("getUserInfo") //read to response of the lock to the getProfile method call

    return {
        auth0: tokens$
            .filter(tokens => !!tokens) //filter empty tokens
            //send the getUserInfo action to the auth0 driver
            .map(tokens => ({ action: "getUserInfo", params: tokens.accessToken })),

        DOM: userProfile$ //displays the user profile once fetched
            .map(user => p([
                "Welcome",
                span(".nickname", user.nickname)
            ]))
    };
}
```
