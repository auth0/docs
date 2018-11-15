---
title: Multi-factor Authentication in Auth0
description: The basics of multi-factor authentication and the different methods of implementing it with Auth0.
url: /multifactor-authentication
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# Multi-factor Authentication

## What is multi-factor authentication?

Multi-factor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user **knows** (such as a password)
* **Possession**: Something the user **has** (such as a mobile device)
* **Inheritance**: Something the user **is** (such as a fingerprint or retina scan)

## Implement MFA with Auth0

Enabling MFA for your tenant is a fairly straightforward process. First, you toggle on the factors you choose to enable on your tenant, such as push notifications or SMS. Next, you perform any further setup required to configure that factor, and last, you choose whether you wish to force MFA for all users or not. See the instructions below for details.

You can also [customize your MFA flow](/multifactor-authentication/custom) with [Auth0 Rules](/rules), to allow MFA to only be required in specific circumstances or force a particular factor to be used.

### 1. Toggle on the factors you require in the Dashboard

In the [Dashboard > Multifactor Auth](${manage_url}/#/mfa), head to the Multifactor Auth section. Here you will find a series of toggles for the MFA factors supported by Auth0. 

**TODO: STANDARDIZE DASHBOARD IMAGE**

![MFA Dashboard Page](/media/articles/multifactor-authentication/mfa-dashboard.png)

Any or all of these factors can be enabled simultaneously. When logging in the first time, the user will be shown a default and but will be allowed to choose another factor to use, if you have more than one factor enabled in the Dashboard. 

**TODO: IMAGE OF CURRENT LOGIN PROMPT WITH MFA CHOICES**

::: note
When you enable the Duo factor, you will have to fill in a few further settings related specifically to Duo before continuing.
**TODO: SPECIFY SETTINGS**
:::

Additionally, there is the **Always require Multi-factor Authentication** toggle, which allows authentication against this app only when one or more of the factors is enabled in the Dashboard, and completed by users while logging in.

### 2. Set up your services

Auth0 supports the following factors for implementing MFA. You must enable at least one to use MFA, but you can choose to enable and make available more than one factor if you wish.

#### One Time Passwords (OTP)

The principle behind OTP as a factor is fairly straightforward for the end user. They use an app, such as:

* Authy ([Google Play](https://play.google.com/store/apps/details?id=com.authy.authy) / [App Store](https://itunes.apple.com/us/app/authy/id494168017)).
* Google Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) / [App Store](https://itunes.apple.com/us/app/google-authenticator/id388497605)).
* Guardian ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) / [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833)).
* Microsoft Authenticator ([Google Play](https://play.google.com/store/apps/details?id=com.azure.authenticator) / [App Store](https://itunes.apple.com/us/app/microsoft-authenticator/id983156458)).

Upon signup, they can scan a code and set up the app, upon which it will begin generating one-time codes. Afterword, the user can simply check the app for the current one-time code to enter when authenticating using this factor.

Your users will need to have in their posession a supported device for whichever OTP app you use.

#### Push notifications

MFA by push notification simply requires an appropriate app on the user's device. The app is sent push notifications when the user attempts to authenticate, and the user must respond to it in order to login, ensuring that they not only know their login information but also posess the device set up for MFA.

End users will be prompted to download whichever app you have enabled in the Dashboard when trying to sign up or log in to your application. Once they indicate that they have successfully downloaded the app, a barcode will appear on screen. They will have a short amount of time in which to scan the code with the designated app. Once this is done, they should see a confirmation screen and also a recovery code to take note of.

Once this is all set up, when the user attempts to authenticate as normal, their device will receive a push notification via the app, and once they approve the request, they will be logged in.

Auth0 supports the use of Auth0 Guardian ([Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian) / [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833?mt=8)) and Duo ([Google Play](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile) / [App Store](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8)) for push notifications.

::: note
If other factors are enabled alongside Duo, Duo will be unavailable. Duo is currently only available to end users when it is the only factor enabled.
:::

#### SMS

SMS as an MFA factor means that the end user is sent a code via SMS when attempting to authenticate with your application. They will have to enter this code to complete the transaction, implying that in addition to knowing their login information, they also have posession of the device set up for receiving MFA texts.

Your users must have a device capable of using SMS to use this option. If your users are unable to always receive SMS messages (such as when traveling), they will be unable to sign up with SMS and will be unable to log in without SMS or their recovery code.

After signing up, and entering a country code and phone number, the user will receive a six digit code to their device. They need to enter this code into the box, and then they will also get a recovery code.

In order to set up SMS, you will need to [configure an SMS provider such as Twilio](/multifactor-authentication/twilio-configuration). You can also [customize your SMS notification templates](/multifactor-authentication/sms-templates).

## Customizing multi-factor authentication

### Customizing via Rules

If you need to customize the multi-factor experience you are offering to your users, you may do so via [custom rules configurations for multi-factor authentication](/multifactor-authentication/custom). This might be needed, for example, if you wish to defined conditions (such as changes in geographic location or logins from unrecognized devices) which would trigger additional authentication challenges.

### Customizing Guardian

The hosted page for Guardian can also be customized. You may change the logo and the name that is displayed to your users. To do so, make the appropriate changes to the Guardian page's settings on the **General** tab in [Dashboard > Tenant Settings](${manage_url}/#/tenant). You can also reach the Tenant Settings page by clicking on your tenant name on the top right of the page and then selecting **Settings** from the dropdown menu.

* **Friendly Name**: the name of the app that you want displayed to users
* **Logo URL**: the URL that points to the logo image you want displayed to users

Additionally, you can [customize the Guardian hosted page](/hosted-pages/guardian) as well.

### MFA API

Additionally, the [MFA API](/multifactor-authentication/api) is available for other customized MFA requirements.

## Recovery methods

With most MFA factors, upon signup, the end user will be given a recovery code which should be kept secret. They will need this code to login if they do not have their device or are temporarily unable to use their normal MFA. If they have lost their recovery code and device, you will need to [reset the user's MFA](/multifactor-authentication/reset-user).
::: note
If a recovery code is used, a new recovery code will be provided at that time.
:::