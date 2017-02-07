---
section: libraries
description: Passwordless with Magic Link with Lock Android
---


# Lock Android: Passwordless with Magic Link

In order to avoid asking the user to input the one-time password sent for passwordless authentication in Android apps, we introduced the ability to send a link that the user can tap to login without any code input involved.

These links include the same code that would be used in the traditional passwordless flow, but with the correct configuration they will be handled automatically by the Android system and our application will log in the users effortlessly by relying on **Android App Links**.

With App Links, in Android 6.0 (API level 23) and higher, Android allows an app to designate itself as the default handler of a given type of link, without asking the user whether to use the browser or the app to open the link.
Automatic handling of links requires the cooperation of our app and website (our Auth0 authentication server). The app must declare the association with the website and request that the system verify it. The website must, in turn, provide that verification by publishing a [Digital Asset Links](https://developers.google.com/digital-asset-links/) file.
This feature works as long as the user has not already chosen a default app to handle that URI pattern.

You could find more information about App Links in the [Android docs](http://developer.android.com/training/app-links/index.html).

> The links will work in all versions of Android, but the dialog asking the user whether to use the browser or the app to open the link will be displayed (whether the verification passed or not) in versions of Android prior to 6.0, at least until the user chooses to always open the links with the app.

In this article we'll show how Auth0 helps you set up your app to use app links to log in.

## Auth0 account configuration

Auth0 will generate the [Digital Asset Links](https://developers.google.com/digital-asset-links/) file automatically, all you need to do is configure the required parameters, some via API and others in your [dashboard](${manage_url}/#/connections/passwordless). We'll show you how to do it.

### Client configuration

We'll have to configure/add some field to our Auth0 client. The fields we need to configure are:

- **app\_package\_name**: This is the package name, as declared in the app's manifest. An example would be *com.example.android.myapp*
- **sha256\_cert\_fingerprints**: This is an array of the SHA256 fingerprints of our android app’s signing certificates. This is an arbitrary length array, it can include all the fingerprints we want, so for example we could add both our release and debug fingerprints.

#### Getting your signing certificates fingerprint

You can use the following command to generate the fingerprint via the Java keytool:

```bash
$ keytool -list -v -keystore my-release-key.keystore
```

or to obtain the default debug key:

```bash
$ keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

#### Configure the client

Once you have your key hashes output, copy the resulting SHA256 value and go to your client's settings in the [Auth0 Dashboard](${manage_url}/#/clients). Click "Show Advanced Settings", and in the "Mobile Settings" tab, under "Android", fill the "App Package Name" with your application's package name, and the "Key Hashes" field with the SHA256 value you copied. Don't forget to save the changes.


> Don't forget to change the body to use your package name and keystore fingerprint!

Next we'll have to configure either the SMS or Email connection.

### SMS

In case we'll use a passwordless connection via SMS, we'll need to update the SMS message template from the [dashboard](${manage_url}/#/connections/passwordless).

All you need to do is choose **Liquid** as the SMS Syntax and make sure the message contains something like this:

```liquid
{% if send == 'link_ios' or send == 'link_android' %}
Your verification link is: {{ link }}
{% else %}
Your verification code is: {{ code }}
{% endif %}
```

> We assume that you have the SMS connection correctly configured, including the Twilio account. If you haven't, please do so.

### Email

Otherwise, if we'll use a passwordless connection via Email, we'll need to make sure the template is **HTML + Liquid** and that the email body contains *somewhere* a conditional like this:

```liquid
{% if send == 'link' or send == 'link_ios' or send == 'link_android' %}
Your verification link is: {{ link }}
{% elsif send == 'code' %}
Your verification code is: {{ code }}
{% endif %}
```

## Application configuration

Now that we have the Auth0 client configured, before we start with the android configuration we must follow the instructions and set up Lock.Android and PasswordlessLock as seen in the [passwordless docs](/libraries/lock-android/passwordless).

Now, in order to use App Links, there is an additional configuration step we must follow. We must declare an intent filter in the `AndroidManifest.xml`, inside the `PasswordlessLockActivity` activity tag. This filter will allow the app to handle the links we'll send by Email or SMS.

```xml
<!--Auth0 Lock Passwordless-->
<activity
    android:name="com.auth0.android.lock.PasswordlessLockActivity"
    android:theme="@style/Lock.Theme"
    android:label="@string/app_name"
    android:screenOrientation="portrait"
    android:launchMode="singleTask">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="https" />
        <data android:scheme="http" />
        <data android:host="${account.namespace}" android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/email" />
    </intent-filter>
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="https" />
        <data android:scheme="http" />
        <data android:host="${account.namespace}" android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/sms" />
    </intent-filter>
</activity>
<activity
    android:name="com.auth0.android.lock.CountryCodeActivity"
    android:theme="@style/Lock.Theme.ActionBar" />
<!--Auth0 Lock Passwordless End-->
```

> In `android:pathPrefix` you must replace the package name of the application, as configured in the Auth0 account.

As can be seen, it's a regular *intent-filter*, with the exception of the `android:autoVerify="true"` field. This is used since Android API 23 (Android 6.0) to indicate that we would like to verify the link association. **This is extremely important to avoid the dialog asking the user which application to use.**

Also notice that in case we'll only use one passwordless method (SMS or Email) you could delete the other intent filter (see the last segment of the pathPrefix: `/email` or `/sms`).

## Usage

`PasswordlessLock` authenticates users by sending them an Email or SMS, in this case we'll send them a link instead of a code. The only difference with the regular passwordless is that we now explicitly indicate that we will use **Android App Links**. To accomplish this, configure the PasswordlessLock.Builder with the `useLink` method.

```java
public class MyActivity extends AppCompatActivity {
  private PasswordlessLock lock;

  @Override
  @SuppressWarnings("ConstantConditions")
  protected void onCreate(@Nullable Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      lock = PasswordlessLock.newBuilder(getAccount(), callback)
            .useLink()
            .build(this);
  }

  @Override
  public void onDestroy() {
      super.onDestroy();
      if (lock != null) {
          lock.onDestroy(this);
      }
  }

  private void showPasswordlessLock() {
    startActivity(lock.newIntent(this));
  }
}
```

Depending on which passwordless connections are enabled, lock will send the link in an Email or SMS. The 'email' connection is selected first if available.

After requesting the magic link from Auth0, via SMS or Email, the next screen will indicate that in order to log in, the user should tap it. We also offer a backup option to enter the code manually, just in case the links don't work.
