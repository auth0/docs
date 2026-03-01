# Prompt: email-otp-challenge

## Screen: email-otp-challenge

<p style="text-align: center;">
  <img alt="email-otp-challenge reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="email-otp-challenge" src="/media/articles/universal-login/text-customization/email-otp-challenge.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Enter your email code to log in | <%= "${clientName}" %>|`pageTitle`|
|Continue|`buttonText`|
|We've sent an email with your code to <%= "${email}" %>|`description`|
|Enter the code|`placeholder`|
|Resend|`resendActionText`|
|Didn't receive an email?|`resendText`|
|Verify Your Identity|`title`|
|<%= "${companyName}" %>|`logoAltText`|
|OTP Code must have 6 numeric characters|`invalid-otp-code-format`|
|The code you entered is invalid|`invalid-code`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|You have exceeded the amount of emails. Wait a few minutes and try again.|`too-many-email`|
