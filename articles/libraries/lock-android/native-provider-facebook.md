---
section: libraries
description: Lock for Android - Google as a Provider
---

# Native Provider - Facebook

You can use Facebook AuthProvider to log in with or without **Lock**. Make sure to follow the instructions in the [setup](#setup) section.

## Latest version

The Lock-Facebook is available through [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following line to your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-facebook:3.+'
```

_You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock-Facebook.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock-facebook%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock-facebook)._

## Requirements

Android API 15 or later & Facebook Android SDK 4.+

## Github repository

[https://github.com/auth0/Lock-Facebook.Android](https://github.com/auth0/Lock-Facebook.Android)

## Setup

### Facebook Developers Console

1. Go to the [Facebook Developers Console](https://developers.facebook.com/) and create a new App: Choose "Android" and give it a valid name. Click "Create new Facebook App ID".
2. Add your application's **Package Name** and the name of the **Activity class** where you're using the provider and click the Next button.
3. Add the **SHA-1** Base64 encoded Key Hashes of the certificates you're using to sign your application and click the Next button. If you need help obtaining the SHA-1 check [this](#certificate-fingerprints) section.
4. Finally, scroll to the top of the page and click the Skip Quickstart button to go to your Facebook app's page.
5. On the top of the page, you will find the `APP ID` and `APP SECRET` values. Save them as you're going to need them later.
6. On the left side you have the navigation drawer. Click Settings and then Basic. Turn ON the **Single Sign On** switch and click the Save button.
7. Click Settings and then Advanced. Turn ON the **Native or desktop app?** switch.

### Auth0 dashboard

1. Go to the Auth0 Dashboard and click [Social Connections](${manage_url}/#/connections/social).
2. Click **Facebook** and a dialog will prompt.
3. Complete the "App ID" field with the `APP ID` value obtained in the step 5 of the **Facebook Developers Console** section above.
4. Complete the "App Secret" field with the `APP SECRET` value obtained in the step 5 of the **Facebook Developers Console** section above.
5. Click the Save button.
6. Go to the Auth0 Dashboard and click [Clients](${manage_url}/#/clients). If you haven't created yet one, do that first and get into your client configuration page.
7. At the bottom of the page, click the "Show Advanced Settings" link and go to the "Mobile Settings" tab.
8. In the Android section, complete the **Package Name** with your application's package name. Finally, complete the **Key Hashes** field with the SHA-256 of the certificate you're using to sign your application. If you need help obtaining the SHA-256 check [this](#certificate-fingerprints) section. Click the "Save Changes" button.

### Android application

1. In your android application, create a new String resource in the `res/strings.xml` file. Name it `facebook_app_id` and set as value the `APP ID` obtained in the step 5 of the **Facebook Developers Console** setup section above.
2. Add the `FacebookActivity` and `facebook_app_id` MetaData to the `AndroidManifest.xml` file, inside the Application tag.

```xml
<activity
    android:name="com.facebook.FacebookActivity"
    android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:label="@string/app_name"/>
<meta-data
    android:name="com.facebook.sdk.ApplicationId"
    android:value="@string/facebook_app_id" />
```

3. Add the Internet Android permission to your `AndroidManifest.xml` file.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

4. Create a new instance of the `FacebookAuthProvider`.

```java
public class MainActivity extends AppCompatActivity {
  private FacebookAuthProvider provider;
  // ...

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Auth0 auth0 = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
    provider = new FacebookAuthProvider(client);
  }

  // ...
}
```

> If you need further help with the Facebook SDK setup, please check Facebook's [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).

## Usage with Lock

If you plan to use this provider with **Lock**, pass the instance of the provider to the `FacebookAuthHandler` class and add it to Lock's Builder when you create the instance.

```java
FacebookAuthHandler handler = new FacebookAuthHandler(provider);
lock = Lock.newBuilder(auth0, authCallback)
        .withAuthHandlers(handler)
        //...
        .build(this);
```

## Usage without Lock

If you plan to use this provider without **Lock**, make sure you override the `onActivityResult()` method of your activity and redirect the call to the provider instance. Finally, call start to begin the authentication process.

```java
// Define your own request codes
private static final int RC_PERMISSIONS = 101;
private static final int RC_AUTHENTICATION = 102;

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (provider.authorize(requestCode, resultCode, data)) {
        return;
    }
    super.onActivityResult(requestCode, resultCode, data);
}

private void beginAuthentication(){
  provider.start(this, callback, RC_PERMISSIONS, RC_AUTHENTICATION);
}
```

That's it, you're ready to run the application and log in using Facebook native provider!!

## Additional options

### Using a custom connection name

To use a custom social connection name to authorize against Auth0, call `setConnection` with your new connection name.

```java
FacebookAuthProvider provider = new FacebookAuthProvider("my_connection_name", client);
```

### Send additional authentication parameters

To send additional parameters on the authentication call `setParameters`.

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
provider.setParameters(parameters);
```

### Requesting custom Facebook permissions

By default, the permission `public_profile` is requested. You can customize them by calling `setPermissions` with the list of Facebook Permissions.

```java
provider.setPermissions(Arrays.asList("public_profile", "user_photos"));
```

### Requesting custom Android runtime permissions

This provider doesn't require any special _Android Manifest Permissions_ to authenticate the user. But if your use case requires them, you can let the AuthProvider handle them for you. Use the `setRequiredPermissions` method to specify them.

```java
provider.setRequiredPermissions(new String[]{"android.permission.GET_ACCOUNTS"});
```

If you're not using Lock then you'll have to handle the permission request result yourself. To do so, make your activity implement the `ActivityCompat.OnRequestPermissionsResultCallback` interface. When the `onRequestPermissionsResult` method gets called pass the result to the provider by calling `provider.onRequestPermissionsResult`.

### Log out / clear account.
To log out the user so that the next time they are prompted to input their credentials call `clearSession`. After you do this the provider state will be invalid and you will need to call `start` again before trying to `authorize` a result. Calling `stop` has the same effect.

```java
provider.clearSession();
```

### Remember the last Login

By default this provider will remember the last account used to log in. If you want to change this behavior, use the following method.

```java
provider.rememberLastLogin(false);
```


## Certificate fingerprints

When creating a new OAuth Credential in the Facebook Developers Console you will need to provide the SHA-1 of the certificate you're using to sign your application. When completing your Client's Configuration in the Auth0 Dashboard you will also need to provide the SHA-256 value. Here is an example of the terminal command to acquire the value, and a sample result.

Command:

```sh
keytool -exportcert -alias androiddebugkey -keystore <PATH_TO_YOUR_KEYSTORE> -storepass android | openssl sha1 -binary | openssl base64
```

Sample output:

```
SHA1: BB:0D:AC:74:D3:21:E1:43:07:71:9B:62:90:AF:A1:66:6E:44:5D:75
SHA256: 15:B9:F9:33:9F:E4:E3:68:C2:10:49:17:5D:A8:77:12:7C:8E:57:E9:FF:B7:23:EA:CC:DD:56:08:06:C9:5E:33
```

If you need assistance, you can follow this [Keystores Guide](/libraries/lock-android/keystore) to acquire those values.
