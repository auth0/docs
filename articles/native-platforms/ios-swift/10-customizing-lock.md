---
title: Customizing Lock
description: This tutorial will show you how to customize the Lock widget UI.
budicon: 285
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '10-Customizing-Lock',
  requirements: [
    'CocoaPods 1.0.0',
    'XCode 7.3 (7D175)',
    'iPhone 6 - iOS 9.3 (13E230)'
  ]
}) %>

## Before Starting

You need the [Lock](https://github.com/auth0/Lock.iOS-OSX) library integrated in your project. Make sure you've followed the [login tutorial](/quickstart/native/ios-swift/01-login) and you know how to present the login dialog.

## Create a Theme

Lock UI can be customized by creating your own `A0Theme` instance:

```swift
import Lock
```

```swift
let theme = A0Theme()
```

## Configure the Theme

Lock's widget UI is composed of several parts that can be customized.

![Lock.png](/media/articles/libraries/lock-ios/customization/Lock-UI-Parts.png)

You can configure these type of properties:

- **Color**: By using a `UIColor` instance.
- **Image**: By using a `String` representing the image's name.
- **Font**: By using a `UIFont` instance.

For instance:

```
theme.register(.red, forKey: A0ThemePrimaryButtonNormalColor);
```

So, for example, if you want to achieve something like this:

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/Custom-Lock-Widget-Screenshot.png" alt="Mobile example screenshot"/></div>

You will need to customize several parts... This is how you do it:

```swift
// 1. Change the logo:
theme.registerImage(withName: "custom-logo", bundle: Bundle.main, forKey: A0ThemeIconImageName)
```

```swift
/// 2. Customize the 'Login' text appearance:
theme.register(.white, forKey: A0ThemeTitleTextColor)
theme.register(.systemFont(ofSize: 24, weight: UIFontWeightThin), forKey: A0ThemeTitleFont)
```

```swift
// 3. Customize the 'OR' text appearance:
theme.register(.white, forKey: A0ThemeSeparatorTextColor)
theme.register(.systemFont(ofSize: 12, weight: UIFontWeightSemibold), forKey: A0ThemeSeparatorTextFont)
```

```swift
// 4. Customize the text fields:
theme.register(.magenta, forKey: A0ThemeTextFieldIconColor)
theme.register(.magenta, forKey: A0ThemeTextFieldPlaceholderTextColor)
theme.register(.white, forKey: A0ThemeTextFieldTextColor)
theme.register(.systemFont(ofSize: 14, weight: UIFontWeightRegular), forKey: A0ThemeTextFieldFont)
```

```swift
// 5. Customize the primary button (ACCESS):
theme.register(.white, forKey: A0ThemePrimaryButtonNormalColor)
theme.register(.magenta, forKey: A0ThemePrimaryButtonHighlightedColor)
theme.register(.magenta, forKey: A0ThemePrimaryButtonTextColor)
theme.register(.systemFont(ofSize: 20, weight: UIFontWeightBold), forKey: A0ThemePrimaryButtonFont)
```

```swift
// 6. Configure the secondary buttons (sign up / reset password):
theme.register(.magenta, forKey: A0ThemeSecondaryButtonBackgroundColor)
theme.register(.white, forKey: A0ThemeSecondaryButtonTextColor)
```

```swift
// 7. Add a background image:
theme.registerImage(withName: "custom-background", bundle: Bundle.main, forKey: A0ThemeScreenBackgroundImageName)
```

```swift
// 8. Configure the X button:
theme.register(.magenta, forKey: A0ThemeCloseButtonTintColor)
```

```swift
// 9. Configure the status bar:
theme.statusBarStyle = .LightContent
```

### 3. Register the Theme

Last, but not least: You still need to register your theme before presenting the login dialog:

```swift
A0Theme.sharedInstance().register(theme)
```

### Done!

In conclusion, here is the code snippet you need to keep on mind:

```swift
let theme = A0Theme()
// customize your theme here
A0Theme.sharedInstance().register(theme)
```

### Appendix: Customizable Properties List

Here is a list containing all the properties that can be customized:

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