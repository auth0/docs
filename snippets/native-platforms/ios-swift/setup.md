```swift
import UIKit
import Lock

class MyApplication: NSObject {
    static let sharedInstance = MyApplication()
    let lock: A0Lock
    private override init() {
        lock = A0Lock()
    }
}
```
