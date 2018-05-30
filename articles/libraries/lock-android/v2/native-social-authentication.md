---
section: libraries
title: Lock Android v2 Native Social Authentication
description: Lock for Android - Native Social Authentication
tags:
  - libraries
  - lock
  - android
  - native
  - social-connections
---
# Lock Android: Native Social Authentication

::: warning
This feature relies on a deprecated grant type. Applications created after June 8th 2017 won't be able to use this feature. 
We recommend using browser-based flows, as explained in [Authentication via Auth0 Universal Login](/libraries/auth0-android#authentication-via-universal-login).
:::

## Native Provider - Google

You can use Google AuthProvider to log in with or without **Lock**. Make sure to follow the instructions in the [setup](#setup) section.

[Lock-Google.Android](https://github.com/auth0/Lock-Google.Android)
 requires Android API 15 or later & Google Play Services 10.+

### Latest version of Lock-Google

The Lock-Google is available through [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following line to your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-google:1.+'
```

::: note
You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock-Google.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock-google%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock-google).
:::

### Lock-Google Setup

#### Google Developers Console

1. Go to the [Google Developers Console](https://console.developers.google.com/) and create a new Project.
2. Complete the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) by at least providing a valid Email Address and Name.
3. On the left side you have the navigation drawer, click [Credentials](https://console.developers.google.com/apis/credentials).
4. Create a new credential by clicking the [Create Credentials](https://console.developers.google.com/apis/credentials/oauthclient) button and choosing **OAuth client ID**. Next, choose **Web Application** and give it a name like "Auth0 Server Google-OAuth". Complete the **Authorized redirect URIs** by filling the field with your callback URL, which should look like `https://${account.namespace}/login/callback`. Make sure to press ENTER before leaving the field and then click the Create button. Take note of the `CLIENT ID` and `CLIENT SECRET` values as we're going to use them later.
5. Create a new credential by clicking the [Create Credentials](https://console.developers.google.com/apis/credentials/oauthclient) button and choosing **OAuth client ID**. Next, choose **Android** and give it a name like "Auth0 Android Google-OAuth". Obtain the **SHA-1** of the certificate you're using to sign your application and complete the first field with it. If you need help obtaining the SHA-1 check [this](#certificate-fingerprints) section. Finally, complete the last field with your android application **Package Name** and then click the Create button. Take note of the `CLIENT ID` value as we're going to use it later.

#### Auth0 Dashboard

1. Go to the Auth0 Dashboard and click [Social Connections](${manage_url}/#/connections/social).
2. Click **Google** and a dialog will prompt.
3. Complete the "Client ID" field with the `CLIENT ID` value obtained in the step 4 of the **Google Developers Console** section above.
4. Complete the "Client Secret" field with the `CLIENT SECRET` value obtained in the step 4 of the **Google Developers Console** section above.
5. Complete the "Allowed Mobile Client IDs" field with the `CLIENT ID` obtained in the step 5 of the **Google Developers Console** section above.
6. Click the Save button.
7. Go to the Auth0 Dashboard and click [Applications](${manage_url}/#/applications). If you haven't created yet one, do that first and get into your application configuration page.
8. At the bottom of the page, click the "Show Advanced Settings" link and go to the "Mobile Settings" tab.
9. In the Android section, complete the **Package Name** with your application's package name. Finally, complete the **Key Hashes** field with the SHA-256 of the certificate you're using to sign your application. If you need help obtaining the SHA-256 check [this](#certificate-fingerprints) section. Click the "Save Changes" button.

#### Android application

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
    auth0.setOIDCConformant(true);
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
    provider = new GoogleAuthProvider(getString(R.string.google_server_client_id), client);
  }

  // ...
}
```

::: note
If you need further help with the Google SDK setup, please check Google's [Sign-In for Android Guide](https://developers.google.com/identity/sign-in/android).
:::

### Usage with Lock

If you plan to use this provider with **Lock**, pass the instance of the provider to the `GoogleAuthHandler` class and add it to Lock's Builder when you create the Lock instance.

```java
GoogleAuthHandler handler = new GoogleAuthHandler(provider);
lock = Lock.newBuilder(auth0, authCallback)
        .withAuthHandlers(handler)
        //...
        .build(this);
```

### Usage without Lock

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

### Additional Options

#### Using a custom connection name

To use a custom social connection name to authorize against Auth0, create the GoogleAuthProvider instance using the second constructor:

```java
GoogleAuthProvider provider = new GoogleAuthProvider("my-connection", "google-server-client-id", client);
```

#### Send additional authentication parameters

To send additional parameters on the authentication call `setParameters`.

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
provider.setParameters(parameters);
```

#### Requesting a custom Google scope

By default, the scope `Scopes.PLUS_LOGIN` is requested. You can customize the Scopes by calling `setScopes` with the list of Scopes. Each Google API (Auth, Drive, Plus..) specify it's own list of Google Scopes.

```java
provider.setScopes(Arrays.asList(new Scope(Scopes.PLUS_ME), new Scope(Scopes.PLUS_LOGIN)));
```

#### Requesting custom Android runtime permissions

This provider doesn't require any special _Android Manifest Permissions_ to authenticate the user. But if your use case requires them, you can let the AuthProvider handle them for you. Use the `setRequiredPermissions` method.

```java
provider.setRequiredPermissions(new String[]{"android.permission.GET_ACCOUNTS"});
```

If you're not using Lock then you'll have to handle the permission request result yourself. To do so, make your activity implement the `ActivityCompat.OnRequestPermissionsResultCallback` interface. When the `onRequestPermissionsResult` method gets called pass the result to the provider by calling `provider.onRequestPermissionsResult`.

#### Log out / clear account.

To log out the user so that the next time they are prompted to input their credentials call `clearSession`. After you do this the provider state will be invalid and you will need to call `start` again before trying to `authorize` a result. Calling `stop` has the same effect.

```java
provider.clearSession();
```

#### Remember the last login

By default this provider will remember the last account used to log in. If you want to change this behavior, use the following method.

```java
provider.rememberLastLogin(false);
```

#### Certificate fingerprints

When creating a new OAuth Credential in the Google Developers Console you will need to provide the SHA-1 of the certificate you're using to sign your application. When completing your Application's Configuration in the Auth0 Dashboard you will also need to provide the SHA-256 value. Here is an example of the terminal command to acquire the value, and a sample result.

Command:

```sh
keytool -exportcert -alias androiddebugkey -keystore <PATH_TO_YOUR_KEYSTORE> -storepass android | openssl sha1 -binary | openssl base64
```

Sample output:

```text
no71633JAC3qgzQYCbskprUr55k=
```

If you need assistance, you can follow this [Keystores Guide](/libraries/lock-android/keystore) to acquire those values.


## Native Provider - Facebook

You can use Facebook AuthProvider to log in with or without **Lock**. Make sure to follow the instructions in the [setup](#setup) section.

[Lock-Facebook](https://github.com/auth0/Lock-Facebook.Android) requires Android API 15 or later & Facebook Android SDK 4.+

## Latest version

The Lock-Facebook is available through [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To install it, simply add the following line to your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-facebook:3.+'
```

_You can check for the latest version on the repository [Readme](https://github.com/auth0/Lock-Facebook.Android#install), in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22lock-facebook%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/android/lock-facebook)._

### Lock-Facebook Setup

#### Facebook Developers Console

1. Go to the [Facebook Developers Console](https://developers.facebook.com/) and create a new App: Choose "Android" and give it a valid name. Click "Create new Facebook App ID".
2. Add your application's **Package Name** and the name of the **Activity class** where you're using the provider and click the Next button.
3. Add the **SHA-1** Base64 encoded Key Hashes of the certificates you're using to sign your application and click the Next button. If you need help obtaining the SHA-1 check [this](#certificate-fingerprints) section.
4. Finally, scroll to the top of the page and click the Skip Quickstart button to go to your Facebook app's page.
5. On the top of the page, you will find the `APP ID` and `APP SECRET` values. Save them as you're going to need them later.
6. On the left side you have the navigation drawer. Click Settings and then Basic. Turn ON the **Single Sign On** switch and click the Save button.
7. Click Settings and then Advanced. Turn ON the **Native or desktop app?** switch.

#### Auth0 dashboard

1. Go to the Auth0 Dashboard and click [Social Connections](${manage_url}/#/connections/social).
2. Click **Facebook** and a dialog will prompt.
3. Complete the "App ID" field with the `APP ID` value obtained in the step 5 of the **Facebook Developers Console** section above.
4. Complete the "App Secret" field with the `APP SECRET` value obtained in the step 5 of the **Facebook Developers Console** section above.
5. Click the Save button.
6. Go to the Auth0 Dashboard and click [Applications](${manage_url}/#/applications). If you haven't created yet one, do that first and get into your application configuration page.
7. At the bottom of the page, click the "Show Advanced Settings" link and go to the "Mobile Settings" tab.
8. In the Android section, complete the **Package Name** with your application's package name. Finally, complete the **Key Hashes** field with the SHA-256 of the certificate you're using to sign your application. If you need help obtaining the SHA-256 check [this](#certificate-fingerprints) section. Click the "Save Changes" button.

#### Android application

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
    auth0.setOIDCConformant(true);
    AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
    provider = new FacebookAuthProvider(client);
  }

  // ...
}
```

::: note
If you need further help with the Facebook SDK setup, please check Facebook's [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).
:::

### Usage with Lock

If you plan to use this provider with **Lock**, pass the instance of the provider to the `FacebookAuthHandler` class and add it to Lock's Builder when you create the instance.

```java
FacebookAuthHandler handler = new FacebookAuthHandler(provider);
lock = Lock.newBuilder(auth0, authCallback)
        .withAuthHandlers(handler)
        //...
        .build(this);
```

### Usage without Lock

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

### Additional options

#### Using a custom connection name

To use a custom social connection name to authorize against Auth0, call `setConnection` with your new connection name.

```java
FacebookAuthProvider provider = new FacebookAuthProvider("my_connection_name", client);
```

#### Send additional authentication parameters

To send additional parameters on the authentication call `setParameters`.

```java
Map<String, Object> parameters = new HashMap<>();
//Add entries
provider.setParameters(parameters);
```

#### Requesting custom Facebook permissions

By default, the permission `public_profile` is requested. You can customize them by calling `setPermissions` with the list of Facebook Permissions.

```java
provider.setPermissions(Arrays.asList("public_profile", "user_photos"));
```

#### Requesting custom Android runtime permissions

This provider doesn't require any special _Android Manifest Permissions_ to authenticate the user. But if your use case requires them, you can let the AuthProvider handle them for you. Use the `setRequiredPermissions` method to specify them.

```java
provider.setRequiredPermissions(new String[]{"android.permission.GET_ACCOUNTS"});
```

If you're not using Lock then you'll have to handle the permission request result yourself. To do so, make your activity implement the `ActivityCompat.OnRequestPermissionsResultCallback` interface. When the `onRequestPermissionsResult` method gets called pass the result to the provider by calling `provider.onRequestPermissionsResult`.

#### Log out / clear account.

To log out the user so that the next time they are prompted to input their credentials call `clearSession`. After you do this the provider state will be invalid and you will need to call `start` again before trying to `authorize` a result. Calling `stop` has the same effect.

```java
provider.clearSession();
```

#### Remember the last Login

By default this provider will remember the last account used to log in. If you want to change this behavior, use the following method.

```java
provider.rememberLastLogin(false);
```

### Certificate fingerprints

When creating a new OAuth Credential in the Facebook Developers Console you will need to provide the SHA-1 of the certificate you're using to sign your application. When completing your Application's Configuration in the Auth0 Dashboard you will also need to provide the SHA-256 value. Here is an example of the terminal command to acquire the value, and a sample result.

Command:

```sh
keytool -exportcert -alias androiddebugkey -keystore <PATH_TO_YOUR_KEYSTORE> -storepass android | openssl sha1 -binary | openssl base64
```

Sample output:

```text
SHA1: BB:0D:AC:74:D3:21:E1:43:07:71:9B:62:90:AF:A1:66:6E:44:5D:75
SHA256: 15:B9:F9:33:9F:E4:E3:68:C2:10:49:17:5D:A8:77:12:7C:8E:57:E9:FF:B7:23:EA:CC:DD:56:08:06:C9:5E:33
```

If you need assistance, you can follow this [Keystores Guide](/libraries/lock-android/keystore) to acquire those values.
