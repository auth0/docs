---
title: Multifactor Authentication in Auth0
url: /multifactor-authentication
---

# Multifactor Authentication in Auth0

Multifactor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user knows (e.g. a password)
* **Possession**: Something the user has (e.g. a cell phone)
* **Inheritance**: Something the user is (e.g. a fingerprint or retina scan)

## Implementing MFA with Auth0

Auth0 supports the following methods of implementing MFA:

1. Using Auth0's built-in support for one-time password authentication services Google Authenticator and Duo Security.
2. Configuring rules for custom processes, such as Contextual MFA, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.
3. Integration with a custom provider, such as **Yubikey**.

### MFA Using Auth0 Built-In MFA Support

Auth0 provides built-in support for the following one-time password authentication services:

* Google Authenticator;
* Duo Security.

You may enable these options via the Auth0 Management Dashboard. To navigate to the appropriate configuration page, navigate to the Multifactor Auth page. You will see the following message, along with the link to the appropriate page:

> Auth0 also supports plugging in other multifactor providers. If you already have your own provider, click here to use a different provider.

#### MFA Using Google Authenticator

Google Authenticator allows you to request six- to eight-digit one-time use password as the second factor after your user has attempted to log in with their Google credentials.

You will find further instructions on enabling this feature [here](/multifactor-authentication/google-authenticator).

#### MFA Using Duo Security

Duo Security allows you to request either of the following as your second factor once the user has provided their initial login credentials:

* A user response to a push notification sent to the appropriate device;
* A passcode provided to the user via SMS.

You will find further instructions on enabling this feature [here](/multifactor-authentication/duo-security).

### MFA Using Custom Rules

You may configure [rules](/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.

You will find [sample code snippets](/multifactor-authentication/custom) to assist you in building your rules here.

### MFA Using Custom Providers

For a detailed look at implementing MFA with **YubiKey**, see [Multifactor Authentication with YubiKey-NEO](/multifactor-authentication/yubikey).
