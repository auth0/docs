# Prompt: login

## Screen: login

<p style="text-align: center;">
  <img alt="login reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="login" src="/media/articles/universal-login/text-customization/login.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Log in to <%= "${clientName}" %>|`pageTitle`|
|Welcome|`title`|
|Log in to <%= "${companyName}" %> to continue to <%= "${clientName}" %>.|`description`|
|Or|`separatorText`|
|Continue|`buttonText`|
|Continue with <%= "${connectionName}" %>|`federatedConnectionButtonText`|
|Sign up|`footerLinkText`|
|Don't have an account?|`footerText`|
|Forgot password?|`forgotPasswordText`|
|Password|`passwordPlaceholder`|
|Username or email address|`usernamePlaceholder`|
|Enter the code shown above|`captchaCodePlaceholder`|
|Solve the challenge shown above|`captchaMatchExprPlaceholder`|
|Email address|`emailPlaceholder`|
|Alerts|`alertListTitle`|
|Wrong username or password|`wrong-credentials`|
|Please solve the challenge to continue|`wrong-captcha`|
|The code you entered is invalid|`invalid-code`|
|Invalid or expired user code|`invalid-expired-code`|
|Email is not valid.|`invalid-email-format`|
|Wrong email or password|`wrong-email-credentials`|
|Something went wrong, please try again later.|`custom-script-error-code`|
|Something went wrong, please try again later|`auth0-users-validation`|
|We are sorry, something went wrong when attempting to login|`authentication-failure`|
|Invalid connection|`invalid-connection`|
|We have detected suspicious login behavior and further attempts will be blocked. Please contact the administrator.|`ip-blocked`|
|Invalid connection|`no-db-connection`|
|We have detected a potential security issue with this account. To protect your account, we have prevented this login. Please reset your password to proceed.|`password-breached`|
|Your account has been blocked after multiple consecutive login attempts.|`user-blocked`|
|Too many login attempts for this user. Please wait, and try again later.|`same-user-login`|
|Please enter an email address|`no-email`|
|Password is required|`no-password`|
|Username is required|`no-username`|
