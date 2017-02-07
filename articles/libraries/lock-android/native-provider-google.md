---
section: libraries
description: Lock for Android - Google as a Provider
---

# Native Provider - Google

You can use Google AuthProvider to log in with or without **Lock**. Make sure to follow the instructions in the [setup](#setup) section.

## Latest version

The Lock-Google is available through [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following line to your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-google:1.1.0'
```

## Requirements

Android API 15 or later & Google Play Services 10.+

## Github repository

[https://github.com/auth0/Lock-Google.Android](https://github.com/auth0/Lock-Google.Android)

## Setup

### Google Developers Console

1. Go to the [Google Developers Console](https://console.developers.google.com/) and create a new Project.
2. Complete the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) by at least providing a valid Email Address and Name.
3. On the left side you have the navigation drawer, click [Credentials](https://console.developers.google.com/apis/credentials).
4. Create a new credential by clicking the [Create Credentials](https://console.developers.google.com/apis/credentials/oauthclient) button and choosing **OAuth client ID**. Next, choose **Web Application** and give it a name like "Auth0 Server Google-OAuth". Complete the **Authorized redirect URIs** by filling the field with your callback URL, which should look like `https://${account.namespace}/login/callback`. Make sure to press ENTER before leaving the field and then click the Create button. Take note of the `CLIENT ID` and `CLIENT SECRET` values as we're going to use them later.
5. Create a new credential by clicking the [Create Credentials](https://console.developers.google.com/apis/credentials/oauthclient) button and choosing **OAuth client ID**. Next, choose **Android** and give it a name like "Auth0 Android Google-OAuth". Obtain the **SHA-1** of the certificate you're using to sign your application and complete the first field with it. If you need help obtaining the SHA-1 check [this](#certificate-fingerprints) section. Finally, complete the last field with your android application **Package Name** and then click the Create button. Take note of the `CLIENT ID` value as we're going to use it later.

### Auth0 Dashboard

1. Go to the Auth0 Dashboard and click [Social Connections](${manage_url}/#/connections/social).
2. Click **Google** and a dialog will prompt.
3. Complete the "Client ID" field with the `CLIENT ID` value obtained in the step 4 of the **Google Developers Console** section above.
4. Complete the "Client Secret" field with the `CLIENT SECRET` value obtained in the step 4 of the **Google Developers Console** section above.
5. Complete the "Allowed Mobile Client IDs" field with the `CLIENT ID` obtained in the step 5 of the **Google Developers Console** section above.
6. Click the Save button.
7. Go to the Auth0 Dashboard and click [Clients](${manage_url}/#/clients). If you haven't created yet one, do that first and get into your client configuration page.
8. At the bottom of the page, click the "Show Advanced Settings" link and go to the "Mobile Settings" tab.
9. In the Android section, complete the **Package Name** with your application's package name. Finally, complete the **Key Hashes** field with the SHA-256 of the certificate you're using to sign your application. If you need help obtaining the SHA-256 check [this](#certificate-fingerprints) section. Click the "Save Changes" button.

### Android application

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

4. When creating a new instance of the `GoogleAuthProvider` pass the `google_server_client_id` value obtained previously as the first parameter:

```java
public class MainActivity extends AppCompatActivity {
  private GoogleAuthProvider provider;
  // ...

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(getString(R.string.com_auth0_client_id), getString(R.string.com_auth0_domain));
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
    provider = new GoogleAuthProvider(getString(R.string.google_server_client_id), client);
  }

  // ...
}
```

> If you need further help with the Google SDK setup, please check Google's [Sign-In for Android Guide](https://developers.google.com/identity/sign-in/android).

## Usage with Lock

If you plan to use this provider with **Lock**, pass the instance of the provider to the `GoogleAuthHandler` class and add it to Lock's Builder when you create the Lock instance.

```java
GoogleAuthHandler handler = new GoogleAuthHandler(provider);
lock = Lock.newBuilder(auth0, authCallback)
        .withAuthHandlers(handler)
        //...
        .build(this);
```

## Usage without Lock

If you plan to use this provider without **Lock**, make sure you override the `onActivityResult()` method and redirect the call to the provider instance. Finally, call start to begin the authentication process.

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

That's it, you're ready to run the application and log in using Google native provider!!

## Additional Options

### Using a custom connection name

To use a custom social connection name to authorize against Auth0, create the GoogleAuthProvider instance using the second constructor:

```java
GoogleAuthProvider provider = new GoogleAuthProvider("my-connection", "google-server-client-id", client);
```

### Send additional authentication parameters

To send additional parameters on the authentication call `setParameters`.

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
provider.setParameters(parameters);
```

### Requesting a custom Google scope

By default, the scope `Scopes.PLUS_LOGIN` is requested. You can customize the Scopes by calling `setScopes` with the list of Scopes. Each Google API (Auth, Drive, Plus..) specify it's own list of Google Scopes.

```java
provider.setScopes(Arrays.asList(new Scope(Scopes.PLUS_ME), new Scope(Scopes.PLUS_LOGIN)));
```

### Requesting custom Android runtime permissions

This provider doesn't require any special _Android Manifest Permissions_ to authenticate the user. But if your use case requires them, you can let the AuthProvider handle them for you. Use the `setRequiredPermissions` method.

```java
provider.setRequiredPermissions(new String[]{"android.permission.GET_ACCOUNTS"});
```

If you're not using Lock then you'll have to handle the permission request result yourself. To do so, make your activity implement the `ActivityCompat.OnRequestPermissionsResultCallback` interface. When the `onRequestPermissionsResult` method gets called pass the result to the provider by calling `provider.onRequestPermissionsResult`.

### Log out / clear account.

To log out the user so that the next time they are prompted to input their credentials call `clearSession`. After you do this the provider state will be invalid and you will need to call `start` again before trying to `authorize` a result. Calling `stop` has the same effect.

```java
provider.clearSession();
```

### Remember the last login

By default this provider will remember the last account used to log in. If you want to change this behavior, use the following method.

```java
provider.rememberLastLogin(false);
```

### Certificate fingerprints

When creating a new OAuth Credential in the Google Developers Console you will need to provide the SHA-1 of the certificate you're using to sign your application. When completing your Client's Configuration in the Auth0 Dashboard you will also need to provide the SHA-256 value. If you need assistance, you can follow this [Keystores Guide](/libraries/lock-android/keystore) to acquire those values.
