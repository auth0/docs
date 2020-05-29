---
title: Email Verification for Azure AD and ADFS
description: Learn how to control how the `email_verified` field is set for Azure AD and ADFS
toc: true
topics:
  - connections
contentType: how-to
---
#  Email Verification for Azure AD and ADFS

Auth0 user's profile has an `email_verified` field. The way it is set depends on the connection type. For database connections, users need to go through an email validation flow. For federated connections, the identity providers can return the email_verified field, based on their own criteria.

Azure AD and ADFS cannot guarantee that the emails their return have been verified: 

- In the case of ADFS, the ADFS administrator can configure any mail they want. 

- In the case of Azure AD, depending on how the Azure AD tenant is configured, the email addresses returned by Azure AD could correspond to Office mailboxes, or not. Auth0 can't know if that's the case.

However, in some cases, where you know how an Azure AD and ADFS is configured and managed, you can decide to trust that the emails from those accounts are verified.

To accommodate both needs, Azure AD and ADFS connections have an 'Email Verification' property with two values:

- Always set `email_verified` to `true`
- Always set `email_verified` to `false`

The Azure AD connection has 'Use Common Endpoint' property. When it's enabled, the user can authenticate with any Azure AD tenant. Given it's not possible to trust that 'any Azure AD tenant' will return verified emails, the 'Email Verification' property will need to be set to *Always set `email_verified` to `false`*.

##  Email Verification Flow

If you want to make sure that users accessing applications using Azure AD and ADFS connections own the emails they log-in with, you can enable an email verification flow for those connections.

You can turn on that flow by toggling the 'Enable Email Verification for Azure AD and ADFS connections' tenant setting.

If that setting is enabled, users that authenticate with Azure AD or ADFS connections that are configured with 'Email Verification' = *Always set `email_verified` to `false`*, will get sent an email with one-time use code the next time they authenticate. They will need to enter it to access the application.

