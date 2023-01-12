# Prompt: mfa-voice

## Screen: mfa-voice-enrollment

<p style="text-align: center;">
  <img alt="mfa-voice-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-voice-enrollment" src="/media/articles/universal-login/text-customization/mfa-voice-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Enter your phone number to log in using a phone code | <%= "${clientName}" %>|`pageTitle`|
|Secure Your Account|`title`|
|Enter your phone number below. A voice call will be placed on that number with a code to enter on the next screen.|`description`|
|Continue|`buttonText`|
|Try another method|`pickAuthenticatorText`|
|Enter your phone number|`placeholder`|
|<%= "${companyName}" %>|`logoAltText`|
|There was a problem sending the SMS|`send-sms-failed`|
|Phone number can only include digits.|`invalid-phone-format`|
|Seems that your phone number is not valid. Please check and retry.|`invalid-phone`|
|You have exceeded the maximum number of phone messages per hour. Wait a few minutes and try again.|`too-many-sms`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|Please enter a phone number|`no-phone`|

## Screen: mfa-voice-challenge

<p style="text-align: center;">
  <img alt="mfa-voice-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-voice-challenge" src="/media/articles/universal-login/text-customization/mfa-voice-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Enter your phone code to log in | <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|We've sent a 6-digit code via voice phone call to the following phone number:|`description`|
|Continue|`buttonText`|
|Edit|`editText`|
|Edit phone number|`editLinkScreenReadableText`|
|Choose another phone number.|`changePhoneText`|
|Try another method|`pickAuthenticatorText`|
|Enter the 6-digit code|`placeholder`|
|Remember this device for 30 days|`rememberMeText`|
|Call again|`resendActionText`|
|Didn't receive a call?|`resendText`|
|or|`resendSmsActionSeparatorTextBefore`|
|send a text|`resendSmsActionText`|
|<%= "${companyName}" %>|`logoAltText`|
|OTP Code must have 6 numeric characters|`invalid-otp-code-format`|
|The code you entered is invalid|`invalid-code`|
|There was a problem making the voice call|`send-voice-failed`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|We couldn't make the voice call. Please try again later.|`voice-authenticator-error`|
|Notification was not sent. Try resending the code.|`no-transaction-in-progress`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|You have exceeded the maximum number of phone messages per hour. Wait a few minutes and try again.|`too-many-voice`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
