---
title: Customizing Lock
description: This tutorial will show you how to customize the Lock widget UI.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-swift',
  pkgFilePath: 'iOS/basic-sample-swift/SwiftSample/Info.plist',
  pkgType: 'replace'
}) %>

### Before Starting

You need the [Lock](https://github.com/auth0/Lock.iOS-OSX) library integrated in your project. Make sure you've followed the [login tutorial](01-login.md) and you know how to present the login dialog.

### 1. Register your Theme

Lock UI can be customized by creating your own `A0Theme` and overriding the default one anywhere before presenting the login dialog:

```swift
import Lock
```

```swift
let myAwesomeTheme = A0Theme()
// Configure your theme here (see step 2)
A0Theme.sharedInstance().registerTheme(myAwesomeTheme)
```

### 2. Configure your Theme

Lock's widget UI is composed of several parts that can be customized. Here is a list of the available values that you can modify:

![Lock.png](https://github.com/auth0/docs/blob/master/media/articles/libraries/lock-ios/customization/Lock-UI-Parts.png)

You can configure the following type of properties:

- **Color**: `UIColor` instance.
- **Image**: `String` with image name.
- **Font**: `UIFont` instance.

For example:

```
myAwesomeTheme.registerColorForKey(UIColor.redColor(), A0ThemePrimaryButtonNormalColor);
```

This is the whole list of properties that can be customized:

#### Primary Button

- `A0ThemePrimaryButtonNormalColor`
- `A0ThemePrimaryButtonHighlightedColor`
- `A0ThemePrimaryButtonNormalImageName`
- `A0ThemePrimaryButtonHighlightedImageName`
- `A0ThemePrimaryButtonFont`
- `A0ThemePrimaryButtonTextColor`

#### Secondary Button

- `A0ThemeSecondaryButtonBackgroundColor`
- `A0ThemeSecondaryButtonNormalImageName`
- `A0ThemeSecondaryButtonHighlightedImageName`
- `A0ThemeSecondaryButtonFont`
- `A0ThemeSecondaryButtonTextColor`

#### Text Field

- `A0ThemeTextFieldFont`
- `A0ThemeTextFieldTextColor`
- `A0ThemeTextFieldPlaceholderTextColor`
- `A0ThemeTextFieldIconColor`

#### Title

- `A0ThemeTitleFont`
- `A0ThemeTitleTextColor`

#### Icon

- `A0ThemeIconBackgroundColor`
- `A0ThemeIconImageName`

#### Background

- `A0ThemeScreenBackgroundColor`
- `A0ThemeScreenBackgroundImageName`

#### Message & Description

- `A0ThemeDescriptionFont`
- `A0ThemeDescriptionTextColor`
- `A0ThemeSeparatorTextFont`
- `A0ThemeSeparatorTextColor`

#### CredentialBox

- `A0ThemeCredentialBoxBorderColor`
- `A0ThemeCredentialBoxSeparatorColor`
- `A0ThemeCredentialBoxBackgroundColor`

#### Close Button

- `A0ThemeCloseButtonTintColor`

Have fun customizing whatever you need from there.

### Done!

Piece of cake. Wasn't it? You've just customized the Lock widget!
