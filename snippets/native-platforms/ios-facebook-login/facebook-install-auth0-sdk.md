### Cocoapods

If you are using [Cocoapods](https://cocoapods.org), add this line to your `Podfile`:

```ruby
pod 'Auth0', '~> 1.0'
```

Then run `pod install`.

::: note
For more information on Cocoapods, check [their official documentation](https://guides.cocoapods.org/using/getting-started.html).
:::

### Carthage

If you are using [Carthage](https://github.com/Carthage/Carthage), add the following line to your `Cartfile`:

```ruby
github "auth0/Auth0.swift" ~> 1.0
```

Then run `carthage bootstrap`.

::: note
For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).
:::

::: panel Web Authentication
If your iOS application plans to support Web Authentication, head over [here](/libraries/auth0-swift#web-based-auth-ios-only-) to learn how to configure the Callback and Logout URLs, and set up the Custom URL Scheme.
:::
