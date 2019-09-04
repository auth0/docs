---
title: MFA - Push Notifications
description: Using one time passwords with Auth0 MFA
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# MFA with Push Notifications

When enabling Push, end-users will need to have Auth0 Guardian or a custom application built with the Guardian SDK installed in their device. The app is sent push notifications when the user attempts to authenticate, and the user must respond to it in order to login, ensuring that they not only know their login information but also possess the device set up for MFA.

End users will be prompted to download Auth0 Guardian when trying to sign up or log in to your application. Once they indicate that they have successfully downloaded the app, a QR code will appear on screen. They will have a short amount of time in which to scan the code with the designated app. Once this is done, they should see a confirmation screen.

Once this is all set up, when the user attempts to authenticate as normal, their device will receive a push notification via the app, and once they approve the request, they will be logged in.

<div class="phone-mockup"><img src="/media/articles/multifactor-authentication/guardian-push.png" alt="Guardian Push"/></div>

Auth0 Guardian is available on ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) and the [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833?mt=8)).
