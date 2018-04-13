---
title: Associate a New Authenticator for Use with Multifactor Authentication
description: How to associate a new authenticator for use with MFA using the new MFA API endpoints
beta: true
---

# Associate a New Authenticator for Use with Multifactor Authentication

::: warning
This article includes documentation on features that are still under development. These features are available to customers with early access.
:::

Auth0 allows you to configure your tenant so that your end users can self-associate a new authenticator for use in multifactor authentication.

In this tutorial, you'll learn how to configure self-association of a new authenticator for use in multifactor authentication. Configuring Auth0 for such process requires the following steps:

1. Obtaining an MFA token
2. Requesting authenticator association
3. Using the authenticator to confirm association

## Background

Let's say that you have enabled multifactor authentication for your tenant, and you are capable of supporting more than one type of authenticator. You can then configure your authorization process so that users who log in and do not have at least one active authenticator (other than a recovery code) can self-associate a new authenticator.

## Prerequisites

::: note
For these tutorials, we will be using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant).
:::

Before you begin the process of configuring self-association of authenticators, you'll need to:

1. Configure Your Tenant (including setting the [Default Audience and/or Default Directory](/dashboard-tenant-settings#api-authorization-settings))
1. Register Your [API](https://auth0.com/docs/apis#how-to-configure-an-api-in-auth0)
1. Set the [grant type property](/applications/application-grant-types) of the Machine to Machine Application created with your API
1. Create Your [Connection](/connections/database)

## Associate Authenticators

When logging in, your users can self-associate the following types of authenticators:

* Authenticators using [one-time passwords](/multifactor-authentication/api/otp) as the MFA challenge
* Authenticators using [SMS messages](/multifactor-authentication/api/oob) as the MFA challenge

## Manage Authenticators

You can use [list the authenticators](/multifactor-authentication/api/manage#list-authenticators) you've associated with your tenant or [delete individual authenticators](/multifactor-authentication/api/manage#delete-authenticators) as necessary.

## MFA Challenges

You can [manually trigger MFA challenges](/multifactor-authentication/api/challenges) for associated authenticators.
