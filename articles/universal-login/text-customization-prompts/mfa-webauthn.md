# Prompt: mfa-webauthn

## Screen: mfa-webauthn-enrollment

<p style="text-align: center;">
  <img alt="mfa-webauthn-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-enrollment" src="/media/articles/universal-login/text-customization/mfa-webauthn-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Waiting for your Security Key|`title`|
|Follow your browser's steps to register your Security Key.|`description`|
|Awaiting Security Key|`awaitingConfirmation`|
|Waiting for your Device|`titlePlatform`|
|Follow your browser's steps to register your device's fingerprint or face recognition.|`descriptionPlatform`|
|Awaiting device confirmation|`awaitingConfirmationPlatform`|
|<%= "${companyName}" %>|`logoAltText`|
|We could not start the security key enrollment. Please try again later.|`webauthn-associate-error`|
|We could not start the device enrollment. Please try again later.|`webauthn-platform-associate-error`|

## Screen: mfa-webauthn-guidance-enrollment

<p style="text-align: center;">
  <img alt="mfa-webauthn-guidance-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-guidance-enrollment" src="/media/articles/universal-login/text-customization/mfa-webauthn-guidance-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Continue|`continueButtonText`|
|Connect your Security Key and continue.|`instructions1`|
|Follow the steps on the browser.|`instructions2`|
|Name your Security Key to easily identify it later.|`instructions3`|
|Adding your Security Key|`title`|
|Security Keys can be used as an additional authentication factor.|`description`|
|Try another method|`pickAuthenticatorText`|
|<%= "${companyName}" %>|`logoAltText`|

## Screen: mfa-webauthn-guidance-challenge

<p style="text-align: center;">
  <img alt="mfa-webauthn-guidance-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-guidance-challenge" src="/media/articles/universal-login/text-customization/mfa-webauthn-guidance-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Verify Your Identity|`pageTitle`|
|Verify Your Identity|`title`|
|Make sure your Security Key is nearby. Once you continue, you will be prompted to use it.|`description`|
|Continue|`continueButtonText`|
|Remember this device for 30 days|`rememberMeText`|
|Try another method|`pickAuthenticatorText`|
|<%= "${companyName}" %>|`logoAltText`|

## Screen: mfa-webauthn-challenge

<p style="text-align: center;">
  <img alt="mfa-webauthn-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-challenge" src="/media/articles/universal-login/text-customization/mfa-webauthn-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Waiting for your Security Key|`title`|
|Follow your browser's steps to register your Security Key.|`description`|
|Awaiting Security Key|`awaitingConfirmation`|
|Waiting for your Device|`titlePlatform`|
|Follow your browser's steps to verify your device's fingerprint or face recognition.|`descriptionPlatform`|
|Awaiting device confirmation|`awaitingConfirmationPlatform`|
|Too many failed authentication attempts. Please try again later.|`too-many-webauthn-challenge-attempts-error`|
|<%= "${companyName}" %>|`logoAltText`|
|We could not start the security key verification. Please try again later.|`webauthn-challenge-error`|
|We could not start the device verification. Please try again later.|`webauthn-platform-challenge-error`|

## Screen: mfa-webauthn-change-key-nickname

<p style="text-align: center;">
  <img alt="mfa-webauthn-change-key-nickname reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-change-key-nickname" src="/media/articles/universal-login/text-customization/mfa-webauthn-change-key-nickname.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Name Your Security Key|`title`|
|If you own multiple keys, this alias will help you identify the right one.|`description`|
|<%= "${userName}" %>'s key|`nickname`|
|Security key name|`nicknamePlaceholder`|
|Name Your Device|`titlePlatform`|
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
|Security Key added!|`title`|
|Device Added!|`titlePlatform`|
|You have successfully enrolled your Security Key.|`description`|
|You have successfully enrolled your device.|`descriptionPlatform`|
|Continue|`buttonText`|
|<%= "${companyName}" %>|`logoAltText`|

## Screen: mfa-webauthn-login-faster

<p style="text-align: center;">
  <img alt="mfa-webauthn-login-faster reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-login-faster" src="/media/articles/universal-login/text-customization/mfa-webauthn-login-faster.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log In Faster On This Device|`title`|
|Trust this device? You can quickly and securely log in the next time using this device’s fingerprint or face recognition.|`description`|
|Add this device now|`addThisDeviceButtonText`|
|No Thanks|`refuseAddingDeviceText`|
|<%= "${companyName}" %>|`logoAltText`|

## Screen: mfa-webauthn-error

<p style="text-align: center;">
  <img alt="mfa-webauthn-error reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-error" src="/media/articles/universal-login/text-customization/mfa-webauthn-error.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Try again|`tryAgainLinkText`|
|Try another method|`pickAuthenticatorText`|
|Security Key Verification Failed|`errorTitle`|
|Device Key Verification Failed|`errorTitlePlatform`|

## Screen: mfa-webauthn-not-available-error

<p style="text-align: center;">
  <img alt="mfa-webauthn-not-available-error reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-webauthn-not-available-error" src="/media/articles/universal-login/text-customization/mfa-webauthn-not-available-error.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Security Keys Are Not Supported|`errorTitle`|
|We are sorry but your browser or device does not support Security Keys. Try using another browser or log in from another device.|`errorDescription`|
|Try another method|`pickAuthenticatorText`|
