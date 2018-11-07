## How to Login with Auth0

### Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your applications's **Allowed Callback URLs** for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

Go to your [Applications's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that **Allowed Callback URLs** contains the following for each platform you are supporting.

#### iOS Callback

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

Remember to replace `PRODUCT_BUNDLE_IDENTIFIER` with your actual application's bundle identifier name.


Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`. In the sample project the value is:

```xml
// ios/<YOUR PROJECT>/Info.plist

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
// android/app/src/main/AndroidManifest.xml

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auth0sample"
```
