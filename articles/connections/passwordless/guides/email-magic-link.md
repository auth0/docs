---
title: Passwordless Authentication with Magic Links
description: Passwordless Authentication with Magic Links
toc: true
topics:
    - connections
    - passwordless
    - authentication
---


* With magic link transactions, both the initial request and its response must take place in the same browser or the transaction will fail. This is particularly relevant for iOS users, who cannot change their default web browser. For example, the user makes the request using Chrome, but iOS opens the magic link received via email using Safari. If this happens, the transaction fails.


Send users magic links using:

* [Mandrill](/email/providers#configure-mandrill)
* [AWS](/email/providers#configure-amazon-ses)
* [Twilio SendGrid](/email/providers#configure-sendgrid)
* [SparkPost](/email/providers#configure-sparkpost)
* [your own custom SMTP email provider](/email/providers#configure-a-custom-smtp-server)

* To use a custom SMTP email provider, the SMTP server must:
    - support LOGIN authentication
    - support TLS 1.0 or higher
    - use a certificate signed by a public certificate authority (CA)
    

#### Customization

For emails, you can customize the following properties:

* Email template and syntax (HTML or [Liquid](/email/liquid-syntax)
* Message language
* [Email variables](/email/templates)
* Whether to allow user sign-up via passwordless

