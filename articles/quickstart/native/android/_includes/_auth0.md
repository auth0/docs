## Add the Auth0 Android Dependency

<%= include('./_gradle.md') %>

Add manifest placeholders required by the SDK. The placeholders are used internally to define an `intent-filter` that captures the authentication callback URL. 

To add the manifest placeholders, add the next line:

```xml
// app/build.gradle

apply plugin: 'com.android.application'
android {
    compileSdkVersion 25
    buildToolsVersion "25.0.3"
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 15
        targetSdkVersion 25
        //...

        //---> Add the next line
        manifestPlaceholders = [auth0Domain: "@string/com_auth0_domain", auth0Scheme: "demo"]
        //<---
    }
}
```

Run **Sync Project with Gradle Files** inside Android Studio or execute `./gradlew clean assembleDebug` from the command line.

::: note
For more information about using Gradle, check the [Gradle official documentation](https://gradle.org/getting-started-android-build/).
:::
