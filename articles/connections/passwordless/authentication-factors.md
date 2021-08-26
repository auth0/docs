---
title: Passwordless Authentication Factors
description: Describes the various authentication factors supported by Auth0 passwordless connections, including email, magic link, and SMS.
topics:
    - connections
    - passwordless
    - authentication
useCase: customize-connections
---
# Passwordless Authentication Factors

With Passwordless connections, users can log in without a password. Instead, they can use a variety of other authentication factors. Auth0 Passwordless connections support the following authentication factors:

| Factor      | Description |
|-------------|-------------|
| [Email](/connections/passwordless/email-otp) | The user is asked to enter their email address, to which Auth0 sends a one-time-use code. The user enters the code into your application. |
| [Magic Link](/connections/passwordless/email-magic-link) | The user is asked to enter their email address, to which Auth0 sends an email with a link in it. The user clicks the link and is directly logged in to your application. |
| [SMS](/connections/passwordless/sms-otp) | The user is asked to enter their phone number, to which Auth0 sends a one-time-use code. By default, Auth0 uses Twilio to send the code, but if you have a custom SMS gateway, you can modify your connection to use that instead. |