## Configure the Manifest File

Declare the `LockActivity` in your project's `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auth0.samples">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name="com.auth0.samples.MainActivity">
          <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
        </activity>

        <activity
            android:name="com.auth0.android.lock.LockActivity"
            android:label="@string/app_name"
            android:launchMode="singleTask"
            android:screenOrientation="portrait"
            android:theme="@style/Lock.Theme"/>

    </application>

</manifest>
```

It's very important to specify the `android:launchMode="singleTask"` in your activity to ensure the authentication state it's not lost along redirects and that the result arrives back in the same activity instance that first requested it.

The next step is to whitelist the **Callback URL** of your app. Edit the "Allowed Callback URLs" section of the [Application Settings](${manage_url}/#/applications) and add a URL that looks like this:

```text
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name, available in the app's `build.gradle` file as the `applicationId` attribute.


::: note
Do not add `<android:noHistory="true">` to the `LockActivity` as this will alter the correct functionality of **Lock**.
:::
