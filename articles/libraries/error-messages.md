# API Authentication-Related Errors Using Auth0 Libraries

When users sign up or log in via Lock, they may trigger one or more of the following API authentication-related error messages. While this is not an exhaustive list of errors the users may trigger, these are errors that may be easily handled by the end users themselves.

* **mfa_required**: the user must provide the MFA code to authenticate
* **mfa_registration_required**: the administrator has required MFA, but the user has not enrolled
* **mfa_invalid_code**: the MFA code provided by the user is invalid/expired
* **PasswordStrengthError**: the password provided for sign up does not match the connection's strength requirements
* **PasswordHistoryError**: the password provided for sign up has already been used (reported when password history feature is enabled)
* **unauthorized**: the user's action violates an Auth0 rule; the message provided by the rule may be located in the 'description'
* **invalid_user_password**: the username and/or password used for authentication are invalid
* **access_denied**: when using web-based authentication, the resource server denies access per OAuth2 specifications
