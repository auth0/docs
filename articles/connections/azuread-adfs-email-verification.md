---
title: Email Verification for Azure AD and ADFS
description: Learn how to control how the `email_verified` field is set for Azure AD and ADFS.
toc: true
topics:
  - connections
contentType: how-to
---
# Email Verification for Azure AD and ADFS connections

Auth0 user's profile has an `email_verified` field, which can be set in different ways depending on the connection type. For database connections, users must go through an email validation flow to get the email verified. For federated connections, identity providers can return the `email_verified` field based on their own criteria.

Azure AD and ADFS cannot guarantee that the emails they return have been verified: 

- In ADFS, the ADFS administrator can configure any email they want. 

- In Azure AD, depending on how the Azure AD tenant is configured, email addresses returned by Azure AD may or may not correspond to Office mailboxes. Auth0 can't know whether they do or not.

However, if you know how an Azure AD or ADFS is configured and managed, you can decide to trust that the emails from those accounts are verified.

To accommodate both needs, Azure AD and ADFS connections have an **Email Verification** property with two values:

- Always set `email_verified` to `true`
- Always set `email_verified` to `false`

The Azure AD connection also has a **Use Common Endpoint** property. When it's enabled, the user can authenticate with any Azure AD tenant. Given it's not possible to trust that any Azure AD tenant will return verified emails, the **Email Verification** property will need to be set to **Always set `email_verified` to `false`**.

When the property is set to **Always set `email_verified` to `false`**, users will get `email_verified` set to `false` the next time they log in, unless the [Sync user profile attributes at each login](/dashboard/guides/connections/configure-connection-sync) is disabled.


## Azure AD/ADFS Email Verification Migration Setting

In previous versions, Auth0 always set the `email_verified` field to true in Azure AD and ADFS connections. If you were using Azure AD and ADFS connections in the past, you will have a tenant setting that will override the Connection Setting for **Email Verification** and keep the previous behavior. 

The new tenant setting is in the **Migrations** section, and it's called **Default to 'Email Verification' setting for Azure AD/ADFS connections**.

When this setting is disabled, `email_verified` will always be `true` for Azure AD/ADFS connections. When enabled, it will use the 'Email Verification' setting at the connection level.
