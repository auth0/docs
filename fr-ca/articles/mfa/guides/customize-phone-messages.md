---
description: Customize SMS or Voice Messages
topics:
  - mfa
  - guardian
  - sms
contentType:
  - how-to
useCase:
  - customize-mfa
---
# Customize SMS or Voice Messages

To customize the SMS or Voice messages sent by Auth0 during enrollment or verification, do the following:

First, go to the [Multi-factor Auth page](${manage_url}/#/mfa), then click on the **Phone** box to configure your Phone Messaging settings.

![MFA Phone Settings](/media/articles/mfa/mfa-phone-templates.png)

You have two fields to customize your messages:

* **Enrollment Template**: the message sent by Auth0 during enrollment.
* **Verification Template**: the message sent by Auth0 during authentication.

[Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) syntax is the supported templating engine to use when accessing user attributes in SMS templates. The following attributes are available:

* `message_type`: Can be "sms" or "voice", and can be used to indicate which kind of message is being sent.
* `code`: The Enrollment/Verification code. When sending voice messages, this variable will have the value with dots between the digits (e.g. ‘1.2.3.4.5.6’), so it can be pronounced as independent digits by voice messaging providers.
* `locale`: When using the New Universal Login experience or the MFA API, it will have the the [language selected for the login flow](/universal-login/i18n). 
* `requestInfo.lang`: The browser Accept-Language header (ie, `es-AR,es;q=0.8`,`en-US,en`, and so on.). It can be used for localization when using the Classic Login Experience.
* `tenant.friendlyName`: The **Friendly Name** set in [Tenant Settings](${manage_url}/#/tenant).
* `pause`: A special variable that can be used when you want to make a pause during a voice message.

## Examples

```
{% if message_type == "voice" %}
  {% if locale contains "fr" %}
  Bonjour, vous avez demandé à recevoir un code de vérification pour vous enregister avec {{tenant.friendly_name}}. Votre code est: {{pause}} {{code}}. Je répète, votre code est: {{pause}}{{code}}.
  {% elsif locale contains "es" %}
  Usted ha requerido un código de verificación para inscribirse con {{tenant.friendly_name}}. Su código es: {{pause}}{{code}}. Repito, su código es: {{pause}}{{code}}.
  {% else %}
  Hello, you requested a verification code to enroll with {{tenant.friendly_name}}. Your code is: {{pause}}{{code}}. I repeat, your code is: {{pause}}{{code}}.
  {% endif %}
{% else %}
  {% if locale contains "fr" %}
  {{code}} est votre code de vérification pour vous enregistrer avec {{tenant.friendly_name}}.
  {% elsif locale contains "es" %}
  {{code}} es su código para inscribirse con {{tenant.friendly_name}}.
  {% else %}
  {{code}} is your verification code to enroll with {{tenant.friendly_name}}.
  {% endif %}
{% endif %}
```
