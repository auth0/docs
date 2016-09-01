# Lock Android: Passwordless Authentication

`LockPasswordlessActivity` authenticates users by sending them an Email or SMS (similar to how WhatsApp authenticates you). In order to be able to authenticate the user, your application must have the SMS/Email connection enabled and configured in your [dashboard](https://manage.auth0.com/#/connections/passwordless).

You'll need to configure PasswordlessLockActivity in your `AndroidManifest.xml`, inside the `application` tag:

```xml
<activity
  android:name="com.auth0.android.lock.PasswordlessLockActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:screenOrientation="portrait"
  android:theme="@style/Lock.Theme">
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />

      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />

      <data
        android:host="YOUR_AUTH0_DOMAIN"
        android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
        android:scheme="https" />
    </intent-filter>
</activity>
```

Additionally, if you're going to use WebView instead of Browser when authenticating with a Social Provider, you need to declare the WebAuthActivity inside the `application` tag:

```xml
<activity
    android:name="com.auth0.android.provider.WebAuthActivity"
    android:theme="@style/MyAppTheme"/>
```

Also, you'll need to add *Internet* permission to your application:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

> The `android.permission.ACCESS_NETWORK_STATE` permission is only used if you chose WebView over Browser for OAuth authentication.

Then in any of your Activities you need to initialize **PasswordlessLock**

```java
// This activity will show Lock
public class HomeActivity extends Activity {

  private PasswordlessLock lock;

  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Your own Activity code
    Auth0 auth0 = new Auth0("YOUR_AUTH0_CLIENT_ID", "YOUR_AUTH0_DOMAIN");
    this.lock = PasswordlessLock.newBuilder(auth0, callback)
      //Customize Lock
      .build(this);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    // Your own Activity code
    lock.onDestroy(this);
    lock = null;
  }

  private LockCallback callback = new AuthenticationCallback() {
     @Override
     public void onAuthentication(Credentials credentials) {
        //Authenticated
     }

     @Override
     public void onCanceled() {
        //User pressed back
     }

     @Override
     public void onError(LockException error) {
        //Exception occurred
     }
  };
}
```

Then just start `PasswordlessLockActivity` from inside your `Activity`

```java
startActivity(this.lock.newIntent(this));
```