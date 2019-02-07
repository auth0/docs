---
description: Learn to configure connections using the Auth0 Dashboard.
topics:
  - applications
  - connections
  - tenants
contentType: concept
useCase:
  - build-an-app
  - customize-connections
---

# Use Multiple Tenants

If you have two separate domains (for example, public-facing and internal) or would like to allow users to log in differently for two different applications, the best solution is to create a second Auth0 tenant. This will allow you to have separate sets of applications, connections, and users for the groups of users and applications you need to support.

For example, let's suppose that your company, Fabrikam, has two applications: an internal timesheets application (Fabrikam Employee Timesheets) and a customer portal (Fabrikam Customer Portal). You want users to be able to log in to the timesheets application using either their Active Directory credentials or Google Apps. On the other hand, you want users to be able to log in to the customer portal via Google Apps, Facebook, or LinkedIn.

For the internal timesheets application, you would configure the following in Auth0:

1. Create a tenant (`Fabrikam-Internal`) for your internal domain via the Settings menu in the top right on the [Dashboard](${manage_url}). 
2. Register an application within this tenant for your timesheet application (`Fabrikam Employee Timesheets`).
3. Configure the following [Enterprise connections](${manage_url}/#/connections/enterprise) for this tenant: Active Directory/LDAP and Google Apps. 
4. Once all connections are configured, navigate to the **Connections** tab in the timesheet application's application settings and enable the connections for the application.

For the customer portal, you would configure the following in Auth0:

1. Create a second tenant (`Fabrikam-Public`) for your public-facing domain. 
2. Register an application within this tenant for your customer portal (`Fabrikam Customer Portal`).
3. Configure the following [Enterprise connection](${manage_url}/#/connections/enterprise) for this tenant: Google Apps. 
4. Configure the following [Social connections](${manage_url}/#/connections/social) for this tenant: Facebook and LinkedIn.
5. Once all connections are configured, navigate to the **Connections** tab in the customer portal's application settings and enable the connections for the application.
