---
description: How to set up a Single Sign On (SSO) integration with Microsoft Dynamics CRM and Auth0.
toc: true
public: true
---

<%= include('./_template', {
  service: "Microsoft Dynamics CRM"
}) %>

![](/media/articles/sso/integrations/dynamics-crm/instructions.png)

Next, click on the **Settings** tab and provide the following:

Setting | Description
--------|------------
Name | The name for your SSO integration (if you would like to change the value you provided when you first set up the integration).
Server URL | The URL for your Microsoft Dynamics CRM server.
X.509 Encryption Certificate | The certificate (DER encoded binary X.509) used to encrypt tokens sent to Microsoft Dynamics CRM by Auth0.
Use Auth0 instead of the IdP to do single sign on | If enabled, Auth0 will handle Single Sign On instead of Microsoft Dynamics CRM.

Click **Save**.

## Configure Your Dynamics CRM Account

When you configure your Dynamics CRM account, please refer to the **Microsoft Dynamics CRM Configuration Instructions** page on [Dashboard > SSO Integrations > Microsoft Dynamics CRM](${manage_url}/#/externalapps/) and follow each of the steps as shown.

![](/media/articles/sso/integrations/dynamics-crm/instructions.png)

<%= include('./_bottom', {
   service: "Microsoft Dynamics CRM" 
}) %>

## Enable Connections

Click the **Connections** tab for the integration to select which connections you want to enable for this integration.

## Setup Complete

That's it! You've set up a Single Sign On integration with Microsoft Dynamics CRM and Auth0. Your users can now choose this as a way to authenticate.

