---
title: Auth0 Multifactor Authentication
url: /multifactor-authentication
---

# Multifactor Authentication

Multifactor Authentication (MFA) is a method of verifying a user's identity by requiring them to present more than one piece of identifying information. This method provides an additional layer of security, decreasing the likelihood of unauthorized access. The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user knows (e.g. a password)
* **Possession**: Something the user has (e.g. a cell phone)
* **Inheritance**: Something the user is (e.g. a fingerprint or retina scan)

![](/media/articles/mfa/duo.gif)

## Implementing MFA with Auth0

Auth0 supports the following methods of implementing MFA:

1. Using Guardian, Auth0's MFA application;
2. Using Auth0's built-in support for one-time password authentication services Google Authenticator and Duo Security.
3. Configuring rules for custom processes, such as Contextual MFA, which allow you to define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.
4. Integration with a custom provider, such as **Yubikey**.
