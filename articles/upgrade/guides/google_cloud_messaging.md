---
title: Google Cloud Messaging Deprecation
description: This article describes how you can migrate your applications based on the Android Guardian SDK to Firebase Cloud Messaging
contentType:
  - concept
  - how-to
useCase:
  - customize-mfa
  - migrate
---
# Migration to Firebase Cloud Messaging

Auth0’s Guardian SDKs for iOS and Android helps you create custom Mobile apps with Guardian functionality, providing secure access to <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> with push notifications. 

The Android SDK library was built to send Push Notifications using Google Cloud Messaging, which [Google deprecated](https://firebase.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html) and replaced with Firebase Cloud Messaging. Google Cloud Messaging will stop working on April 11th 2019. **Note that existing applications should [keep working as-is](https://aws.amazon.com/blogs/messaging-and-targeting/the-end-of-google-cloud-messaging-and-what-it-means-for-your-apps/)**.

You can learn more about how to migrate from GCM to FCM check [Google’s documentation](https://developers.google.com/cloud-messaging/android/android-migrate-fcm).

The main difference between how you send notifications to GCM and FCM is in the payload received in the notification. While it was possible for existing customers using the Android SDK to adapt the payload received before calling the SDK method, we have upgraded the library so it accepts the new payload, making it simpler to adopt FCM. More details [here](https://github.com/auth0/Guardian.Android/pull/84).

The Guardian Android SDK 0.4.0 version is already available in Maven Central and includes this change. The sample application was also upgraded, so it can be tested by providing the google-services.json file and a guardian-url. 

You can check the updated documentation for the Guardian Android SDK [here](/multifactor-authentication/developer/libraries/android).



