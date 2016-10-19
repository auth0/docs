---
url: /libraries/lock-android
description: Basics of Lock for Android
---

# Lock for Android

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps and Salesforce.

## Key Features

* **Integrates** your Android app with **Auth0**.
* Provides a **beautiful native UI** to log your users in.
* Provides support for **Social Providers** (Facebook, Twitter, etc.), **Enterprise Providers** (AD, LDAP, etc.) and **Username & Password**.
* Passwordless authentication using **SMS or Email**.

## Additional Documents

<ul>
<% _.forEach(_.sortBy(articles.findByHash('libraries/lock-android').items, 'toc_title'), function(article) { %>
  <% if (article.toc_title) { %>
  <li>
    <span><a href="<%- '/docs' + article.url %>"><%- article.toc_title %></a>
    <% if (article.description) { %>
      - <%- article.description %>
    <% } %>
    </span>
  </li>
  <% } %>
<% }); %>
</ul>

## Requirements

Android API level 15+ is required in order to use Lock's UI.
If you'll create your own API and just call Auth0 API via the `com.auth0.android:core:1.13.+`, the minimum required API level is 9.

## Install

Lock is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Lock* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:lock:2.0.0'
```

_You can check for the latest version on the repository Releases tab or in Maven_

After adding your Gradle dependency, make sure to remember to sync your Gradle project to update the dependencies.

## Dashboard Settings

Go to your [Auth0 Dashboard]() and go to your client's settings. Make sure you have within your "Allowed Callback URLs" list a URL with the following format:

```text
https://{YOUR_AUTH0_DOMAIN}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Now take the keystore file you use to sign the application and obtain the SHA256 key hash. The following examples show how to obtain the hashes for the default android keystore.

**On Windows:**

```bash
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

**On Linux / macOS:**

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**Sample output:**

```text
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

Copy the resulting SHA256 value and go to your application's settings. Click "Show Advanced Settings" and in the "Mobile Settings" tab, fill the Android `app package name` with your application's package name, and the key hash with the value you copied before. Don't forget to save the changes.

If you don't add the callback URL to the whitelist nor the key hash to the settings, the Auth0 server won't return the call result to your application.

## Implementing Lock (Social, Database, Enterprise)

### Configuring AndroidManifest.xml

Add the `android.permission.INTERNET` permission to the Manifest to allow Lock to make requests to the Auth0 API.

```java
<uses-permission android:name="android.permission.INTERNET" />
```

Add LockActivity to your Manifest, replacing the `{YOUR_AUTH0_DOMAIN}` in the `host` attribute with your `tenant.auth0.com` and the `{YOUR_APP_PACKAGE_NAME}` in the `pathPrefix` attribute with your application's package name. This filter allows Android OS to notify your application when an URL with that format is hit. For Lock, this means receiving the authentication result.

```java
<activity
  android:name="com.auth0.android.lock.LockActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:screenOrientation="portrait"
  android:theme="@style/MyLock.Theme">
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />

      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />

      <data
        android:host="{YOUR_AUTH0_DOMAIN}"
        android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
        android:scheme="https" />
    </intent-filter>
</activity>
```

**Some Notes**

* For the default WebAuthProvider to work with the phone's browser, be sure to specify in the Manifest that `LockActivity`'s `launchMode` is `singleTask`. If you forget this mode and the code is running on devices with Android version above KITKAT, an error will raise in the console and the Activity won't launch. This is to sort the way Android handles calling an existing Activity with a result. Previous versions of Android are also affected by this issue, but won't get the warning and can crash if it's not properly handled.
* Also note that for the time being, `LockActivity` can't be launched calling `startActivityForResult`.

### Lock Instance 

In the previous version of Lock, you were asked to create a custom `Application` class and initialize the `Lock.Context` there. **Now this is no longer needed**.

To create a new `Lock` instance and configure it, you will just use the `Lock.Builder` class.

### Auth0

Create an `Auth0` instance to hold your account details, which are the `AUTH0_CLIENT_ID` and the `AUTH0_DOMAIN`.

```java
Auth0 auth0 = new Auth0('${account.clientId}','${account.namespace}');
```

### Authentication Callback

You'll also need a `LockCallback` implementation. We suggest you to extend the `AuthenticationCallback` class and override the `onAuthentication`, `onError` and `onCanceled` methods. Keep in mind that this implementation only notifies you about Authentication events (logins), not User Signups (without login) nor Password Resets.

```java
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
     public void onError(LockException error)
        //Exception occurred
     }
 };
```java

The default `scope` used on authentication calls is `openid`. This changed from v1 as the previous included the `offline_access scope`. If you want to specify a different one, use the `Builder` method `.withAuthenticationParameters()` and add a different value for the `scope` key.

### Lock.Builder

Call the static method `Lock.newBuilder(Auth0, LockCallback)`, passing the account details and the callback implementation, and start configuring the Options. After you're done, build the Lock instance and use it to start the LockActivity.

This is an example of what your activity should look like:

```java
public class MainActivity extends Activity {
  private Lock lock;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
    lock = Lock.newBuilder(auth0, callback)
      // ... Options
      .build(this);
  }

  @Override
  public void onDestroy() {
    lock.onDestroy(this);
    lock = null;
    super.onDestroy();
  }

  private void performLogin() {
    startActivity(lock.newIntent(this));
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

Remember to notify the `LockActivity` when the `OnDestroy` method is called on your `Activity`, as it helps to keep the `Lock` state.

That's it! Lock will handle the rest for you.

## Implementing Lock Passwordless (Social, Passwordless)

`PasswordlessLockActivity` authenticates users by sending them an Email or SMS (similar to how WhatsApp authenticates you). In order to be able to authenticate the user, your application must have the SMS/Email connection enabled and configured in your [Auth0 dashboard](https://manage.auth0.com/#/connections/passwordless).

You'll need to configure `PasswordlessLockActivity` in your `AndroidManifest.xml`, inside the `application` tag:

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
        android:host="{YOUR_AUTH0_DOMAIN}"
        android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
        android:scheme="https" />
    </intent-filter>
</activity>
```

Make sure the Activity's `launchMode` is declared as `"singleTask"` or the result won't come back after the authentication.

Also, you'll need to add *Internet* permission to your application:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Then in any of your Activities, you need to initialize **PasswordlessLock**

```java
// This activity will show Lock
public class HomeActivity extends Activity {

  private PasswordlessLock lock;

  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Your own Activity code
    Auth0 auth0 = new Auth0("YOUR_AUTH0_CLIENT_ID", "YOUR_AUTH0_DOMAIN");
    lock = PasswordlessLock.newBuilder(auth0, callback)
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

Then, just start `PasswordlessLockActivity` from inside your `Activity`

```java
startActivity(lock.newIntent(this));
```

## Proguard
In the [proguard directory](https://github.com/auth0/Lock.Android/tree/master/proguard) you can find the *Proguard* configuration for Lock for Android and its dependencies.
By default you should at least use the following files:
* `proguard-okio.pro`
* `proguard-gson.pro`
* `proguard-otto.pro`
* `proguard-lock-2.pro`

As this library depends on `Auth0.Android`, you should keep the files up to date with the proguard rules defined in the [repository](https://github.com/auth0/Auth0.Android).



## API

### Lock

#### Options

##### UI Options

- **[DEPRECATED 10/14/2016] useBrowser {boolean}**: Whether to use the WebView or the Browser to request calls to the `/authorize` endpoint. The default value is to use Browser. Using the Browser has some [restrictions](./../migration-guide.md#some-restrictions).

```java
public boolean useBrowser();
public void setUseWebView(boolean useWebView);
```

- **closable {boolean}**: Defines if the LockActivity can be closed. By default it's not closable.
- **allowedConnections {List<String>}**: Filters the allowed connections from the list configured in the Dashboard. By default if this value is empty, all the connections defined in the dashboard will be available.


##### Authentication Options

- **withAuthenticationParameters {Map<String, Object>}**: Defines extra authentication parameters to be sent on each log in and sign up call.
- **useImplicitGrant {boolean}**: Whether to use the Implicit Grant or Code Grant flow when authenticating. By default it will try to use Code Grant. If the device has an old API level and can't generate the hash because it lacks the required algorithms, it will use the Implicit Grant.


##### Database Options

- **withUsernameStyle {int}**: Defines if it should ask for email only, username only, or both of them. The accepted values are USERNAME and EMAIL. By default it'll respect the Dashboard configuration of the parameter `requires_username`.
- **loginAfterSignUp {boolean}**: Whether after a SignUp event the user should be logged in automatically. Defaults to `true`.
- **initialScreen {int}**: Allows to customize which form will first appear when launching Lock. The accepted values are LOG_IN, SIGN_UP, and FORGOT_PASSWORD. By default LOG_IN is the initial screen.
- **allowSignUp {boolean}**: Shows the Sign Up form if a Database connection is configured and it's allowed from the Dashboard. Defaults to true.
- **allowLogIn {boolean}**: Shows the Log In form if a Database connection is configured. Defaults to true.
- **allowForgotPassword {boolean}**: Shows the Forgot Password form if a Database connection is configured and it's allowed from the Dashboard. Defaults to true.
- **setDefaultDatabaseConnection {String}**: Defines which will be the default Database connection. This is useful if your application has many Database connections configured.
- **withSignUpFields {List<CustomField>}**: Shows a second screen with extra fields for the user to complete after the username/email and password were completed in the sign up screen. Values submitted this way will be attached to the user profile in `user_metadata`. See [this file](./custom-fields.md) for more information.
- **setPrivacyURL {String}**: Allows to customize the Privacy Policy URL. Will default to https://auth0.com/privacy.
- **setTermsURL {String}**: Allows to customize the Terms of Service URL. Will default to https://auth0.com/terms.
- **setMustAcceptTerms {boolean}**: Forces the user to accept the Terms&Policy before signing up. Defaults to false.


##### OAuth Options

- **withAuthStyle {String, int}**: Customize the look and feel of a given connection (name) with a specific style. See [this file](./styling/custom-oauth-connections.md) for more information.
- **withAuthHandlers {AuthHandler...}**: Customize the authentication process by passing an array of AuthHandlers. See [this file](./../authentication/native-providers/native-providers.md) for more information.
- **withAuthButtonSize {int}**: Allows to customize the Style of the Auth buttons. Possible values are SMALL and BIG. If this is not specified, it will default to SMALL when using **ClassicLock** with at least 2 Enterprise or Database connections, or when using **PasswordlessLock** with a Passwordless connection and less than 3 Social connections. On the rest of the cases, it will use BIG.
- **withConnectionScope(String, String...)**: Allows to specify additional scopes for a given Connection name, which will be request along with the ones defined in the connection settings in the Auth0 dashboard. The scopes are not validated in any way and need to be recognized by the given authentication provider.

##### Passwordless Options

- **useCode {}**: Send a code instead of a link via sms/email for Passwordless authentication.
- **useLink {}**: Send a link instead of a code via sms/email for Passwordless authentication.

#### Methods

```java
public void setProvider(String serviceName, IdentityProvider provider);
```
Change the default identity provider handler for Social and Enterprise connections. By default all social/enterprise authentication are done using Web flow with a Browser.

```java
public void resetAllProviders();
```
Removes all session information the Identity Provider handlers might have.

### Lock.Builder
A simple builder to help you create and configure Lock in your  application.

#### Methods

```java
public Builder clientId(String clientId);
```
Set the clientId of your application in Auth0. This value is mandatory.

```java
public Builder tenant(String tenant);
```
Set the tenant name of your application. This value is optional if you supply a domain url.

```java
public Builder domainUrl(String domain);
```
Set the domain Url for Auth0's API. This value is optional if you provide a tenant name, it will default to Auth0 cloud API `https://tenant_name.auth0.com`.

```java
public Builder configurationUrl(String configuration);
```
Set the Url where Lock fetches the App configuration. By default it asks Auth0 for this info.

```java
public Builder useWebView(boolean useWebView);
```
Make Lock use an embedded WebView for Social+Enterprise authentications.

```java
public Builder closable(boolean closable);
```
Allow the user to close Lock's activity by pressing back button.

```java
public Builder loginAfterSignUp(boolean loginAfterSignUp);
```
After a successful sign up of a user, sign him/her in too.

```java
public Builder authenticationParameters(Map<String, Object> parameters);
```
Extra parameters sent to Auth0 Auth API during authentication. By default it has `scope` defined as `openid offline_access` and a device name stored in `device` parameter key.  For more information check out our [Wiki](/libraries/lock-android/sending-authentication-parameters)

```java
public Builder useEmail(boolean useEmail);
```
Lock will ask for an email for authentication, otherwise it will ask for a username. By default is `true`.

```java
public Builder useConnections(String ...connectionNames);
```
Make Lock pick these connections for authentication from all the enabled connections in your app.

```java
public Builder defaultDatabaseConnection(String name);
```
Make Lock use the Database Connection whose name matches the one provided.

```java
public Builder loadFromApplication(Application application);
```
Load ClientID, Tenant name, Domain and configuration URLs from the Android app's metadata (if available).
These are the values that can be defined and it's keys:
* __com.auth0.lock.client-id__: Application's clientId in Auth0.
* __com.auth0.lock.tenant__: Application's owner tenant name. (Optional if you supply Domain and Configuration URLs)
* __com.auth0.lock.domain-url__: URL where the Auth0 API is available. (Optional if you supply ClientID/Tenant and you use Auth0 in the cloud)
* __com.auth0.lock.configuration-url__: URL where Auth0 apps information is available. (Optional if you supply ClientID/Tenant and you use Auth0 in the cloud)

```java
public Builder fullscreen(boolean fullscreen);
```
Make Lock's activities fullscreen. Default is `false`

```java
public Lock build();
```
Creates a new instance of `Lock` and configure it with the values passed to the builder.
