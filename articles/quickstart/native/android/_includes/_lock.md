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
  compile 'com.auth0.android:lock:2.+'
}
```

_You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock)._

Then, run **Sync Project with Gradle Files** inside Android Studio or `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](https://gradle.org/getting-started-android-build/).
