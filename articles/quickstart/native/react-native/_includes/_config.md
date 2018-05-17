## How to Login with Auth0

<%= include('../../../_includes/_callback_url') %>

#### iOS Callback

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

Remember to replace `PRODUCT_BUNDLE_IDENTIFIER` with your actual application's bundle identifier name.

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`. In the sample project the value is:

```xml
<key>CFBundleIdentifier</key>
<string>auth0.samples.Auth0Sample</string>
```

#### Android Callback

```text
{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.

You can find this at the top of your `AndroidManifest.xml` file located in the `android/app/src/main/` folder. In the sample project the value is:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auth0sample"
```
