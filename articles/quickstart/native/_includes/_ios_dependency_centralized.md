<!-- markdownlint-disable MD002 MD041 -->

## Install Dependencies

### Cocoapods

If you are using <a href="https://cocoapods.org" target="_blank">Cocoapods</a>, add this line to your `Podfile`:

```ruby
pod 'Auth0', '~> 1.0'
```

Then run `pod install`.

::: note
For more information on Cocoapods, check <a href="https://guides.cocoapods.org/using/getting-started.html" target="_blank">their official documentation</a>.
:::

### Carthage

If you are using <a href="https://github.com/Carthage/Carthage" target="_blank">Carthage</a>, add the following line to your `Cartfile`:

```ruby
github "auth0/Auth0.swift" ~> 1.0
```

Then run `carthage bootstrap`.

::: note
For more information about Carthage usage, check <a href="https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos" target="_blank">their official documentation</a>.
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
For further reference on SPM, check <a href="https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app" target="_blank">its official documentation</a>.
:::
