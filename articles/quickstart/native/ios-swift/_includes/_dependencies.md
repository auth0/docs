#### Carthage

If you are using Carthage, add the following lines to your `Cartfile`:

```ruby
github "auth0/Lock.iOS-OSX" ~> 2.1
github "auth0/Auth0.swift" ~> 1.4
```

Then run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

#### Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Lock', '~> 2.1'
pod 'Auth0', '~> 1.4'
```
Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).
