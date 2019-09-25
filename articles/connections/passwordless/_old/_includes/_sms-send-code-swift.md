```swift
let lock = ... //Fetch Lock instance from where you stored it
let client = lock.apiClient()
client.startPasswordlessWithPhoneNumber(phoneNumber, 
  success: {
    // SMS with code sent
  }, 
  failure: { error in
    // Handle error
  })
```