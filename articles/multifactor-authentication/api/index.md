---
title: Associate a New Authenticator for Use with Multifactor Authentication
description: How to associate a new authenticator for use with MFA using the new MFA API endpoints
---
# Associate a New Authenticator for Use with Multifactor Authentication

In this tutorial, you'll learn how to associate a new authenticator for use in multifactor authentication. Configuring Auth0 for such process requires the following steps:

1. Obtaining an access token
2. Requesting authenticator association
3. Using the authenticator to confirm association

## Prerequisites

Before you begin the process of associating authenticators, you'll need to have the following pieces of Auth0 configured:

1. Configure Your Tenant
1. Register Your [API](https://auth0.com/docs/apis#how-to-configure-an-api-in-auth0)
1. Create Your [Connection](/connections/database)

::: note
For these tutorials, we will be using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant).
:::

## Associate Authenticators

When logging in, your users can self-associate an authenticator. This is currently possible with two types of authenticators:

* Authenticators using [one-time passwords](/multifactor-authentication/api/otp) as the MFA challenge
* Authenticators using [SMS messages](/multifactor-authentication/api/oob) as the MFA challenge

You can associate more than one authenticator using the processes described above. 

## Manage Authenticators

You can use [list the authenticators](/multifactor-authentication/api/manage#list-authenticators) you've associated with your tenant or [delete individual authenticators](/multifactor-authentication/api/manage#delete-authenticators) as necessary.

## MFA Challenges

You can [manually trigger MFA challenges](/multifactor-authentication/api/challenges) for associated authenticators.