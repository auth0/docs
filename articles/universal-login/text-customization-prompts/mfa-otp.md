# Prompt: mfa-otp

## Screen: mfa-otp-enrollment-qr

<p style="text-align: center;">
  <img alt="mfa-otp-enrollment-qr reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-otp-enrollment-qr" src="/media/articles/universal-login/text-customization/mfa-otp-enrollment-qr.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Scan the code to log in using a one-time password | <%= "${clientName}" %>|`pageTitle`|
|Secure Your Account|`title`|
|Scan the QR Code below using your preferred authenticator app and then enter the provided one-time code below.|`description`|
|Continue|`buttonText`|
|Trouble Scanning?|`codeEnrollmentText`|
|Try another method|`pickAuthenticatorText`|
|Enter your one-time code|`placeholder`|
|Then|`separatorText`|
|<%= "${companyName}" %>|`logoAltText`|
|OTP Code must have 6 numeric characters|`invalid-otp-code-format`|
|The code you entered is invalid|`invalid-code`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|You are already enrolled on MFA.|`user-already-enrolled`|

## Screen: mfa-otp-enrollment-code

<p style="text-align: center;">
  <img alt="mfa-otp-enrollment-code reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-otp-enrollment-code" src="/media/articles/universal-login/text-customization/mfa-otp-enrollment-code.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Copy the code to log in using a one-time password | <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Continue|`buttonText`|
|Secure code to copy|`altText`|
|Copy code|`copyCodeButtonText`|
|Manually enter the following code into your preferred authenticator app and then enter the provided one-time code below.|`description`|
|Try another method|`pickAuthenticatorText`|
|Enter your one-time code|`placeholder`|
|Secure Your Account|`title`|
|<%= "${companyName}" %>|`logoAltText`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|

## Screen: mfa-otp-challenge

<p style="text-align: center;">
  <img alt="mfa-otp-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-otp-challenge" src="/media/articles/universal-login/text-customization/mfa-otp-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Enter your one-time password to log in | <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|Check your preferred one-time password application for a code.|`description`|
|Continue|`buttonText`|
|Try another method|`pickAuthenticatorText`|
|Enter your one-time code|`placeholder`|
|Remember this device for 30 days|`rememberMeText`|
|<%= "${companyName}" %>|`logoAltText`|
|Use password|`usePasswordText`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
