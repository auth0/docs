---
title: Multifactor Authentication API
description: Overview of the multifactor authentication API and its usage.
---

# Multifactor Authentication API

With Auth0’s multifactor authentication (MFA) API, you can verify MFA through the `oauth/token` endpoint, allow users to enroll multiple authenticators, and let users select the authenticator they want to use. These endpoints are a flexible tool you can use when implementing MFA for trusted applications using the [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password).

## Process overview

1. Get an MFA token.
2. Request authenticator association.
3. Confirm authenticator association by using it.

## Before you start

1. Configure you application (including setting the [Default Audience and/or Default Directory](/dashboard-tenant-settings#api-authorization-settings)).
2. Register your [API](/docs/apis#how-to-configure-an-api-in-auth0).
3. Set the [grant type property](/applications/application-grant-types) of the Machine to Machine Application created with your API.
4. Create your [Connection](/connections/database).

## Get an MFA Token

...

## Challenge request

You can [manually trigger MFA challenges](/multifactor-authentication/api/challenges) for associated authenticators.

## Associate authenticators

When logging in, your users can self-associate the following types of authenticators:

* Authenticators using [one-time passwords](/multifactor-authentication/api/otp) as the MFA challenge.
* Authenticators using [SMS messages](/multifactor-authentication/api/oob) as the MFA challenge.

## List or delete authenticators

You can [list the authenticators](/multifactor-authentication/api/manage#list-authenticators) you've associated with your application or [delete authenticators](/multifactor-authentication/api/manage#delete-authenticators) as necessary.

## Limitations

Currently, [Hosted Login Pages](/hosted-pages/login) do not support multiple authenticators.



