# Prompt: mfa-phone

## Screen: mfa-phone-challenge

<p style="text-align: center;">
  <img alt="mfa-phone-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-phone-challenge" src="/media/articles/universal-login/text-customization/mfa-phone-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Use your phone number to log in | <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|We will send a 6-digit code to the following phone number:|`description`|
|Continue|`continueButtonText`|
|Choose another phone number.|`changePhoneText`|
|Text message|`smsButtonText`|
|Voice call|`voiceButtonText`|
|How do you want to receive the code?|`chooseMessageTypeText`|
|Try another method|`pickAuthenticatorText`|
|Enter your phone number|`placeholder`|
|<%= "${companyName}" %>|`logoAltText`|
|There was a problem sending the SMS|`send-sms-failed`|
|There was a problem making the voice call|`send-voice-failed`|
|Phone number can only include digits.|`invalid-phone-format`|
|It seems that your phone number is not valid. Please check and retry.|`invalid-phone`|
|You have exceeded the maximum number of phone messages per hour. Wait a few minutes and try again.|`too-many-sms`|
|You have exceeded the maximum number of phone messages per hour. Wait a few minutes and try again.|`too-many-voice`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|Please enter a phone number|`no-phone`|

## Screen: mfa-phone-enrollment

<p style="text-align: center;">
  <img alt="mfa-phone-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-phone-enrollment" src="/media/articles/universal-login/text-customization/mfa-phone-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Enter your phone number to log in using a phone code | <%= "${clientName}" %>|`pageTitle`|
|Secure Your Account|`title`|
|Enter your country code and phone number to which we can send a 6-digit code:|`description`|
|Continue|`continueButtonText`|
|Text message|`smsButtonText`|
|Voice call|`voiceButtonText`|
|How do you want to receive the code?|`chooseMessageTypeText`|
|Try another method|`pickAuthenticatorText`|
|Enter your phone number|`placeholder`|
|<%= "${companyName}" %>|`logoAltText`|
|There was a problem sending the SMS|`send-sms-failed`|
|There was a problem making the voice call|`send-voice-failed`|
|We couldn't send the SMS. Please try again later.|`sms-authenticator-error`|
|Phone number can only include digits.|`invalid-phone-format`|
|It seems that your phone number is not valid. Please check and retry.|`invalid-phone`|
|You have exceeded the maximum number of phone messages per hour. Wait a few minutes and try again.|`too-many-sms`|
|You have exceeded the maximum number of phone messages per hour. Wait a few minutes and try again.|`too-many-voice`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
|Please enter a phone number|`no-phone`|
