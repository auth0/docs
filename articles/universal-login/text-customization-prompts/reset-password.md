# Prompt: reset-password

## Screen: reset-password-request

<p style="text-align: center;">
  <img alt="reset-password-request reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="reset-password-request" src="/media/articles/universal-login/text-customization/reset-password-request.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Reset Password|`pageTitle`|
|Forgot Your Password?|`title`|
|Back to <%= "${clientName}" %>|`backToLoginLinkText`|
|Continue|`buttonText`|
|Enter your email address and we will send you instructions to reset your password.|`descriptionEmail`|
|Enter your username and we will send you instructions to reset your password.|`descriptionUsername`|
|Email address|`placeholderEmail`|
|Username|`placeholderUsername`|
|Email is not valid.|`invalid-email-format`|
|This ticket was expired.|`auth0-users-expired-ticket`|
|Something went wrong, please try again later.|`custom-script-error-code`|
|This ticket was already used.|`auth0-users-used-ticket`|
|Something went wrong, please try again later|`auth0-users-validation`|
|We had a problem sending the email, please try again later.|`reset-password-error`|
|You have exceeded the amount of emails. Wait a few minutes and try again.|`too-many-email`|
|You have exceeded the amount of emails. Wait a few minutes and try again.|`too-many-requests`|
|Please enter an email address|`no-email`|
|Username is required|`no-username`|

## Screen: reset-password-email

<p style="text-align: center;">
  <img alt="reset-password-email reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="reset-password-email" src="/media/articles/universal-login/text-customization/reset-password-email.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Reset Password|`pageTitle`|
|Check Your Email|`title`|
|Please check the email address <%= "${email}" %> for instructions to reset your password.|`emailDescription`|
|Resend email|`resendLinkText`|
|Didn't receive an email?|`resendText`|
|Please check the email address associated with the username <%= "${email}" %> for instructions to reset your password.|`usernameDescription`|

## Screen: reset-password

<p style="text-align: center;">
  <img alt="reset-password reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="reset-password" src="/media/articles/universal-login/text-customization/reset-password.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Reset Password|`pageTitle`|
|Change Your Password|`title`|
|Enter a new password below to change your password.|`description`|
|Reset password|`buttonText`|
|New password|`passwordPlaceholder`|
|Re-enter new password|`reEnterpasswordPlaceholder`|
|Your password must contain:|`passwordSecurityText`|
|This ticket was expired.|`auth0-users-expired-ticket`|
|Something went wrong, please try again later.|`custom-script-error-code`|
|This ticket was already used.|`auth0-users-used-ticket`|
|Something went wrong, please try again later|`auth0-users-validation`|
|New password confirmation is missing|`no-re-enter-password`|

## Screen: reset-password-success

<p style="text-align: center;">
  <img alt="reset-password-success reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="reset-password-success" src="/media/articles/universal-login/text-customization/reset-password-success.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Reset Password|`pageTitle`|
|Password Changed!|`eventTitle`|
|Your password has been changed successfully.|`description`|
|Back to <%= "${clientName}" %>|`buttonText`|

## Screen: reset-password-error

<p style="text-align: center;">
  <img alt="reset-password-error reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="reset-password-error" src="/media/articles/universal-login/text-customization/reset-password-error.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Reset Password|`pageTitle`|
|Back to <%= "${clientName}" %>|`backToLoginLinkText`|
|To reset your password, return to the login page and select "Forgot Your Password" to send a new email.|`descriptionExpired`|
|To reset your password, return to the login page and select "Forgot Your Password" to send a new email.|`descriptionGeneric`|
|This link has already been used. To reset your password, return to the login page and select "Forgot Your Password" to send a new email.|`descriptionUsed`|
|Link Expired|`eventTitleExpired`|
|Invalid Link|`eventTitleGeneric`|
|Invalid Link|`eventTitleUsed`|
|This ticket was expired.|`auth0-users-expired-ticket`|
|Something went wrong, please try again later.|`custom-script-error-code`|
|This ticket was already used.|`auth0-users-used-ticket`|
|Something went wrong, please try again later|`auth0-users-validation`|
|We had a problem sending the email, please try again later.|`reset-password-error`|
