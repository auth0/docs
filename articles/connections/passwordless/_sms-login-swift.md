```swift
let failure = { error in
    // Handle error
}

let success = { (profile, token) in
    // Your user is now authenticated with Auth0
    // You'd probably want to store somewhere safe the tokens stored in "token" parameter
}

let lock = ... //Fetch Lock instance from where you stored it
let client = lock.apiClient()
client.loginWithPhoneNumber(phoneNumber,
    passcode: passcode,
  parameters:nil,
     success: success,
     failure: failure)
```
