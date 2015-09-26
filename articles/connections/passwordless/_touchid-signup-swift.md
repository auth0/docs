```swift
let lock = ... //Fetch Lock instance from where you stored it
let client = lock.apiClient()
client.signUpWithUsername(username, 
    password: password, 
    loginOnSuccess: true,
    success: { (profile, token) -> () in
        self.loginTouchIDWithToken(token!.idToken)
    },
    failure: { (error) -> () in
        // Handle failure
    })
```