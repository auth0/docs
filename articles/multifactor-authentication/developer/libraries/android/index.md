---
toc_title: Getting Started with Guardian for Android
url: /multifactor-authentication/developer/libraries/android
description: Installation, usage, and configuration options guide for Guardian for Android
---

# Guardian for Android
The [Guardian for Android Software Development Kit](https://github.com/auth0/Guardian.Android) allows developers to create Android apps with Guardian functionality, providing easy and secure access to multifactor authentication with push notifications. For example, this toolkit gives you the power to build a 'white label' version of the Guardian application for your users, using your own look-and-feel.

More information can be found on Guardian [here](/multifactor-authentication/guardian). For general multifactor discussion, read more [here](/multifactor-authentication).

Get started using Guardian for Android below, or, if you're looking for a specific document, try the listing of [additional documents](#additional-documents) related to Guardian for Android.

## Requirements

Android API level 15+ is required in order to use the Guardian Android SDK.

## Installation

Guardian is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Guardian* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:guardian-sdk:0.2.0'
```

_You can check for the latest version on the repository [Releases](https://github.com/auth0/GuardianSDK.Android/releases) tab, in [Maven](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22com.auth0.android%22%20AND%20a%3A%22guardian%22), or in [JCenter](https://bintray.com/auth0/android/Guardian.Android)._

After adding your Gradle dependency, make sure to remember to sync your project with Gradle files.

## Dashboard Settings

To enable Guardian Push Notifications for your users, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard. Then toggle the **Push Notification** slider to enable it.

![](/media/articles/mfa/guardian-dashboard.png)

## SNS configuration

For your native application to receive push notifications from Guardian, you will need to override the default SNS settings. Follow the instructions [here](/multifactor-authentication/developer/sns-configuration).

## Using the SDK


`Guardian` is the core of the SDK. You'll need to create an instance of this class for your specific tenant/url.

```java
Uri url = Uri.parse("https://tenant.guardian.auth0.com/");

Guardian guardian = new Guardian.Builder()
        .url(url)
        .build();
```

or

```java
String domain = "tenant.guardian.auth0.com";

Guardian guardian = new Guardian.Builder()
        .domain(domain)
        .build();
```


### Enroll

The link between the second factor (an instance of your app on a device) and an Auth0 account is referred to as an enrollment.

You can create an enrollment using the `Guardian.enroll` function, but first you'll have to create a new pair of RSA keys for it. The private key will be used to sign the requests to allow or reject a login. The public key will be sent during the enroll process so the server can later verify the request's signature.

```java
KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
keyPairGenerator.initialize(2048); // you MUST use at least 2048 bit keys
KeyPair keyPair = keyPairGenerator.generateKeyPair();
```

Next, obtain the enrollment information by scanning the Guardian QR code, and use it to enroll the account:

```java
Uri enrollmentUriFromQr = ...; // the URI obtained from a Guardian QR code

CurrentDevice device = new CurrentDevice(context, "gcmToken", "deviceName");

Enrollment enrollment = guardian
        .enroll(enrollmentUriFromQr, device, keyPair)
        .execute();
```

Alternatively, you can execute the request in a background thread:

```java
guardian
        .enroll(enrollmentUriFromQr, device, keyPair)
        .start(new Callback<Enrollment> {
            @Override
            void onSuccess(Enrollment enrollment) {
               // we have the enrollment data
            }

            @Override
            void onFailure(Throwable exception) {
               // something failed
            }
        });
```

The `deviceName` and `gcmToken` are data that you must provide:

- The `deviceName` is the name that you want for the enrollment. It will be displayed to the user when the second factor is required.
- The `gcmToken` is the token for Google's GCM push notification service. See the [docs](https://developers.google.com/cloud-messaging/android/client#sample-register) for more information about the GCM token.

### Unenroll

To disable multifactor authentication you can delete the enrollment:

```java
guardian
        .delete(enrollment)
        .execute(); // or start(new Callback<> ...)
```

### Allow a login request

Once you have the enrollment in place, you will receive a GCM push notification every time the user needs multifactor authentication.

Guardian provides a method to parse the `Bundle` received from GCM and return a `Notification` instance ready to be used.

```java
// at the GCM listener you receive a Bundle
@Override
public void onMessageReceived(String from, Bundle data) {
    Notification notification = Guardian.parseNotification(data);
    if (notification != null) {
        // you received a Guardian notification, handle it
        handleGuardianNotification(notification);
        return;
    }

    /* handle other push notifications you might be using ... */
}
```

Once you have the notification instance, you can easily approve the authentication request by using the `allow` method. You'll also need the enrollment that you obtained previously. If there are multiple enrollments, be sure to use the one that has the same `id` as the notification (the `enrollmentId` property).

```java
guardian
        .allow(notification, enrollment)
        .execute(); // or start(new Callback<> ...)
```

### Reject a login request

To deny an authentication request, use `reject` instead. You can optionally add a reason for the rejection, which will be available in the guardian logs.

```java
guardian
        .reject(notification, enrollment) // or reject(notification, enrollment, reason)
        .execute(); // or start(new Callback<> ...)
```



## Additional Documents

* [Configuring Amazon SNS with Guardian](/multifactor-authentication/developer/sns-configuration)
* [Getting Started with Google Cloud Messaging for Android](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-gcm.html)
