# Integrating Auth0 with Slack

You can configure Slack to log in with Auth0. That way, users would be able to log in with any of the [identity providers](/identityproviders) supported by Auth0, such as Active Directory, LDAP, Google Apps, Facebook, Google, Twitter, and so on. It will also provide Single Sign On with other clients configured.

dashboard
third party apps
new
slack
settings tab: name and team name
tutorial (follow directions)

# Configuring Your Auth0 Account

Log in to the Auth0 [Management Dashboard](${uiURL}).

Select **SSO Integrations**.

![](/media/articles/scenarios/slack/sso-integration.png)

Click the **Slack** box.

![](/media/articles/scenarios/slack/sso-int-options.png)

Set the name for your SSO Integration. Click Create.

![](/media/articles/scenarios/slack/sso-int-name.png)

You will be brought to the **Slack Configuration Instructions** page.

![](/media/articles/scenarios/slack/slack-config-instructions.png)

This page contains instructions on configuring your integration with your Slack account, which we will cover in the next section of this document.

Click on the **Settings** tab.

![](/media/articles/scenarios/slack/slack-settings.png)

Provide the following values:
* **Name**: the name for your SSO integration (if you would like to change the value you provided when first setting up the integration);
* **Team Name**: the name of your Slack team.
* **Use Auth0 instead of the IdP to do single sign on**: if you would like Auth0 to handle Single Sign On instead of Slack, set the appropriate slide to **green** to activate this feature.

Save.

# Configuring Your Slack Account
