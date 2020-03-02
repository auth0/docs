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

We have expanded MFA support on the Token endpoints to cover the following use cases:

* Use MFA with the [password](/api-auth/grant/password), [password-realm](/api-auth/grant/password#realm-support), and [refresh-token](/tokens/guides/use-refresh-tokens) grants.
* Completion of first-time enrollment by users during authentication.
* Selection of the desired MFA authenticator by the user before they execute the MFA challenge.

### More information

* [Trigger MFA using the API](/multifactor-authentication/api/challenges)
* [Using one-time passwords as the MFA challenge](/multifactor-authentication/api/otp)
* [Using SMS messages as the MFA challenge](/multifactor-authentication/api/oob)
* [Tutorial: How to use MFA with the Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)

## Enrollment and management of user authenticators

The MFA Associate API allows you to create, read, update, and delete authenticators. You can use this API to power user interfaces where users can manage MFA enrollments, or add and remove authenticators.

This enables users to enroll more than one device and select a fallback MFA mechanism in case the primary one is not available. For example, your user might use OTP when their SMS network is not present or unresponsive.

Check out [Manage Authenticators](/multifactor-authentication/api/manage) for more on listing or deleting authenticators.

<%= include('./_includes/_authenticator-before-start') %>

If you are using the MFA API in conjunction with the [Token endpoint](/api/authentication#get-token), you must meet the requirements of the corresponding grant.

## Limitations

* The MFA API is designed to work with SMS, Push via Guardian, Email, and OTP factors. It does not currently support enrolling with Duo or with the legacy 'google-authenticator' factor (which can be enrolled using the OTP factor).

-  Support for factor selection is currently limited to the Token Endpoint and the [New Universal Login Experience](/universal-login/new). If users have more than one factor enrolled, the [Classic Universal Login Experience](/universal-login/new) will display the most secure factor.

