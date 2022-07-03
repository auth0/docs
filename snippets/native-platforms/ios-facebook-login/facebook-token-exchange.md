With the SDK installed, it's time to go back to the first method you added and tie everything together. 

Add logic in the method to execute the requests you prepared in the previous steps. Then, pass the resulting Session Access Token and user profile to the SDK method `login(facebookSessionAccessToken:profile:)`. Don't forget to import the SDK first, with `import Auth0`.

```swift
fileprivate func login(with accessToken: FacebookLogin.AccessToken) {
    // Get the request publishers
    let sessionAccessTokenPublisher = fetchSessionAccessToken(appId: accessToken.appID,
                                                              accessToken: accessToken.tokenString)
    let profilePublisher = fetchProfile(userId: accessToken.userID, accessToken: accessToken.tokenString)

    // Start both requests in parallel and wait until all finish
    _ = Publishers
        .Zip(sessionAccessTokenPublisher, profilePublisher)
        .sink(receiveCompletion: { completion in
            if case .failure(let error) = completion {
                print(error)
            }
        }, receiveValue: { sessionAccessToken, profile in
            // Perform the token exchange
            Auth0
                .authentication()
                .login(facebookSessionAccessToken: sessionAccessToken, profile: profile)
                .start { result in
                    switch result {
                    case .success(let credentials): print(credentials) // Auth0 user credentials 🎉
                    case .failure(let error): print(error)
                }
            }
        })
}
```

::: note
To learn more about the `Credentials` object, check out [its source](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift).
:::
