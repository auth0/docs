---
title: Multifactor Authentication API
description: Index of Available MFA APIs
---

# Multifactor Authentication (MFA) API

The Multifactor Authentication (MFA) API is a set of APIs that allows you to:

* Enforce MFA when users interact with [the Token endpoints](/api/authentication#get-token)
* Programmatically enroll and manage user authenticators

## Requirements

To use the MFA APIs you will need **an enabled MFA rule that sets Guardian as the MFA provider**. Fore more info on this see [Guardian for Administrators](/multifactor-authentication/administrator).

If you are using the MFA API in conjunction with a [Token endpoint](/api/authentication#get-token), you must meet the requirements of the corresponding grant.

## Enforcing MFA when interacting with the Token Endpoint

We have expanded MFA support on the Token endpoints to cover the following use cases:

* Use MFA with the [password](/api-auth/grant/password), [password-realm](/api-auth/grant/password#realm-support), [refresh-token](/tokens/refresh-token/current#use-a-refresh-token) grants
* Completion of first-time enrollment by end-users during authentication
* Selection of the desired MFA authenticator by the end-user before they execute the MFA challenge
<!-- * Support for TOPT delivered via Email -->
<!-- TODO: Add link to (to be created) doc about email authenticator -->

### More info

::: next-steps
* [Manually triggering MFA challenges](/multifactor-authentication/api/challenges)
* [Using one-time passwords as the MFA challenge](/multifactor-authentication/api/otp)
* [Using SMS messages as the MFA challenge](/multifactor-authentication/api/oob)
<!-- * [Using Push Notifications]
* [Using one-time passwords via email] -->
<!-- TODO: Add missing articles and link to them -->
* [Tutorial: How to use MFA with the Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)
:::

## Programmatic enrollment and management of user authenticators

The MFA Associate API allows you to create, read, update, and delete authenticators.

You can use this API to power your end-user interfaces where your users can:

* Manage their MFA enrollments
* Add new MFA authenticators
* Remove existing MFA authenticators

This is useful if you want your users to be able to:

* Enroll more than one device
* Select a fallback MFA mechanism in case the primary one is not available in a certain context. For example, your user might use OTP when their SMS network is not present or unresponsive

### More info

::: next-steps
* [List authenticators](/multifactor-authentication/api/manage#list-authenticators)
* [Delete an authenticator](/multifactor-authentication/api/manage#delete-authenticators)
<!-- * [Enroll a new authenticator](/multifactor-authentication/api/manage#enroll-authenticators) -->
<!-- TODO: Add link to enroll authenticator (requires expanding doc) -->
:::

## Limitations

* The MFA API is designed to work with the Guardian Provider. Support for other providers will be provided in future releases.

* Support for authenticator selection is currently limited to the Token Endpoint. Auth0 is working to extend support to  Hosted MFA Pages. If users have more than one authenticator enrolled, the most-recently enrolled option will be used by the Hosted MFA Pages.
