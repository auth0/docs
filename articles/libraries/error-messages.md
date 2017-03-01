---
description:  API authentication-related errors using Auth0 libraries
---

# API Authentication-Related Errors Using Auth0 Libraries

If you are using any of the Auth0-provided libraries, your users may trigger one or more of the following API authentication-related error messages when they either sign up or log in. While this is not an exhaustive list of all possible errors, these are the ones that may be easily handled by the end users themselves.

You may encounter one or more of the following messages when signing up:

* **user_exists**: the user you are attempting to sign up has already signed up.
* **username_exists**: the username you are attempting to sign up with is already in use.
* **unauthorized**: if you may not sign up for this application. May have to do with the violation of a specific rule.
* **invalid_password**: if the password used doesn't comply with the password policy for the connection.
* **password_leaked**: if the password has been leaked and a different one needs to be used.

In the case of a failed login, the errors can be one of the following:

* **user is blocked**: the user you are attempting to sign up with is blocked.
* **too_many_attempts**: too many attempts to sign in have been made and the account was blocked.
* **mfa_required**: the user must provide the multifactor authentication (MFA) code to authenticate;
* **mfa_registration_required**: the administrator has required multifactor authentication (MFA), but the user has not enrolled;
* **mfa_invalid_code**: the multifactor authentication (MFA) code provided by the user is invalid/expired;
* **PasswordStrengthError**: the password provided for sign up does not match the connection's strength requirements;
* **PasswordHistoryError**: the password provided for sign up/update has already been used (reported when password history feature is enabled);
* **invalid_user_password**: the username and/or password used for authentication are invalid;
* **access_denied**: when using web-based authentication, the resource server denies access per OAuth2 specifications.
