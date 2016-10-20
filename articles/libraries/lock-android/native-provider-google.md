---
description: Lock for Android: Google as a Provider
---

# Native Provider - Google

You can use Google AuthProvider to log in with or without **Lock**. Make sure to follow the instructions in the [setup](#setup) section.

## Latest version

The Lock-Google is available through [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following line to your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-google:1.0.0'
```

## Requirements

Android 4.0 or later & Google Play Services 9.+

## Github Repository

https://github.com/auth0/Lock-Google.Android

## Setup

### Google Developers Console
1. Go to the [Google Developers Console](https://console.developers.google.com/) and create a new Project.
2. Complete the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) by at least providing a valid Email Address and Name.
3. On the left side you have the navigation drawer, click [Credentials](https://console.developers.google.com/apis/credentials).
4. Create a new credential by clicking the [Create Credentials](https://console.developers.google.com/apis/credentials/oauthclient) button and choosing **OAuth client ID**. Next, choose **Web Application** and give it a name like "Auth0 Server Google-OAuth". Complete the **Authorized redirect URIs** by filling the field with your callback URL, which should look like `https://{YOUR_DOMAIN}.auth0.com/login/callback`. Make sure to press ENTER before leaving the field and then click the Create button. Take note of the `CLIENT ID` and `CLIENT SECRET` values as we're going to use them later.
5. Create a new credential by clicking the [Create Credentials](https://console.developers.google.com/apis/credentials/oauthclient) button and choosing **OAuth client ID**. Next, choose **Android** and give it a name like "Auth0 Android Google-OAuth". Obtain the **SHA-1** of the certificate you're using to sign your application and complete the first field with it. If you need help obtaining the SHA-1 check [this](#certificate-fingerprints) section. Finally, complete the last field with your android application **Package Name** and then click the Create button. Take note of the `CLIENT ID` value as we're going to use it later.

### Auth0 Dashboard
1. Go to the Auth0 Dashboard and click [Social Connections](https://manage.auth0.com/#/connections/social).
2. Click **Google** and a dialog will prompt.
3. Complete the "Client ID" field with the `CLIENT ID` value obtained in the step 4 of the **Google Developers Console** section above.
4. Complete the "Client Secret" field with the `CLIENT SECRET` value obtained in the step 4 of the **Google Developers Console** section above.
5. Complete the "Allowed Mobile Client IDs" field with the `CLIENT ID` obtained in the step 5 of the **Google Developers Console** section above.
6. Click the Save button.
7. Go to the Auth0 Dashboard and click [Clients](https://manage.auth0.com/#/clients). If you haven't created yet one, do that first and get into your client configuration page.
8. At the bottom of the page, click the "Show Advanced Settings" link and go to the "Mobile Settings" tab.
9. In the Android section, complete the **Package Name** with your application's package name. Finally, complete the **Key Hashes** field with the SHA-256 of the certificate you're using to sign your application. If you need help obtaining the SHA-256 check [this](#certificate-fingerprints) section. Click the "Save Changes" button.

### Android Application
1. In your android application, create a new String resource in the `res/strings.xml` file. Name it `google_server_client_id` and set as value the `CLIENT_ID` obtained in the step 5 of the **Google Developers Console** setup section above.
2. Add the Google Play Services version MetaData to the `AndroidManifest.xml` file, inside the Application tag.

```xml
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />
```

3. Add the Internet Android permission to your `AndroidManifest.xml` file.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

4. When creating a new instance of the `GoogleAuthProvider` pass the value as the first parameter:

```java
public class MainActivity extends AppCompatActivity {
  private GoogleAuthProvider provider;
  // ...

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));
    final AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
    provider = new GoogleAuthProvider(getString(R.string.google_server_client_id), client);
  }

  // ...
}
```

> If you need further help with the setup, please check Google's [Sign-In for Android Guide](https://developers.google.com/identity/sign-in/android).

## Usage with Lock
If you plan to use this provider with **Lock**, pass the instance of the provider to the `GoogleAuthHandler` class and add it to Lock's Builder when you create the instance.

```java
FacebookAuthHandler handler = new GoogleAuthHandler(provider);
lock = Lock.newBuilder(auth0, authCallback)
        .withAuthHandlers(handler)
        //...
        .build(this);
```

## Usage without Lock
If you plan to use this provider without **Lock**, make sure you override the `onActivityResult()` method and redirect the call to the provider instance. Finally, call start to begin the authentication process.

```java
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

That's it, you're ready to run the application and log in with Google native provider!!

## Additional options

### Using a custom connection name
To use a custom social connection name to authorize against Auth0, create the GoogleAuthProvider instance using the second constructor:

```java
GoogleAuthProvider provider = new GoogleAuthProvider("my-connection", "google-server-client-id", client);
```

### Requesting a custom Google Scope
By default, the scope `Scopes.PLUS_LOGIN` is requested. You can customize the Scopes by calling `setScopes` with the list of Scopes. Each Google API (Auth, Drive, Plus..) specify it's own list of Scopes.

```java
provider.setScopes(Arrays.asList(new Scope(Scopes.PLUS_ME), new Scope(Scopes.PLUS_LOGIN)));
```

### Requesting custom Android Runtime Permissions
This provider doesn't require any special Android Manifest Permission to authenticate the user. But if your use case requires them, you can let the AuthProvider handle them for you. Use the `setRequiredPermissions` method.

```java
provider.setRequiredPermissions(new String[]{"android.permission.GET_ACCOUNTS"});
```

If you're not using Lock, then you'll have to handle the permission request result yourself. To do so, make your activity implement `ActivityCompat.OnRequestPermissionsResultCallback` and override the `onRequestPermissionsResult` method, calling `provider.onRequestPermissionsResult` with the activity context and the received parameters.

### Log out / Clear account.
To log out the user so that the next time he's prompted to input his credentials call `clearSession`. After you do this the provider state will be invalid and you will need to call `start` again before trying to `authorize` a result. Calling `stop` has the same effect.

```java
provider.clearSession();
```

### Remember the Last Login
By default, this provider will remember the last account used to log in. If you want to change this behavior, use the following method.

```java
provider.rememberLastLogin(false);
```

### Certificate Fingerprints
When creating a new OAuth Credential in the Google Developers Console you will need to provide the SHA-1 of the certificate you're using to sign your application. When completing your Client's Configuration in the Auth0 Dashboard you will also need to provide the SHA-256 value. To obtain them follow this steps:

Locate the certificate you're using to sign your application. If you don't have one you can generate it or use the default `android.keystore` certificate, that was generated automatically for you when you installed the SDK. In this example we're going to use the default one.

* On Windows:

```sh
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

* On Linux / macOS

```sh
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Sample output:

```
Alias name: androiddebugkey
Creation date: Jan 01, 2013
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, O=Android, C=US
Issuer: CN=Android Debug, O=Android, C=US
Serial number: 4aa9b300
Valid from: Mon Jan 01 08:04:04 UTC 2013 until: Mon Jan 01 18:04:04 PST 2033
Certificate fingerprints:
     MD5:  AE:9F:95:D0:A6:86:89:BC:A8:70:BA:34:FF:6A:AC:F9
     SHA1: BB:0D:AC:74:D3:21:E1:43:07:71:9B:62:90:AF:A1:66:6E:44:5D:75
   	 SHA256: 15:B9:F9:33:9F:E4:E3:68:C2:10:49:17:5D:A8:77:12:7C:8E:57:E9:FF:B7:23:EA:CC:DD:56:08:06:C9:5E:33
     Signature algorithm name: SHA256withRSA
     Version: 3
```

The values you need are located in the **SHA-1** and the **SHA-256** lines.
