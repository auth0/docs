In the sample, the method was named `exchangeFacebookAccessToken(with:)`.

```swift
fileprivate func exchangeFacebookAccessToken(with accessToken: FacebookLogin.AccessToken) {
    // TODO
}
```

Call this method from the login button delegate `loginButton(_:didCompleteWith:error:)` method, as shown below:

```swift
extension ViewController: LoginButtonDelegate {

    func loginButton(_ loginButton: FBLoginButton, didCompleteWith result: LoginManagerLoginResult?, error: Error?) {
        guard error == nil, let accessToken = result?.token else {
            return print(error ?? "Facebook access token is nil")
        }

        exchangeFacebookAccessToken(with: accessToken) // 👈🏻
    }

    func loginButtonDidLogOut(_ loginButton: FBLoginButton) {
        print("Logged out")
    }

}
```