---
title: Customizing Lock
description: This tutorial will show you how to modify the Lock activity look and feel.
seo_alias: android
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::
  
  <%= include('../../_includes/_github', {
  link: 'https://github.com/inaka/auth0-android-sample/tree/10-Customizing-Lock',
}) %> 


### Before Starting

We will assume that you completed the [Login Tutorial](01-login.md) before starting this one. 

### 1. Create a custom theme

Your first step is to create a `Theme` builder, in which you will specify your desired modifications. In this case, we modify the header's `Title`:

```java
Theme customizedLockTheme = Theme.newBuilder()
	.withHeaderTitle(R.string.app_name)
	.build();
```

> We suggest you to add all the colors in the `color.xml` resource file, and all the texts in the `strings.xml`.

#### Customizable parts of Lock
Besides the header's `Title` you can modify:

#### i. Header
You can modify the header's `Color`, logo and text with: 

```java
.withHeaderTitle(R.string.app_name)
.withHeaderTitleColor(R.color.headerTitleColor)
.withHeaderLogo(R.drawable.custom_logo)
```

#### ii. Primary Color
You can set the primary color, and the primary color for the dark theme with:

```java
.withPrimaryColor(R.color.colorPrimary)
.withDarkPrimaryColor(R.color.colorPrimaryDark)
```


### 2. Present the lock activity

Once you have the customized theme, you only need to add it while you're creating the lock activity.

```java
this.lock = Lock.newBuilder(auth0, callback)
	.withTheme(customizedLockTheme)
	.build();
```	
       
### Done!

That's it! You've customized `Lock Activity` UI up to your preferences!