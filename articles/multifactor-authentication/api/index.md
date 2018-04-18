---
title: MFA API
description: MFA API index, listing available APIs
---

# MFA API

The MFA API is a set of APIs that will allow you to provide multiple use cases to your users.
* Enforcing MFA when interacting with the Token Endpoint
* Programmatic enrollment and management of user authenticators

## Requirements

In order to use these APIs you will need,
1. An enabled MFA rule that sets Guardian as the MFA provided.
2. In case of using this with a Token Endpoint grant, the requirements for that grant apply.

## Enforcing MFA when interacting with the Token Endpoint
Support for MFA on the token endpoint has been expanded to cover the following use cases,
* The following grants can prompt for MFA: [password](/api-auth/grant/password), [password-realm](/api-auth/grant/password#realm-support), [refresh-token](/tokens/refresh-token/current#use-a-refresh-token)
* End users perform the first time enrollment for MFA when interacting with the Token Endpoint
* Before executing the challenge the end user can select the MFA authenticator to use
<!-- * Support for TOPT delivered via Email -->
<!-- TODO: Add link to (to be created) doc about email authenticator -->

### Read More

* [Manually trigger MFA challenges](/multifactor-authentication/api/challenges)
* [Using one-time passwords as the MFA challenge](/multifactor-authentication/api/otp)
* [Using SMS messages as the MFA challenge](/multifactor-authentication/api/oob)
<!-- * [Using Push Notifications]
* [Using one-time passwords via email] -->
<!-- TODO: Add missing articles and link to them -->
* [End to end example on how to use MFA with the Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)

## Programmatic enrollment and management of user authenticators

The Associate API will allow for CRUD operations of authenticators. This API can power end user interfaces where users could manage their MFA enrollments by inspecting their setup, adding new authenticators, and removing existing ones.

This is useful to unlock use cases such as,
* I want my users to be able to enroll more than one device
* I want to provide my users with the ability to select a fallback MFA mechanism in case the primary one is not available in a certain context (e.g. use OTP when the SMS network is not present or unresponsive)

### Read More
* [API docs](/multifactor-authentication/api/)
* [List authenticators](/multifactor-authentication/api/manage#list-authenticators)
* [Delete an authenticator](/multifactor-authentication/api/manage#delete-authenticators).
<!-- * [Enroll a new authenticator](/multifactor-authentication/api/manage#enroll-authenticators). -->
<!-- TODO: Add link to enroll authenticator (requires expanding doc) -->

## Limitations

* The current API is designed to work with the Guardian Provider. Support for other providers will be provided in future releases.
* Support for selection of the authenticator is currently limited to the Token Endpoint. We will continue working to extend this support to our Hosted MFA Pages. If users have more than one authenticator enrolled, the last enrolled one  will be used by the Hosted MFA Pages.
