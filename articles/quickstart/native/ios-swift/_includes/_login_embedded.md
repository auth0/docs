<%= include('_dependency_embedded') %>

## Implement the Login

First, import the `Lock` module in the file where you want to present the login dialog:

```swift
import Lock
```

Then, configure and present the embedded login widget:

```swift
Lock
    .classic()
    .withOptions {
        $0.oidcConformant = true
        $0.scope = "openid profile"
    }
    .onAuth { credentials in
        // Do something with credentials, such as save them.
        // Lock will not save these objects for you.
        // Lock will dismiss itself automatically by default.
    }
    .present(from: self)
```

::: note
The snippet enables `oidcConformant`, when this mode is enabled it will force the SDK to use Auth0's current authentication pipeline and will prevent it from reaching legacy endpoints. For more information, please see our [Introduction to OIDC Conformant Authentication](/api-auth/intro) and the [OIDC adoption guide](/api-auth/tutorials/adoption).
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_2_login.png" alt="Lock UI"></div>

As you can see, upon successful authentication, the `onAuth` callback will yield the user's `credentials`.

::: note
For further reference on the `credentials` object, please see
[Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) documentation. We will cover the storage of the user's credentials in a later chapter.  By default Lock will not store this for you.
:::

This sets you up for handling Database connections.

### Log in with enterprise & social connections

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

::: note
Please ensure you have configured your callback URL as demonstrated in [Configure Callback](/quickstart/native/ios-swift#configure-callback-urls).
:::
