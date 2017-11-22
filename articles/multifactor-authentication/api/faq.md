---
title: Multifactor Authentication API FAQ
description: Frequently asked questions about MFA and its API
---
# FAQ: MFA and the MFA API

The following is a list of frequently-asked questions about multifactor authentication (MFA) and Auth0's MFA API.

## When can I self-associate authenticators during the authorization process?

If you don't have an active authenticator, you can self-associate. However, if you have at least one authenticator that's active, then you can't self-associate (with one or more active authenticators, you won't receive the MFA required error, therefore you cannot self-associate a new authenticator).

## With push notifications, why do I get two authenticators instead of one?

Push notifications come with two authenticators. One triggers the push notification, while the other is used for automatic follow-up. The latter is designed to ensure that you can authenticate even if, for whatever reason, you do not receive the push notification.

## Why can I associate more than one authenticator with a particular end user?

Depending on your use case/business needs, you may associate more than one authenticator with a particular end user. For example, a given end user might opt for push notifications with one of their mobile devices and SMS codes with another device. This means that, if the user is authenticating and they're unable to use one of the devices, they can use the other (and not have to rely on the recovery code).

## When should I use self-association during authorization vs. association outside the authorization process?

You can self-associate during the authorization process if there are no active authenticators (other than the recovery code). Associating authenticators outside the authorization process (generally used to add additional authenticators) requires additional programming, such as the use of [rules](/rules).

## What happens if I delete an authenticator?

If you have multiple authenticators associated, you'll be able to use only those that remain.

If, after you delete your authenticator, you have no authenticators left associated with your account, 

## If I'm using push notifications, what happens if I delete only one of the authenticators created?

If you delete the authenticator that sends out push notifications, you're essentially disabling the push notifications functionality. You're left with the TOTP authenticator.

If you delete the TOTP authenticator, you're left with just push notifications. This is a slightly more secure setup, but note that if the push notification doesn't come through, you don't have an automatic follow-up method of authenticating yourself.

## If I'm using Guardian, what happens if I delete one of the authenticators?

Generally speaking, Guardian behaves as you'd expect when deleting authenticators. The exception is with push notifications -- if you delete the push notification authenticator, Guardian removes both it and the TOTP authenticator.