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

<% var services = ['Active Directory RMS', 'EchoSign', 'Egencia', 'Egnyte', 'Eloqua', 'Freshdesk', 'G Suite', 'GitHub Enterprise Cloud', 'GitHub Enterprise Server', 'Heroku', 'Hosted Graphite', 'Litmos', 'New Relic', 'Microsoft Dynamics CRM', 'Office 365', 'Salesforce', 'Sentry', 'SharePoint', 'Slack', 'SpringCM', 'Sprout Video', 'Tableau Online', 'Tableau Server', 'Workday', 'Workpath', 'ZenDesk', 'Zoom'];
if (services.indexOf(${service}) !== -1) { %>

1. Enter a name for your SSO Integration, and click **Create**.

![](/media/articles/sso/integrations/name.png)

<% } else { %>

1. Enter a name for your SSO Integration, configure the following values, and click **Create**.

<table class="table">
    <thead>
        <tr>
            <th><strong>Setting</strong></th>
            <th><strong>Description</strong></th>
        </tr>
    </thead>
    <tbody>
        <% if (service === "Active Directory RMS") { %>
        <tr>
           <td>Rights Management Services URL</td>
            <td>URL of your Active Directory Rights Management Server.</td>
        </tr>
        <% } %>
        <% if (service === "EchoSign") { %>
        <tr>
            <td>EchoSign Custom Domain</td>
            <td>Domain of your ${service} URL (<code>https://{domain}.echosign.com</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Egencia") { %>
        <tr>
            <td>Audience</td>
            <td>Your ${service} URL (<code>https://{YOUR_ACCOUNT_NAME}.egencia.com</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Egnyte") { %>
        <tr>
            <td>Egnyte Domain</td>
            <td>Domain of your ${service} URL (<code>https://{domain}.egnyte.com</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Eloqua") { %>
        <tr>
            <td>Audience</td>
            <td>Service Provider Entity URL from within ${service}.</td>
        </tr>
        <% } %>
        <% if (service === "Freshdesk") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://{domain}.freshdesk.com/login/saml</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Service Provider Entity ID from within ${service} (<code>https://{domain}.freshworks.com/sp/SAML/{xxxxxxxxxxxxxxxxxxx}/metadata</code>).</td>
        </tr>
        <% } %>
        <% if (service === "G Suite") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://www.google.com/a/{domain}/acs</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Your ${service} URL (<code>https://www.google.com/a/{domain}/acs</code>).</td>
        </tr>
        <% } %>
        <% if (service === "GitHub Enterprise Cloud") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://github.com/orgs/{YOUR_GITHUB_ORG_NAME}/saml/consume</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Your ${service} URL (<code>https://github.com/orgs/{YOUR_GITHUB_ORG_NAME}</code>).</td>
        </tr>
        <% } %>
        <% if (service === "GitHub Enterprise Server") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>{YOUR_GITHUB_SERVER_URL}/saml/consume</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Your ${service} URL (<code>{YOUR_GITHUB_SERVER_URL}</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Heroku") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://sso.heroku.com/saml/YOUR-HEROKU-ORG</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Your ${service} URL (<code>https://sso.heroku.com/saml/YOUR-HEROKU-ORG</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Hosted Graphite") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://www.hostedgraphite.com/complete/saml/{YOUR-USER-ID}/</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Service Provider Entity URL from within ${service} (<code>https://www.hostedgraphite.com/metadata/{YOUR-USER-ID}/</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Litmos") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://{YOUR DOMAIN}.litmos.com/integration/samllogin</code>).</td>
        </tr>
        <tr>
            <td>Destination</td>
            <td>Your ${service} URL (<code>https://{YOUR DOMAIN}.litmos.com/integration/samllogin</code>).</td>
        </tr>
        <% } %>
        <% if (service === "New Relic") { %>
        <tr>
            <td>New Relic Account Number</td>
            <td>Your account number for New Relic, which can be found in the URL after the <code>/account/</code> path.</td>
        </tr>
        <% } %>
        <% if (service === "Microsoft Dynamics CRM") { %>
        <tr>
            <td>Server URL</td>
            <td>URL for your Microsoft Dynamics CRM server.</td>
        </tr>
        <tr>
            <td>X.509 Encryption Certificate</td>
            <td>Certificate (DER-encoded binary X.509) used to encrypt tokens sent to Microsoft Dynamics CRM by Auth0.</td>
        </tr>
        <% } %>
        <% if (service === "Office 365") { %>
        <tr>
            <td>Domain</td>
            <td>Your Office 365 domain.</td>
        </tr>
        <tr>
            <td>Auth0 Connection</td>
            <td>Connection to use with this integration (typically an Active Directory connection).</td>
        </tr>
        <% } %>
        <% if (service === "Salesforce") { %>
        <tr>
            <td>Salesforce Domain</td>
            <td>Your Salesforce Domain.</td>
        </tr>
        <tr>
            <td>Entity ID</td>
            <td>Arbitrary URL that identifies the Saleforce resource.</td>
        </tr>
        <% } %>
        <% if (service === "Sentry") { %>
        <tr>
            <td>Organization Slug</td>
            <td>Generated slug for your Sentry organization found in your URL (for example, the slug for `https://sentry.travel0.com/travel0-org/` would be `travel0-org`.</td>
        </tr>
        <tr>
            <td>Sentry URL Prefix</td>
            <td>If you're using Sentry Community Edition, your URL prefix. Otherwise, leave blank.</td>
        </tr>
        <% } %>
        <% if (service === "SharePoint") { %>
        <tr>
            <td>SharePoint URL</td>
            <td>Internal URL for the SharePoint application.</td>
        </tr>
        <tr>
            <td>External URLs (optional)</td>
            <td>Comma-separated list of URLs. Only required if the SharePoint application is exposed to the internet.</td>
        </tr>
        <% } %>
        <% if (service === "Slack") { %>
        <tr>
            <td>Team Name</td>
            <td>Name of your Slack team.</td>
        </tr>
        <% } %>
        <% if (service === "SpringCM") { %>
        <tr>
            <td>SpringCM ACS URL</td>
            <td>ACS URL for your SpringCM.</td>
        </tr>
        <% } %>
        <% if (service === "Sprout Video") { %>
        <tr>
            <td>Audience</td>
            <td>Your ${service} URL (<code>https://{YOUR SPROUT VIDEO ACCOUNT}.vids.io</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Tableau Online") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://sso.online.tableau.com/public/sp/SSO?alias={YOUR TABLEAU ALIAS}</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Service Provider Entity URL from within ${service} (<code>https://sso.online.tableau.com/public/sp/metadata?alias={YOUR TABLEAU ALIAS}</code>).</td>
        </tr>
        <tr>
            <td>Recipient</td>
            <td>Your ${service} URL (<code>https://sso.online.tableau.com/public/sp/SSO?alias={YOUR TABLEAU ALIAS}</code>).</td>
        </tr>
        <tr>
            <td>Destination</td>
            <td>Your ${service} URL (<code>https://sso.online.tableau.com/public/sp/SSO?alias={YOUR TABLEAU ALIAS}</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Tableau Server") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Your ${service} audience (<code>{YOUR TABLEAU AUDIENCE}</code>).</td>
        </tr>
        <tr>
            <td>Recipient</td>
            <td>Your ${service} URL (<code>http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html</code>).</td>
        </tr>
        <tr>
            <td>Destination</td>
            <td>Your ${service} URL (<code>http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html</code>).</td>
        </tr>
        <% } %>
        <% if (service === "Workday") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://impl.workday.com/<tenant>/login-saml.html</code>). You may want to change the subdomain `impl` depending on the Workday data center you are using.</td>
        </tr>
        <% } %>
        <% if (service === "Workpath") { %>
        <tr>
            <td>Callback URL</td>
            <td>URL to which the user is redirected after login (<code>https://api.workpath.com/v1/saml/assert/{YOUR-WORKPATH-SUBDOMAIN}</code>).</td>
        </tr>
        <tr>
            <td>Audience</td>
            <td>Service Provider Entity URL from within ${service} (<code>https://api.workpath.com/v1/saml/metadata/{YOUR-WORKPATH-SUBDOMAIN</code>).</td>
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

![](/media/articles/sso/integrations/name.png)

<% } %>

### Configure integration with ${service}

Once you have configured your Auth0 SSO integration, you will see a **Tutorial** that will guide you through completing the integration with ${service}. Open a new tab to perform the tutorial steps.

<% if (guide !== "marketplace") { %>
![](/media/articles/sso/integrations/${img}.png)
<% } else { %>
    <% if (service === "Active Directory RMS") { %>
1. Add Federation Support to your AD RMS Cluster
screenshot

2. Enter your Auth0 RMS URL: `khoriander2.auth0.com/rms/xwBS484sQcx63zUWcmqeakK30mycS2E0`

Make sure you validate the URL to verify connectivity.
    <% } %>
    <% if (service === "Box") { %>

::: warning
The following steps only work for Box Enterprise accounts.
:::

Configuring SAML SSO with Box requires you to call their support team. They will ask for a few pieces of information:

1. The [signing certificate](https://khoriander2.auth0.com/pem).

2. The **EntityID**: `urn:khoriander2.auth0.com`.

3. The identifier that maps to Box usernames. By default we use the `emailaddress` claim:
`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`

4. The **Redirect URL**, which is the login endpoint in Auth0:
`https://khoriander2.auth0.com/samlp/2H8FjZTXRSkEyPyYaO9kvE5kVQ7ylzBC`

5. OPTIONAL: If you would like your Box user accounts to be created automatically, request that the Box support team enable automatic account provisioning for your account. To do so, you will need to provide the claims that we use for first name and last name. By default, we use `givenname` as the first name and `surname` as the last name.

```text
http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname
http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname
```
    <% } %>

    <% if (service === "Cisco WebEx") { %>
Provide the following SAML protocol configuration parameters:
* SAML Version:
`2.0`
* Issuer: 
`urn:khoriander-marketplace.us.auth0.com`
* Identity Provider Certificate: 
`https://khoriander-marketplace.us.auth0.com/pem`
* Identity Provider SHA1 fingerprint
`A6:14:84:AC:34:55:FA:14:87:19:15:81:67:77:D2:59:EB:13:4B:FC`
* Identity Provider Login URL
`https://khoriander-marketplace.us.auth0.com/samlp/ALsFQaez0nq7nYyumgB0P7uPON4ISIga`
* Identity Provider Metadata
`https://khoriander-marketplace.us.auth0.com/samlp/metadata/ALsFQaez0nq7nYyumgB0P7uPON4ISIga`

Alternatively, to log in with a specific identity provider, you can add a `connection` parameter:
```text
https://khoriander2.auth0.com/samlp/ALsFQaez0nq7nYyumgB0P7uPON4ISIga?connection=email
https://khoriander2.auth0.com/samlp/ALsFQaez0nq7nYyumgB0P7uPON4ISIga?connection=google-oauth2
https://khoriander2.auth0.com/samlp/ALsFQaez0nq7nYyumgB0P7uPON4ISIga?connection=Username-Password-Authentication
```

In this case, Auth0 will redirect users to the specified connection and will not display the Login widget. Make sure you send the SAMLRequest using HTTP POST.

    <% } %>

    <% if (service === "CloudBees") { %>
1. Log in to CloudBees as an administrator.

2. Select Account > SSO Integration.

3. Enter the Remote login URL: `https://khoriander2.auth0.com/samlp/JwwWjJqlQ8zEZzMXfuY2n2oAnrVzYORw`.

Alternatively, to log in with a specific identity provider, you can add a `connection` parameter:

```text
https://khoriander2.auth0.com/samlp/JwwWjJqlQ8zEZzMXfuY2n2oAnrVzYORw?connection=email
https://khoriander2.auth0.com/samlp/JwwWjJqlQ8zEZzMXfuY2n2oAnrVzYORw?connection=google-oauth2
https://khoriander2.auth0.com/samlp/JwwWjJqlQ8zEZzMXfuY2n2oAnrVzYORw?connection=Username-Password-Authentication
```

In this case, Auth0 will redirect users to the specified connection and will not display the Login widget.

4. Provide the Certificate:

`MIIDBTCCAe2gAwIBAgIJB5261iSST6iWMA0GCSqGSIb3DQEBCwUAMCAxHjAcBgNVBAMTFWtob3JpYW5kZXIyLmF1dGgwLmNvbTAeFw0xOTAxMTcxMjI1NDBaFw0zMjA5MjUxMjI1NDBaMCAxHjAcBgNVBAMTFWtob3JpYW5kZXIyLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALXNYeaudfn0nZfdy54SHx8BoltEdMVCqlN5Hrn2GCmmlCnytAEzGFseTkYGa3XV/gkqskBAtRItKCv3JPw1ud8ac9kNksLhxVBCoZxom5neg2jJu5LdEF/1ig0LVugwBvFTppLCfA9ARDClX7ahy7cAS7agdPMNKzVwRVq9Ls1lMCLuwaFGDp/rb9BeGWP/+Nafwc/4eujEZB6BQvQdGY9s2PyF9OhP3o1COj6VTtT1kKvdvPQ05OMlMVF2frCnaMXJ07zoviui+EVs+Xd30Lr0HwZcSgqYdJ59xds8cQgcAuV2E08yzTb+PCAS57wgmb1yfHeBNlxOWDHJa528ptcCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU9hhXEXDy9WKe5dqM0SJfpKiA8fUwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBy2Zpp9e4Owo3l3Sh5apcjow3wIyul2JuTXS1mq+HSKukUn5+s1leNFYHMezijceexE7YN2XBti8eHweMvnyiqKUAWdWu6L95HEC35Tu463ba/sxg40Z7ApdnvoeMxkqb788ZypFCBpCsgPx4HGoOLxbq2yRMKABFisDChoAgBehzMRkXHAzsFReXO2EOf+dW4P0+lyc30XVRZcO7ELScQEsRChkb2Vr8mo0sdWVd9mzf0lQhsASTv0XohIq7XH06euuP7E6/qHiDlsGeVV9DNHnLymIELdZJunXPBvlrOGJx62NG6jWYMV4kOqBtEht87MQNuxdsCUd9tWo/TTSwS`

5. [Verify your domain](https://support.cloudbees.com/hc/en-us/articles/360017607331-How-to-set-up-SSO-with-SAML-based-IdP-to-access-CloudBees-services-).
screenshot
    <% } %>

    <% if (service === "Eloqua") { %>
Provide the following SAML protocol configuration parameters:
* SAML Version:
`2.0`
* Issuer: 
`urn:khoriander-marketplace.us.auth0.com`
* Identity Provider Certificate: 
`https://khoriander-marketplace.us.auth0.com/pem`
* Identity Provider SHA1 fingerprint
`A6:14:84:AC:34:55:FA:14:87:19:15:81:67:77:D2:59:EB:13:4B:FC`
* Identity Provider Login URL
`https://khoriander-marketplace.us.auth0.com/samlp/3DH1RsT6ZA141xRcJMQ0hA7mjoZdWCcC`
* Identity Provider Metadata
`https://khoriander-marketplace.us.auth0.com/samlp/metadata/3DH1RsT6ZA141xRcJMQ0hA7mjoZdWCcC`

Alternatively, to log in with a specific identity provider, you can add a `connection` parameter:
```text
https://khoriander2.auth0.com/samlp/3DH1RsT6ZA141xRcJMQ0hA7mjoZdWCcC?connection=email
https://khoriander2.auth0.com/3DH1RsT6ZA141xRcJMQ0hA7mjoZdWCcC?connection=google-oauth2
https://khoriander2.auth0.com/3DH1RsT6ZA141xRcJMQ0hA7mjoZdWCcC?connection=Username-Password-Authentication
```

In this case, Auth0 will redirect users to the specified connection and will not display the Login widget. Make sure you send the SAMLRequest using HTTP POST.
    <% } %>

<% } %>

### Enable connections

 Choose the connections to use with your SSO integration. Users in enabled connections will be allowed to log in to ${service}. By default, all configured connections are enabled.

 1. Switch back to your open Auth0 tab, and click **Connections**.
 2. Toggle the sliders next to connection names to enable or disable them.
