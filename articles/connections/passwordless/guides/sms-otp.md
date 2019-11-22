---
title: Passwordless Authentication with SMS
description: Learn about passwordless connections, Auth0-supported passwordless methods of authentication, and how to implement passwordless authentication with Auth0.
toc: true
topics:
    - connections
    - passwordless
    - authentication
contentType:
    - index
    - concept
useCase: customize-connections
---
# Passwordless Authentication with SMS

Send one-time-use codes to the user's entered mobile phone number using:

* [Twilio](/dashboard/guides/connections/configure-passwordess-sms)
* [Your Own SMS Gateway](/connections/passwordless/guides/use-sms-gateway-passwordless)

## Customization

For SMS, you can customize the following properties:

* Message text and syntax (Markdown or [Liquid](/email/liquid-syntax))
* Message language
* One-time-use code length
* One-time-use code expiration period
* Whether to allow users to sign up via passwordless

## Limitations of One-Time Passwords

<%= include('../../_otp-limitations') %>
