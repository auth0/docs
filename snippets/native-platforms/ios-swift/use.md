```swift
import Lock

let controller = A0Lock.sharedLock().newLockViewController()
controller.closable = true
controller.onAuthenticationBlock = { (profile, token) in
  // Do something with token & profile. e.g.: save them.
  // Lock will not save the Token and the profile for you.
  // And dismiss the ViewController
  self.dismissViewControllerAnimated(true, completion: nil)
}
self.presentViewController(controller, animated: true, completion: nil)
```
