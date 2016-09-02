# Lock iOS: Logging

Lock logs useful debugging information using [CocoaLumberjack](https://github.com/CocoaLumberjack/CocoaLumberjack).

By default, all log messages are disabled. You can easily turn them on by calling:

```swift
A0LockLoger.logAll()
```

```objective-c

```

Or, turn them off again, with:

```swift
A0LockLoger.logOff()
```

```objective-c

```

Or, if you want only *error logs* to be displayed, do:

```swift
A0LockLoger.logError()
```

```objective-c

```

## Older Versions Support

If you're using a Lock version prior to `1.10.0`, the process for enabling and disabling logs is different.

In this case, go to `A0Logging.h` and replace the `auth0LogLevel` constant value with the log level you desire, for instance:

```swift
static const int auth0LogLevel = LOG_LEVEL_ALL;
```

Then, you have to manually configure CocoaLumberjack, typically in the `AppDelegate`, like this:

```swift
import CocoaLumberjack

class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        DDLog.addLogger(DDASLLogger.sharedInstance)
        DDLog.addLogger(DDTTYLogger.sharedInstance)
        return true
    }

}
```

```objective-c

```

