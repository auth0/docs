---
description: Explains Auth0 Connections and how they relate with Auth0 Clients.
---

# Client Connections

For Auth0, connections are sources of users. Auth0 has four connection categories
-Database
-Enterprise
-Social
-Passwordless
and different applications can share specific connections.

Multiple clients can share specific connections. You can configure any number of connections, and then, at client level, choose which of them you want to enable for the given client.

To view all available connections for a client, navigate to [Dashboard > Clients > Connections](${manage_url}/#/clients/${account.clientId}/connections).

![Client Connections List](/media/articles/applications/connections-dashboard-list.png)

To enable or disable a connection, toggle the switch. In the screenshot above, the user has many connections configured
-`Helpdesk` database connection
-Amazon social connection
-Bitbucket social connection
-and more
but this client has only two enabled connections: a database connection named `test-db` and the Facebook social connection. Therefore, to access this client, the user must either log in using username / password or log in with a Facebook connection.

To view all configured connections, or to create new connections, navigate to [Dashboard](${manage_url}/#/) and select the connection type you want:
- [Database](${manage_url}/#/connections/database)
- [Social](${manage_url}/#/connections/social)
- [Enterprise](${manage_url}/#/connections/enterprise)
- [Passwordless](${manage_url}/#/connections/passwordless)

See [Identity Providers Supported by Auth0](/identityproviders) for more information about the connections you can configure.

## Example configuration

Suppose you want to build this architecture:

![Client connections example](/media/articles/applications/applications-connections-example.png)

It has two applications - a timesheets application and a customer portal. Users can access the timesheets application through Active Directory credentials or through a Google apps social connection. The customer portal should be accessible via ADFS, Azure AD, Google Apps or LinkedIn authentication.

To configure this in Auth0,
- Create a client for the timesheets application: `Fabrikam Employee Timesheets`
- Create a client for the customer portal: `Fabrikam Customer Portal`
- Configure the following four [Enterprise connections](${manage_url}/#/connections/enterprise): Active Directory / LDAP, ADFS, Microsoft Azure AD and Google Apps
- Configure this [Social connection](${manage_url}/#/connections/social): LinkedIn
- For the `Fabrikam Employee Timesheets` client, enable the Active Directory / LDAP and Google Apps connections
- For the `Fabrikam Customer Portal` client, enable the ADFS, Microsoft Azure AD, Google Apps and LinkedIn connections
- That's it!