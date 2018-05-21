---
description: Explains what Connections are and how they are associated with Auth0 Applications.
crews: crew-2
tags:
  - applications
  - connections
---
# Application Connections

Connections are sources of users. They are categorized into Database, Social, Enterprise and Passwordless and can be shared among different applications.

You can configure any number of connections for your applications to use in your Dashboard. To view all the connections that you have configured or create new ones navigate to [Dashboard](${manage_url}/#/) and select the connection type you want:
- [Database](${manage_url}/#/connections/database)
- [Social](${manage_url}/#/connections/social)
- [Enterprise](${manage_url}/#/connections/enterprise)
- [Passwordless](${manage_url}/#/connections/passwordless)

For more details on the connections you can configure refer to: [Identity Providers Supported by Auth0](/identityproviders).

## Example multi-tenant configuration

If you have two separate domains (for example, public facing and internal), or two groups of connections you'd like to allow users, the best solution is to create a second Auth0 tenant via the settings menu in the top right on the [Dashboard](${manage_url}). This will allow you to have separate sets of users, applications, and connections for the two groups of users and applications you need to support.

Let's suppose that you have two applications: an internal timesheets application and a customer portal. Users should login to the timesheets application either using their Active Directory credentials or their Google apps social connection. The customer portal on the other hand should be accessible via Facebook, Google, or LinkedIn authentication.

You can configure this in Auth0 as follows:

- Create a tenant `Fabrikam-Internal` for your internal domain, and an application within it `Fabrikam Employee Timesheets` for timesheets.
- Create a second tenant `Fabrikam-Public` for your public-facing domain, and an application within it `Fabrikam Customer Portal` for the customer portal.
- Configure the following [Enterprise connections](${manage_url}/#/connections/enterprise) for the `Fabrikam-Internal` tenant: Active Directory / LDAP, and Google Apps; once each is set up, check the **Applications** tab to enable them.
- Configure the following [Enterprise connection](${manage_url}/#/connections/enterprise) for the `Fabrikam-Public` tenant: Google Apps; once it is set up, check the **Applications** tab to enable it.
- Configure the following [Social connections](${manage_url}/#/connections/social) for the `Fabrikam-Public` tenant: Facebook, LinkedIn; once each is set up, check the **Applications** tab to enable it.
