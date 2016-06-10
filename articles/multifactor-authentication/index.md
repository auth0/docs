---
title: Multifactor Authentication in Auth0
url: /multifactor-authentication
description: Auth0 supports three methods of implementing MFA: built-in support for Google Authenticator and Duo Security, custom processes such as Contextual MFA, and integration with a custom provider.
---

# Multifactor Authentication in Auth0

Multifactor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This provides an additional layer of security, decreasing the likelihood of unauthorized access. 

The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user knows (e.g. a password)
* **Possession**: Something the user has (e.g. a cell phone)
* **Inheritance**: Something the user is (e.g. a fingerprint or retina scan)

::: panel-info MFA and Resource Owner
Multifactor auth does not apply if you use either the Resource Owner or Access Token endpoints. For information on enabling MFA on the Resource Owner endpoint see: [MFA on a Resource Owner endpoint](/multifactor-authentication/ro).
:::

## Implementing MFA with Auth0

Auth0 supports the following methods of implementing MFA:

1. Using Auth0's built-in support for one-time password authentication services Google Authenticator and Duo Security.
2. Configuring rules for custom processes, such as Contextual MFA, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.
3. Integration with a custom provider, such as **Yubikey**.

### MFA Using Auth0 Built-In MFA Support

Auth0 provides built-in support for the following one-time password authentication services:

* Google Authenticator
* Duo Security

You may enable these options in the [Multifactor Auth](${uiURL}/#/multifactor) section of the Auth0 Dashboard.

#### MFA Using Google Authenticator

Google Authenticator allows you to request a 6- to 8-digit one-time use password as a second authentication factor after a user has logged in with their Google credentials.

For instructions on enabling this feature, see:  [Configuring MFA Using Google Authenticator](/multifactor-authentication/google-authenticator).

#### MFA Using Duo Security

Duo Security allows you to request either of the following as your second factor after a user has provided their initial login credentials:

* A user response to a push notification sent to the appropriate device
* A passcode provided to the user via SMS

For instructions on enabling this feature, see: [Configuring MFA Using Duo Security](/multifactor-authentication/duo-security).

### MFA Using Custom Rules

You may configure [rules](/rules) for custom MFA processes, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.

For instructions on enabling this feature, see:  [Configuring Custom MFA](/multifactor-authentication/custom).

### MFA Using Custom Providers

For a detailed look at implementing MFA with **YubiKey**, see [Multifactor Authentication with YubiKey-NEO](/multifactor-authentication/yubikey).
