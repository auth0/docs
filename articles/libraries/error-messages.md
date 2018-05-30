---
section: libraries
description: Common errors that you might get when you authenticate users using Auth0 libraries
tags:
  - libraries
  - lock
  - auth0js
  - error-messages
---
# Common Authentication Errors

The actions or input data of your users, during the sign up or the log in processes, might trigger errors. This article lists the most common errors that you might get, if you use any of the Auth0 libraries for authentication.

## Sign up

In the case of a failed signup, the most common errors are:

| **Error** | **Description** |
|-|-|
| **user_exists** | The user you are attempting to sign up has already signed up |
| **username_exists** | The username you are attempting to sign up with is already in use |
| **unauthorized** | If you cannot sign up for this application. May have to do with the violation of a specific rule |
| **invalid_password** | If the password used doesn't comply with the password policy for the connection |
| **password_dictionary_error** | The chosen password is too common |
| **password_no_user_info_error** | The chosen password is based on user information |
| **password_strength_error** | The chosen [password is too weak](/connections/database/password-strength) |

## Log in

In the case of a failed login, the most common errors are:

| **Error** | **Description** |
|-|-|
| **unauthorized** | The user you are attempting to sign in with is blocked |
| **too_many_attempts** | The account is blocked due to too many attempts to sign in |
| **password_leaked** | If the password has been leaked and a different one needs to be used |
| **mfa_required** | The user must provide the [multifactor authentication](/multifactor-authentication) code to authenticate |
| **mfa_registration_required** | The administrator has required [multifactor authentication](/multifactor-authentication), but the user has not enrolled |
| **mfa_invalid_code** | The [multifactor authentication](/multifactor-authentication) code provided by the user is invalid/expired |
| **PasswordStrengthError** | The password provided does not match the connection's [strength requirements](/connections/database/password-strength) |
| **PasswordHistoryError** | The password provided for sign up/update has already been used (reported when [password history](/connections/database/password-options#password-history) feature is enabled) |
| **invalid_user_password** | The username and/or password used for authentication are invalid |
| **access_denied** | When using web-based authentication, the resource server denies access per OAuth2 specifications |
