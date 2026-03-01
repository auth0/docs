# Prompt: mfa-push

## Screen: mfa-push-welcome

<p style="text-align: center;">
  <img alt="mfa-push-welcome reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-welcome" src="/media/articles/universal-login/text-customization/mfa-push-welcome.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Install the application | <%= "${clientName}" %>|`pageTitle`|
|Secure Your Account|`title`|
|In order to continue, install the <%= "${appName}" %> app via the app store from your mobile device.|`description`|
|Google Play|`androidButtonText`|
|Continue|`buttonText`|
|App Store|`iosButtonText`|
|Try another method|`pickAuthenticatorText`|
|<%= "${companyName}" %>|`logoAltText`|

## Screen: mfa-push-enrollment-qr

<p style="text-align: center;">
  <img alt="mfa-push-enrollment-qr reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-enrollment-qr" src="/media/articles/universal-login/text-customization/mfa-push-enrollment-qr.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Scan the code to log in using a push notification | <%= "${clientName}" %>|`pageTitle`|
|Secure Your Account|`title`|
|Scan the QR Code below using the <%= "${appName}" %> app on your mobile device.|`description`|
|Try another method|`pickAuthenticatorText`|
|Continue|`buttonText`|
|<%= "${companyName}" %>|`logoAltText`|
|You must scan the QR code with the <%= "${appName}" %> app on your mobile device.|`enrollment-transaction-pending`|

## Screen: mfa-push-challenge-push

<p style="text-align: center;">
  <img alt="mfa-push-challenge-push reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-challenge-push" src="/media/articles/universal-login/text-customization/mfa-push-challenge-push.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Accept the push notification to log in | <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|We’ve sent a notification to the following device via the <%= "${appName}" %> app:|`description`|
|I've responded on my device|`buttonText`|
|Try another method|`pickAuthenticatorText`|
|Remember this device for 30 days|`rememberMeText`|
|Resend|`resendActionText`|
|Didn't receive a notification?|`resendText`|
|Manually Enter Code|`enterOtpCode`|
|OR|`separatorText`|
|<%= "${companyName}" %>|`logoAltText`|
|You must accept the notification via the <%= "${appName}" %> app on your mobile device.|`challenge-transaction-pending`|
|We have not received a confirmation, please slow down.|`polling-interval-exceeded`|
|We have received too many notification requests. Wait a few minutes and try again.|`too-many-push`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|We have not received a confirmation, please try scanning the code again.|`mfa-push-verify-transaction-pending`|
|We couldn't verify the enrollment. Please try again later.|`mfa-push-verify-authenticator-error`|
|We couldn't send the notification. Please try again later.|`mfa-push-challenge-authenticator-error`|
|Notification rejected|`transaction-rejected`|

## Screen: mfa-push-list

<p style="text-align: center;">
  <img alt="mfa-push-list reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-push-list" src="/media/articles/universal-login/text-customization/mfa-push-list.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|List of available devices | <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Registered Devices|`title`|
