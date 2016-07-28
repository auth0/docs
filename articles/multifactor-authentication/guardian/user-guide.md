---
description: How to sign-up and login using the Guardian app.
---

# How to Use the Guardian App

Guardian is an app that can be downloaded from the [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833) or from [Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian). The Guardian app is used for two-factor authentication when logging into an application, which helps create a more secure login.  With two-factor authentication you will always need your mobile device when you log in.

This page will help to explain how to sign up and log in using the Guardian app and using other forms of two-factor authentication.

## Sign Up as a New User

If you do not have an existing account, you will need to sign up to create one. Click the **SIGN UP** button and enter your email and create a password.

![](/media/articles/mfa/sign-up.png)

Next, you will see the option to download the Auth0 Guardian app from either the [App Store](https://itunes.apple.com/us/app/auth0-guardian/id1093447833) or from [Google Play](https://play.google.com/store/apps/details?id=com.auth0.guardian). Underneath that, is there is the option to use [Google Authenticator](#google-authenticator) or [SMS](#sms) depending on the application's settings.
 
![](/media/articles/mfa/choose-mfa.png)

Choose the type of two-factor to use:

### Guardian
To use the Guardian app, first download either the [iOS](https://itunes.apple.com/us/app/auth0-guardian/id1093447833) or [Android](https://play.google.com/store/apps/details?id=com.auth0.guardian) app depending on the type of device you have. Once you have Guardian downloaded, click **I've already downloaded it**.

Next, a code will appear, you will have five minutes to scan the code before it expires. Open the Guardian app and scan the code.

![](/media/articles/mfa/guardian-code.png)

After the code has been successfully scanned, you will see a confirmation screen which includes a recovery code. If for some reason you do not have your mobile device, you will need this recovery code to login. Make sure to take note of this code and keep it somewhere safe. Check the box that you have recorded the code, and then you are logged in.

![](/media/articles/mfa/guardian-recover-code.png)

> Android Users: After first enrolling using the Guardian app for Android, you will be required to create a passphrase. This recovery passphrase will not be required every time you use the app, but could be required when some Android security settings have been changed. You can use the suggested passphrase or create your own. 
>
> ![](/media/articles/mfa/android-passphrase.png)

### Google Authenticator
If you would prefer to use the Google Authenticator app, click on the link for Google Authenticator. You will need to download Google Authenticator for [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) or [iOS](https://itunes.apple.com/us/app/google-authenticator/id388497605)

A code will appear, and you will have five minutes to scan the code before it expires. After scanning the code, you will get a six digit code to enter. Once you enter this code, you will see a confirmation screen which has a recovery code. If for some reason you do not have your mobile device, you will need this recovery code to login. Make sure to take note of this code and keep it somewhere safe. Check the box that you have recorded the code, and then you are logged in.

![](/media/articles/mfa/google-code.png)

[For more information about Google Authenticator, see: [Install Google Authenticator](https://support.google.com/accounts/answer/1066447).

### SMS

Depending on the applications settings, SMS may be an option to use for two-factor authentication. Click on the the **SMS** link after entering your email and password.

Then select your phone number's country code and enter your mobile phone number. You must be able to receive SMS to your device to use this option.

![](/media/articles/mfa/sms.png)

Then you should receive a six digit code in a message to your phone. Enter this code into the box. Then you will see a recovery code, make sure to note this code as you will need it to login if you do not have your device. Check the box that you have recorded the code, and then you are all set and logged in.

## Logging in

Depending on the type of two-factor authentication you chose when you were signing up, this will affect how you login.

### Guardian

After entering your username and password, a push notification will be sent to the Guardian app on your mobile device. This notification is a login request, it includes the application name, the OS and browser of the request, the location and the date of the request. If you recognize this request as your own, tap the **Allow** button. You should now be logged in.

If you are not currently connected to the internet on your mobile device to recieve push notifications, you can enter the OTP(One-time password) manually by clicking "enter the code".

![](/media/articles/mfa/guardian-enter-code.png)

To find this code, go into the Guardian app on your device, and click on the application you are trying to log into. Then you should see information on your last sign in and a 6-digit code at the bottom which is your OTP.

![](/media/articles/mfa/guardian-otp.png)

Enter this code to finish signing in.

If you do not have your mobile device available to you during sign in, you can enter the recovery code that was given when you signed up by clicking the "Use the Recovery Code" link.

### Google Authenticator

After entering your username and password, you will be prompted for a six digit code. Open the Google Authenticator app on your mobile device to find the correct code. If you use Google Authenticator for other applications as well, make sure you are using the code for the current application. After entering the six digit code you will be logged in.

If you do not have your mobile device available to you during sign in, you can enter the recovery code that was given when you signed up by clicking the "Use Recovery Code" link.

### SMS

After entering you enter your email and password, a SMS message will be sent to the phone number you entered when you signed up. Enter the six digit code from the message into the box to complete your login.

If you do not have your mobile device available to you during sign in, you can enter the recovery code that was given when you signed up by clicking the "Use Recovery Code" link.

## Troubleshooting

### If you do not have your mobile device or it is turned off

If you have lost your device or it is unable to recieve notifications, you can finish the two-step authentication with the recovery code from when you signed up. After entering your email and password to login, click the link that says "Use the recovery code" to access your account without using your device.

If you don't have your recovery code you will not be able to login. Contact your system administrator for help accessing your account.

### If you forgot your password

If you forgot your password when you are trying to login, click **Don't remember your password?** underneath the login. Enter your email to receive an email that will contain a link to reset your password.

### If your OTP is not being accepted 

If the 6-digit code in the Guardian or the Google Authenticator app are being rejected for sign in, first check that you are selecting the right application from the list on the landing page of each application. You should see the name of the application and the email you are using for sign in, make sure these are correct.

If you know you are selecting the correct connection, make sure that your mobile device's clock settings are correct. One-time passwords are generated using Coordinated Universal Time(UTC) so your device time must be correct to generate the correct OTP.

### Transaction Expiration

For all types of multifactor authentication types there is a five minute expiration. Check the timestamp on the messages to see if it is still valid when trying to login. If it has been longer than five minutes, you will need to try to login again and get a new code or notification. 

If using SMS, make sure you are not [exceeding rate limits](#sms-rate-limits).

### If you did not receive a SMS

If you did not receive your six digit code via SMS, check that the phone number you entered is correct. If it is the correct number, make sure you have a cellular signal. If you still are not receiving the messages, check with your service provider to confirm that messages are not getting blocked.

### SMS Rate Limits

If you attempt to send more than ten SMS to your device within an hour, you will see an error message about a rate limit exception. If you have exceeded the limit of ten, you will need to wait at least an hour from your first SMS send to send another message. Each hour after the first attempt you will gain one more message request maxing out at ten requests.
