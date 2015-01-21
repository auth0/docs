---
lodash: true
---

## Android Tutorial

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/Lock.Android/master/create-package?path=Examples/Auth0Sample&type=replace&filePath=Examples/Auth0Sample/app/src/main/res/values/auth0.xml@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } else  { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/Lock.Android/master/create-package?path=Examples/Auth0Sample&type=replace&filePath=Examples/Auth0Sample/app/src/main/res/values/auth0.xml@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>@@account.clientId@@://*.auth0.com/authorize</pre></code>
</div>

### 1. Adding the Auth0 Lock to your project

Add the following to the `buid.gradle`:

```gradle
compile 'com.auth0.android:lock:1.0.0'
compile 'com.auth0.android:lock-facebook:1.0.0'
compile 'com.auth0.android:lock-googleplus:1.0.0'
```

### 2. Configuring Auth0 Credentials & Callbacks

Add the `android.permission.INTERNET` permission:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Then add the following entries to `AndroidManifest.xml` inside the `<application>` tag:

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
    <data android:scheme="a0@@account.clientId@@" android:host="@@account.tenant@@.auth0.com"/>
  </intent-filter>
</activity>
<meta-data android:name="com.auth0.lock.client-id" android:value="@@account.clientId@@"/>
<meta-data android:name="com.auth0.lock.tenant" android:value="@@account.tenant@@"/>
<!--Auth0 Lock End-->
```


### 3. Initialise Lock

First make your Application class (The one that extends from `android.app.Application`) implement the interface `com.auth0.lock.LockProvider` and add these lines of code:

```java
public class MyApplication extends Application implements LockProvider {

  private Lock lock;

  public void onCreate() {
    super.onCreate();
    lock = new LockBuilder()
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

### 3. Register Native Authentication Handlers

To allow native logins using other Android apps, e.g: Google+, Facebook, you'll need to register them with Lock after it's initialised.

> If you need Facebook or Twitter native authentication please continue reading to learn how to configure them. Otherwise please go directly to the [next step](#9)

#### Facebook

Lock uses the native Facebook SDK to obtain the user's access token so you'll need to configure it using your Facebook App info:

To get started, in your AndroidManifest.xml you need to add the following:

```xml
<activity android:name="com.facebook.LoginActivity"/>
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

Where `@string/facebook_app_id` is your Facebook Application ID that you can get from [Facebook Dev Site](https://developers.facebook.com/apps).

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).

> **Note:** The Facebook app should be the same as the one set in Facebook's Connection settings on your Auth0 account

Finally, you need to register Auth0 Facebook Identity Provider after Lock is initialised in your Application class:

```java
FacebookIdentityProvider facebook = new FacebookIdentityProvider(lock);
lock.setProvider(Strategies.Facebook.getName(), facebook);
```

####Google+

To support Google+ native authentication you need to add these permissions and meta-data to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.USE_CREDENTIALS" />
<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
```

And register Auth0 Google+ Identity Provider after Lock is initialised in your Application class:

```java
GooglePlusIdentityProvider googleplus = new GooglePlusIdentityProvider(lock, this);
lock.setProvider(Strategies.GooglePlus.getName(), googleplus);
```

### 4. Let's implement the login

Now we're ready to implement the Login. We can start the activity `LockActivity` and register for it's results in a `LocalBroadcastManager`.

In one of your activities, create an instance of `LocalBroadcastManager` and register for `Lock.AUTHENTICATION_ACTION`:

```java
broadcastManager = LocalBroadcastManager.getInstance(this);
broadcastManager.registerReceiver(new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            UserProfile profile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
            Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
            //Your code to handle login information.
        }
    }, new IntentFilter(Lock.AUTHENTICATION_ACTION));
```

On successful authentication, `Lock.AUTHENTICATION_ACTION` will yield the user's profile and tokens.

Then just start `LockActivity`:

```java
Intent lockIntent = new Intent(this, LockActivity.class);
startActivity(lockIntent);
```

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use your own UI.

### 5. Showing user information

After the user has logged in, we can use the `UserProfile` object which has all the user information:

```java
  TextView usernameTextView = //find your TextView
  TextView emailTextView = //find your TextView
  usernameTextView.setText(profile.getName());
  emailTextView.setText(profile.getEmail());
```

> You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile or you can check [UserProfile](https://github.com/auth0/Lock.Android/blob/master/android-core/src/main/java/com/auth0/core/UserProfile.java). Please note that some of this depend on the social provider being used.

### 6. We're done

You've implemented Login and Signup with Auth0 in Android. You're awesome!

