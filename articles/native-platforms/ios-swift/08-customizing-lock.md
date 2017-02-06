---
title: Customizing Lock
description: This tutorial will show you how to customize the Lock widget UI.
budicon: 285
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '08-Customizing-Lock',
  requirements: [
    'CocoaPods 1.0.0',
    'XCode 7.3 (7D175)',
    'iPhone 6 - iOS 9.3 (13E230)'
  ]
}) %>

## Before Starting

You need the [Lock](https://github.com/auth0/Lock.iOS-OSX) library integrated in your project. Make sure you've followed the [login tutorial](/quickstart/native/ios-swift/01-login) and you know how to present the login dialog.

## User Experience

The Lock experience can be extensively customized through a combination of Lock methods.

## Configure the Style

Lock's UI is composed of several parts that can be customized.

![Lock.png](/media/articles/libraries/lock-ios/customization/lock_2_ui.png)

You can find the full list of style properties in the [style struct documentation](https://github.com/auth0/Lock.iOS-OSX/blob/v2/Lock/Style.swift)

So, for example, if you want to achieve something like this:

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_2_style.png" alt="Lock Custom UI/></div>

You can make use of the `withStyle` method when initializing Lock:

```swift
Lock
    .classic()
    .withStyle {
        $0.title = "Phantom Inc."
        $0.headerBlur = .extraLight
        $0.logo = LazyImage(name: "icn_phantom")
        $0.primaryColor = UIColor ( red: 0.6784, green: 0.5412, blue: 0.7333, alpha: 1.0 )
    }
    .present(from: self)
```

You can find more examples in the [Styling Lock](https://github.com/auth0/Lock.iOS-OSX/tree/v2#styling-lock) section of the Lock README.

## Configuring the Options

You can find more detailed information in the Customization options]
(https://github.com/auth0/Lock.iOS-OSX/tree/v2#customization-options) section of the Lock README.
