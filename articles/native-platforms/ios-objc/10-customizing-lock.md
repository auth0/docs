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

<%= include('../../_includes/_github', { link: 'https://github.com/auth0-samples/auth0-ios-objc-sample/tree/master/10-Customizing-Lock', }) %>

### Before Starting

You need the [Lock](https://github.com/auth0/Lock.iOS-OSX) library integrated in your project. Make sure you've followed the [login tutorial](01-login.md) and you know how to present the login dialog.

### 1. Create a Theme

Lock UI can be customized by creating your own `A0Theme` instance:

```objc
#import <Lock/Lock.h>
```

```objc
A0Theme *theme = [[A0Theme alloc] init];
```

### 2. Configure Your Theme

Lock's widget UI is composed of several parts that can be customized.

![Lock.png](/media/articles/libraries/lock-ios/customization/Lock-UI-Parts.png)

You can configure these type of properties:

- **Color**: `UIColor` instance.
- **Image**: By using a `String` representing the image's name.
- **Font**: `UIFont` instance.

For instance:

```objc
[theme registerColor: [UIColor redColor] forKey: A0ThemePrimaryButtonNormalColor];
```
So, for example, if you want to achieve something like this:

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/Custom-Lock-Widget-Screenshot.png" alt="Mobile example screenshot"/></div>

You will need to customize several parts. This is how you do it:

```objc
// 1. Change the logo:
[theme registerImageWithName: @"custom-logo"
                      bundle: [NSBundle mainBundle]
                      forKey: A0ThemeIconImageName];
```

```objc
/// 2. Customize the 'Login' text appearance:
[theme registerColor: [UIColor whiteColor] forKey: A0ThemeTitleTextColor];
[theme registerFont: [UIFont systemFontOfSize: 24] forKey: A0ThemeTitleFont];
```

```objc
// 3. Customize the 'OR' text appearance:
[theme registerColor: [UIColor whiteColor] forKey: A0ThemeSeparatorTextColor];
[theme registerFont: [UIFont systemFontOfSize: 18] forKey: A0ThemeSeparatorTextFont];
```

```objc
// 4. Customize the text fields:
[theme registerColor: [self lightVioletColor] forKey: A0ThemeTextFieldIconColor];
[theme registerColor: [self lightVioletColor] forKey: A0ThemeTextFieldPlaceholderTextColor];
[theme registerColor: [UIColor whiteColor] forKey: A0ThemeTextFieldTextColor];
[theme registerFont: [UIFont systemFontOfSize: 14] forKey: A0ThemeTextFieldFont];
```

```objc
// 5. Customize the primary button (ACCESS):
[theme registerColor: [UIColor whiteColor] forKey: A0ThemePrimaryButtonNormalColor];
[theme registerColor: [self lightVioletColor] forKey: A0ThemePrimaryButtonHighlightedColor];
[theme registerColor: [self darkVioletColor] forKey: A0ThemePrimaryButtonFont];
[theme registerFont: [UIFont boldSystemFontOfSize: 20] forKey: A0ThemePrimaryButtonFont];
```

```objc
// 6. Configure the secondary buttons (sign up / reset password):
[theme registerColor: [self lightVioletColor] forKey: A0ThemeSecondaryButtonBackgroundColor];
[theme registerColor: [UIColor whiteColor] forKey: A0ThemeSecondaryButtonTextColor];
```

```objc
// 7. Add a background image:
[theme registerImageWithName:@"custom-background"
                      bundle:[NSBundle mainBundle]
                      forKey:A0ThemeScreenBackgroundImageName];
```

```objc
// 8. Configure the X button:
[theme registerColor:[self lightVioletColor] forKey: A0ThemeCloseButtonTintColor];
```

```objc
// 9. Configure the status bar:
[theme setStatusBarStyle:UIStatusBarStyleLightContent];
```

### 3. Register Your Theme

Last, but not least: You still need to register your theme before presenting the login dialog:

```objc
[[A0Theme sharedInstance] registerTheme: theme];
```

### Done!

In conclusion, here is the code snippet you need to keep in mind:

```objc
A0Theme *theme = [[A0Theme alloc] init];
// customize your theme here
[[A0Theme sharedInstance] registerTheme: theme];
```

Piece of cake, wasn't it? You've just customized the Lock widget!

### Appendix: Customizable Properties List

Here is a list containing all the properties that can be customized:

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
