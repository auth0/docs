## Add The Auth0 Android Dependency

Your first step is to add [Auth0 Android](https://github.com/auth0/Auth0.Android) into your project, which is basically the library that will manage the login process, via [Auth0](https://auth0.com/) Authentication Client.

### Add Auth0 Android with Gradle

Add to your app's module Gradle file:

```gradle
compile 'com.auth0.android:auth0:1.0.0'
```

Then, run "Sync project with Gradle files" inside Android Studio or `./gradlew clean assembleDebug` from the command line.

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).
