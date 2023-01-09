# Prompt: mfa-webauthn

## Screen: mfa-webauthn-platform-enrollment

<p style="text-align: center;">
  <img alt="mfa-webauthn-platform-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-platform-enrollment" src="/media/articles/universal-login/text-customization/mfa-webauthn-platform-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in faster on this device | <%= "${clientName}" %>|`pageTitle`|
|Log In Faster on This Device|`title`|
|Trust this device? You can quickly and securely log in the next time using this device's fingerprint or face recognition.|`description`|
|Awaiting device confirmation|`awaitingConfirmation`|
|<%= "${companyName}" %>|`logoAltText`|
|Continue|`continueButtonText`|
|Try another method|`pickAuthenticatorText`|
|Remind me later|`snoozeEnrollmentButtonText`|
|Not on this device|`refuseAddingDeviceText`|
|Not now|`skipAddingDeviceText`|
|We could not start the device enrollment. Please try again later.|`webauthn-platform-associate-error`|

## Screen: mfa-webauthn-roaming-enrollment

<p style="text-align: center;">
  <img alt="mfa-webauthn-roaming-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-roaming-enrollment" src="/media/articles/universal-login/text-customization/mfa-webauthn-roaming-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Register your security key | <%= "${clientName}" %>|`pageTitle`|
|Adding Your Security Key|`title`|
|Security Keys can be used as an additional authentication factor.|`description`|
|Awaiting Security Key|`awaitingConfirmation`|
|<%= "${companyName}" %>|`logoAltText`|
|Use security key|`continueButtonText`|
|Try another method|`pickAuthenticatorText`|
|Connect your Security Key and continue.|`instructions1`|
|Follow the steps on the browser.|`instructions2`|
|Name your Security Key to easily identify it later.|`instructions3`|
|We could not start the security key enrollment. Please try again later.|`webauthn-associate-error`|

## Screen: mfa-webauthn-platform-challenge

<p style="text-align: center;">
  <img alt="mfa-webauthn-platform-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-platform-challenge" src="/media/articles/universal-login/text-customization/mfa-webauthn-platform-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Use fingerprint or face recognition to login | <%= "${clientName}" %>|`title`|
|Press the button below and follow your browser's steps to log in.|`description`|
|Awaiting device confirmation|`awaitingConfirmation`|
|Too many failed authentication attempts. Please try again later.|`too-many-webauthn-challenge-attempts-error`|
|<%= "${companyName}" %>|`logoAltText`|
|Continue|`continueButtonText`|
|Try another method|`pickAuthenticatorText`|
|Use password|`usePasswordText`|
|Remember this device for 30 days|`rememberMeText`|
|We could not start the device verification. Please try again later.|`webauthn-platform-challenge-error`|

## Screen: mfa-webauthn-roaming-challenge

<p style="text-align: center;">
  <img alt="mfa-webauthn-roaming-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-roaming-challenge" src="/media/articles/universal-login/text-customization/mfa-webauthn-roaming-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Use your security key to log in | <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|Make sure your Security Key is nearby. Once you continue, you will be prompted to use it.|`description`|
|Awaiting Security Key|`awaitingConfirmation`|
|Too many failed authentication attempts. Please try again later.|`too-many-webauthn-challenge-attempts-error`|
|<%= "${companyName}" %>|`logoAltText`|
|Use security key|`continueButtonText`|
|Try another method|`pickAuthenticatorText`|
|Remember this device for 30 days|`rememberMeText`|
|We could not start the security key verification. Please try again later.|`webauthn-challenge-error`|

## Screen: mfa-webauthn-change-key-nickname

<p style="text-align: center;">
  <img alt="mfa-webauthn-change-key-nickname reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-change-key-nickname" src="/media/articles/universal-login/text-customization/mfa-webauthn-change-key-nickname.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Name your security key | <%= "${clientName}" %>|`title`|
|If you own multiple keys, this alias will help you identify the right one.|`description`|
|<%= "${userName}" %>'s key|`nickname`|
|Security key name|`nicknamePlaceholder`|
|Name your device | <%= "${clientName}" %>|`titlePlatform`|
|If you own multiple devices, this alias will help you identify the right one.|`descriptionPlatform`|
|<%= "${userName}" %>'s <%= "${deviceName}" %>|`nicknamePlatform`|
|Device name|`nicknamePlaceholderPlatform`|
|Continue|`buttonText`|
|<%= "${companyName}" %>|`logoAltText`|
|We could not update your key's name. Please try again.|`webauthn-patch-nickname-error`|
|We could not update your Device's name. Please try again.|`webauthn-platform-patch-nickname-error`|
|Name is required|`no-nickname`|
|Name is too short|`nickname-too-short`|
|Name is too long|`nickname-too-long`|
|An error occurred while retrieving your information. Please try again.|`error-while-retrieving-authenticator`|
|An error occurred while trying to save the name . Please try again.|`error-while-patching`|

## Screen: mfa-webauthn-enrollment-success

<p style="text-align: center;">
  <img alt="mfa-webauthn-enrollment-success reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-enrollment-success" src="/media/articles/universal-login/text-customization/mfa-webauthn-enrollment-success.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Security key successful | <%= "${clientName}" %>|`title`|
|Device registration successful | <%= "${clientName}" %>|`titlePlatform`|
|You have successfully registered your Security Key.|`description`|
|You have successfully registered your device.|`descriptionPlatform`|
|Continue|`buttonText`|
|<%= "${companyName}" %>|`logoAltText`|

## Screen: mfa-webauthn-error

<p style="text-align: center;">
  <img alt="mfa-webauthn-error reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-error" src="/media/articles/universal-login/text-customization/mfa-webauthn-error.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Try again|`tryAgainLinkText`|
|Try another method|`pickAuthenticatorText`|
|Security key registration error | <%= "${clientName}" %>|`errorTitle`|
|Security Key Verification Failed|`errorTitleChallenge`|
|Device registration error | <%= "${clientName}" %>|`errorTitlePlatform`|
|Something Went Wrong|`errorTitlePlatformChallenge`|
|Something went wrong. Please try again or try using another method.|`description`|
|If you already registered this device, please try again. If not, try using another method.|`descriptionPlatform`|
|No Thanks|`refuseAddingAuthenticatorText`|
|Use password|`usePasswordText`|

## Screen: mfa-webauthn-not-available-error

<p style="text-align: center;">
  <img alt="mfa-webauthn-not-available-error reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-not-available-error" src="/media/articles/universal-login/text-customization/mfa-webauthn-not-available-error.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Security keys are not supported | <%= "${clientName}" %>|`pageTitle`|
|Security Keys Are Not Supported|`errorTitle`|
|We are sorry but your browser or device does not support Security Keys. Try using another browser or log in from another device.|`errorDescription`|
|Try another method|`pickAuthenticatorText`|
|Use password|`usePasswordText`|
