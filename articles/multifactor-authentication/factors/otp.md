---
title: MFA - One Time Passwords
description: Using one time passwords with Auth0 MFA
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# MFA with One Time Passwords (OTP)

To use one time passwords as an authentication factor, users need an Authenticator app such as:

* Authy ([Google Play](https://play.google.com/store/apps/details?id=com.authy.authy) / [App Store](https://itunes.apple.com/us/app/authy/id494168017)).
* Google Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) / [App Store](https://itunes.apple.com/us/app/google-authenticator/id388497605)).
* Guardian ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) / [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833)).
* Microsoft Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.azure.authenticator) / [App Store](https://itunes.apple.com/us/app/microsoft-authenticator/id983156458)).

![MFA OTP Signup](/media/articles/multifactor-authentication/mfa-otp-setup.png)

Upon signup, they can scan a code and set up the app, upon which it will begin generating one-time codes. 

Afterwards, when logging in to the app, the user can simply check the authenticator app for the current one-time code:

<div class="phone-mockup"><img src="/media/articles/multifactor-authentication/google-auth-screenshot.png" alt="Google Authenticator OTP"/></div>

And enter the code at the prompt:

![MFA OTP Login](/media/articles/multifactor-authentication/mfa-otp-login.png)

Your users will need to have an OTP Authenticator app installed in their mobile devices.
