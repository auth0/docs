---
description: How to configure Auth0 for use as a SAML identity provider
tags:
  - saml
---

# Configure Auth0 as an Identity Provider

::: warning
Auth0 only supports using Auth0 as the identity provider in SAML configurations with **SAML 2.0**.
:::

Depending on the type of application you're working with, configuring Auth0 to serve as the SAML Identity Provider (IdP) is done in several places.

## SSO Integrations with Built-in Auth0 Support

For some SSO Integrations that support SAML, the configuring Auth0 is done using the [**SSO Integrations** area of the Management Dashboard](${manage_url}/#/externalapps). To create a new integration, click **Create SSO Integration**.

![](/media/articles/protocols/saml/saml-configuration/sso-integrations.png)

 On the *New Single Sign On Integration* page, select the integration in which you're interested. Currently, your options are as follows:

* Active Directory
* Box
* CloudBees
* Concur
* Dropbox
* Microsoft Dynamics CRM
* Adobe EchoSign
* Egnyte
* New Relic
* Office 365
* SalesForce
* SharePoint
* Slack
* SpringCM
* Zendesk
* Zoom

![](/media/articles/protocols/saml/saml-configuration/sso-integrations-supported.png)

Provide a name for your new integration. Click **Create** to proceed.

You will now see additional configuration instructions that are specific to the integration that you have chosen.

![](/media/articles/protocols/saml/saml-configuration/name-sso-integration.png)

You can also refer to [Using Auth0 in SAML2 Web Apps](/saml2webapp-tutorial) for instructions specific to configuring a given SSO Integration.

## Manually Configure a SSO Integration

If the Service Provider option you've chosen doesn't come with built-in Auth0 support, you can [manually add the configuration](/saml-idp-generic).

Navigate to the [Applications section of the Management Dashboard](${manage_url}/#/applications), find the Application you're working with, and click on **Settings**.

![](/media/articles/protocols/saml/saml-configuration/applications.png)

Switch over to the **Addons** tab.

![](/media/articles/protocols/saml/saml-configuration/add-ons.png)

Enable **SAML2 Web App**. You will see a screen asking you to provide additional configuration information, with details on what the fields mean and what the expected value types are located directly on that page.

![](/media/articles/protocols/saml/saml-configuration/configure-app.png)

In addition, [SAML Settings Needed for Some SSO Integrations](/saml-apps) provide additional information for integrations that require special settings.

When done, click **Save**.
