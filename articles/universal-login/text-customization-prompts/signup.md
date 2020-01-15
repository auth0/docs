# Prompt: signup

## Screen: signup

<p style="text-align: center;">
  <img alt="signup reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="signup" src="/media/articles/universal-login/text-customization/signup.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Sign up to <%= "${clientName}" %>|`pageTitle`|
|Welcome|`title`|
|Sign Up to <%= "${companyName}" %> to continue to <%= "${clientName}" %>.|`description`|
|Or|`separatorText`|
|Continue|`buttonText`|
|Email address|`emailPlaceholder`|
|Continue with <%= "${connectionName}" %>|`federatedConnectionButtonText`|
|Log in|`footerLinkText`|
|Already have an account?|`footerText`|
|Password|`passwordPlaceholder`|
|Your password must contain:|`passwordSecurityText`|
|Username|`usernamePlaceholder`|
|The user already exists.|`email-in-use`|
|Email is not valid.|`invalid-email-format`|
|The password is too weak|`password-too-weak`|
|The password is too common|`password-too-common`|
|Password has previously been used|`password-previously-used`|
|Passwords don't match|`password-mismatch`|
|Username can only contain alphanumeric characters or: '<%= "${characters}" %>'. Username should have between <%= "${min}" %> and <%= "${max}" %> characters.|`invalid-username`|
|The username must not be longer than <%= "${max}" %> characters.|`invalid-username-max-length`|
|The username must have at least <%= "${min}" %> characters.|`invalid-username-min-length`|
|The username has invalid characters.|`invalid-username-invalid-characters`|
|The username cannot be an email.|`invalid-username-email-not-allowed`|
|The username provided is in use already.|`username-taken`|
|Something went wrong, please try again later.|`custom-script-error-code`|
|Something went wrong, please try again later|`auth0-users-validation`|
|Invalid connection|`invalid-connection`|
|We have detected suspicious login behavior and further attempts will be blocked. Please contact the administrator.|`ip-blocked`|
|Too many signups from the same IP|`ip-signup-blocked`|
|Invalid connection|`no-db-connection`|
|Please enter an email address|`no-email`|
|Password is required|`no-password`|
|New password confirmation is missing|`no-re-enter-password`|
|Username is required|`no-username`|
