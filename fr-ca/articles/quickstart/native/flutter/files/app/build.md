---
name: app/build.gradle
language: 
---
    
```
apply plugin: 'com.android.application'

android {
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 21
        targetSdkVersion flutter.targetSdkVersion
        // ...

        // ---> Add the next line
        manifestPlaceholders += [auth0Domain: "auth0-dsepaid.auth0.com", auth0Scheme: "https"]
        // <---
    }
}
```
