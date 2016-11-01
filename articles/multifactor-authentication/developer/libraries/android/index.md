---
toc_title: Getting Started with Guardian for Android
url: /multifactor-authentication/developer/libraries/android
description: Installation, usage, and configuration options guide for Guardian for Android
---

# Guardian for Android
Guardian for Android is the Software Development Kit that allows developers to integrate their native Android apps with Guardian functionality, providing easy and secure access to multifactor authentication with push notifications.

Get started using Guardian for Android below, or, if you're looking for a specific document, try the listing of [additional documents](#additional-documents) related to Guardian for Android.

## Requirements

Android API level 15+ is required in order to use the Guardian Android SDK.

## Installation

Guardian is available both in [Maven Central](http://search.maven.org) and [JCenter](https://bintray.com/bintray/jcenter). To start using *Guardian* add these lines to your `build.gradle` dependencies file:

```gradle
compile 'com.auth0.android:guardian-sdk:0.1.0'
```

_You can check for the latest version on the repository [Releases](https://github.com/auth0/GuardianSDK.Android/releases) tab, in [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22guardian-sdk%22%20g%3A%22com.auth0.android%22), or in [JCenter](https://bintray.com/auth0/guardian-android)._

After adding your Gradle dependency, make sure to remember to sync your project with Gradle files.

## Dashboard Settings

To enable Guardian Push Notifications for your users, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard. Then toggle the **Push Notification** slider to enable it.

## Using the SDK


`Guardian` is the core of the SDK. You'll need to create an instance of this class for your specific
tenant/url.

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

That's all you need to setup your own instance of `Guardian`

### Enroll

An enrollment is a link between the second factor and an Auth0 account. When an account is enrolled
you'll need the enrollment data to provide the second factor required to verify the
identity.

You can create an enrolment using the guardian instance you just created.
First you'll need to obtain the enrollment info by scanning the Guardian QR code, and then you use
the `enroll` method like this:

```java
Uri enrollmentUriFromQr = ...; // the URI obtained from a Guardian QR code

Enrollment enrollment = guardian
        .enroll(enrollmentUriFromQr, "deviceName", "gcmToken")
        .execute();
```

or you can also execute the request in a background thread

```java
guardian
        .enroll(enrollmentUriFromQr, "deviceName", "gcmToken")
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

The `deviceName` and `gcmToken` are data that you must provide. The `deviceName` is the name that
you want for the enrollment. It will be displayed to the user when the second factor is required.

The GCM token is the token for Google's GCM push notification service. In case your app is not yet
using GCM or you're not familiar with it, you should check their
[docs](https://developers.google.com/cloud-messaging/android/client#sample-register).

### Unenroll

If you want to delete an enrollment in order to disable MFA, you can make the
following request:

```java
guardian
        .delete(enrollment)
        .execute(); // or start(new Callback<> ...)
```

### Allow a login request

Once you have the enrollment in place, you will receive a GCM push notification every time the user
has to validate his identity with MFA.

Guardian provides a method to parse the `Bundle` received from GCM and return a `Notification`
instance ready to be used.

```java
// at the GCM listener you receive a Bundle
Notification notification = Guardian.parseNotification(bundle);
```

Once you have the notification instance, you can easily allow the authentication request by using
the `allow` method. You'll also need the enrollment that you obtained previously.
In case you have more than one enrollment, you'll have to find the one that has the same id as the
notification (you can get the enrollment id with `getEnrollmentId()`.

```java
guardian
        .allow(notification, enrollment)
        .execute(); // or start(new Callback<> ...)
```

### Reject a login request

To deny an authentication request just call `reject` instead. You can also send a reject reason if
you want. The reject reason will be available in the guardian logs.

```java
guardian
        .reject(notification, enrollment) // or reject(notification, enrollment, reason)
        .execute(); // or start(new Callback<> ...)
```



## Additional Documents

<ul>
<% _.forEach(_.sortBy(articles.findByHash('multifactor-authentication/developer/libraries/android').items, 'toc_title'), function(article) { %>
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
