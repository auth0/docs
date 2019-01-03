---
title: MFA Troubleshooting for End-Users
description: Basic troubleshooting of MFA issues for end-users.
url: /multifactor-authentication/troubleshooting
toc: true
topics:
    - mfa
contentType:
  - index
useCase:
  - customize-mfa
---
# MFA Troubleshooting

Sometimes, issues can arise for users while attempting to authenticate using MFA. This guide is a troubleshooting reference for end-users who are unable to login to your applications via MFA when it is properly configured.

## Generic issues

### If you do not have your mobile device or it is turned off

If you have lost your device you can finish authentication with the recovery code from when you signed up. After entering your email and password to login, click the link that says "Use the recovery code" to access your account without using your device.

If you don't have your recovery code you will not be able to login. Contact your system administrator for help accessing your account.

### If you forgot your password

If you forgot your password when you are trying to login, click **Don't remember your password?** underneath the login. Enter your email to receive an email that will contain a link to reset your password.

### Transaction expiration

For all types of multi-factor authentication types there is a five minute expiration. Check the timestamp on the messages to see if it is still valid when trying to login. If it has been longer than five minutes, you will need to try to login again and get a new code or notification.

If using SMS, make sure you are not [exceeding rate limits](#sms-rate-limits).

## SMS issues

### If you did not receive a SMS

If you did not receive your six digit code via SMS, check that the phone number you entered is correct. If it is the correct number, make sure you have a cellular signal. If you still are not receiving the messages, check with your service provider to confirm that messages are not getting blocked.

### SMS Rate Limits

If you attempt to send more than ten SMS to your device within an hour, you will see an error message about a rate limit exception. If you have exceeded the limit of ten, you will need to wait at least an hour from your first SMS send to send another message. Each hour after the first attempt you will gain one more message request maxing out at ten requests.

## OTP issues

If the 6-digit code in the Guardian or the Google Authenticator app are being rejected for sign in (often with the message `Incorrect Code`), first check that you are selecting the right application from the list in your authenticator app.

If you know you are selecting the correct item, make sure that your mobile device's clock settings are correct. One-time passwords are generated using Coordinated Universal Time (UTC) so your device time must be correct to generate the correct OTP.

* **Android Devices** - Go to the authenticator app's settings, and check to see if there is a setting by which to re-sync the clock.
* **iOS Devices** - for iOS devices, the time shift can be resolved from device settings. Go to your device's settings, **Date and Time**, and enable **Set Automatically**. If it was already enabled, disable it for a moment and then re-enable it.

## Duo issues

For issues/questions specifically regarding Duo, [check the Duo documentation](https://guide.duo.com).