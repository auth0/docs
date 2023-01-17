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
        manifestPlaceholders += [auth0Domain: "${account.namespace}", auth0Scheme: "https"]
        // <---
    }
}
```
