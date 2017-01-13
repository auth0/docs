---
description: Customize SMS Messages
---

# Customize SMS Messages

To customize the content of the messages sent by Auth0 during enrollment (when associating a device to Guardian) or verification (when an authentication messages is sent to the device), do the following.

First, go to ([Multifactor Auth With Guardian](${manage_url}/#/guardian), then click on the **SMS** box to configure your SMS settings.

![](/media/articles/mfa/sms-config.png)

You have two fields to customize your messages:
* **Enrollment Template**: the message sent by Auth0 during device enrollment.
* **Verification Template**: the message sent by Auth0 to verify the possession of the device.

[Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax is the supported templating engine to use when accessing user attributes in SMS templates. The following attributes are available: 
* `code`: The Enrollment/Verification code. 
* `requestInfo.lang`: The browser language (ie, `es-AR,es;q=0.8`, `en-US,en`, etc.).
* `tenant.friendlyName`: The **Friendly Name** set in [Account Settings](${manage_url}/#/account).
