# Configure SSO Integration for ${service}

This guide will show you how to configure an SSO integration.

<% if (service === "Active Directory RMS") { %>
::: warning
The steps in this guide are valid for Active Directory Rights Management Services 2008 and earlier.
:::
<% } %>

The ${service} <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> Integration lets you create a client application that uses Auth0 for authentication and provides SSO capabilities. Your users log in to ${service} with Auth0 [identity providers](/identityproviders), which means they perform the identity credentials verification.

## Create an SSO Integration

To create a new SSO Integration, navigate to [Dashboard > SSO Integrations](https://manage.auth0.com/#/externalapps) and click **+ Create SSO Integration**.

![](/media/articles/sso/integrations/new.png)

Next, select a provider.

![](/media/articles/sso/integrations/options.png)

Set the name for your SSO Integration. Click **Create**.

![](/media/articles/sso/integrations/name.png)

You will be brought to the **Tutorial** page for the provider, which contains instructions on how you can complete the integration with the external services provider so that it works with Auth0 for authentication. 

![](/media/articles/sso/integrations/${img}.png)

Once you're done configuring your integration, note that there are two additional tabs with additional options for you to manage:

1. **Settings**, which will allow you to change the integration's settings
2. **Connections**, which will allow you to enable/disable the integration for the connections associated with your tenant

### Settings

On the **Settings** page, configure the following values:

<table class="table">
    <thead>
        <tr>
            <th><strong>Setting</strong></th>
            <th><strong>Description</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>The name for your SSO integration (if you would like to change the value you provided when you first set up the integration).</td>
        </tr>
        <% if (service === "Active Directory RMS") { %>
        <tr>
           <td>Rights Management Services URL</td>
            <td>The URL of your Active Directory Rights Management Server.</td>
        </tr>
        <% } %>
        <% if (service === "EchoSign") { %>
        <tr>
            <td>EchoSign Custom Domain</td>
            <td>The domain of your EchoSign URL (<code> https://{domain}.echosign.com</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Egnyte") { %>
        <tr>
            <td>Egnyte Domain</td>
            <td>The domain of your Egnyte URL (<code> https://{domain}.egnyte.com</code>).</td>
        </tr>
        <% } %>
        <% if (service === "New Relic") { %>
        <tr>
            <td>New Relic Account Number</td>
            <td>Your account number for New Relic, can be found in the url after the <code>/account/</code> path.</td>
        </tr>
        <% } %>
        <% if (service === "Microsoft Dynamics CRM") { %>
        <tr>
            <td>Server URL</td>
            <td>The URL for your Microsoft Dynamics CRM server.</td>
        </tr>
        <tr>
            <td>X.509 Encryption Certificate</td>
            <td>The certificate (DER encoded binary X.509) used to encrypt tokens sent to Microsoft Dynamics CRM by Auth0.</td>
        </tr>
        <% } %>
        <% if (service === "Office 365") { %>
        <tr>
            <td>Domain</td>
            <td>Your Office 365 domain.</td>
        </tr>
        <tr>
            <td>Auth0 Connection</td>
            <td>The connection to use with this integration, typically an Active Directory connection.</td>
        </tr>
        <% } %>
        <% if (service === "Sentry") { %>
        <tr>
            <td>Organization Slug</td>
            <td>The generated slug for your Sentry organization found in your URL (i.e., the slug for `https://sentry.acme.com/acme-org/` would `acme-org`.</td>
        </tr>
        <tr>
            <td>Sentry URL Prefix</td>
            <td>Your URL prefix if you're using Sentry Community Edition; otherwise, leave blank.</td>
        </tr>
        <% } %>
        <% if (service === "Slack") { %>
        <tr>
            <td>Team Name</td>
            <td>The name of your Slack team.</td>
        </tr>
        <% } %>
        <% if (service === "Salesforce") { %>
        <tr>
            <td>Salesforce Domain</td>
            <td>Your Salesforce Domain.</td>
        </tr>
        <tr>
            <td>Entity ID</td>
            <td>The arbitrary URL that identifies the Saleforce resource.</td>
        </tr>
        <% } %>
        <% if (service === "SharePoint") { %>
        <tr>
            <td>SharePoint URL</td>
            <td>The internal URL for the SharePoint application.</td>
        </tr>
        <tr>
            <td>External URLs (optional)</td>
            <td>A comma-separated list of URLs, only required if the SharePoint application is exposed to the internet.</td>
        </tr>
        <% } %>
        <% if (service === "SpringCM") { %>
        <tr>
            <td>SpringCM ACS URL</td>
            <td>The ACS URL for your SpringCM.</td>
        </tr>
        <% } %>
        <% if (service === "Zendesk") { %>
        <tr>
            <td>Zendesk Account Name</td>
            <td>Your Zendesk account name.</td>
        </tr>
        <% } %>
        <% if (service === "Zoom") { %>
        <tr>
            <td>Zoom Account Name</td>
            <td>Your Zoom account name.</td>
        </tr>
        <% } %>
        <tr>
            <td>Use Auth0 instead of the IdP to do Single Sign-on (SSO). **Legacy tenants only.**</td>
            <td>If enabled, Auth0 will handle SSO instead of ${service}.</td>
        </tr>
    </tbody>
</table>

Click **Save**.

### Enable Connections

<% if (service === "Zendesk") { %>
::: warning
Zendesk **requires** that all users have an email address. When enabling Enterprise or Social connections, make sure that they will provide an email address
that can be sent to Zendesk.
:::

<% } %>
The **Connections** tab features a list of user sources available to your tenant. Your connections are organized by type (e.g., Database, Social, Enterprise, Passwordless).

You can choose the connections that you want used with your newly-created SSO integration; this allows the users in those connections to log in to ${service}.

## Complete Set Up

Once you've followed the configuration instructions in the tutorial, modified your settings (if necessary), and enabled your connection(s), you're done with setting up an SSO integration between ${service} and Auth0.
