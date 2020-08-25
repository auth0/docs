# Configure SSO Integration for ${service}

The ${service} [Single Sign-on (SSO)](/sso) Integration creates a client application that uses Auth0 for authentication and provides SSO capabilities for ${service}. Your users log in to ${service} with Auth0 [identity providers](/identityproviders), which means the identity provider performs the identity credentials verification.

<% if (service === "Active Directory RMS") { %>
::: warning
The steps in this guide are valid for Active Directory Rights Management Services 2008 and earlier.
:::
<% } %>

## Prerequisites

Before you begin this tutorial, please:

* Sign up for a ${service} account.
* [Set up a connection](/connections), which is a source of users. Connections can be databases, social identity providers, or enterprise identity providers, and can be shared among different applications. You may set up more than one connection for use with SSO integrations.

<% if (service === "Zendesk") { %>
::: warning
Zendesk **requires** that all users have an email address. When enabling enterprise or social connections, make sure that they will provide an email address that can be sent to Zendesk.
:::

<% } %>