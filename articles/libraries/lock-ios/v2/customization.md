---
section: libraries
toc: true
url: /libraries/lock-ios/v2/customization
title: Lock for iOS and macOS v2 Style Customization Options
description: Styling and customization options for the style of Lock v2 for iOS/macOS
---

# Lock v2 for iOS and macOS - Style Customization Options 

There are numerous options to configure Lock's style and appearance listed below. In addition, there are also quite a few options available to alter Lock's behavior and functionality in the [Behavior Configuration Options](/libraries/lock-ios/v2/configuration) page.

<%= include('../_includes/_lock-version') %>

## Customizing Lock's appearance

Style customization options can be added to your Lock initialization using `withStyle`.

```swift
Lock
  .classic()
  .withStyle {
	  $0.title = "Company LLC"
	  $0.logo = LazyImage(named: "company_logo")
	  $0.primaryColor = UIColor(red: 0.6784, green: 0.5412, blue: 0.7333, alpha: 1.0)
	}
  .present(from: self)
```


## Header Style Options

### headerBlur 

Blur effect style used. It can be any value defined in `UIBlurEffectStyle`.

```swift
.withStyle {
  $0.headerBlur = UIBlurEffectStyle = .light
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
  $0.logo = lazyImage(named: "company_logo")
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
  $0.disabledColor = UIColor ( red: 0.8902, green: 0.898, blue: 0.9059, alpha: 1.0 )
}
```

### disabledTextColor

Color used as the Lock disabled component text color.

```swift
.withStyle {
  $0.disabledTextColor = UIColor ( red: 0.5725, green: 0.5804, blue: 0.5843, alpha: 1.0 )
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
  $0.primaryColor = UIColor.a0_orange
}
```

## Other Style Options

### backgroundColor

Color used as the Lock background color.

```swift
.withStyle {
  $0.backgroundColor = UIColor.white
}
```

### oauth2

OAuth2 custom connection styles by mapping a connection name with an `AuthStyle`

```swift
.withStyle {
  $0.oauth2["slack"] = AuthStyle(
    name: "Slack",
    color: UIColor(red: 0.4118, green: 0.8078, blue: 0.6588, alpha: 1.0),
    withImage: LazyImage(name: "ic_slack")
  )
}
```
