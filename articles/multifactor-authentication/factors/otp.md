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

No further setup is required for administrators beyond enabling OTP. The principle behind OTP as a factor is fairly straightforward for the end user as well. They use an app, such as:

* Authy ([Google Play](https://play.google.com/store/apps/details?id=com.authy.authy) / [App Store](https://itunes.apple.com/us/app/authy/id494168017)).
* Google Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) / [App Store](https://itunes.apple.com/us/app/google-authenticator/id388497605)).
* Guardian ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) / [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833)).
* Microsoft Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.azure.authenticator) / [App Store](https://itunes.apple.com/us/app/microsoft-authenticator/id983156458)).

![MFA Google Authenticator](/media/articles/multifactor-authentication/google-auth-scan-code.png)

Upon signup, they can scan a code and set up the app, upon which it will begin generating one-time codes. Afterwards, the user can simply check the app for the current one-time code to enter when authenticating using this factor.

<div class="phone-mockup"><img src="/media/articles/multifactor-authentication/google-auth-screenshot.png" alt="Google Authenticator OTP"/></div>

Your users will need to have in their posession a supported device for whichever OTP app you use.