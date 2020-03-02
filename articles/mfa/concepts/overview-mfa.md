---
title: Multi-factor Authentication in Auth0
description: Understand the basics of multi-factor authentication and the different methods of implementing it with Auth0.
toc: true
topics:
    - mfa
contentType:
  - concept
useCase:
  - customize-mfa
---
# Multi-factor Authentication in Auth0

Multi-factor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user **knows** (such as a password)
* **Possession**: Something the user **has** (such as a mobile device)
* **Inheritance**: Something the user **is** (such as a fingerprint or retina scan)

## When to request MFA?

### Step up

### IP range

### Geolocation

### Confidence score

### Adaptive

## How does each factor work?

### Push notifications

When enabling Push, end-users will need to have Auth0 Guardian or a custom application built with the Guardian SDK installed in their device. The app is sent push notifications when the user attempts to authenticate, and the user must respond to it in order to login, ensuring that they not only know their login information but also possess the device set up for MFA.

End users will be prompted to download Auth0 Guardian when trying to sign up or log in to your application. Once they indicate that they have successfully downloaded the app, a QR code will appear on screen. They will have a short amount of time in which to scan the code with the designated app. Once this is done, they should see a confirmation screen.

Once this is all set up, when the user attempts to authenticate as normal, their device will receive a push notification via the app, and once they approve the request, they will be logged in.

<div class="phone-mockup"><img src="/media/articles/multifactor-authentication/guardian-push.png" alt="Guardian Push"/></div>

Auth0 Guardian is available on ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) and the [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833?mt=8)).

### One time passwords

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

### SMS notifications

Using SMS as an authentication factor means that the end user is sent a code via SMS when attempting to authenticate with your application. They will have to enter this code to complete the transaction, implying that in addition to knowing their login information, they also have possession of the device.

#### End user experience

![SMS End User 1](/media/articles/multifactor-authentication/mfa-sms1.png)

After signing up, and entering a country code and phone number, the user will receive a six digit code to their device. They need to enter this code into the box in order to authenticate.

![SMS End User 2](/media/articles/multifactor-authentication/mfa-sms2.png)

Your users must have a device capable of receiving SMS messages to use this option. If users can't receive SMS messages, they will not be able to sign-up with this factor. If they already enrolled with SMS and don't have the device, they will need to use their recovery code to complete the MFA flow.

#### Administrative setup

To set up SMS and be able to send SMS messages to users, you'll need to enable the SMS factor in the Dashboard and [configure Twilio](/multifactor-authentication/twilio-configuration). You can (optionally) [customize your SMS notification templates](/multifactor-authentication/sms-templates).

::: note
Custom SMS gateways are unavailable with MFA.
:::

![MFA SMS Settings](/media/articles/multifactor-authentication/sms-settings.png)

### Duo

Duo is a multi-faceted provider and can only be used on your Auth0 tenant if all other factors are disabled. 

#### Administrative setup

Your Duo account can be configured to support push notifications, SMS, OTP, phone callback, and more. See the [Duo documentation](https://duo.com/docs) for more details on Duo setup. 

::: note
Create an integration in Duo Security of type **Web SDK** and use those credentials to fill in the Duo settings in the Auth0 Dashboard as noted below.
:::

When enabling Duo in the Dashboard, you will need to click on the Duo factor and fill in a few settings fields in order to link your Duo account to Auth0.

![MFA Duo Settings](/media/articles/multifactor-authentication/duo-settings.png)

::: warning
If other factors are enabled alongside Duo, Duo will be unavailable. Duo is only available to end users when it is the **sole** factor enabled.
:::

#### MFA Sessions

Duo does not provide an option for "Remember Me" behavior, so a 30-day MFA session is hard-coded to remember a logged-in user and not prompt them every time they log in. If you wish to force end-users to log in with Duo every time, you may implement this functionality by creating a rule with `allowRememberBrowser: false` instead.

```js
function (user, context, callback) {
  context.multifactor = {
    provider: 'any',
    allowRememberBrowser: false
  };

  callback(null, user, context);
}
```

#### End user experience

The user will see a prompt for the second factor with Duo, listing the options you have enabled in your Duo account.

![Duo Login](/media/articles/multifactor-authentication/duo-login.png)

Your end users can download Duo from [Google Play](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile) or from the [App Store](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8) for use as a second factor.

### Email

Using email as an MFA factor is useful when you want to provide users a way to perform MFA when they don't have their primary factor available (e.g. they don't have their phone to receive an SMS or push notification). 

You can only enable email as an MFA factor if there is already another factor enabled. Email will only be functional as a factor from <dfn data-key="universal-login">Universal Login</dfn> when you have the [New Universal Login Experience](/universal-login/new) enabled.

Once Email MFA is enabled user will be prompted to complete MFA with the other enabled factor. If they have a verified email they will be given the option to select Email, and get an one time code in their email which they can then enter to complete MFA.

Users do not need to explicitly enroll with email MFA. They will get be able to use it when they have a verified email. This happens when they completed the email verification flow, when the updated the email_verified field using the Management API, or when they logged-in with a connection that provides verified emails (e.g. Google).

Note that Email is not true <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> as it does not represent a different factor than the password. It does not represent 'something I have' or 'something I am', but rather just another 'something I know' (the email password). It is also weaker than other factors, in that it's only as secure as the email itself (e.g. is it encrypted end-to-end?).

#### End-user experience

After the login step, users will be prompted with the most secure enabled factor. If they select 'Try another method', and then pick Email, they will be sent an email with a six-digit code that they will need to enter to complete the authentication flow.

![Email End User 1](/media/articles/multifactor-authentication/mfa-email.png)

#### Using the MFA API

You can explicitly enroll an email for MFA [using the MFA API](/multifactor-authentication/api/email). If users have a verified email and one or more explicitly enrolled emails, they'll be able to select which email they want to use to complete MFA when logging-in using Universal Login.

#### Administrative setup

In order to set up Email, you need to enable the Email factor in the Dashboard. You will only be able to enable it if there is another factor enabled. 

![MFA Email Settings](/media/articles/multifactor-authentication/email-settings.png)

[Auth0 provides a test email provider](/email) but it only allows a limited amount of emails, so you should [configure your own email provider](/email/providers).
