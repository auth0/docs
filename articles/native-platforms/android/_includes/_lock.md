## Add the Lock Dependency

Your first step is to add [Lock](https://github.com/auth0/Lock.Android) into your project. Lock is a library for displaying a native UI in your app for logging in and signing up with different platforms via [Auth0](https://auth0.com/).

### Add Lock with Gradle

Inside the `build.gradle` dependencies section:

```xml
apply plugin: 'com.android.application'
android {
  //..
}
dependencies {
  compile 'com.auth0.android:lock:2.0.0'   
}
```

Then, run **Sync Project with Gradle Files** inside Android Studio or `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](https://gradle.org/getting-started-android-build/).