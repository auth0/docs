---
description: Learn how to configure time-based one time passwords for MFA.
topics:
  - mfa
  - duo
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Configure One Time Passwords for MFA

To use one time passwords as an authentication factor, users need an Authenticator app such as:

* Authy ([Google Play](https://play.google.com/store/apps/details?id=com.authy.authy) / [App Store](https://itunes.apple.com/us/app/authy/id494168017)).
* Google Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) / [App Store](https://itunes.apple.com/us/app/google-authenticator/id388497605)).
* Auth0 Guardian ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) / [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833)).
* Microsoft Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.azure.authenticator) / [App Store](https://itunes.apple.com/us/app/microsoft-authenticator/id983156458)).

![MFA OTP Signup](/media/articles/mfa/mfa-otp-setup.png)

Upon signup, they can scan a code and set up the app, upon which it will begin generating one-time codes. 

Afterwards, when logging in to the app, the user can simply check the authenticator app for the current one-time code:

<div class="phone-mockup"><img src="/media/articles/mfa/google-auth-screenshot.png" alt="Google Authenticator OTP"/></div>

And enter the code at the prompt:

![MFA OTP Login](/media/articles/mfa/mfa-otp-login.png)

Your users will need to have an OTP Authenticator app installed in their mobile devices.

## Keep reading

* [Enroll and Challenge OTP Authenticators using the MFA API](/mfa/guides/mfa-api/otp)