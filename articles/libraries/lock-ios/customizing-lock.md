# Lock iOS: Customizing Lock

Lock UI can be customized by creating your own `A0Theme` and overriding the default one before displaying your `A0LockViewController`:

```swift
let myAwesomeTheme = A0Theme()
// Customize your theme
A0Theme.sharedInstance().registerTheme(myAwesomeTheme)
```

```objective-c

```

## Customizable Types

Lock's UI is composed of several parts that can be customized:

![](/media/articles/libraries/lock-ios/customization/Lock-UI-Parts.png)

You can configure these type of properties:

- **Color**: By using a `UIColor` instance.
- **Image**: By using a `String` representing the image's name.
- **Font**: By using a `UIFont` instance.

## Example

The following example exposes how to modify the primary button's normal color:

```
myAwesomeTheme.registerColorForKey(UIColor.redColor(), "A0ThemePrimaryButtonNormalColor");
```

> For a full detailed example, check out the [Customizing Lock quickstart for Swift](/docs/articles/native-platforms/ios-swift/10-customizing-lock), or its [Objective-C counterpart](/docs/articles/native-platforms/ios-objc/10-customizing-lock).

## Customizable Properties

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