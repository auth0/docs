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

## Steps

To configure a ${service} SSO integration, you will:

1. [Configure Auth0 SSO integration](#configuree-auth0-sso-integration)
2. [Configure integration with ${service}](#configure-integration-with-${service})
3. [Enable connections](#enable-connections)

### Configure Auth0 SSO integration

1. Navigate to [Auth0 Dashboard > SSO Integrations](${manage_url}/#/externalapps), and click **+ Create SSO Integration**.
![](/media/articles/sso/integrations/new.png)

<% if (guide === "marketplace") { %>
1. Click **Continue** to grant the integration access to the listed permissions.

<% } %>

1. Select a provider.

![](/media/articles/sso/integrations/options.png)


<% var services = ['Active Directory RMS', 'EchoSign', 'Egencia', 'Egnyte', 'Eloqua', 'Freshdesk', 'G Suite', 'GitHub Enterprise Cloud', 'GitHub Enterprise Server', 'Heroku', 'Hosted Graphite', 'Litmos', 'New Relic', 'Microsoft Dynamics CRM', 'Office 365', 'Salesforce', 'Sentry', 'SharePoint', 'Slack', 'SpringCM', 'Sprout Video', 'Tableau Online', 'Tableau Server', 'Workday', 'Workpath', 'ZenDesk', 'Zoom']; %>
