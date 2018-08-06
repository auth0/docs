# ${service} Single Sign On Integration

<% if (service === "Active Directory RMS") { %>
::: warning
The steps in this tutorial are valid for Active Directory Rights Management Services 2008 and earlier.
:::
<% } %>

The ${service} Single Sign On (SSO) Integration lets your users log in to ${service} with Auth0 [identity providers](/identityproviders), and provides SSO to [configured applications](/sso/current/setup).

## Create a New SSO Integration

Navigate to [Dashboard > SSO Integrations](${manage_url}/#/externalapps) and click **+ Create New SSO Integration**.

![](/media/articles/sso/integrations/new.png)

Select the **${service}** option.

![](/media/articles/sso/integrations/options.png)

Set the name for your SSO Integration. Click **Create**.

![](/media/articles/sso/integrations/name.png)

You will be brought to the **${service} Configuration Instructions** page. We'll perform these steps in a later section.

![](/media/articles/sso/integrations/${img}.png)

Next, click on the **Settings** tab to configure the integration's settings.

## Configure Settings

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
            <td>Use Auth0 instead of the IdP to do single sign on</td>
            <td>If enabled, Auth0 will handle Single Sign On instead of ${service}.</td>
        </tr>
    </tbody>
</table>

Click **Save**.

## Configure ${service}

When you configure ${service}, refer to the **${service} Configuration Instructions** page on [Dashboard > SSO Integrations > ${service}](${manage_url}/#/externalapps/) and follow each of the steps as shown.

![](/media/articles/sso/integrations/${img}.png)

## Enable Connections

Click the **Connections** tab for the integration to select which connections you want to enable for this integration.

## Setup Complete

That's it! You've set up a Single Sign On integration with ${service} and Auth0. Your users can now choose this as a way to authenticate.
