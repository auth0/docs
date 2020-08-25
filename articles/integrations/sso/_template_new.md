# Configure SSO Integration for ${service}

The ${service} [Single Sign-on (SSO)](/sso) Integration creates a client application that uses Auth0 for authentication and provides SSO capabilities for ${service}. Your users log in to ${service} with Auth0 [identity providers](/identityproviders), which means the identity provider performs the identity credentials verification.

<% if (service === "Active Directory RMS") { %>
::: warning
The steps in this guide are valid for Active Directory Rights Management Services 2008 and earlier.
:::
<% } %>