# How to Use the Guardian App

Guardian is an app that can be downloaded from the [App Store](http://www.apple.com/itunes/) or from [Google Play](https://play.google.com/store). The Guardian app is used for two-factor authentication when logging into an application, which helps create a more secure login.  With two-factor authentication you will always need your mobile device when you log in.

This page will help to explain how to sign up and log in using the Guardian app and using other forms of two-factor authentication.

## Sign Up as a New User

If you do not have an existing account, you will need to sign up to create one. Click the **SIGN UP** button and enter your email and create a password.

![](/media/articles/mfa/sign-up.png)

Next, you will see the option to download the Auth0 Guardian app from either the [App Store](http://www.apple.com/itunes/) or from [Google Play](https://play.google.com/store). Underneath that, is there is the option to use [Google Authenticator]() or SMS depending on the application's settings.
 
![](/media/articles/mfa/choose-mfa.png)

Choose the type of two-factor to use:

### Guardian
To use the Guardian app, first download the either the iPhone or Android app depending on the type of phone you have. Once you have Guardian downloaded, click **I've already downloaded it**.

Next, a code will appear, you will have five minutes to scan the code before it expires. Open the Guardian app and scan the code.

![](/media/articles/mfa/guardian-code.png)

Once your code has been successfully scanned, you will see a confirmation screen which includes a recovery code. If for some reason you do not have your mobile device, you will need this recovery code to login. Make sure to take note of this code and keep it somewhere safe. Check the box that you have recorded the code, and then you are logged in.

![](/media/articles/mfa/guardian-recovery-code.png)

### Google Authenticator
If you would prefer to use the Google Authenticator app, click on the link for Google Authenticator.  You will need to download the Google Authenticator app on your mobile device. 

[Click here to learn more about Google Authenticator](https://support.google.com/accounts/answer/1066447) 

A code will appear, and you will have five minutes to scan the code before it expires. After scanning the code, you will get a six digit code to enter. 

![](/media/articles/mfa/google-code.png)

### SMS

Depending on the applications settings, SMS may be an option to use for two-factor authentication. Click on the the **SMS** link after entering your email and password.

Then select your phone number's country code and enter your mobile phone number. You must be able to receive SMS to your device to use this option.

![](/media/articles/mfa/sms.png)

Then you should receive a six digit code in a message to your phone. Enter this code into the box. Then you will see a recovery code, make sure to note this code as you will need it to login if you do not have your device. Check the box that you have recorded the code, and then you are all set and logged in.

## Logging in

Depending on the type of two-factor authentication you chose when you were signing up, this will affect how you login.

### Guardian

After entering your username and password, you will see a scannable code appear. Scan this code using the Auth0 Guardian app. This will give you a six digit code to enter to complete your sign in.

### Google Authenticator

After entering your username and password, you will see a scannable code appear. Scan this code using the Google Authenticator app. This will give you a six digit code to enter to complete your sign in.

### SMS

After entering you enter your email and password, a SMS message will be sent to the phone number you entered when you signed up. Enter the six digit code from the message into the box to complete your login.

## Troubleshooting

### If you do not have your mobile device

If you have lost your phone and are unable to finish the two-step authentication you will need the recovery code from when you signed up. Enter this code to access your account without your device.

If you do have your recovery code you will not be able to login. Contact your system administrator for help accessing your account.

### If you did not receive a SMS

If you did not receive your six digit code via SMS, check that the phone number you entered is correct. If it is the correct number, make sure you have a cellular signal. If you still are not receiving the messages, check with your service provider to confirm that messages are not getting blocked.

### If you forgot you password

If you forgot your password when you are trying to login, click **Don't remember your password?** underneath the login. Enter your email to receive an email that will contain a link to reset your password.
