---
section: libraries
title: Lock Android v2 Custom Theming
description: Customizing the Lock for Android UI
tags:
  - libraries
  - lock
  - android
---
# Lock Android: Custom Theming

The **Lock.Android** UI is very customizable. Various items such as the header logo and title, some colors, buttons, and other items can be altered.

## Supported attributes list

| Name | Type | Description |
| :--- | :---: | :--- |
|Auth0.HeaderLogo | drawable - reference | Logo drawable to display inside the header. |
|Auth0.HeaderTitle | string - reference | Text to display as Title inside the header. |
|Auth0.HeaderTitleColor | color - reference | Color for the Title text. |
|Auth0.HeaderBackground | color - reference | Used as background color in the header. |
|Auth0.PrimaryColor | color - reference | Used as _normal_ state in widgets like the Submit button. Also used as _accent_ color. |
|Auth0.DarkPrimaryColor | color - reference | Used as _pressed_ state in widgets like the Submit button. |

## Create a New Resource File

First you need to create a new `Theme` that extends from `Lock.Theme`, and override the attributes you want to customize.

styles.xml

```xml
<resources>
  <style name="MyTheme" parent="Lock.Theme">
    <item name="Auth0.HeaderLogo">@drawable/com_auth0_lock_header_logo</item>
    <item name="Auth0.HeaderTitle">@string/com_auth0_lock_header_title</item>
    <item name="Auth0.HeaderTitleColor">@color/com_auth0_lock_text</item>
    <item name="Auth0.HeaderBackground">@color/com_auth0_lock_header_background</item>
    <item name="Auth0.PrimaryColor">@color/com_auth0_lock_submit_normal</item>
    <item name="Auth0.DarkPrimaryColor">@color/com_auth0_lock_submit_pressed</item>
  </style>
</resources>
```

::: note
Those attributes not overridden by the user will default to the ones defined in `Lock.Theme`.
:::

Then, you need to tell the Manifest that you want to use the new `MyTheme` in the `Activity`. This is **very important**!!

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.company.app">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
          android:name="com.auth0.android.lock.LockActivity"
          android:label="@string/app_name"
          android:launchMode="singleTask"
          android:screenOrientation="portrait"
          android:theme="@style/MyTheme">
        </activity>
    </application>
</manifest>
```

## Pay Attention to the Manifest

Please note that if you define your own Theme in a style resource file and forget to specify that the Theme's parent is `Lock.Theme`, or you forget to tell the Manifest which will be the Theme for the Activity, you will end up with a really bad looking UI. This may also happen if the values you specify in your custom Theme are invalid.

## Custom OAuth Connection Buttons

::: note
In order to customize OAuth connection styles, first you must create a new connection by using the `Custom Social Connections` [extension](${manage_url}/#/extensions), filling in every required field before saving the changes.
:::

To customize OAuth connection styles in Lock you can call the builder passing both the `connectionName` and the `style` to use.

First create a custom style extending `Lock.Theme.AuthStyle` and define the logo, background color and name of the connection.

```xml
<style name="Style.Facebook" parent="Lock.Theme.AuthStyle">
    <item name="Auth0.BackgroundColor">@color/facebook_color</item>
    <item name="Auth0.Name">@string/facebook_name</item>
    <item name="Auth0.Logo">@drawable/facebook_logo</item>
</style>
```

Now in the builder's setup add the `AuthStyle` for the connection name that you want to override.

```java
builder.withAuthStyle("facebook", R.style.Style_Facebook)
        .build(...);
```

When **Lock** needs to display that connection in a **SocialButton**, it will first search for user-overridden styles, and if none are found, it will default to the Lock social defaults. This means that for `facebook` in particular it would use Facebook background color, Facebook logo and `FACEBOOK` as name.

As the builder method receives the `connectionName` you can then customize `oauth2` strategy type connections. The default values for this strategy (if none are provided) are the Auth0 logo, Auth0 background color, and `OAUTH2` as the name.
