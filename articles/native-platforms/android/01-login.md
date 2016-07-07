---
title: Auth0 Android Quickstarts - Login
description: This tutorial will show you how to integrate Lock 10 in your Android project in order to present a login screen.
---

## Android - Login Tutorial

This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your android apps with Auth0.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* AndroidStudio 2.0
* Emulator - Nexus5X - Android 6.0 
  :::


### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Add the Lock dependency

Your first step is to add [Lock](https://github.com/auth0/Lock.Android) into your project, which is basically a library for displaying native UI in your app for logging in and signing up with different social platforms via [auth0](https://auth0.com/).

#### i. Gradle

Add to your app's module gradle file:

```xml
compile 'com.auth0.android:lock:2.0.0'
```

Then, run "Sync project with Gradle files".

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).

### 2. Configure your Manifest File

Add the following code to your project's `AndroidManifest.xml`:

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
                    android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
                    android:scheme="https" />
            </intent-filter>
        </activity>
        
        <activity android:name="com.auth0.android.lock.provider.WebViewActivity"></activity>

Also, you need to add the following permissions inside the:
        
	<uses-permission android:name="android.permission.INTERNET" />
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	
At last, don't forget to declare 	the activities you're using in the Manifest:
	
	
	<activity android:name=".activities.LockActivity"/>
	<activity android:name=".activities.MainActivity"/>
	
	
> It's recommended to add both the ``Auth0DomainID`` and ``Auth0ClientID`` to the ``Strings.xml`` file, rather than hardcode them in the manifest.

> Do not add ``<android:noHistory="true">`` to the ``LockActivity`` as this will alter the correct functionality of Lock10.
        
### 3. Implement the Login

At this point, you're all set to implement the Login in any activity you want. 

First, add these lines in the ``onCreate`` method:

```android
Auth0 auth0 = new Auth0(${account.clientId}, ${account.namespace});
            this.lock = Lock.newBuilder(auth0, callback)
                    // Add parameters to the Lock Builder
                    .build();
```

Second, add these lines in the ``onDestroy`` method:

```android
 protected void onDestroy() {
            super.onDestroy();
            // Your own Activity code
            lock.onDestroy(this);
            lock = null;
        }
```
Third, add the authentication callback, inside your activity:

```
private LockCallback callback = new AuthenticationCallback() {
            @Override
            public void onAuthentication(Credentials credentials) {
				// Login Success response
            }

            @Override
            public void onCanceled() {
				// Login Cancelled response
            }

            @Override
            public void onError(LockException error){
				// Login Error response
            }
        };
```

Finally, whenever you want to start the login widget, call:

```
            startActivity(this.lock.newIntent(this));

```

[![Lock.png](/media/articles/libraries/lock-android/login.png)]

> If you need in depth configuration, check more information on [Lock Builder](https://auth0.com/docs/libraries/lock-android#lock-builder)

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](02-custom-login.md).

### Done!

You've already implemented Login and Sign Up with Auth0 in your Android project!



### Optional: Log In with Social Connections

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${uiURL}/#/connections/social). Every social connection you switch on there, will appear in the Login screen of your app. That's pretty much it!