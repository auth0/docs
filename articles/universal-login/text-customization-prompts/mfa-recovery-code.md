# Prompt: mfa-recovery-code

## Screen: mfa-recovery-code-enrollment

<p style="text-align: center;">
  <img alt="mfa-recovery-code-enrollment reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-recovery-code-enrollment" src="/media/articles/universal-login/text-customization/mfa-recovery-code-enrollment.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Sign up to <%= "${clientName}" %>|`pageTitle`|
|Almost There!|`title`|
|Copy this recovery code and keep it somewhere safe. You’ll need it if you ever need to log in without your device.|`description`|
|Continue|`buttonText`|
|I have safely recorded this number|`checkboxText`|
|Copy code|`copyCodeButtonText`|
|Please confirm you have recorded the code|`no-confirmation`|

## Screen: mfa-recovery-code-challenge

<p style="text-align: center;">
  <img alt="mfa-recovery-code-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-recovery-code-challenge" src="/media/articles/universal-login/text-customization/mfa-recovery-code-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Verify Your Identity|`title`|
|Enter the recovery code you were provided during your initial enrollment.|`description`|
|Continue|`buttonText`|
|Try another method|`pickAuthenticatorText`|
|Enter your recovery code|`placeholder`|
|The code you entered is invalid|`invalid-code`|
|Recovery code must have 24 alphanumeric characters|`invalid-code-format`|
|Invalid or expired user code|`invalid-expired-code`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|Please confirm you have recorded the code|`no-confirmation`|
|Too many failed codes. Wait for some minutes before retrying.|`too-many-failures`|
|Your enrollment transaction expired, you will need to start again.|`transaction-not-found`|
