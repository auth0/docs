Set the requested permissions to `.publicProfile` and `.email`. This way, the user email will also be included as part of the response, provided the access request is accepted by the user.

```swift
let loginButton = FBLoginButton(permissions: [.publicProfile, .email])
```