---
title: Troubleshoot Passwordless Authentication
topics:
    - connections
    - passwordless
    - troubleshoot
    - troubleshooting
contentType:
    - how-to
    - reference
useCase: 
    - troubleshooting
---

# Troubleshoot Passwordless Authentication

In this guide, you'll find some information for troubleshooting passwordless authentication. If these tips don't outright solve your issue, they can at least narrow down a possible cause and help Auth0 support resolve your issue faster.

## Can users share passwords with others?

No, because Passwordless authentication removes the need for and use of passwords.

## What if a user is using multiple devices?

If authentication links or codes are requested via email, a user can retrieve the link or code on any device with access to their email account. After retrieving the authentication link or code, they can provide the information when attempting to access the app.

If a device doesn't have access to the required email account, users can forward the email to an account accessible using that device.

If a user requests an authentication code via SMS message, they can use any device that will receive messages sent to the phone number associated with their account.

## What if a user did not receive authentication emails/SMS messages?

If a user does not receive the requested email or SMS message, here are some things to check:

* Did the email get filed into a junk or spam folder?
* Has there been some type of server delay, latency, or connectivity issue preventing the user from email or SMS messages?

## One-Time Password Limitations

<%= include('../../_otp-limitations') %>