---
title: Customizing Lock
description: This tutorial will show you how to modify the look and feel for the Lock activity.
seo_alias: android
---

This tutorial will show you how to modify the look and feel for the Lock activity.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::
  
 <%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/10-Customizing-Lock',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '10-Customizing-Lock',
  pkgFilePath: '10-Customizing-Lock/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>

### Before Starting

It is assumed that you have already completed the [Login Tutorial](01-login).

### 1. Create A Custom Theme

Your first step is to create a `Theme` builder, in which you will specify your desired modifications. In this case, we modify the header's `Title`:

```java
Theme customizedLockTheme = Theme.newBuilder()
	.withHeaderTitle(R.string.app_name)
	.build();
```

> We suggest you to add all the colors to the `color.xml` resource file, and all text to the `strings.xml` file.

#### Customizable Parts Of Lock

Besides the header's `Title`, you can modify:

#### i. Header
You can modify the header's color, logo, and text with: 

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


### 2. Present The Lock Activity

Once you have the customized theme, you only need to add it while you're creating the Lock activity.

```java
this.lock = Lock.newBuilder(auth0, callback)
	.withTheme(customizedLockTheme)
	.build();
```
