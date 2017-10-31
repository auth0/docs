---
description: How to set up a Single Sign On (SSO) integration with Dropbox and Auth0.
toc: true
public: true
---

<%= include('./_template', {
  service: "Dropbox"
}) %>

![](/media/articles/sso/integrations/dropbox/instructions.png)

Next, click on the **Settings** tab and provide the following:

Setting | Description
--------|------------
Name | The name for your SSO integration (if you would like to change the value you provided when you first set up the integration).
Use Auth0 instead of the IdP to do single sign on | If enabled, Auth0 will handle Single Sign On instead of Dropbox.

Click **Save**.

## Configure Your Dropbox Account

When you configure your Dropbox account, please refer to the **Dropbox Configuration Instructions** page on [Dashboard > SSO Integrations > Dropbox](${manage_url}/#/externalapps/) for the required parameters.

![](/media/articles/sso/integrations/dropbox/instructions.png)

1. Log in to your Dropbox Business account as an administrator.
2. Select the **Authentication** menu item on the left.
3. Enable **Single-Sign-On**.
4. Provide your **Login URL**.
5. Provide your [Auth0 Signing Certificate](https://${account.namespace}/pem).

