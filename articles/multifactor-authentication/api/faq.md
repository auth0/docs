---
title: Multifactor Authentication API FAQ
description: Frequently asked questions about MFA and its API
tags:
  - mfa
  - mfa-api
---

# FAQ: MFA and the MFA API

The following is a list of frequently-asked questions about multifactor authentication (MFA) and Auth0's MFA API.

## When can I self-associate authenticators during the authorization process?

You can self-associate authenticators if you don't have any active authenticators. If there are one or more active authenticators, you cannot self-associate a new authenticator.

## With push notifications, why do I get two authenticators instead of one?

Push notifications have two authenticators. One to trigger the push notification and the other for a time-based one-time password (TOTP). The TOTP authenticator lets you authenticate if you are offline or can't receive the push notification.

## Why can I associate more than one authenticator with a particular end user?

Associating multiple authenticators with a user can provide flexibility for the user.

For example, a user may enable push notifications on their phone and TOTP codes on their computer. If the user is unable to use one of the devices, they can use the other (and not have to rely on the recovery code).

## When should I use self-association during authorization vs. association outside the authorization process?

You can self-associate during the authorization process if there are no active authenticators. Associating authenticators outside the authorization process (generally used to add additional authenticators) requires additional programming, such as the use of [rules](/rules).

## What happens if I delete an authenticator?

If you delete an authenticator and have multiple authenticators associated, you can use the remaining authenticators.

If you delete a push authenticator, the associated one-time password (OTP) authenticator is also deleted. If you delete the OTP authenticator, the associated push authenticator is deleted.

Recovery codes can only be deleted by an administrator using the [Management API](/multifactor-authentication/api/manage#delete-authenticators).

## If I'm using Guardian, what happens if I delete one of the authenticators?

Guardian behaves as you'd expect when deleting authenticators. If you delete the push notification authenticator, Guardian removes both it and the OTP authenticator.