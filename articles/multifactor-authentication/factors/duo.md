---
title: MFA - Duo
description: Using one time passwords with Auth0 MFA
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# MFA with Duo

Duo is a multi-faceted provider and can only be used on your Auth0 tenant if all other factors are disabled. 

## Administrative setup

Your Duo account can be configured to support push notifications, SMS, OTP, phone callback, and more. See the [Duo documentation](https://duo.com/docs) for more details on Duo setup. 

When enabling Duo in the Dashboard, you will need to click on the Duo factor and fill in a few settings fields in order to link your Duo account to Auth0.

![MFA Duo Settings](/media/articles/multifactor-authentication/duo-settings.png)

::: info
If other factors are enabled alongside Duo, Duo will be unavailable. Duo is available to end users when it is the **only** factor enabled.
:::

## End user experience

The user will see a prompt for the second factor with Duo, listing the options you have enabled in your Duo account.

![Duo Login](/media/articles/multifactor-authentication/duo-login.png)

Your end users can download the Duo app from a source below to use Duo as a second factor.

Duo apps: ([Google Play](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile) / [App Store](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8))