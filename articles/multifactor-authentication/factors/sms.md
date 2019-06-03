---
title: MFA - SMS
description: Using one time passwords with Auth0 MFA
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# MFA with SMS

Using SMS as an authentication factor means that the end user is sent a code via SMS when attempting to authenticate with your application. They will have to enter this code to complete the transaction, implying that in addition to knowing their login information, they also have possession of the device.

## End user experience

![SMS End User 1](/media/articles/multifactor-authentication/mfa-sms1.png)

After signing up, and entering a country code and phone number, the user will receive a six digit code to their device. They need to enter this code into the box in order to authenticate.

![SMS End User 2](/media/articles/multifactor-authentication/mfa-sms2.png)

Your users must have a device capable of receiving SMS messages to use this option. If users can't receive SMS messages, they will not be able to sign-up with this factor. If they already enrolled with SMS and don't have the device, they will need to use their recovery code to complete the MFA flow.

## Administrative setup

To set up SMS and be able to send SMS messages to users, you'll need to enable the SMS factor in the Dashboard and [configure Twilio](/multifactor-authentication/twilio-configuration). You can (optionally) [customize your SMS notification templates](/multifactor-authentication/sms-templates).

::: note
Custom SMS gateways are unavailable with MFA.
:::

![MFA SMS Settings](/media/articles/multifactor-authentication/sms-settings.png)
