## Add the Auth0 Android Dependency

<%= include('./_gradle.md') %>

Add manifest placeholders required by the SDK. The placeholders are used internally to define an `intent-filter` that captures the authentication callback URL.

To add the manifest placeholders, add the next line:

```xml
// app/build.gradle

apply plugin: 'com.android.application'
compileSdkVersion 28
android {
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 15
        targetSdkVersion 28
        // ...

        // ---> Add the next line
        manifestPlaceholders = [auth0Domain: "@string/com_auth0_domain", auth0Scheme: "demo"]
        // <---
    }
}
```

::: note
You do not need to declare a specific `intent-filter` for your activity, because you have defined the manifest placeholders with your Auth0 **Domain** and **Scheme** values and the library will handle the redirection for you.
:::

The `AndroidManifest.xml` file should look like this:

```xml
<!-- app/src/main/AndroidManifest.xml -->

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auth0.samples">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity android:name="com.auth0.samples.MainActivity">
          <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
        </activity>

    </application>

</manifest>
```

Run **Sync Project with Gradle Files** inside Android Studio or execute `./gradlew clean assembleDebug` from the command line.

::: note
For more information about using Gradle, check the [Gradle official documentation](https://gradle.org/getting-started-android-build/).
:::
