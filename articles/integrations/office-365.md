---
description: Overview of Microsoft Office 365 Integration with Auth0.
---

# Office 365 Integration

Auth0 can help radically simplify the authentication process for Office 365. In this tutorial, you'll learn how to add Single Sign On (SSO) to Office 365 using Auth0.

## Why use Auth0 for Office 365

Your users will be able to log in using their existing Active Directory credentials, with support for Integrated Windows Authentication (Kerberos) if they're on a domain-joined machine in the corporate network.

This would typically require you to setup [an advanced ADFS infrastructure](https://msdn.microsoft.com/en-us/library/azure/dn151324.aspx) with Federation Servers in the corporate network and Web Application Proxies exposed in the DMZ. But with Auth0 as an identity provider for Office 365 all of this is handled by the [AD Connector](/connector/overview) which doesn't require you to expose any of your servers to the outside world.

In addition to that users can also setup SSO with custom apps or integrations like Salesforce, Dropbox, SharePoint Server, ...

## High-level Overview

Office 365 is a service that consists of a number of products and services. Users are added to an Office 365 subscription after which licenses can be assigned to them (Lync Online, Exchange Online, ...).

![Office 365 Users](/media/articles/integrations/office-365/office-365-users-overview.png)

Office 365 uses Azure AD as an identity store which supports different account management and authentication models:

1. **Cloud Identity**: Users are created in the cloud (Office 365/Azure AD) with no relation to an on-premises directory. Authentication happens with Azure AD.
2. **Synchronized Identity**: Users are synchronized from an on-premises LDAP directory (like Active Directory) to Azure AD. This means the user management can happen on-premises but authentication will always happen in the cloud using Azure AD.
3. **Federated Identity**: Users are synchronized from an on-premises LDAP directory (like Active Directory) to Azure AD. In this case Azure AD will act as the user store, but authentication will happen with a SAML 2.0 identity provider configured by the customer. This can be an ADFS server, Shibboleth, ... or in our case Auth0. With this third model you can add SSO support to Office 365.

This means that even if you use Auth0 for SSO support in Office 365, you will always need to synchronize your on-premises users to Office 365/Azure AD because it will be used as a user store (for user information, assigning licenses to those users, ...).

![Office 365 High-level Overview](/media/articles/integrations/office-365/office-365-high-level-overview.png)

When authentication is handed over to Auth0 it will use the AD Connector to authenticate the user. The link between the Auth0 user and the user in Azure AD is made using the `User Principal Name`. When Jack is synchronized to Azure AD his UPN will be `jack@fabrikamcorp.be` and when Jack authenticates using Auth0 the same UPN will be included in the SAML assertion to identify the authenticated user to the user stored in Azure AD.

> Note: If you're interested in providing SSO to Office 365 using other connections (like Database Connections, traditional AD, ...) you can [write a rule with custom provisioning logic](/integrations/office-365-custom-provisioning)

## Configuring Synchronization With Office 365 / Azure AD

The synchronization with your local LDAP directory can be configured in Office 365 or Azure AD (if you have an Azure Subscription).

Before setting up the actual synchronization we'll need to add a custom domain for which federation can be enabled (this does not work with the default `tenant.onmicrosoft.com` domain).

![Office 365 Domain](/media/articles/integrations/office-365/office-365-domain.png)

The domain can be configured under the **Domains** menu of the Admin Center where you'll need to validate it (using a TXT or MX record).

Once the domain is validated you can [Activate Active Directory synchronization](https://portal.office.com/Default.aspx#@/DirSync/DirectorySynchronization.aspx), run the IdFix tool (to fix common errors in Active Directory) and finally install and configure **Azure AD Sync Services**.

![AAD Sync](/media/articles/integrations/office-365/office-365-aad-sync.png)

After installing and configuring the tool you'll be able to start the synchronization and your AD users will start showing up in the Admin Center user overview.

## Configuring SSO With Auth0

Everything in terms of synchronization has been configured and we can now proceed to the SSO configuration with Auth0. We will start by adding Office 365 as a SSO Integration in the dashboard.

![](/media/articles/integrations/office-365/office-365-SSO.png)

On the **Settings** tab we'll need to enter our custom domain name (eg: `fabrikamcorp.be`) and choose the Active Directory connection we want to use.

![Settings Page](/media/articles/integrations/office-365/office-365-settings-page.png)

The **Tutorial** page will now be updated to match the settings and we'll need to run the few lines of PowerShell in the [Azure Active Directory Module for Windows PowerShell](https://msdn.microsoft.com/en-us/library/azure/jj151815.aspx).

Here's the script Fabrikam Corporation will be running to configure their Office 365 subscription:

```powershell
$cred = Get-Credential
Connect-MsolService –Credential $cred

Set-MsolDomainAuthentication
    -DomainName "fabrikamcorp.be"
    -FederationBrandName "fabrikamcorp.be"
    -Authentication Federated
    -PassiveLogOnUri "https://fabrikam.auth0.com/wsfed/yNqQMENaYIONxAaQmrct341tZ9joEjTi"
    -ActiveLogonUri "https://fabrikam.auth0.com/yNqQMENaYIONxAaQmrct341tZ9joEjTi/trust/usernamemixed?connection=FabrikamAD"
    -MetadataExchangeUri "https://fabrikam.auth0.com/wsfed/yNqQMENaYIONxAaQmrct341tZ9joEjTi/FederationMetadata/2007-06/FederationMetadata.xml?connection=FabrikamAD"
    -SigningCertificate "MIID..."
    -IssuerUri "urn:fabrikam"
    -LogOffUri "https://fabrikam.auth0.com/logout"
    -PreferredAuthenticationProtocol WsFed
```

## End-user Experience

Depending on which device the user is connecting from and the user's location (within the corporate network or not) the end-user experience will be different.

### With Kerberos

If Kerberos has been configured for the Active Directory connection and the users are on a domain-joined machine in the corporate network they'll be able to authenticate using Integrated Windows Authentication (Kerberos) without having to enter their credentials.

To skip the Auth0 page with the **windows authentication** button you can append `?whr={name-of-the-ad-connection}` to the `PassiveLogOnUri` parameter of the PowerShell script.

```
-PassiveLogOnUri "https://fabrikam.auth0.com/wsfed/yNqQMENaYIONxAaQmrct341tZ9joEjTi?whr=FabrikamAD"
```

### Without Kerberos

When authentication with Kerberos is not possible (eg: not enabled for the connection, not a domain-joined machine, not in the corporate network, ...) the users will see the username/password login page instead.

![Login Page](/media/articles/integrations/office-365/office-365-login-page.png)

This is where they'll enter their Active Directory credentials after which they'll be signed in to Office 365.

# IdP Initiated Login

When users navigate to https://portal.office.com they will always see the Azure AD login page which will redirect the users to the configured identity provider after entering their username. Using the IdP initiated login flow we can also skip this step.

Auth0 exposes an endpoint that can immediately start the login without showing the Azure AD login page. The format is as follows:

`https://{tenant}.auth0.com/wsfed/{client-id}?whr={AD-connection-name}`

For Fabrikam's SSO Integration the URL will look like this:

`https://fabrikam.auth0.com/wsfed/yNqQMENaYIONxAaQmrct341tZ9joEjTi?whr=FabrikamAD`

Fabrikam can now host a simple website, like `http://office.fabrikamcorp.com` which contains a redirect to this url to trigger the automatic login flow.

```
<html xmlns="http://www.w3.org/1999/xhtml">    
  <head>      
    <title>Fabrikam Office</title>      
    <meta http-equiv="refresh" content="0;URL='https://fabrikam.auth0.com/wsfed/yNqQMENaYIONxAaQmrct341tZ9joEjTi?whr=FabrikamAD'" />    
  </head>
</html>  
```

For users without Kerberos this will immediately show the login page. Users on a domain-joined machine will immediately be signed in to Office 365.

<%= include('./_office-365-deep-linking') %>
