---
description: Passwordless with Magic Link with Lock Android
---

::: panel-warning Version Warning
This document is not yet updated to use [Lock for Android](https://github.com/auth0/Lock.Android) 2.0. It will be soon!
:::

# Lock Android: Passwordless with Magic Link

In order to avoid asking the user to input the one-time password sent for passwordless authentication in Android apps, we introduced the ability to send a link that the user can tap to login without any code input involved. 

These links include the same code that would be used in the traditional passwordless flow, but with the correct configuration they will be handled automatically by the Android system and our application will log in the users effortlessly by relying on **Android App Links**.

With App Links, in Android 6.0 (API level 23) and higher, Android allows an app to designate itself as the default handler of a given type of link, without asking the user whether to use the browser or the app to open the link. 
Automatic handling of links requires the cooperation of our app and website (our Auth0 authentication server). The app must declare the association with the website and request that the system verify it. The website must, in turn, provide that verification by publishing a [Digital Asset Links](https://developers.google.com/digital-asset-links/) file. 
This feature works as long as the user has not already chosen a default app to handle that URI pattern.

You could find more information about App Links in the [Android docs](http://developer.android.com/training/app-links/index.html).

> The links will work in all versions of Android, but the dialog asking the user whether to use the browser or the app to open the link will be displayed (whether the verification passed or not) in versions of Andrdoi prior to 6.0, at least until the user chooses to always open the links with the app.

In this article we'll show how Auth0 helps you set up your app to use app links to log in.

## Auth0 account configuration

Auth0 will generate the [Digital Asset Links](https://developers.google.com/digital-asset-links/) file automatically, all you need to do is configure the required parameters, some via API and others in your [dashboard](${manage_url}/#/connections/passwordless). We'll show you how to do it.

### Client configuration

We'll have to configure/add some field to our Auth0 client. The fields we need to configure are:

- **app\_package\_name**: This is the package name, as declared in the app's manifest. An example would be *com.example.android.myapp*
- **sha256\_cert\_fingerprints**: This is an array of the SHA256 fingerprints of our android app’s signing certificates. This is an arbitrary lenght array, it can include all the fingerprints we want, so for example we could add both our release and debug fingerprints. 

#### Getting your signing certificates fingerprint

You can use the following command to generate the fingerprint via the Java keytool:

```bash
$ keytool -list -v -keystore my-release-key.keystore
```

or to obtain the default debug key:

```bash
$ keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

#### Configure Auth0 via API

Once we have the package name and the SHA256 fingerprint, we'll update our Auth0 client via API with [patch\_clients\_by\_id](/api/v2#!/Clients/patch_clients_by_id) (they aren't yet available in the dashboard).

In the *id* field we must introduce the *client_id* of our Auth0 App, and the *body* should look like this:

```json
{
  "mobile": {
    "android": {
      "app_package_name": "<YOUR_APP_PACKAGE_NAME>",
      "sha256_cert_fingerprints": ["<YOUR_RELEASE_SHA256_FINGERPRINT>", "<OPTIONAL_YOUR_DEBUG_SHA256_FINGERPRINT>"]
    }
  }
}
```

> Don't forget to change the body to use your package name and keystore fingerprint!

Next we'll have to configure either the SMS or Email connection. This is available from the dashboard, so we'll show how to do it from there.

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

Now that we have the Auth0 client configured, before we start with the android configuration we must follow the instructions and set up Lock.Android and LockPasswordlessActivity as seen in the [passwordless docs](/libraries/lock-android#passwordless).

Now, in order to use App Links, there is an additional configuration step we must follow. We must declare an intent filter in the `AndroidManifest.xml`, inside the `LockPasswordlessActivity` activity tag. This filter will allow the app lo handle the links we'll send by Email or SMS.

```xml
<!--Auth0 Lock Passwordless-->
<activity
    android:name="com.auth0.lock.passwordless.LockPasswordlessActivity"
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
        <data android:host="@string/auth0_domain" android:pathPrefix="/android/<INSERT_APP_PACKAGE_NAME>/email" />
    </intent-filter>
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="https" />
        <data android:scheme="http" />
        <data android:host="@string/auth0_domain" android:pathPrefix="/android/<INSERT_APP_PACKAGE_NAME>/sms" />
    </intent-filter>
</activity>
<activity android:name="com.auth0.lock.passwordless.CountryCodeActivity" android:theme="@style/Lock.Theme"/>
<!--Auth0 Lock Passwordless End-->
```

> The value `@string/auth0_domain` is your tenant's domain in Auth0, which can be found in your app's settings.

> In `android:pathPrefix` you must replace the package name of the application, as configured in the Auth0 account.

As can be seen, it's a regular *intent-filter*, with the exception of the `android:autoVerify="true"` field. This is used since Android API 23 (Android 6.0) to indicate that we would like to verify the link association. **This is extremely important to avoid the dialog asking the user which application to use.**

Also notice that in case we'll only use one passwordless method (SMS or Email) you could delete the other intent filter (see the last segment of the pathPrefix: `/email` or `/sms`).

## Usage

As you should already know, `LockPasswordlessActivity` authenticates users by sending them an Email or SMS, in this case we'll send them a link instead of a code. The only difference w.r.t. the regular passwordless is that we now explicitly indicate that we will use magic/app links. This is accomplished using the appropiate mode.

If we would like to send app links by **Email**, just start `LockPasswordlessActivity` especifying the passwordless mode `MODE_EMAIL_MAGIC_LINK`:

```java
LockPasswordlessActivity.showFrom(MyActivity.this, 
        LockPasswordlessActivity.MODE_EMAIL_MAGIC_LINK);
```

and we'll see the **Email** login screen

![Email](/media/articles/libraries/lock-android/passwordless-magic-link/lock-android-pwdless-email.png)

or for **SMS** the mode `MODE_SMS_MAGIC_LINK`:

```java
LockPasswordlessActivity.showFrom(MyActivity.this, 
        LockPasswordlessActivity.MODE_SMS_MAGIC_LINK);
```

and we'll see the **SMS** login screen

![SMS](/media/articles/libraries/lock-android/passwordless-magic-link/lock-android-pwdless-sms.png)

After requesting the magic link from Auth0, via SMS or Email, the next screen will indicate that in order to log in, the user should tap it. We also offer a backup option to enter the code manually, just in case the links don't work.
