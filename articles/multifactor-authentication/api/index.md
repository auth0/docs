---
title: Associate a New Authenticator for Use with Multifactor Authentication
description: How to associate a new authenticator for use with MFA using the new MFA API endpoints
toc: true
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
For this article, we will be using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant).
:::

## Associate Authenticators

Currently, you can use associate two types of authenticators:

* Authenticators using one-time passwords as the MFA challenge
* Authenticators using SMS messages as the MFA challenge