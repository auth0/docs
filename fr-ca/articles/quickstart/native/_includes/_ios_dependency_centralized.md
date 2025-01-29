<!-- markdownlint-disable MD002 MD041 -->

## Install Dependencies

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

### SPM

If you are using the Swift Package Manager, open the following menu item in Xcode:

**File > Add Packages...**

In the **Search or Enter Package URL** search box enter this url: 

```text
https://github.com/auth0/Auth0.swift.git
```

Then select the dependency rule and press **Add Package**.

::: note
For further reference on SPM, check [its official documentation](https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app).
:::
