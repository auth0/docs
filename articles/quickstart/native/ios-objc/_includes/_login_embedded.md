<%= include('_dependency_embedded') %>

<%= include('_hybrid_setup_lock') %>

Auth0 will need to handle the callback of this authentication, add the following to your `AppDelegate`:

First, import the Swift wrapper:

```objc
#import "Auth0Sample-Swift.h"
```

Then, add the following `UIApplicationDelegate` method:

```swift
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return [HybridLock resumeAuth:url options:options];
}
```

::: note
Please ensure you have configured your callback URL as demonstrated in [Configure Callback](/quickstart/native/ios-objc#configure-callback-urls).
:::

## Implement the Login

Import the Swift wrapper and Auth0 library:

```objc
#import "Auth0Sample-Swift.h"
@import Auth0;
```

Then, configure and present the embedded login widget:

```swift
HybridLock *lock = [[HybridLock alloc] init];
[lock showLockFrom:self callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    if (error) {
        NSLog(@"Error: %@", error);
    } else if (credentials) {
        // Do something with credentials, such as save them.
        // Auth0 will dismiss itself automatically by default.
    }
}];
```

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_2_login.png" alt="Lock UI"></div>

As you can see, upon successful authentication, the `onAuth` callback will yield the user's `credentials`.

::: note
For further reference on the `credentials` object, please see
[Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) documentation. We will cover the storage of the user's credentials in a later chapter.  By default Lock will not store this for you.
:::

This sets you up for handling Database connections.

### Log In with Enterprise & Social Connections

In order to use browser based Auth mechanism through social and enterprise connections, all you have to do is enable them in your account's [connections dashboard](${manage_url}/#/connections/social). Every connection you switch on there, will appear in the Login screen of your app.
