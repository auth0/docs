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

Your users must have a device capable of using SMS to use this option. If your users are unable to always receive SMS messages (such as when traveling), they will be unable to sign up with SMS, and if already signed up will be unable to log in without SMS.

## Administrative setup

In order to set up SMS, you will need to click on the SMS factor in the Dashboard and [configure an SMS provider such as Twilio](/multifactor-authentication/twilio-configuration) to enable you to send SMS messages to your users. You can also [customize your SMS notification templates](/multifactor-authentication/sms-templates).

![MFA SMS Settings](/media/articles/multifactor-authentication/sms-settings.png)
