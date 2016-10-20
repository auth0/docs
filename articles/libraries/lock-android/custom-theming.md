---
description: Lock for Android - Custom Theming
---

# Lock for Android Custom Theming

**Lock.Android** UI is very customizable.

## Supported attributes list
| Name | Type | Description |
| :--- | :---: | :--- |
|Auth0.HeaderLogo | drawable - reference | Logo drawable to display inside the header. |
|Auth0.HeaderTitle | string - reference | Text to display as Title inside the header. |
|Auth0.HeaderTitleColor | color - reference | Color for the Title text. |
|Auth0.HeaderBackground | color - reference | Used as background color in the header. |
|Auth0.PrimaryColor | color - reference | Used as _normal_ state in widgets like the Submit button. Also used as _accent_ color. |
|Auth0.DarkPrimaryColor | color - reference | Used as _pressed_ state in widgets like the Submit button. |

## A New Resource File

First you need to create a new `Theme` that extends from `Lock.Theme`, and override the attributes you want to customize.

styles.xml
```xml
<resources>
  <style name="MyLockTheme" parent="Lock.Theme">
    <item name="Auth0.HeaderLogo">@drawable/com_auth0_lock_header_logo</item>
    <item name="Auth0.HeaderTitle">@string/com_auth0_lock_header_title</item>
    <item name="Auth0.HeaderTitleColor">@color/com_auth0_lock_text</item>
    <item name="Auth0.HeaderBackground">@color/com_auth0_lock_header_background</item>
    <item name="Auth0.PrimaryColor">@color/com_auth0_lock_submit_normal</item>
    <item name="Auth0.DarkPrimaryColor">@color/com_auth0_lock_submit_pressed</item>
  </style>
</resources>
```

> Those attributes not overridden by the user will default to the ones defined in `Lock.Theme`.


Then, you need to tell the Manifest that you want to use the new `MyLockTheme` in the `Activity`. This is **very important**!!

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
          android:theme="@style/MyLockTheme">
        </activity>
    </application>
</manifest>
```

## Pay Attention to the Manifest!

Please note that if you define your own Theme in a style resource file and forget to specify that the Theme's parent is "Lock.Theme", or you forget to tell the Manifest which will be the Theme for the Activity, you will end up with a really bad looking UI. This may also happen if the values you specify in your custom Theme are invalid.
