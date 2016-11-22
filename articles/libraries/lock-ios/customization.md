---
section: libraries
toc_title: Customization
description: Learn how to customize the look and feel of Lock
---

# Lock iOS: Customization

Lock UI can be customized by creating your own `A0Theme` and overriding the default one before displaying `A0LockViewController`:

```objc
A0Theme *myAwesomeTheme = [[A0Theme alloc] init];
//Customize your theme
[[A0Theme sharedInstance] registerTheme:myAwesomeTheme];
```
```swift
let myAwesomeTheme = A0Theme()
//Customize your theme
A0Theme.sharedInstance().registerTheme(myAwesomeTheme)
```

## How to configure your Theme

**Lock**'s UI is composed of several parts that can be customized
Here is a list of the available values that can be customized:

![](/media/articles/libraries/lock-ios/customization/Lock-UI-Parts.png)

You can either configure some type of properties which are:

* Color: `UIColor` instance.
* Image: `NSString` with image name.
* Font: `UIFont` instance. 

Example Usage
```
myAwesomeTheme.registerColorForKey(UIColor.redColor(), "A0ThemePrimaryButtonNormalColor");
```

This is the list of properties that can be customized:

### Primary Button
* A0ThemePrimaryButtonNormalColor
* A0ThemePrimaryButtonHighlightedColor
* A0ThemePrimaryButtonNormalImageName
* A0ThemePrimaryButtonHighlightedImageName
* A0ThemePrimaryButtonFont
* A0ThemePrimaryButtonTextColor

### Secondary Button
* A0ThemeSecondaryButtonBackgroundColor
* A0ThemeSecondaryButtonNormalImageName
* A0ThemeSecondaryButtonHighlightedImageName
* A0ThemeSecondaryButtonFont
* A0ThemeSecondaryButtonTextColor

### TextField
* A0ThemeTextFieldFont
* A0ThemeTextFieldTextColor
* A0ThemeTextFieldPlaceholderTextColor
* A0ThemeTextFieldIconColor

### Title
* A0ThemeTitleFont
* A0ThemeTitleTextColor

### Icon
* A0ThemeIconBackgroundColor
* A0ThemeIconImageName

### Background
* A0ThemeScreenBackgroundColor
* A0ThemeScreenBackgroundImageName

### Message & Description
* A0ThemeDescriptionFont
* A0ThemeDescriptionTextColor
* A0ThemeSeparatorTextFont
* A0ThemeSeparatorTextColor

### CredentialBox
* A0ThemeCredentialBoxBorderColor
* A0ThemeCredentialBoxSeparatorColor
* A0ThemeCredentialBoxBackgroundColor

### Close Button
* A0ThemeCloseButtonTintColor
