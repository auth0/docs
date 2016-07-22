---
url: /libraries/lock-android
---

# Lock for Android

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps and Salesforce.

## Key features

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
compile 'com.auth0.android:lock:1.13.+'
```

Once it's installed, you'll need to configure LockActivity in your`AndroidManifest.xml`, inside the `application` tag:

```xml
<!--Auth0 Lock-->
<activity
  android:name="com.auth0.lock.LockActivity"
  android:theme="@style/Lock.Theme"
  android:screenOrientation="portrait"
  android:launchMode="singleTask">
  <intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data android:scheme="a0INSERT_YOUR_APP_CLIENT_ID" android:host="YOUR_ACCOUNT_NAME.auth0.com"/>
  </intent-filter>
</activity>
<meta-data android:name="com.auth0.lock.client-id" android:value="@string/auth0_client_id"/>
<meta-data android:name="com.auth0.lock.domain-url" android:value="@string/auth0_domain"/>
<!--Auth0 Lock End-->
```

> The value `@string/auth0_client_id` is your application's clientID and `@string/auth0_domain` is your tenant's domain in Auth0, both values can be found in your app's settings.
> The final value of `android:scheme` must be in lowercase

Also, you'll need to add *Internet* permission to your application:
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Finally, make your Application class (The one that extends from `android.app.Application`) implement the interface `com.auth0.lock.LockProvider` and add the following code:

```java
public class MyApplication extends Application implements LockProvider {

  private Lock lock;

  public void onCreate() {
    super.onCreate();
    lock = new Lock.Builder()
      .loadFromApplication(this)
      /** Other configuration goes here */
      .closable(true)
      .build();
  }

  @Override
  public Lock getLock() {
    return lock;
  }
}
```

> You can check [here](#lock-builder) for more configuration options

You should also add your Application class to the `AndroidManifest.xml`.
```xml
<application
        android:name=".MyApplication"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name">
        <!-- Other configuration goes here -->

</application>
```

And include the following code in your `build.gradle` file.

```gradle
android {
  //...
  packagingOptions {
      exclude 'META-INF/NOTICE'
      exclude 'META-INF/LICENSE'
  }
}
```  


## Usage

### Email/Password, Enterprise & Social authentication

`LockActivity` will handle Email/Password, Enterprise & Social authentication based on your Application's connections enabled in your Auth0's Dashboard.

When a user authenticates successfully, LockActivity will send an Action using LocalBroadcastManager and then finish itself (by calling finish()). The activity that is interested in receiving this Action (In this case the one that will show Lock) needs to register a listener in the LocalBroadcastManager:

```java
// This activity will show Lock
public class HomeActivity extends Activity {

  private LocalBroadcastManager broadcastManager;

  private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      UserProfile profile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
      Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
      Log.i(TAG, "User " + profile.getName() + " logged in");
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    //Customize your activity

    broadcastManager = LocalBroadcastManager.getInstance(this);
    broadcastManager.registerReceiver(authenticationReceiver, new IntentFilter(Lock.AUTHENTICATION_ACTION));
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    broadcastManager.unregisterReceiver(authenticationReceiver);
  }
}
```

Then just start `LockActivity`

```java
Intent lockIntent = new Intent(this, LockActivity.class);
startActivity(lockIntent);
```
And you'll see our native login screen

[![Lock.png](http://blog.auth0.com.s3.amazonaws.com/Lock-Widget-Android-Screenshot.png)](https://auth0.com)

> By default all social authentication will be done using an external browser, if you want native integration please check this [wiki page](/libraries/lock-android/native-social-authentication).

### Passwordless

`LockPasswordlessActivity` authenticates users by sending them an Email or SMS (similar to how WhatsApp authenticates you). In order to be able to authenticate the user, your application must have the SMS/Email connection enabled and configured in your [dashboard](https://manage.auth0.com/#/connections/passwordless).

`LockPasswordlessActivity` is not included in `com.auth0:lock:aar` as it's part of the library `lock-passwordless`, but you can add it with this line in your `build.gradle`:
```gradle
compile 'com.auth0.android:lock-passwordless:1.13.+'
```

Then in your `AndroidManifest.xml` register the following activities:
```xml
    <!--Auth0 Lock Passwordless-->
    <activity
      android:name="com.auth0.lock.passwordless.LockPasswordlessActivity"
      android:theme="@style/Lock.Theme"
      android:label="@string/app_name"
      android:screenOrientation="portrait"
      android:launchMode="singleTask"/>

    <activity android:name="com.auth0.lock.passwordless.CountryCodeActivity"
      android:theme="@style/Lock.Theme"/>
<!--Auth0 Lock Passwordless End-->
```

Just like `LockActivity`, when a user authenticates successfully, `LockPasswordlessActivity` will send an `Action` using `LocalBroadcastManager` and then finish itself (by calling `finish()`). The activity that is interested in receiving this `Action` (in this case the one that will show Lock) needs to register a listener in the `LocalBroadcastManager`:

```java
// This activity will show Lock
public class HomeActivity extends Activity {
  private LocalBroadcastManager broadcastManager;

  private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      UserProfile profile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
      Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
      Log.i(TAG, "User " + profile.getName() + " logged in");
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    //Customize your activity

    broadcastManager = LocalBroadcastManager.getInstance(this);
    broadcastManager.registerReceiver(authenticationReceiver, new IntentFilter(Lock.AUTHENTICATION_ACTION));
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    broadcastManager.unregisterReceiver(authenticationReceiver);
  }
}
```

Then just start `LockPasswordlessActivity` specifying the Passwordless type you want to use, so for **Email**

```java
LockPasswordlessActivity.showFrom(MyActivity.this, LockPasswordlessActivity.MODE_EMAIL_CODE);
```

or just for **SMS**

```java
LockPasswordlessActivity.showFrom(MyActivity.this, LockPasswordlessActivity.MODE_SMS_CODE);
```

and you'll see the **SMS** login screen

[![Lock.png](http://blog.auth0.com.s3.amazonaws.com/Lock-SMS-Android-Screenshot.png)](https://auth0.com)

Passworless scenarios and types:

| Channel \ Mode  | Code  | Magic Link      |
| :-----: |:---------------:| :--------------: |
| SMS   | `LockPasswordlessActivity.MODE_SMS_CODE`   | `LockPasswordlessActivity.MODE_SMS_LINK`   |
| Email | `LockPasswordlessActivity.MODE_EMAIL_CODE` | `LockPasswordlessActivity.MODE_EMAIL_LINK` |

You can find more information about Magic Links [here](/libraries/lock-android/passwordless-magic-link).

## Proguard
In the [proguard directory](https://github.com/auth0/Lock.Android/tree/master/proguard) you can find the *Proguard* configuration for Lock and its dependencies.
By default you should at least use the following files:
* `proguard-square-okhttp.pro`
* `proguard-jackson-2.pro`
* `proguard-square-otto.pro`
* `proguard-lock.pro`

and if you use Facebook or Google+ native integration, you'll need `proguard-facebook.pro` and `proguard-google-play-services.pro` respectively.

You specify several files in you application's `build.gradle` like this:

```gradle
buildTypes {
  release {
    minifyEnabled true
    proguardFile '../proguard/proguard-facebook.pro' //facebook native auth
    proguardFile '../proguard/proguard-google-play-services.pro' //G+ native auth
    proguardFile '../proguard/proguard-square-okhttp.pro' //Auth0 core
    proguardFile '../proguard/proguard-jackson-2.pro' //Auth0 core
    proguardFile '../proguard/proguard-square-otto.pro' //Lock
    proguardFile '../proguard/proguard-lock.pro' //Lock
    //Add your app's specific proguard rules
  }
}
```

## API

### Lock

#### Constants

```java
public static final String AUTHENTICATION_ACTION;
```
Action sent in `LocalBroadcastManager` when a user authenticates. It will include an instance of `UserProfile` and `Token`.

```java
public static final String AUTHENTICATION_ACTION_PROFILE_PARAMETER;
```
Name of the parameter that will include user's profile

```java
public static final String AUTHENTICATION_ACTION_TOKEN_PARAMETER;
```
Name of the parameter that will include user's token information

```java
public static final String CANCEL_ACTION;
```
Action sent when the user navigates back closing `LockActivity` or `LockSMSActivity`

```java
public static final String CANCEL_ACTION;
```
Action sent when the user change its password

#### Properties
```java
public boolean shouldUseWebView();
public void setUseWebView(boolean useWebView);
```
Forces Lock to use an embedded `android.webkit.WebView` and by  default is `false`.

```java
public boolean shouldLoginAfterSignUp();
public boolean setLoginAfterSignUp(boolean loginAfterSignUp);
```
Lock will login the user after a successful sign up. By default is `true`

```java
public boolean isClosable();
public boolean setClosable(boolean closable);
```
Allows Lock activities to be closed by pressing back button. Default is `false`

```java
public boolean shouldUseEmail();
public void setUseEmail(boolean useEmail);
```
Lock will ask for the user's email instead of a username. By default is `true`.

```java
public Map<String, Object> getAuthenticationParameters();
public void setAuthenticationParameters(Map<String, Object> authenticationParameters);
```
Map with parameters that will be sent on every authentication request with Auth0 API.

```java
public List<String> getConnections();
public void setConnections(List<String> connections);
```
Tells Lock to use the connections whose name is included in the list. By default the list is null or empty which means that all enabled connections in your application will be used.

```java
public String getDefaultDatabaseConnection();
public void setDefaultDatabaseConnection(String defaultDatabaseConnection);
```
Lock will use the Database Connection whose name matches the one provided. By default its null, which means it will pick the first of the list.

```java
public void setFullscreen(boolean fullscreen);
public boolean isFullscreen();
```
If Lock's activities should be displayed in Fullscreen. Default is `false`

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

#### Constants

```java
public static final String CLIENT_ID_KEY = "com.auth0.lock.client-id";
```
Key value used by Lock to search in your application's meta-data for the ClientID.
```java
public static final String TENANT_KEY = "com.auth0.lock.tenant";
```
Key value used by Lock to search in your application's meta-data for tenant name.
```java
public static final String DOMAIN_URL_KEY = "com.auth0.lock.domain-url";
```
Key value used by Lock to search in your application's meta-data for domain Url.
```java
public static final String CONFIGURATION_URL_KEY = "com.auth0.lock.configuration-url";
```
Key value used by Lock to search in your application's meta-data for configuration Url.

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
