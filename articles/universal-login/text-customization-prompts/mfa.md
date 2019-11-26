# Prompt: mfa

## Screen: mfa-enroll-result

<p style="text-align: center;">
  <img alt="mfa-enroll-result reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="mfa-enroll-result" src="/media/articles/universal-login/text-customization/mfa-enroll-result.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Secure your Account|`pageTitle`|
|You're All Set!|`enrolledTitle`|
|You have successfully added a new authentication factor.|`enrolledDescription`|
|Invalid Link|`invalidTicketTitle`|
|This link is invalid or expired.|`invalidTicketDescription`|
|Expired Link|`expiredTicketTitle`|
|This link is expired.|`expiredTicketDescription`|
|Already used|`alreadyUsedTitle`|
|This link has already been used. Please get a new link to enroll with Multi-factor Authentication.|`alreadyUsedDescription`|
|Factor Already Exists|`alreadyEnrolledTitle`|
|Two-factor verification has already been enabled.|`alreadyEnrolledDescription`|

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
