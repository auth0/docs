---
section: libraries
toc: true
url: /libraries/lock-ios/v2/customization
title: Lock for iOS v2 Style Customization Options
description: Styling and customization options for the style of Lock v2 for iOS
tags:
  - libraries
  - lock
  - ios
---

# Lock v2 for iOS - Style Customization Options 

There are numerous options to configure Lock's style and appearance listed below. In addition, there are also quite a few options available to alter Lock's behavior and functionality in the [Behavior Configuration Options](/libraries/lock-ios/v2/configuration) page.

## Customizing Lock's appearance

Style customization options can be added to your Lock initialization using `withStyle`.

```swift
Lock
  .classic()
  .withStyle {
	  $0.title = "Company LLC"
	  $0.logo = LazyImage(name: "company_logo")
	  $0.primaryColor = UIColor(red: 0.6784, green: 0.5412, blue: 0.7333, alpha: 1.0)
	}
  .present(from: self)
```

## Header Style Options

### headerBlur 

Blur effect style used. It can be any value defined in `UIBlurEffectStyle`.

```swift
.withStyle {
  $0.headerBlur = .extraLight
}
```	

### headerColor

Color used as the header background color. By default it has no color, just a blur.

```swift
.withStyle {
  $0.headerColor = UIColor? = nil
}
```	

### logo

Header logo image

```swift
.withStyle {
  $0.logo = LazyImage(name: "company_logo")
}
``` 

### headerCloseIcon

The "close" icon in the header can be altered.

```swift
.withStyle {
  $0.headerCloseIcon = LazyImage(name: "ic_close")
}
``` 

### headerBackIcon

The "back" icon in the header can be altered.

```swift
.withStyle {
  $0.headerBackIcon = LazyImage(name: "ic_close")
}
``` 

## Title Style Options

### hideTitle

Hide header title and show only the logo. By default this option is false.

```swift
.withStyle {
  $0.hideTitle = false
}
```	

### title

Title text used in the header

```swift
.withStyle {
  $0.title = "Company LLC"
}
```

### titleColor

Color used as the header title color.

```swift
.withStyle {
  $0.titleColor = UIColor.black
}
```	

## Button and Component Style Options

### buttonTintColor

Color used as the primary button tint color.

```swift
.withStyle {
  $0.buttonTintColor = UIColor.white
}
```	

### disabledColor

Color used as the Lock disabled component color.

```swift
.withStyle {
  $0.disabledColor = UIColor(red: 0.8902, green: 0.898, blue: 0.9059, alpha: 1.0)
}
```

### disabledTextColor

Color used as the Lock disabled component text color.

```swift
.withStyle {
  $0.disabledTextColor = UIColor(red: 0.5725, green: 0.5804, blue: 0.5843, alpha: 1.0)
}
```	

### hideButtonTitle

Hide primary button title and show only the icon. By default this option is false.

```swift
.withStyle {
  $0.hideButtonTitle = false
}
```	

### primaryColor

Color used as the Lock primary color.

```swift
.withStyle {
  $0.primaryColor = UIColor.orange
}
```

## Input Field Styles

### inputTextColor

The color of input field text.

```swift
.withStyle {
  $0.inputTextColor = UIColor.black
}
```

### inputPlaceholderTextColor

The color of the placeholder text in input fields.

```swift
.withStyle {
  $0.inputPlaceholderTextColor = UIColor(red: 0.780, green: 0.780, blue: 0.804, alpha: 1.00)
}
```

### inputBorderColor

The color of the border of input fields.

```swift
.withStyle {
  $0.inputBorderColor = UIColor(red: 0.780, green: 0.780, blue: 0.804, alpha: 1.00)
}
```

### inputBorderColorError

The color of the border of input fields which have invalid values.

```swift
.withStyle {
  $0.inputBorderColorError = UIColor.red
}
```

### inputBackgroundColor

The color of the background of input fields.

```swift
.withStyle {
  $0.inputBackgroundColor = UIColor.white
}
```

### inputIconBackgroundColor

The color of the background of input field icons.

```swift
.withStyle {
  $0.inputIconBackgroundColor = UIColor(red: 0.9333, green: 0.9333, blue: 0.9333, alpha: 1.0)
}
```

### inputIconColor

The color of the input field icons.

```swift
.withStyle {
  $0.inputIconColor = UIColor(red: 0.5725, green: 0.5804, blue: 0.5843, alpha: 1.0)
}
```

## Status Bar Styles

### UIStatusBarAnimation

The Lock Controller Status Bar update animation.

```swift
.withStyle {
  $0.UIStatusBarAnimation = .none
}
```

### statusBarHidden

The Lock Controller Status Bar's visibility.

```swift
.withStyle {
  $0.statusBarHidden = false
}
```

### UIStatusBarStyle

The Lock Controller Status Bar style.

```swift
.withStyle {
  $0.UIStatusBarStyle = .default
}
```

### UISearchBarStyle

The Lock Passwordless Search Bar style.

```swift
.withStyle {
  $0.UISearchBarStyle = .default
}
```

## Other Style Options

### textColor

The color for the text in the body.

```swift
.withStyle {
  $0.textColor = UIColor.black
}
```

### backgroundColor

Color used as the Lock background color.

```swift
.withStyle {
  $0.backgroundColor = UIColor.white
}
```

### backgroundImage

Image used as the Lock background

```swift
.withStyle {
  $0.backgroundImage = LazyImage(name: "company_logo")
}
```

### oauth2

Any non-db OAuth2 connection can have styles customized by mapping a connection name with an `AuthStyle`

```swift
.withStyle {
  $0.oauth2["slack"] = AuthStyle(
    name: "Slack",
    color: UIColor(red: 0.4118, green: 0.8078, blue: 0.6588, alpha: 1.0),
    withImage: LazyImage(name: "ic_slack")
  )
}
```

### seperatorTextColor

Social separator label color.

```swift
.withStyle {
  $0.seperatorTextColor = UIColor(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.54)
}
```

### secondaryButtonColor

The color of secondary buttons.

```swift
.withStyle {
  $0.secondaryButtonColor = UIColor.black
}
```

### tabTextColor

The color of the text on the database login tab.

```swift
.withStyle {
  $0.tabTextColor = UIColor(red: 0.3608, green: 0.4, blue: 0.4353, alpha: 0.6)
}
```

### tabTintColor

The color of the tinting on the database login tab.

```swift
.withStyle {
  $0.tabTintColor = UIColor(red: 0.3608, green: 0.4, blue: 0.4353, alpha: 0.6)
}
```
