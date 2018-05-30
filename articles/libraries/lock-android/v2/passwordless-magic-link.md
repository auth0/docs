---
section: libraries
title: Lock Android v2 Passwordless with Magic Link
description: Passwordless with Magic Link with Lock Android
tags:
  - libraries
  - lock
  - android
  - passwordless
  - magic-link
---
# Lock Android: Passwordless with Magic Link

<%= include('../../../_includes/_native_passwordless_warning') %>

In order to avoid asking the user to input the one-time password sent for passwordless authentication in Android apps, we introduced the ability to send a link that the user can tap to login without any manual input involved.

These links include the same code that would be used in the traditional passwordless flow, but with the correct configuration they will be handled automatically by the Android system and delivered to our application.

## Auth0 Dashboard Configuration

Go to your [application settings](${manage_url}/#/applications/${account.clientId}/settings) and click "Show Advanced Settings" at the bottom of the page. Then in the "Mobile Settings" tab you will need to provide both the Application's **Package Name** and certificate **Key Hash**.

- **App Package Name**: This is the package name, as declared in the app's manifest. It's also available in the `app/build.gradle` file as the `applicationId` attribute. An example would be `com.example.android.myapp`
- **Key Hashes**: This is an array of the SHA256 fingerprints of our android app’s signing certificates. This is an arbitrary length array, it can include all the fingerprints we want, so for example we could add both our release and debug fingerprints. An example would be `DE:1A:5B:75:27:AA:48:D5:A6:72:2F:76:43:95:9B:79:C6:86:1A:5B:75:27:AA:48:D5:A6:73:FE`.

After you set the values make sure to click the "Save Changes" button. Next we'll have to configure either the SMS or Email connection.


### Getting your Signing Certificates Fingerprint

You can use the following command to generate the fingerprint via the Java keytool:

```bash
$ keytool -list -v -keystore my-release-key.keystore
```

or to obtain the default debug key:

```bash
$ keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

The value required by the dashboard is the one listed as **SHA256**.


### Using SMS Connection

In case we'll use a passwordless connection via SMS, we'll need to update the SMS message template from the [dashboard](${manage_url}/#/connections/passwordless).

All you need to do is choose **Liquid** as the SMS Syntax and make sure the message contains the following:

```liquid
{% if send == 'link_ios' or send == 'link_android' %}
Your verification link is: {{ link }}
{% else %}
Your verification code is: {{ code }}
{% endif %}
```

::: note
We assume that you have the SMS connection correctly configured, including the Twilio account. If you haven't, please do so.
:::

### Using Email Connection

Otherwise, if we'll use a passwordless connection via Email, we'll need to make sure the template is **HTML + Liquid** and that the email body contains *somewhere* a conditional like this:

```liquid
{% if send == 'link' or send == 'link_ios' or send == 'link_android' %}
Your verification link is: {{ link }}
{% elsif send == 'code' %}
Your verification code is: {{ code }}
{% endif %}
```

## Application Configuration

Now that we have the Auth0 application configured, before we start with the android configuration we must follow the instructions and set up PasswordlessLock with `Lock.Android` as seen in the [passwordless docs](/libraries/lock-android/v2/passwordless). The only difference is that we'll add **Intent-Filters** that will capture the link click and redirect the user back to our app.

In the `AndroidManifest.xml` file add the intent-filters inside the `PasswordlessLockActivity` activity tag. Depending on the chosen passwordless connection, the `pathPrefix` of the filter changes.

```xml
<activity
    android:name="com.auth0.android.lock.PasswordlessLockActivity"
    android:theme="@style/Lock.Theme"
    android:label="@string/app_name"
    android:screenOrientation="portrait"
    android:launchMode="singleTask">
    <!-- Begin Email Intent-Filter-->
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data
          android:host="${account.namespace}"
          android:pathPrefix="/android/<%= "${applicationId}" %>/email"
          android:scheme="https" />
    </intent-filter>
    <!-- End Email Intent-Filter-->
    <!-- Begin SMS Intent-Filter-->
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data
          android:host="${account.namespace}"
          android:pathPrefix="/android/<%= "${applicationId}" %>/sms"
          android:scheme="https" />
    </intent-filter>
    <!-- End SMS Intent-Filter-->
</activity>
```

Make sure the Activity's `launchMode` is declared as `singleTask` or the result won't come back after the authentication.

## Usage

Lock Passwordless authenticates users by sending them an Email or SMS with a one-time password, which in this case will be a **LINK** instead of a CODE. We'll indicate this by calling the `useLink()` method.

```java
public class MyActivity extends AppCompatActivity {
  private PasswordlessLock lock;

  @Override
  @SuppressWarnings("ConstantConditions")
  protected void onCreate(@Nullable Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      // Your own Activity code
      Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
      auth0.setOIDCConformant(true);
      lock = PasswordlessLock.newBuilder(auth0, callback)
            .useLink()
            .build(this);
  }

  @Override
  public void onDestroy() {
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

Finally, just start `PasswordlessLock` from inside your activity and perform the login.

```java
startActivity(lock.newIntent(this));
```

Depending on which passwordless connections are enabled, Lock will send the LINK in an Email or SMS. The 'email' connection is selected first if available.


After requesting the magic link from Auth0, via SMS or Email, the next screen will indicate that in order to log in, the user should tap it. We also offer a backup option to enter the code manually, just in case the links don't work.


## Optional: Use Android App Links

With App Links, in Android 6.0 (API level 23) and higher, Android allows an app to designate itself as the default handler of a given type of link, without asking the user whether to use the Browser or our app to open the link.
Automatic handling of links requires the cooperation of our app and website (our Auth0 Authentication Server). The app must declare the association with the website and request that the system verify it. The website must, in turn, provide that verification by publishing a [Digital Asset Links](https://developers.google.com/digital-asset-links/) file.
This feature works as long as the user has not already chosen a default app to handle that URI pattern in the Android settings.

Auth0 will generate the [Digital Asset Links](https://developers.google.com/digital-asset-links/) file automatically for you after you've configured the **App Package Name** and **Key Hash** as shown before. If you've followed all the steps on this article, the only change you need to do is add an attribute to the **Intent-Filter** declaration in order to ask the OS to verify the link at install time. Go to the `AndroidManifest.xml` file where you have declared the Intent-Filter and add the `android:autoVerify="true"` attribute indicating use of an SMS connection:

```xml
<!-- THE LINE BELOW CHANGES -->
<intent-filter android:autoVerify="true">   
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data
      android:host="${account.namespace}"
      android:pathPrefix="/android/<%= "${applicationId}" %>/sms"
      android:scheme="https" />
</intent-filter>
```

This attribute is used since Android API 23 (Android 6.0) to indicate that we would like to verify the link association. **This is extremely important to avoid the dialog asking the user which application to use.** Although links will work on all versions of Android, the dialog asking the user whether to use the Browser or our app to open the link will be displayed (whether the verification passed or not) in versions of Android prior to 6.0, at least until the user chooses to always open the links with our app.

You could find more information about App Links in the [Android docs](http://developer.android.com/training/app-links/index.html).
