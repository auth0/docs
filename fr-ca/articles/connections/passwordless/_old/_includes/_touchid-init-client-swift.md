```swift
let lock = ... //Fetch Lock instance from where you stored it
self.userClient = lock.newUserAPIClientWithIdToken(token.idToken)
```