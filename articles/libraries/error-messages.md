# API Authentication-Related Errors Using Auth0 Libraries

If you are using any of the Auth0-provided libraries, your users may trigger one or more of the following API authentication-related error messages when they either sign up or log in. While this is not an exhaustive list of all possible errors, these are the ones that may be easily handled by the end users themselves.

* **mfa_required**: the user must provide the multifactor authentication (MFA) code to authenticate;
* **mfa_registration_required**: the administrator has required multifactor authentication (MFA), but the user has not enrolled;
* **mfa_invalid_code**: the multifactor authentication (MFA) code provided by the user is invalid/expired;
* **PasswordStrengthError**: the password provided for sign up does not match the connection's strength requirements;
* **PasswordHistoryError**: the password provided for sign up/update has already been used (reported when password history feature is enabled);
* **unauthorized**: the user's action violates an Auth0 rule; the message provided by the rule may be located in the 'description' field;
* **invalid_user_password**: the username and/or password used for authentication are invalid;
* **access_denied**: when using web-based authentication, the resource server denies access per OAuth2 specifications.
