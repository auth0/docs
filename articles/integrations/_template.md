# ${meta.title} Integration

In this tutorial, you will learn how to add Single Sign On (SSO) to ${meta.title} using Auth0. Your users will be able to log in using any of our [Social Identity Providers](/identityproviders#social) (Facebook, Twitter, Github, etc.), [Enterprise Identity Providers](/identityproviders#enterprise) (LDAP, Active Directory, ADFS, etc.) or with a username and password.

### 1. Create a new application

Navigate to the [SSO Integrations](${manage_url}/#/externalapps/create) section of the dashboard and choose ${meta.title} from the list of apps:

![](/media/articles/integrations/third-party-apps/create.png)

### 2. Name your app and click **Save**:

![](/media/articles/integrations/third-party-apps/save.png)

### 3. Follow the live documentation

Now you will be directed to a tutorial for this integration containing information customized for your account. You may need to enter information from ${meta.title}. Simply follow each of the steps as shown:

![](/media/articles/integrations/third-party-apps/${image1})

### 4. Configure Settings

After going through the **Tutorial**, click on the **Settings** tab for your integration. Here you can choose to **Use Auth0 instead of the IdP to do single sign-on**. Make sure to click **SAVE** when finished.

### 5. Enable Connections

Click the **Connections** link for the integration to select which connections you want to enable for this integration.

### 6. Configuration Complete

You have successfully configured ${meta.title} to use Auth0 as the SSO broker. Your users can now choose this as a way to authenticate.
