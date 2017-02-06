---
section: libraries
description: Types of error messages with Lock for Android
---

# Android Lock: Error Messages

You may encounter one or more of the following messages when signing up:

* user_exists: the user you are attempting to sign up has already signed up.
* username_exists: the username you are attempting to sign up with is already in use.
* unauthorized: you may not sign up for this application;
* invalid_password: if the password used doesn't comply with the password policy for the connection.
* password_leaked: if the password has been leaked and a different one needs to be used.

In the case of a failed log in, the errors can be:
* user is blocked: the user you are attempting to sign up with is blocked.
* too_many_attempts: too many attempts to sign in have been made and the account was blocked.
* a0.mfa_required: if an MFA code must be sent along with the login details.
* a0.mfa_registration_required: if the user is required to enroll MFA first.
* a0.mfa_invalid_code: if the code sent along with the login details is wrong or expired.


If your callback receives an `AuthenticationException` you can check [source](https://github.com/auth0/Auth0.Android/blob/master/auth0/src/main/java/com/auth0/android/authentication/AuthenticationException.java) to learn how to identify each error scenario.
