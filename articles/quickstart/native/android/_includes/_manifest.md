## Configure the Manifest File

Add the following code to your project's `AndroidManifest.xml`. This will ask for the INTERNET permission and register an Intent-Filter to handle web authentication.

```xml
<uses-permission android:name="android.permission.INTERNET" />

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
            android:host="${account.namespace}"
            android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
            android:scheme="demo" />
    </intent-filter>
</activity>
```

It's very important to specify the `android:launchMode="singleTask"` in your activity to ensure the authentication state it's not lost along redirects and that the result arrives back in the same activity instance that first requested it.

The URL defined in the intent-filter will be called from the browser whenever you perform a successful web authentication. This URL must be whitelisted in the "Allowed Callback URLs" section of the [Client settings](${manage_url}/#/clients) and it should look similar to this:

```text
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.


::: note
Do not add `<android:noHistory="true">` to the `LockActivity` as this will alter the correct functionality of **Lock**.
:::
