Add the [Auth0 Android](https://github.com/auth0/Auth0.Android) SDK into your project. The library will make requests to the Auth0's Authentication and Management APIs.

### Add Auth0 to Gradle

In your app's `build.gradle` dependencies section, add the following:

```groovy
apply plugin: 'com.android.application'
android {
  // ...
}
dependencies {
  // Add the Auth0 Android SDK
  implementation 'com.auth0.android:auth0:1.+'
}
```

::: note
If Android Studio lints the `+` sign, or if you want to use a fixed version, check for the latest in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22auth0%22%20g%3A%22com.auth0.android%22) or [JCenter](https://bintray.com/auth0/android/auth0).
:::

::: panel Sync Project with Gradle Files
Remember to synchronize using the Android Studio prompt or run `./gradlew clean build` from the command line. For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).
:::
