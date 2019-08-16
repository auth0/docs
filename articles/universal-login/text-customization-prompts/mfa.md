# Prompt: mfa

## Screen: mfa-enroll-result

<p style="text-align: center;">
  <img alt="mfa-enroll-result reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-enroll-result" src="/media/articles/universal-login/text-customization/mfa-enroll-result.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Secure your Account|`pageTitle`|
|Enrolled|`enrolledTitle`|
|You are now enrolled in Multifactor Authentication|`enrolledDescription`|
|Invalid Link|`invalidTicketTitle`|
|The link is invalid or has expired.|`invalidTicketDescription`|
|Expired Link|`expiredTicketTitle`|
|The link has expired.|`expiredTicketDescription`|
|Already used|`alreadyUsedTitle`|
|This link has already been used. Please get a new link to enroll MFA.|`alreadyUsedDescription`|
|Already enrolled|`alreadyEnrolledTitle`|
|You are already enrolled in Multifactor Authentication. You will need to reset your MFA before being able to re-enroll.|`alreadyEnrolledDescription`|

## Screen: mfa-login-options

<p style="text-align: center;">
  <img alt="mfa-login-options reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-login-options" src="/media/articles/universal-login/text-customization/mfa-login-options.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Go back|`backText`|
|Other Methods|`title`|
|SMS|``authenticatorNames.sms``|
|Notification via <%= "${appName}" %> app|``authenticatorNames.push-notification``|
|Google Authenticator or similar|``authenticatorNames.otp``|
|Email|``authenticatorNames.email``|
|Recovery code|``authenticatorNames.recovery-code``|
|Notification via DUO app|``authenticatorNames.duo``|
