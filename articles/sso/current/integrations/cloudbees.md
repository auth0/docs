---
description: How to set up a Single Sign On (SSO) integration with CloudBees and Auth0.
toc: true
public: true
---

<%= include('./_01', {
  service: "CloudBees"
}) %>

![](/media/articles/sso/integrations/cloudbees/instructions.png)

Next, click on the **Settings** tab and provide the following:

Setting | Description
--------|------------
Name | The name for your SSO integration (if you would like to change the value you provided when you first set up the integration).
Use Auth0 instead of the IdP to do single sign on | If enabled, Auth0 will handle Single Sign On instead of CloudBees.

Click **Save**.

## Configure Your CloudBees Account

When you configure your CloudBees account, please refer to the **CloudBees Configuration Instructions** page on [Dashboard > SSO Integrations > CloudBees](${manage_url}/#/externalapps/) for the required parameters.

![](/media/articles/sso/integrations/cloudbees/instructions.png)

<%= include('./_02', {
  service: "CloudBees"
}) %>

