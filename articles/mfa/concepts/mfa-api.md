---
title: Multi-factor Authentication API
description: Overview of available multi-factor authentication APIs
topics:
  - mfa
  - mfa-api
contentType:
  - index
useCase:
  - customize-mfa
---

# Multi-factor Authentication API

The <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> API endpoints allow you to enforce MFA when users interact with [the Token endpoints](/api/authentication#get-token), as well enroll and manage MFA factors.

## Multi-factor authentication with the Token endpoint

The Token endpoints cover the following use cases:

* Use MFA with the [password](/api-auth/grant/password), [password-realm](/api-auth/grant/password#realm-support), and [refresh-token](/tokens/guides/use-refresh-tokens) grants.
* Completion of first-time enrollment by users during authentication.
* Selection of the desired MFA authenticator by the user before they execute the MFA challenge.

## Enrollment and management of user authenticators

The MFA Associate API allows you to create, read, update, and delete authenticators. You can use this API to power user interfaces where users can manage MFA enrollments, or add and remove authenticators.

This enables users to enroll more than one device and select a fallback MFA mechanism in case the primary one is not available. For example, your user might use OTP when their SMS network is not present or unresponsive.

Check out [Manage Authenticators](/multifactor-authentication/api/manage) for more on listing or deleting authenticators.

<%= include('../_includes/_authenticator-before-start') %>

If you are using the MFA API in conjunction with the [Token endpoint](/api/authentication#get-token), you must meet the requirements of the corresponding grant.

## Limitations

* The MFA API is designed to work with SMS, Push via Guardian, Email, and OTP factors. It does not currently support enrolling with Duo or with the legacy 'google-authenticator' factor (which can be enrolled using the OTP factor).

-  Support for factor selection is currently limited to the Token Endpoint and the [New Universal Login Experience](/universal-login/new). If users have more than one factor enrolled, the [Classic Universal Login Experience](/universal-login/new) will display the most secure factor.

## Considerations

* When can I self-associate authenticators during the authorization process?

  You can self-associate authenticators if you don't have any active authenticators. If there are one or more active authenticators, you cannot self-associate a new authenticator.

* With push notifications, why do I get two authenticators instead of one?

  Push notifications have two authenticators. One to trigger the push notification and the other for a time-based one-time password (TOTP). The TOTP authenticator lets you authenticate if you are offline or can't receive the push notification.

* Why can I associate more than one authenticator with a particular end user?

  Associating multiple authenticators with a user can provide flexibility for the user.

  For example, a user may enable push notifications on their phone and TOTP codes on their computer. If the user is unable to use one of the devices, they can use the other (and not have to rely on the recovery code).

* When should I use self-association during authorization vs. association outside the authorization process?

  You can self-associate during the authorization process if there are no active authenticators. Associating authenticators outside the authorization process (generally used to add additional authenticators) requires additional programming, such as the use of [rules](/rules).

* What happens if I delete an authenticator?

  If you delete an authenticator and have multiple authenticators associated, you can use the remaining authenticators.

  If you delete a push authenticator, the associated one-time password (OTP) authenticator is also deleted. If you delete the OTP authenticator, the associated push authenticator is deleted.

  Recovery codes can only be deleted by an administrator using the [Management API](/multifactor-authentication/api/manage#delete-authenticators).

* If I'm using Guardian, what happens if I delete one of the authenticators?

  Guardian behaves as you'd expect when deleting authenticators. If you delete the push notification authenticator, Guardian removes both it and the OTP authenticator.

## Keep reading

* [Trigger MFA Using the API](/mfa/guides/apis/mfa-api/challenges)
* [Associate a One-Time Password Authenticator](/mfa/guides/apis/mfa-api/otp)
* [Associate an Out-of-Band Authenticator](/mfa/guides/apis/mfa-api/oob)
