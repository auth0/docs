# Integrating Auth0 with Slack

You can configure Slack to log in with Auth0. That way, users would be able to log in with any of the [identity providers](/identityproviders) supported by Auth0, such as Active Directory, LDAP, Google Apps, Facebook, Google, Twitter, and so on. It will also provide Single Sign On with other clients configured.

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

When configuring your Slack Account, please refer to the **Slack Configuration Instructions** page in your Auth0 Management Dashboard for the required parameters.

![](/media/articles/scenarios/slack/slack-config-instructions.png)

1. Log in to the [Slack Authentication Settings](https://slack.com/admin/auth) page as an administrator.
2. Under the **SAML Authentication** tab, click "Configure."
3. Choose **Custom SAML 2.0** as the **SAML Provider**.
4. Populate the **SAML 2.0 Endpoint (HTTP)** with the Auth0-provided URL. Alternatively, you can add a Connection parameter to log in with a specific identity provider. This results in Auth0 redirecting users to the specified Connection and not display the Auth0 log in widget.
5. Provide the **Identity Provider Issuer** (optional);
6. Provide the **Public Certificate** value.
7. Save.

For additional information, please consult Slack's article on [enabling SAML-based single sign-on](https://get.slack.help/hc/en-us/articles/203772216-Enabling-SAML-based-single-sign-on).
