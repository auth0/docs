---
title: Multi-factor Authentication in Auth0
description: Understand the basics of multi-factor authentication and the different methods of implementing it with Auth0.
topics:
    - mfa
contentType:
  - concept
useCase:
  - customize-mfa
---
# Multi-factor Authentication in Auth0

Auth0 supports a number of different options when it comes to enabling MFA for protecting user account access. An MFA workflow is typically provided via a separate application that runs on a mobile or tablet device. If you don’t want your customers to have to download a separate application, Auth0 also provides an [MFA SDK](/mfa/guides/guardian/guardian-sdk) that you can use to build second factor workflow right in your existing mobile device app.

## Authentication factors

Use any of the dozens of MFA solutions that exist today including SMS text, email, biometric, password-less and more, and be ready to add any new ones easily as they become available or necessary. Auth0 provides support for all MFA service providers through powerful authentication flow Rules.

::: note
It's common for customer facing applications to provide users with an option for adding a second factor rather than _forcing_ them to use a second factor. 
:::

Here are some of the primary factors Auth0 recommends:

### Push notifications

Push sends notification to a user’s pre-registered device - typically a mobile or tablet - from which a user can immediately allow or deny account access via the simple press of a button. Push factor is offered with Guardian mobile app, available for both [iOS](/mfa/guides/guardian/configure-guardian-ios) and [Android](/mfa/guides/guardian/configure-guardian-android). In addition, the technology is also available as a [Guardian Whitelabel SDK](/mfa/concepts/guardian) which can be used in custom mobile applications to act as second factor push responder. 

### SMS notifications

Send users a one-time code over SMS which the user is then prompted to enter before they can finish authenticating.

### One-Time passwords

One-Time Password (OTP) allows you to register a device - such as Google Authenticator - that will generate a one-time password which changes over time and which can be entered as the second factor to validate a user’s account.

### Email 

Using email when you want to provide users a way to perform MFA when they don't have their phone to receive an SMS or push notification.

## Authenticator apps

Auth0 MFA works with many [authenticator apps](/mfa/concepts/mfa-authenticators) for protecting user account access.

## MFA use cases

### Step-up authentication

Applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources. See [Step-Up Authentication](/mfa/concepts/step-up-authentication) for details. 

### Conditional MFA

You can configure a rule in Dashboard > Rules for custom multi-factor authentication (MFA) processes, which allow you to define the conditions that will trigger additional authentication challenges. Rules can be used to force MFA for users of certain applications, or for users with particular user metadata or IP ranges, among other triggers.

### Geolocation or *geo-fencing* 

### Confidence score

### Adaptive

## MFA management scenarios

* B2B: Your customers manage MFA factors for their users 
* B2C: End users manage their own MFA factors via the My MFA Settings Page
* B2E: You manage MFA factors for your users

## Keep reading

* [Blog Post: From Theory to Practice - Adding Two Factor Authentication to node.js](https://auth0.com/blog/from-theory-to-practice-adding-two-factor-to-node-dot-js/)
* [Blog Post: Announcing Auth0 Guardian Whitelabel SDK](https://auth0.com/blog/announcing-guardian-whitelabel-sdk/)
* [Blog Post: Time-based One-Time Password (TOTP)](https://auth0.com/blog/from-theory-to-practice-adding-two-factor-to-node-dot-js/)
