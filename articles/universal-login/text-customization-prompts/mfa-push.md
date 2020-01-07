# Prompt: mfa-push

## Screen: mfa-push-welcome

<p style="text-align: center;">
  <img alt="mfa-push-welcome reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-welcome" src="/media/articles/universal-login/text-customization/mfa-push-welcome.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Secure your Account|`pageTitle`|
|Secure Your Account|`title`|
|In order to continue, install the <%= "${appName}" %> app via the app store from your mobile device.|`description`|
|Google Play|`androidButtonText`|
|Continue|`buttonText`|
|App Store|`iosButtonText`|
|Try another method|`pickAuthenticatorText`|

## Screen: mfa-push-enrollment-qr

<p style="text-align: center;">
  <img alt="mfa-push-enrollment-qr reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-enrollment-qr" src="/media/articles/universal-login/text-customization/mfa-push-enrollment-qr.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Secure your Account|`pageTitle`|
|Secure Your Account|`title`|
|Scan the QR Code below using the <%= "${appName}" %> app on your mobile device.|`description`|
|Try another method|`pickAuthenticatorText`|
|Continue|`buttonText`|
|You must scan the QR code with the <%= "${appName}" %> app on your mobile device.|`enrollment-transaction-pending`|

## Screen: mfa-push-challenge-push

<p style="text-align: center;">
  <img alt="mfa-push-challenge-push reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-challenge-push" src="/media/articles/universal-login/text-customization/mfa-push-challenge-push.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|We’ve sent a notification to the following device via the <%= "${appName}" %> app:|`description`|
|Awaiting confirmation|`awaitingConfirmation`|
|I've responded on my device|`buttonText`|
|Try another method|`pickAuthenticatorText`|
|Remember this device for 30 days|`rememberMeText`|
|Resend|`resendActionText`|
|Didn't receive a notification?|`resendText`|
|Manually Enter Code|`enterOtpCode`|
|OR|`separatorText`|
|You must accept the notification via the <%= "${appName}" %> app on your mobile device.|`challenge-transaction-pending`|
|We have not received a confirmation, please slow down.|`polling-interval-exceeded`|
|We have received too many notification requests. Wait a few minutes and try again.|`too-many-push`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|We have not received a confirmation, please try scanning the code again.|`mfa-push-verify-transaction-pending`|
|We couldn't verify the enrollment. Please try again later.|`mfa-push-verify-authenticator-error`|
|We couldn't send the notification. Please try again later.|`mfa-push-challenge-authenticator-error`|
|Notification rejected|`transaction-rejected`|

## Screen: mfa-push-challenge-code

<p style="text-align: center;">
  <img alt="mfa-push-challenge-code reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-challenge-code" src="/media/articles/universal-login/text-customization/mfa-push-challenge-code.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Back|`backText`|
|Continue|`buttonText`|
|Enter the one-time code found at the bottom of the <%= "${appName}" %> app.|`description`|
|Try another method|`pickAuthenticatorText`|
|Enter the one-time code|`placeholder`|
|Remember this device for 30 days|`rememberMeText`|
|Verify Your Identity|`title`|
|OTP Code must have 6 numeric characters|`invalid-otp-code-format`|
|The code you entered is invalid|`invalid-code`|
|Invalid or expired user code|`invalid-expired-code`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|Notification was not sent. Try resending the code.|`no-transaction-in-progress`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|We couldn't verify the enrollment. Please try again later.|`mfa-push-verify-authenticator-error`|

## Screen: mfa-push-list

<p style="text-align: center;">
  <img alt="mfa-push-list reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-list" src="/media/articles/universal-login/text-customization/mfa-push-list.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Enrolled Devices|`title`|
