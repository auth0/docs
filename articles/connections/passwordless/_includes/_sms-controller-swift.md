```swift
let lock = ... //Fetch Lock instance from where you stored it
let controller = lock.newSMSViewController()
controller.onAuthenticationBlock = { (profile, token) in
    // Your user is now authenticated with Auth0
    // You'd probably want to store somewhere safe the tokens stored in "token" parameter
    self.dismissViewControllerAnimated(true, completion: nil)
}
lock.presentSMSController(controller, fromController: self)
```