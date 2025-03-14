---
title: Auth0 Guardian
description: Understand how Guardian works and how Guardian SDK helps you build your own authenticator and Guardian-like applications.
topics:
  - mfa
  - guardian
  - android
  - iOS
contentType:
  - concept
useCase:
  - customize-mfa
---
# Auth0 Guardian

Auth0 multi-factor authentication (MFA) supports these authentication factors:

* One-time password (OTP)
* SMS
* Voice
* Push
* Duo
* Email

Auth0 Guardian is a mobile app that can deliver push notifications to a user’s pre-registered device - typically a mobile phone or tablet - from which a user can immediately allow or deny account access via the press of a button. It can also generate one-time passwords if that factor is preferred.

The push factor is offered with the Guardian mobile app, available for both iOS and Android. In addition, the technology is also available as whitelabelled Guardian SDK which can be used in custom mobile applications to act as second factor push responder. 

Auth0 Guardian is available on ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) and the [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833?mt=8)).

::: note
See the documentation for [Apple Push Notification service (APNs)](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html) for details on setting up APNs. 
:::

## How it works

Instead of integrating with each vendor-specific push notification service, Auth0 push notification is implemented using AWS Simple Notification Service (SNS) which handles the vendor specific integration. 

![Guardian Functionality](/media/articles/mfa/guardian-functionality.png)

## Guardian and push notifications

When enabling push, end-users will need to have Auth0 Guardian or a custom application built with the Guardian SDK installed in their device. The app is sent push notifications when the user attempts to authenticate, and the user must respond to it in order to login, ensuring that they not only know their login information but also possess the device set up for MFA.

End users will be prompted to download Auth0 Guardian when trying to sign up or log in to your application. Once they indicate that they have successfully downloaded the app, a QR code will appear on screen. They will have a short amount of time in which to scan the code with the designated app. Once this is done, they should see a confirmation screen.

Once this is all set up, when the user attempts to authenticate as normal, their device will receive a push notification via the app, and once they approve the request, they will be logged in.

<div class="phone-mockup"><img src="/media/articles/mfa/guardian-push.png" alt="Guardian Push"/></div>

## Guardian and One-Time Passwords

![MFA OTP Signup](/media/articles/mfa/mfa-otp-setup.png)

Upon signup, they can scan a code and set up the app, upon which it will begin generating one-time codes. 

Afterwards, when logging in to the app, the user can simply check the authenticator app for the current one-time code:

<div class="phone-mockup"><img src="/media/articles/mfa/google-auth-screenshot.png" alt="Google Authenticator OTP"/></div>

And enter the code at the prompt:

![MFA OTP Login](/media/articles/mfa/mfa-otp-login.png)

Your users will need to have an OTP Authenticator app installed in their mobile devices.

## Guardian SDKs

You can [install the Guardian SDK](/mfa/guides/guardian/install-guardian-sdk), available for [iOS](/mfa/guides/guardian/configure-guardian-ios) and [Android](/mfa/guides/guardian/configure-guardian-android) to build your own whitelabel multi-factor authentication application with complete control over the branding and look-and-feel.

With the Guardian SDK, you can build your own custom mobile applications that works like Guardian or integrate some Guardian functionalities, such as receiving push notifications in your existing mobile applications.

A typical scenario could be for a banking app. You can use the Guardian SDK in your existing mobile app to receive and confirm push notifications when someone performs an ATM transaction.

See [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js) for more information.

## Migration to Firebase Cloud Messaging

Auth0’s Guardian SDKs for iOS and Android help you create custom mobile apps with Guardian functionality, providing secure access to <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> with push notifications. 

The [Android SDK](/mfa/guides/guardian/guardian-android-sdk) library was built to send push notifications using Google Cloud Messaging, which [Google deprecated](https://firebase.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html) and replaced with Firebase Cloud Messaging. Google Cloud Messaging will stop working on April 11th 2019. **Note that existing applications should [keep working as-is](https://aws.amazon.com/blogs/messaging-and-targeting/the-end-of-google-cloud-messaging-and-what-it-means-for-your-apps/)**.

You can learn more about how to migrate from GCM to FCM by following [Google’s documentation](https://developers.google.com/cloud-messaging/android/android-migrate-fcm).

The main difference between sending notifications to GCM and to FCM is the payload received in the notification. While it was previously possible for customers using the Android SDK to adapt the payload received before calling the SDK method, we have upgraded the library to accept the new payload, making it simpler to adopt FCM. 

The Guardian Android SDK 0.4.0 version is available in Maven Central and includes this change. The sample application was also upgraded, so it can be tested by providing the google-services.json file and a guardian-url. 

## Keep reading

* [Configure Push Notifications for MFA](/mfa/guides/configure-push)
* [Create Custom Enrollment Tickets](/mfa/guides/guardian/create-enrollment-ticket)
* [Guardian Error Code Reference](/mfa/references/guardian-error-code-reference)
* [Auth0 Management API](/api/management/v2)
* [Getting Started with Apple Push Notification Service](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html)
* [Getting Started with Firebase Cloud Messaging for Android](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html)
