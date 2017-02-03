---
section: libraries
toc_title: Logging
description: Learn how to debug Lock by enabling logging.
---

# Lock iOS: Logging

__Lock__ logs serveral useful debugging information using [CocoaLumberjack](https://github.com/CocoaLumberjack/CocoaLumberjack).

> If you are using a Lock version older than `1.10.0` please check [here](#lock-versions-1-10-0)

By default all log messages are disabled but you can enable them in your `AppDelegate.m` (or `AppDelegate.swift`), for example if you want __Lock__'s error messages just add this line:

```objc
[A0LockLogger logError];
```
```swift
A0LockLogger.logError()
```

Or if you want to all debug messages:

```objc
[A0LockLogger logAll];
```
```swift
A0LockLogger.logAll()
```
> If you are already using `CocoaLumberjack`, you need to enable __Lock__'s log after you register CocoaLumberjack's loggers.


### Lock versions < 1.10.0
Go to `A0Logging.h` and change the `auth0LogLevel` variable with the Log Level you'll want to see. for example:
```objc
static const int auth0LogLevel = LOG_LEVEL_ALL;
```

And then you'll need to configure CocoaLumberjack (if you haven't done it for your app). You need to do it once so we recommend doing it in your `AppDelegate`:

```objc
#import <CocoaLumberjack/DDASLLogger.h>
#import <CocoaLumberjack/DDTTYLogger.h>
#import <CocoaLumberjack/DDLog.h>

@implementation A0AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [DDLog addLogger:[DDASLLogger sharedInstance]];
    [DDLog addLogger:[DDTTYLogger sharedInstance]];
    return YES;
}

@end
```
