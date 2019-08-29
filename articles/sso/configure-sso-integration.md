# Configure SSO Integrations

This guide will show you how to configure an SSO integration.

SSO integrations are client applications where you can integrate an external service (e.g., Dropbox, Slack, or Zoom) with Auth0 and use Auth0 for authentication. Auth0 acts as the identity provider (IdP), which means it performs the identity credentials verification.

## Create an SSO Integration

To create a new SSO Integration, navigate to [Dashboard > SSO Integrations](https://manage.auth0.com/#/externalapps) and click **+ Create SSO Integration**.

![](/media/articles/sso/integrations/new.png)

Next, select a provider.

![](/media/articles/sso/integrations/options.png)

Set the name for your SSO Integration. Click **Create**.

![](/media/articles/sso/integrations/name.png)

You will be brought to the **Tutorial** page for the provider, which contains instructions you need to follow to complete the SSO Integration. Note, however, that there are two additional tabs:

1. **Settings**, which will allow you to change the integration's settings
1. **Connections**, which will allow you to enable/disable the integration for the connections associated with your tenant

### Tutorial

The **Tutorial** tab contains instructions on how you can complete the integration with the external services provider so that it works with Auth0 for authentication. 

### Settings

The **Settings** tab allows you to provide information for the configurable portion of your SSO integration. 

All integrations allow you to:

* Change the **name** used for the integration in Auth0
* Enable or disable the **Use Auth0 instead of the IdP to do single sign-on** feature. If enabled, Auth0 handles SSO instead of the external provider (that is, Auth0 won't redirect the user if the user's previously logged in)

Some integrations have additional configuration settings. This varies based on the external provider you're using. For example, Microsoft's Dynamics CRM allows you to provide a Server URL and x.509 Encryption Certificate, while Dropbox doesn't offer any additional settings.

### Connections

The **Connections** tab features a list of user sources available to your tenant. Your connections are organized by type (e.g., Database, Social, Enterprise, Passwordless).

You can choose the connections with which your newly-created SSO integration will be used; this allows the users in those connections to log in to your external service as well.