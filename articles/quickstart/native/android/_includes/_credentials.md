## Set Credentials

You will require the **Client ID** and **Domain** for your client application. These values can be found in your Auth0 dashboard. The suggested approach is to add these credentials to your `strings.xml` file so they are accessible to your application.

```xml
<string name="auth0_client_id">${account.clientId}</string>
<string name="auth0_domain">${account.namespace}</string>
```

When adding the `LockActivity` to the `AndroidManifest.xml` file, remember to update the intent-filter definition by replacing the `{YOUR_APP_PACKAGE_NAME}` with your application's package name. 

```xml
<activity
android:name="com.auth0.android.lock.LockActivity"
android:label="@string/app_name"
android:launchMode="singleTask"
android:screenOrientation="portrait"
android:theme="@style/Lock.Theme">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />

    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data
      android:host="@string/auth0_domain"
      android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
      android:scheme="https" />
  </intent-filter>
</activity>
```
