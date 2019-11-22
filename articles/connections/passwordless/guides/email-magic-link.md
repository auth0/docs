---
title: Passwordless Authentication with Magic Links
description: Passwordless Authentication with Magic Links
toc: true
topics:
    - connections
    - passwordless
    - authentication
---
# Passwordless Authentication with Magic Links

With magic link transactions, both the initial request and its response must take place in the same browser or the transaction will fail. This is particularly relevant for iOS users, who cannot change their default web browser. For example, the user might make the initial request using Chrome, but when the user opens the magic link in their email, iOS opens it in Safari, the default browser. If this happens, the transaction will fail.

You may configure Auth0 to send users magic links using:

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

#### Customization

For emails, you can customize the following properties:

* Email template and syntax (HTML or [Liquid](/email/liquid-syntax)
* Message language
* [Email variables](/email/templates)
* Whether to allow users to sign up via passwordless
