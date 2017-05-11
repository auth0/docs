The first step in adding authentication to your iOS application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the [centralized login page](https://auth0.com/docs/hosted-pages/login).

<%= include('_dependency_centralized') %>

## Adding the callback

Auth0 will need to handle the callback of this authentication, add the following to your `AppDelegate`:

First, import the `Auth0` module:

```swift
import Auth0
```

Then, add the following `UIApplicationDelegate` method:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

> Please ensure you have configured your callback URL as demonstrated in [Configure Callback](/quickstart/native/ios-swift/00-getting-started#configure-callback-urls).

## Implement the Login

First, import the `Auth0` module in the file where you want to present the hosted login page.

```swift
import Auth0
```

Then present the hosted login screen, like this:

```swift
Auth0
    .webAuth()
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            // Do something with credentials e.g.: save them.
            // Auth0 will automatically dismiss the hosted login page
            print("Credentials: \(credentials)")
        }
}
```

As you can see, upon successful authentication the user's `credentials` will be returned.

> For further reference on the `credentials` object, please see:
[Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift)
>
> We will cover the storage of the user's credentials in a later chapter.  By default Auth0 will not store this for you.
