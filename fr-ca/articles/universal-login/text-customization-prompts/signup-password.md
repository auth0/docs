# Prompt: signup-password

## Screen: signup-password

<p style="text-align: center;">
  <img alt="signup-password reference screenshot" class="ul-prompt-screenshot" data-ul-prompt="signup-password" src="/media/articles/universal-login/text-customization/signup-password.png" style="width: 400px;"/>
</p>

|Text|Key|
|----------|----------|
|Create a password to sign up | <%= "${clientName}" %>|`pageTitle`|
|Create Your Account|`title`|
|Set your password for <%= "${companyName}" %> to continue to <%= "${clientName}" %>|`description`|
|Or|`separatorText`|
|Continue|`buttonText`|
|Email address|`emailPlaceholder`|
|Edit|`editEmailText`|
|Edit email address|`editLinkScreenReadableText`|
|Continue with <%= "${connectionName}" %>|`federatedConnectionButtonText`|
|Log in|`loginActionLinkText`|
|Already have an account?|`loginActionText`|
|Password|`passwordPlaceholder`|
|Your password must contain:|`passwordSecurityText`|
|Username|`usernamePlaceholder`|
|Accept your invitation to sign up | <%= "${clientName}" %>|`invitationTitle`|
|Sign Up to accept <%= "${inviterName}" %>'s invitation to join <%= "${companyName}" %> on <%= "${clientName}" %>.|`invitationDescription`|
|<%= "${companyName}" %>|`logoAltText`|
|Show password|`showPasswordText`|
|Hide password|`hidePasswordText`|
|The user already exists.|`email-in-use`|
|Email is not valid.|`invalid-email-format`|
|The password is too weak|`password-too-weak`|
|The password is too weak|`password-policy-not-conformant`|
|The password is too common|`password-too-common`|
|Password has previously been used|`password-previously-used`|
|Passwords don't match|`password-mismatch`|
|Password contains user information|`password-contains-user-information`|
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
|This combination of credentials was detected in a public data breach on another website. Before your account is created, please use a different password to keep it secure.|`password-breached`|
