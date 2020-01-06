---
title: Passwordless Authentication with SMS
description: Learn about passwordless connections, Auth0-supported passwordless methods of authentication, and how to implement passwordless authentication with Auth0.
toc: true
url: /connections/passwordless
topics:
    - connections
    - passwordless
    - authentication
contentType:
    - index
    - concept
useCase: customize-connections
---

Send one-time-use codes to users' entered mobile phone number using:

* <a href="/dashboard/guides/connections/configure-passwordess-sms">Twilio</a>
* <a href="/connections/passwordless/guides/use-sms-gateway-passwordless">your own SMS gateway</a>

#### Customization

For SMS, you can customize the following properties:

* Message text and syntax (Markdown or [Liquid](/email/liquid-syntax))
* Message language
* One-time-use code length
* One-time-use code expiration period
* Whether to allow user sign-up via passwordless

### Limitations of One-Time Passwords

<%= include('../../_otp-limitations') %>
