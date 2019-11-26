# Prompt: mfa-sms

## Screen: mfa-country-codes

<p style="text-align: center;">
  <img alt="mfa-country-codes reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-country-codes" src="/media/articles/universal-login/text-customization/mfa-country-codes.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Sign up to <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Select a Country Code|`title`|

## Screen: mfa-sms-enrollment

<p style="text-align: center;">
  <img alt="mfa-sms-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-sms-enrollment" src="/media/articles/universal-login/text-customization/mfa-sms-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Secure your Account|`pageTitle`|
|Secure Your Account|`title`|
|Enter your phone number below. An SMS will be sent to that number with a code to enter on the next screen.|`description`|
|Continue|`buttonText`|
|Try another method|`pickAuthenticatorText`|
|Enter your phone number|`placeholder`|
|There was a problem sending the SMS|`send-sms-failed`|
|Phone number can only include digits.|`invalid-phone-format`|
|Seems that your phone number is not valid. Please check and retry.|`invalid-phone`|
|You have exceeded the amount of SMSs per hour. Wait a few minutes and try again.|`too-many-sms`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|Please enter a phone number|`no-phone`|

## Screen: mfa-sms-challenge

<p style="text-align: center;">
  <img alt="mfa-sms-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-sms-challenge" src="/media/articles/universal-login/text-customization/mfa-sms-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|We've sent a text message to:|`description`|
|Continue|`buttonText`|
|Edit|`editText`|
|Try another method|`pickAuthenticatorText`|
|Enter the 6-digit code|`placeholder`|
|Remember this device for 30 days|`rememberMeText`|
|Resend|`resendActionText`|
|Didn't receive a code?|`resendText`|
|OTP Code must have 6 numeric characters|`invalid-otp-code-format`|
|The code you entered is invalid|`invalid-code`|
|Invalid or expired user code|`invalid-expired-code`|
|There was a problem sending the SMS|`send-sms-failed`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|We couldn't send the SMS. Please try again later.|`sms-authenticator-error`|
|Notification was not sent. Try resending the code.|`no-transaction-in-progress`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|You have exceeded the amount of SMSs per hour. Wait a few minutes and try again.|`too-many-sms`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|

## Screen: mfa-sms-list

<p style="text-align: center;">
  <img alt="mfa-sms-list reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-sms-list" src="/media/articles/universal-login/text-customization/mfa-sms-list.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Enrolled Phone Numbers|`title`|
