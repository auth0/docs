---
title: Customizing Lock
description: This tutorial will show you how to customize the Lock widget UI.
budicon: 285
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/10-Customizing-Lock',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ios-swift-sample',
  pkgBranch: 'master',
  pkgPath: '10-Customizing-Lock',
  pkgFilePath: null,
  pkgType: 'none'
}) %>



## Before Starting

You need the [Lock](https://github.com/auth0/Lock.iOS-OSX) library integrated in your project. Make sure you've followed the [login tutorial](01-login) and you know how to present the login dialog.

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
theme.registerColorForKey(UIColor.redColor(), A0ThemePrimaryButtonNormalColor);
```

So, for example, if you want to achieve something like this:

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/Custom-Lock-Widget-Screenshot.png" alt="Mobile example screenshot"/></div>

You will need to customize several parts... This is how you do it:

```swift
// 1. Change the logo:
theme.registerImageWithName("custom-logo", bundle: NSBundle.mainBundle(), forKey: A0ThemeIconImageName)
```

```swift
/// 2. Customize the 'Login' text appearance:
theme.registerColor(.whiteColor(), forKey: A0ThemeTitleTextColor)
theme.registerFont(.systemFontOfSize(24, weight: UIFontWeightThin), forKey: A0ThemeTitleFont)
```

```swift
// 3. Customize the 'OR' text appearance:
theme.registerColor(.whiteColor(), forKey: A0ThemeSeparatorTextColor)
theme.registerFont(.systemFontOfSize(12, weight: UIFontWeightSemibold), forKey: A0ThemeSeparatorTextFont)
```

```swift
// 4. Customize the text fields:
theme.registerColor(.lightVioletColor(), forKey: A0ThemeTextFieldIconColor)
theme.registerColor(.lightVioletColor(), forKey: A0ThemeTextFieldPlaceholderTextColor)
theme.registerColor(.whiteColor(), forKey: A0ThemeTextFieldTextColor)
theme.registerFont(.systemFontOfSize(14, weight: UIFontWeightRegular), forKey: A0ThemeTextFieldFont)
```

```swift
// 5. Customize the primary button (ACCESS):
theme.registerColor(.whiteColor(), forKey: A0ThemePrimaryButtonNormalColor)
theme.registerColor(.lightVioletColor(), forKey: A0ThemePrimaryButtonHighlightedColor)
theme.registerColor(.darkVioletColor(), forKey: A0ThemePrimaryButtonTextColor)
theme.registerFont(.systemFontOfSize(20, weight: UIFontWeightBold), forKey: A0ThemePrimaryButtonFont)
```

```swift
// 6. Configure the secondary buttons (sign up / reset password):
theme.registerColor(.lightVioletColor(), forKey: A0ThemeSecondaryButtonBackgroundColor)
theme.registerColor(.whiteColor(), forKey: A0ThemeSecondaryButtonTextColor)
```

```swift
// 7. Add a background image:
theme.registerImageWithName("custom-background", bundle: NSBundle.mainBundle(), forKey: A0ThemeScreenBackgroundImageName)
```

```swift
// 8. Configure the X button:
theme.registerColor(.lightVioletColor(), forKey: A0ThemeCloseButtonTintColor)
```

```swift
// 9. Configure the status bar:
theme.statusBarStyle = .LightContent
```

### 3. Register the Theme

Last, but not least: You still need to register your theme before presenting the login dialog:

```swift
A0Theme.sharedInstance().registerTheme(theme)
```

### Done!

In conclusion, here is the code snippet you need to keep on mind:

```swift
let theme = A0Theme()
// customize your theme here
A0Theme.sharedInstance().registerTheme(theme)
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