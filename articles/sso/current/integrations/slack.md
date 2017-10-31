---
description: How to set up a Single Sign On (SSO) integration with Slack and Auth0.
toc: true
public: true
---

<%= include('./_template', {
  service: "Slack"
}) %>

![](/media/articles/sso/integrations/slack/instructions.png)

Next, click on the **Settings** tab and provide the following:

Setting | Description
--------|------------
Name | The name for your SSO integration (if you would like to change the value you provided when you first set up the integration).
Team Name | The name of your Slack team.
Use Auth0 instead of the IdP to do single sign on | If enabled, Auth0 will handle Single Sign On instead of Slack.

![](/media/articles/sso/integrations/slack/settings.png)

Click **Save**.

## Configure Your Slack Account

When you configure your Slack Account, please refer to the **Slack Configuration Instructions** page on [Dashboard > SSO Integrations > Slack](${manage_url}/#/externalapps/) for the required parameters.

![](/media/articles/sso/integrations/slack/instructions.png)

1. Login to the [Slack Authentication Settings](https://slack.com/admin/auth) page as an administrator.
2. Under the **SAML Authentication** tab, click **Configure**.
3. Choose **Custom SAML 2.0** as the **SAML Provider**.
4. Populate the **SAML 2.0 Endpoint (HTTP)** with the Auth0-provided URL. Alternatively, you can add a Connection parameter to login with a specific identity provider. Now, Auth0 will redirect users to the specified Connection and not display the Auth0 login widget.
5. Provide the **Identity Provider Issuer** (optional);
6. Provide the **Public Certificate** value.
7. Save.

For additional information, please consult Slack's article on [enabling SAML-based single sign-on](https://get.slack.help/hc/en-us/articles/203772216-Enabling-SAML-based-single-sign-on).
