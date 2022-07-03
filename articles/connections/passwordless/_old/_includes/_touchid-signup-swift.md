```swift
let lock = ... //Fetch Lock instance from where you stored it
let client = lock.apiClient()
let params = A0AuthParameters.newDefaultParams();
params[A0ParameterConnection] = kAuth0ConnectionType; // Or your configured DB connection
client.signUpWithUsername(username, 
    password: password, 
    loginOnSuccess: true,
    parameters: params,
    success: { (profile, token) -> () in
        self.loginTouchIDWithToken(token!.idToken)
    },
    failure: { (error) -> () in
        // Handle failure
    })
```
