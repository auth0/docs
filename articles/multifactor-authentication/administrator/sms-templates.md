---
description: Customize SMS Messages
---

# Customize SMS Messages

If you need to change the content of the messages that are sent by Auth0 when you enroll (when you associate a phone number with guardian) or verify (when you proof that have that device).

First, go to ([Multifactor Auth With Guardian](${manage_url}/#/guardian), then click on the **SMS** box to configure your SMS settings.

![](/media/articles/mfa/sms-config.png)

You have two text area to customize your messages:
* Enrollment Template: this message is sent by Auth0 to associate a user with a phone number. 
* Verification Template: this message is sent by Auth0 to verify the possesion of the phone. 
 
[Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax is the currently supported templating syntax to use when accessing user attributes in your SMS templates. Here are the attributes available to you:
* `code`: The Enrollment/Verification code. 
* `requestInfo.lang`: The browser language.
* `tenant.friendlyName`: Your **Friendly Name** setted in [Account Settings](${manage_url}/#/account), scrolling down to _Settings_.
