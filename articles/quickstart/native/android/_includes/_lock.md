## Add the Lock Dependency

Your first step is to add [Lock](https://github.com/auth0/Lock.Android) into your project. Lock is a library for displaying a native UI in your app for logging in and signing up with different platforms via [Auth0](https://auth0.com/).

### Add Lock with Gradle

Inside the app's `build.gradle` dependencies section:

```xml
apply plugin: 'com.android.application'
android {
  //..
}
dependencies {
  //---> Add the next line
  implementation 'com.auth0.android:lock:2.+'
  //<---
}
```

::: note
You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock).
:::


Now add the _Manifest Placeholders_, required by the SDK to define internally an **intent-filter** to capture the authentication callback. You do that by adding the next line:

```xml
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

<%= include('_credentials') %>

Then, run **Sync Project with Gradle Files** inside Android Studio or `./gradlew clean assembleDebug` from the command line.

::: note
For more information about Gradle usage, check [their official documentation](https://gradle.org/getting-started-android-build/).
:::
