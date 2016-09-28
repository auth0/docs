---
toc_title: Native Social Authentication
description: How to implement native social authentication with Lock Android
---

# Lock Android: Native Social Authentication

**Lock** by default handles all social authentication with a Browser installed in your Android device, but for some social connections you can take advantage of our native integration.
We implemented native integration with Facebook and Google+ and bundled each of them in a separate Android Library (*aar* file), to start using them just add these lines in your `build.gradle`:

```gradle
compile 'com.auth0.android:lock-facebook:2.3.+'
compile 'com.auth0.android:lock-googleplus:2.3.+'
```

## Configuration

> Before following these steps, please check our [README](https://github.com/auth0/Lock.Android/blob/master/README.md#install)

### Facebook

Lock uses Facebook Android SDK to obtain the user's credentials and use them to login with your Auth0 application.  

To get started, in your `AndroidManifest.xml` you need to add the following:

```xml
<activity android:name="com.facebook.FacebookActivity"
          android:configChanges=
              "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
          android:theme="@android:style/Theme.Translucent.NoTitleBar"
          android:label="@string/app_name" />
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
```

Where `@string/facebook_app_id` is your Facebook Application ID that you can get from [Facebook Dev Site](https://developers.facebook.com/apps).

> For more information please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/android/getting-started).

Finally, you need to register Auth0 Facebook Provider with Lock so it can do all Facebook authentication. This can be done in your Application object `onCreate` method right after you initialise Lock:

```java
@Override
public void onCreate() {
    super.onCreate();
    lock = new Lock.Builder()
            .loadFromApplication(this)
            .withIdentityProvider(Strategies.Facebook, new FacebookIdentityProvider(this))
            .build();
}
```

### Google

For Google login we use Google Signin library that is part of Google Play Services.

Before we start, you'll need to register your application in Google Developers and create a OAuth 2.0 client, to do that follow this [wizard](https://developers.google.com/mobile/add?platform=android)

The next step is to configure your Google connection in Auth0 Dashboard with the newly created OAuth 2.0 client information. Just go to [Social Connections](${manage_url}/#/connections/social), select **Google** and in the field named `Allowed Mobile Client IDs` add the ID of the OAuth 2.0 client.

Then in your `AndroidManifest.xml` add these permissions and meta-data value for Google Play Services:

```xml
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission android:name="android.permission.USE_CREDENTIALS" />
<meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version" />
```

And finally register Google Identity Provider with Lock in your Application object `onCreate`:

```java
@Override
public void onCreate() {
    super.onCreate();
    lock = new LockBuilder()
            .loadFromApplication(this)
            .withIdentityProvider(Strategies.GooglePlus, new GooglePlusIdentityProvider(this))
            .build();
}
```
