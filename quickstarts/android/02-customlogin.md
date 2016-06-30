---
title: Auth0 Android Quickstarts - 2. Custom Login
description: This tutorial will show you how to use the Auth0 authentication api in your Android project to create a custom login screen.
seo_alias: android
---

## Android - Custom Login Tutorial

This is a simple quickstart that will show you how to add the Auth0 login capabilities while using a customized login screen.

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

### 1. Add the Auth0 Java dependency

Your first step is to add [Auth0 Java](https://github.com/auth0/auth0-java) into your project, which is basically the library that will manage the login process, via [Auth0](https://auth0.com/) Authentication Client.

#### i. Gradle

Add to your app's module gradle file:

```xml
compile 'com.auth0:auth0:0.4.0'
```

Then, run "Sync project with Gradle files".

> For more information about Gradle usage, check [their official documentation](http://tools.android.com/tech-docs/new-build-system/user-guide).

### 2. Configure your Manifest File

You need to add the following permissions inside the ``AndroidManifest.xml``:
        
	<uses-permission android:name="android.permission.INTERNET" />
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	
Also, don't forget to declare the activities you're using in the Manifest:
	
	
	<activity android:name=".activities.LoginActivity"/>
	<activity android:name=".activities.MainActivity"/>
	
       
### 3. Implement the Login

At this point, you're all set to implement the Login in any activity you want. 

First, in your customized login method, instantiate the Authentication API:

```android
private void login(String email, String password) {
        Auth0 auth0 = new Auth0(CLIENTID, AUTH0DOMAINID);
        AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);  
        
        // proper login
        
        }      
```

Then, login using the newly created client:

```android
 client.login(email, password).start(new BaseCallback<Credentials>() {
            @Override
            public void onSuccess(Credentials payload) {
                // Store credentials
                // Navigate to your main activity
            }

            @Override
            public void onFailure(Auth0Exception error) {

            }
        });
```
> It's suggested to add both the Auth0DomainID and Auth0ClientID to the Strings.xml file rather than hardcode them in the new Auth0() constructor method.

> There are multiple ways of designing a customized login screen which are not covered in this tutorial. One example, is the [Android Studio's login template](https://developer.android.com/studio/projects/templates.html). 

### Done!

You've already implemented a customized Login with Auth0 in your Android project!

