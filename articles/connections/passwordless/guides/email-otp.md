---
title: Passwordless Authentication with Email
description: Passwordless Authentication with Email
toc: true
topics:
    - connections
    - passwordless
    - authentication
---
# Passwordless Authentication with Email

You may configure Auth0 to send users one-time codes using:

* [Mandrill](/email/providers#configure-mandrill)
* [AWS](/email/providers#configure-amazon-ses)
* [Twilio SendGrid](/email/providers#configure-sendgrid)
* [SparkPost](/email/providers#configure-sparkpost)
* [your own custom SMTP email provider](/email/providers#configure-a-custom-smtp-server)

::: note
To use a custom SMTP email provider, the SMTP server must:
    * support LOGIN authentication
    * support TLS 1.0 or higher
    * use a certificate signed by a public certificate authority (CA)
:::

## Customization

For emails, you can customize the following properties:

* Email template and syntax (HTML or [Liquid](/email/liquid-syntax)
* Message language
* [Email variables](/email/templates)
* One-time-use code length
* One-time-use code expiration period
* Whether to allow user sign-up via passwordless

## Limitations of One-Time Passwords

<%= include('../../_otp-limitations') %>
