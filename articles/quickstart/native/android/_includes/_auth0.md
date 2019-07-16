## Add the Auth0 Android Dependency

Add the [Auth0 Android](https://github.com/auth0/Auth0.Android) SDK into your project. The library makes requests to the Auth0's Authentication and Management APIs.

### Add Auth0 to Gradle

In your app's `build.gradle` dependencies section, add the following:

```xml
apply plugin: 'com.android.application'
android {
  //..
}
dependencies {
  //---> Add the next line
  implementation 'com.auth0.android:auth0:1.+'
  //<---
}
```

::: note
You can check for the latest version on the [repository Readme](https://github.com/auth0/auth0.android#installation), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22auth0%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/auth0).
:::

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
