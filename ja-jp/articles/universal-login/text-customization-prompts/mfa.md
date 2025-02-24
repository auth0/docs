# Prompt: mfa

## Screen: mfa-detect-browser-capabilities

<p style="text-align: center;">
  <img alt="mfa-detect-browser-capabilities reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-detect-browser-capabilities" src="/media/articles/universal-login/text-customization/mfa-detect-browser-capabilities.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Try another method|`pickAuthenticatorText`|
|Reload|`reloadButtonText`|
|JavaScript Required|`noJSErrorTitle`|
|Your browser does not have JavaScript enabled. Please enable and press the Reload page button.|`noJSErrorDescription`|

## Screen: mfa-enroll-result

<p style="text-align: center;">
  <img alt="mfa-enroll-result reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-enroll-result" src="/media/articles/universal-login/text-customization/mfa-enroll-result.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|MFA enrollment status|`pageTitle`|
|You're All Set!|`enrolledTitle`|
|You have successfully added a new authentication factor.|`enrolledDescription`|
|Invalid Link|`invalidTicketTitle`|
|This link is invalid or expired.|`invalidTicketDescription`|
|Expired Link|`expiredTicketTitle`|
|This link is expired.|`expiredTicketDescription`|
|Already used|`alreadyUsedTitle`|
|This link has already been used. Please get a new link to enroll with Multi-factor Authentication.|`alreadyUsedDescription`|
|Two-factor Verification has Already Been Enabled.|`alreadyEnrolledDescription`|
|Something Went Wrong|`genericError`|

## Screen: mfa-login-options

<p style="text-align: center;">
  <img alt="mfa-login-options reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-login-options" src="/media/articles/universal-login/text-customization/mfa-login-options.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|List of other login methods | <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Other Methods|`title`|
|SMS|`authenticatorNamesSMS`|
|Phone|`authenticatorNamesVoice`|
|Phone|`authenticatorNamesPhone`|
|Notification via <%= "${appName}" %> app|`authenticatorNamesPushNotification`|
|Google Authenticator or similar|`authenticatorNamesOTP`|
|Email|`authenticatorNamesEmail`|
|Recovery code|`authenticatorNamesRecoveryCode`|
|Notification via DUO app|`authenticatorNamesDUO`|
|Security Key|`authenticatorNamesWebauthnRoaming`|
|Fingerprint or Face Recognition|`authenticatorNamesWebauthnPlatform`|

## Screen: mfa-begin-enroll-options

<p style="text-align: center;">
  <img alt="mfa-begin-enroll-options reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-begin-enroll-options" src="/media/articles/universal-login/text-customization/mfa-begin-enroll-options.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Add another authentication method | <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Keep Your Account Safe|`title`|
|Add another authentication method.|`description`|
|<%= "${companyName}" %>|`logoAltText`|
|SMS|`authenticatorNamesSMS`|
|Phone|`authenticatorNamesVoice`|
|Phone|`authenticatorNamesPhone`|
|Notification via <%= "${appName}" %> app|`authenticatorNamesPushNotification`|
|Google Authenticator or similar|`authenticatorNamesOTP`|
|Email|`authenticatorNamesEmail`|
|Recovery code|`authenticatorNamesRecoveryCode`|
|Notification via DUO app|`authenticatorNamesDUO`|
|Security Key|`authenticatorNamesWebauthnRoaming`|
|Fingerprint or Face Recognition|`authenticatorNamesWebauthnPlatform`|
