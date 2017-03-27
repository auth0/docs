## Configure the Manifest File

Add the following code to your project's `AndroidManifest.xml`.

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
            android:host="${account.namespace}"
            android:pathPrefix="/android/{YOUR_PACKAGE_NAME}/callback"
            android:scheme="https" />
    </intent-filter>
</activity>
```

Add the following permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

> Do not add `<android:noHistory="true">` to the `LockActivity` as this will alter the correct functionality of **Lock**.
