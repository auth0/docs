---
description: Explains what Connections are and how they are associated with Auth0 Clients.
---

# Client Connections

Connections are sources of users. They are categorized into Database, Social, Enterprise and Passwordless and can be shared among different applications.

Connections may be shared among multiple clients. You can configure any number of connections, and then, at client level, choose which of them should be enabled for the given client.

To view all available connections for a client navigate to [Dashboard > Clients > Connections](${manage_url}/#/clients/${account.clientId}/connections).

![Client Connections List](/media/articles/applications/connections-dashboard-list.png)

To enable or disable a connection toggle the switch. In the screenshot above the user has many connections configured (a `Helpdesk` database connection, an Amazon social connection, a Bitbucket social connection, and more) but only two are enabled for this client: a database connection named `test-db` and the Facebook social connection. So when the users want to access this client, they have to either login using username and password or their Facebook connection.

To view all the connections that you have configured or create new ones navigate to [Dashboard](${manage_url}/#/) and select the connection type you want:
- [Database](${manage_url}/#/connections/database)
- [Social](${manage_url}/#/connections/social)
- [Enterprise](${manage_url}/#/connections/enterprise)
- [Passwordless](${manage_url}/#/connections/passwordless)

For more details on the connections you can configure refer to: [Identity Providers Supported by Auth0](/identityproviders).

## Example configuration

Let's suppose that you want to implement this architecture.

![Client connections example](/media/articles/applications/applications-connections-example.png)

You have two applications: a timesheets application and a customer portal. Users should login to the timesheets application either using their Active Directory credentials or their Google apps social connection. The customer portal on the other hand should be accessible via ADFS, Azure AD, Google Apps or LinkedIn authentication.

You can configure this in Auth0 as follows:
- Create a client for the timesheets application: `Fabrikam Employee Timesheets`.
- Create a client for the customer portal: `Fabrikam Customer Portal`.
- Configure the following four [Enterprise connections](${manage_url}/#/connections/enterprise): Active Directory / LDAP, ADFS, Microsoft Azure AD and Google Apps.
- Configure the following [Social connection](${manage_url}/#/connections/social): LinkedIn.
- For the `Fabrikam Employee Timesheets` client enable the Active Directory / LDAP and Google Apps connections.
- For the `Fabrikam Customer Portal` client enable the ADFS, Microsoft Azure AD, Google Apps and LinkedIn connections.
- That's it!
