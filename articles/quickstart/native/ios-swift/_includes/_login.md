## Implement the Login

First, import the `Lock` module in the file where you want to present the login dialog:

```swift
import Lock
```

Then, configure and present the login screen, like this:

```swift
Lock
    .classic()
    .onAuth { credentials in
        // Do something with credentials e.g.: save them.
        // Lock will not save these objects for you.
        // Lock will dismiss itself automatically by default.
    }
    .present(from: self)
```

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_2_login.png" alt="Lock UI"></div>

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own custom login](/quickstart/native/ios-swift/02-custom-login).

As you can see, upon successful authentication, the `onAuth` callback will yield the user's `credentials`.

> For further reference on the `credentials` object, please see:
[Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift)
>
> We will cover the storing of the users credentials in a later chapter.  By default Lock will not store this for you.

This sets you up for handling Database connections.

### Log In with Enterprise & Social Connections

In order to use browser based Auth mechanism through social and enterprise connections, all you have to do is enable them in your account's [connections dashboard](${manage_url}/#/connections/social). Every connection you switch on there, will appear in the Login screen of your app.

Lock will need to handle the callback of this authentication, Lock can take responsibility for this by adding the following to your `AppDelegate`:

First, import the `Lock` module:

```swift
import Lock
```

Then, add the following `UIApplicationDelegate` method:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
  return Lock.resumeAuth(url, options: options)
}
```

> Please ensure you have configured your callback URL as demonstrated in [Configure Callback](/quickstart/native/ios-swift/00-getting-started#configure-callback-urls).
