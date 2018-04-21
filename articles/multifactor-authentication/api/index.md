---
title: Multifactor Authentication API
description: Overview of available multifactor authentication APIs
---

# Multifactor Authentication API

The Multifactor Authentication (MFA) API endpoints allow you to enforce MFA when users interact with [the Token endpoints](/api/authentication#get-token), as well programmatically enroll and manage user authenticators.

## Requirements

Before you can use the MFA APIs, you'll need to:

* Enable the MFA grant type for your application. You can enable the MFA grant by going to [Applications > Your Application > Advanced Settings > Grant Types](${manage_url}/#/applications) and selecting MFA.
* Create a rule that sets Guardian as the MFA provider. For more information, see [Guardian for Administrators](/multifactor-authentication/administrator).

If you are using the MFA API in conjunction with a [Token endpoint](/api/authentication#get-token), you must meet the requirements of the corresponding grant.

## Multifactor authentication with the Token endpoint

We have expanded MFA support on the Token endpoints to cover the following use cases:

* Use MFA with the [password](/api-auth/grant/password), [password-realm](/api-auth/grant/password#realm-support), and [refresh-token](/tokens/refresh-token/current#use-a-refresh-token) grants.
* Completion of first-time enrollment by users during authentication.
* Selection of the desired MFA authenticator by the user before they execute the MFA challenge.

### More info

::: next-steps
* [Manually triggering MFA challenges](/multifactor-authentication/api/challenges)
* [Using one-time passwords as the MFA challenge](/multifactor-authentication/api/otp)
* [Using SMS messages as the MFA challenge](/multifactor-authentication/api/oob)
* [Tutorial: How to use MFA with the Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)
:::

## Enrollment and management of user authenticators

The MFA Associate API allows you to create, read, update, and delete authenticators. You can use this API to power user interfaces where users can manage MFA enrollments, or add and remove authenticators.

This enables users to enroll more than one device and select a fallback MFA mechanism in case the primary one is not available. For example, your user might use OTP when their SMS network is not present or unresponsive.

### More info

::: next-steps
* [List authenticators](/multifactor-authentication/api/manage#list-authenticators)
* [Delete an authenticator](/multifactor-authentication/api/manage#delete-authenticators)
:::

## Limitations

* The MFA API is designed to work with the Guardian Provider. Support for other providers will be provided in future releases.

* Support for authenticator selection is currently limited to the Token Endpoint. Auth0 is working to extend support to  Hosted MFA Pages. If users have more than one authenticator enrolled, the most-recently enrolled option will be used by the Hosted MFA Pages.