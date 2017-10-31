---
description: How to set up a Single Sign On (SSO) integration with Active Directory RMS and Auth0.
toc: true
public: true
---

<%= include('./_01', {
  service: "Active Directory RMS"
}) %>

![](/media/articles/sso/integrations/ad-rms/instructions.png)

Next, click on the **Settings** tab and provide the following:

Setting | Description
--------|------------
Name | The name for your SSO integration (if you would like to change the value you provided when you first set up the integration).
Rights Management Services URL | The URL of your Active Directory Rights Management Server.
Use Auth0 instead of the IdP to do single sign on | If enabled, Auth0 will handle Single Sign On instead of Active Directory RMS.

Click **Save**.

## Configure Your Rights Management Services

When you configure your Active Directory RMS, please refer to the **Rights Management Services Configuration Instructions** page on [Dashboard > SSO Integrations > Active Directory RMS](${manage_url}/#/externalapps/) and follow each of the steps as shown.

![](/media/articles/sso/integrations/ad-rms/instructions.png)

<%= include('./_02', {
  service: "Active Directory RMS"
}) %>
