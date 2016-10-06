---
description: How to use Auth0 as an identity provider with GitHub Enterprise.
---

# Using Auth0 as an Identity Provider with GitHub Enterprise

When using GitHub Enterprise, you can configure Auth0 to act as an identity provider.

## Configure Your Auth0 Application

Create a new or select an existing Client using the [Clients]() page of the Management Dashboard.

On the row associated with your chosen Client, click on the **Addons** button, which is the second button from the right on the appropriate Client row.

![](/media/articles/scenarios/github-enterprise/clients.png)

When the **Addons** page opens, set the slider in the box called **SAML2 WEB APP** to the right. The slider will turn green to indicate that the Addon is active.

![](/media/articles/scenarios/github-enterprise/addons.png)

You will then be presented with the Addon Settings page:

![](/media/articles/scenarios/github-enterprise/addon-settings.png)

Set the following configuration variables:

* **Application Callback URL**: the Assertion consumption URL of your GitHub Exterprise instance;
  * Example: `https://your_github_enterprise_url/saml/consume`
* **Settings**: the URL for your GitHub Enterprise instance set as the `audience`.
  * Example: `{ "audience": "https://your_github_enterprise_url" }`

You can check the validity of these settings by clicking **Debug**.

To persist your changes, click **Save**.

To obtain the values necessary for configuring your GitHub Enterprise account, switch over to the **Usage** tab.

![](/media/articles/scenarios/github-enterprise/addon-usage.png)

You will need values/files for the following configuration settings:

* Issuer;
* Auth0 Certificate (download this file so that you can upload it to GitHub);
* Identity Provider Login URL.

## Configure Your GitHub Enterprise Account

Log in to your GitHub Enterprise Management Console. You should have a custom URL that follows this format: `https:// your_github_enterprise_url:8443/setup/settings`.

Navigate to the **Authentication** section under the **Settings** page.

![](/media/articles/scenarios/github-enterprise/auth-settings.png)

Set the following configuration variables:

* **Authentication Type**: Set as *SAML*;
* **Single sign-on URL**: Paste the *Identity Provider Login URL* copied from the Auth0 Dashboard here;
* **Issuer**: Paste the *Issuer* value copied from the Auth0 Dashboard here. The format of the value is `urn:<tenant>.auth0.com`.

Upload the Auth0 Certificate you downloaded under **Replace Certificate**.

![](/media/articles/scenarios/github-enterprise/auth-certificate.png)

Click **Save** to persist your changes. Saving automatically restarts your GitHub Enterprise instance. At this point, anyone accessing your GitHub Enterprise will be prompted to sign in with Auth0.
