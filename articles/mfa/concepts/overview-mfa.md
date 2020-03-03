---
title: Multi-factor Authentication in Auth0
description: Understand the basics of multi-factor authentication and the different methods of implementing it with Auth0.
toc: true
topics:
    - mfa
contentType:
  - concept
useCase:
  - customize-mfa
---
# Multi-factor Authentication in Auth0

Multi-factor Authentication (MFA) provides a method to verify a user's identity by requiring them to provide more than one piece of identifying information. This ensures that only valid users can access their accounts even if they use a username and password that may have been compromised from a different application. From the Dashboard, you can easily enable the [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator) or [DUO](https://www.duosecurity.com/) into the authentication flow for your application. 

The type of information required from the user is typically two or more of the following:

* **Knowledge**: Something the user **knows** (such as a password)
* **Possession**: Something the user **has** (such as a mobile device)
* **Inheritance**: Something the user **is** (such as a fingerprint or retina scan)

::: note
It's common for customer facing applications to provide users with an option for adding a second factor rather than _forcing_ them to use a second factor. 
:::

## MFA in business scenarios

* B2B: Your customers manage MFA factors for their users 
* B2C: End users manage their own MFA factors via the My MFA Settings Page
* B2E: You manage MFA factors for your users

## When to use MFA

### Step-up authentication

Applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources. See [Step-Up Authentication](/mfa/concepts/step-up-authentication) for details. 

### Metadata and IP ranges

You can configure a rule in Dashboard > Rules for custom multi-factor authentication (MFA) processes, which allow you to define the conditions that will trigger additional authentication challenges. Rules can be used to force MFA for users of certain applications, or for users with particular user metadata or IP ranges, among other triggers.

### Geolocation or *geo-fencing* 

### Confidence score

### Adaptive

## MFA factors and authentication providers

Use any of the dozens of MFA solutions that exist today including SMS text, email, biometric, password-less and more, and be ready to add any new ones easily as they become available or necessary. Auth0 provides support for all MFA service providers through powerful authentication flow Rules.

Here are a few different options for authenticator apps that work with Auth0 for protecting user account access:

* Auth0 Guardian
* DUO
* Twilio
* Google Authenticator
* Authy
* Microsoft Authenticator

### Push notifications

Push sends notification to a user’s pre-registered device - typically a mobile or tablet - from which a user can immediately allow or deny account access via the simple press of a button. Push factor is offered with Guardian mobile app, available for both [iOS](/mfa/guides/guardian/configure-guardian-ios) and [Android](/mfa/guides/guardian/configure-guardian-android). In addition, the technology is also available as a [Guardian Whitelabel SDK](/mfa/concepts/guardian-whitelabel-sdk) which can be used in custom mobile applications to act as second factor push responder. 

### SMS notifications

Send users a one-time code over SMS which the user is then prompted to enter before they can finish authenticating.

### One-Time passwords

One-Time Password (OTP) allows you to register a device - such as Google Authenticator - that will generate a one-time password which changes over time and which can be entered as the second factor to validate a user’s account.

### Email 

Using email when you want to provide users a way to perform MFA when they don't have their phone to receive an SMS or push notification.

## Developer resources



## Keep reading

* [Blog Post: From Theory to Practice - Adding Two Factor Authentication to node.js](https://auth0.com/blog/from-theory-to-practice-adding-two-factor-to-node-dot-js/)
* [Blog Post: Announcing Auth0 Guardian Whitelabel SDK](https://auth0.com/blog/announcing-guardian-whitelabel-sdk/)