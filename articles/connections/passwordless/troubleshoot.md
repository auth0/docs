---
title: Troubleshooting Issues With Passwordless Authentication
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

# Troubleshooting Issues With Passwordless Authentication

In this guide you'll find some information for troubleshooting passwordless authentication. If these tips don't outright solve your issue, they can at least narrow down a possible cause and help Auth0 support resolve your issue faster.

## How long is the one-time use code/link valid?

One-time use authetication codes or links are valid for an amount of time set in your app's [Passwordless Connection Settings](${manage_url}/connections/passwordless).

## Can users share passwords with others?

No, because Passwordless authentication removes the need for and use of passwords.

## What if a user is using multiple devices?

If authentication links or codes are requested via email, a user can retrieve the link or code on any device with access to their email account. After retrieving the authentication link or code, they can provide the information when attempting to access the app.

If a device doesn't have access to the required email account, users can forward the email to an account accessible using that device.

If a user requests an authentication code via SMS message, they can use any device that will receive messages sent to the phone number associated with their account.

## Did not receive authentication emails/SMS messages

If a user does not receive the requested email or SMS message, here are some things to check:

* Did the email get filed into a junk or spam folder?
* Has there been some type of server delay, latency, or connectivity issue preventing the user from email or SMS messages?

## Multiple authentication emails/SMS messages

If a user accidentally requests more than one email or SMS message containing magic links or authentication codes, the last **five** codes will be valid. After successful log in using any of the codes/links, **all** of the existing codes/links will be invalidated.