---
title: Associate a New Authenticator for Multifactor Authentication
description: How to associate a new authenticator for multifactor authentication using the MFA API endpoints
---

# Associate a New Authenticator for Multifactor Authentication

If your application supports more than one authenticator type, you can let users without an active authenticator to self-associate a new authenticator for multifactor authentication (MFA).

In this tutorial, you'll learn how to configure your application so users can self-associate new authenticators for multifactor authentication.

Configuring Auth0 for such process requires the following steps:

1. Obtaining an MFA token
2. Requesting authenticator association
3. Using the authenticator to confirm association

## Before You Start

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
