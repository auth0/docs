# Prompt: login-email-verification

## Screen: login-email-verification

<p style="text-align: center;">
  <img alt="login-email-verification reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="login-email-verification" src="/media/articles/universal-login/text-customization/login-email-verification.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Enter your email code to log in | <%= "${clientName}" %>|`pageTitle`|
|Continue|`buttonText`|
|We've sent an email with your code to <%= "${email}" %>|`description`|
|Enter the code|`placeholder`|
|Resend|`resendActionText`|
|Didn't receive an email?|`resendText`|
|Verify Your Email|`title`|
|<%= "${companyName}" %>|`logoAltText`|
|OTP Code must have 6 numeric characters|`invalid-otp-code-format`|
|The code you entered is invalid|`invalid-code`|
|Invalid or expired user code|`invalid-expired-code`|
|We couldn't verify the code. Please try again later.|`authenticator-error`|
|You have exceeded the amount of emails. Wait a few minutes and try again.|`too-many-email`|
