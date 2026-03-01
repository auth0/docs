```swift
let lock = ... //Fetch Lock instance from where you stored it
let client = lock.apiClient()
client.startPasswordlessWithEmail(email, 
  success: {
    // Email with code sent
  }, 
  failure: { error in
    // Handle error
  })
```