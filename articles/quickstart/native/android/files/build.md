---
name: build.gradle
language: groovy
---
```groovy
apply plugin: 'com.android.application'

android {
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 21
        targetSdkVersion 30
        // ...

        // ---> Add the next line
        manifestPlaceholders = [auth0Domain: "@string/com_auth0_domain", auth0Scheme: "demo"]
        // <---
    }
}

dependencies {
  // Add the Auth0 Android SDK
  implementation 'com.auth0.android:auth0:2.+'
}
```