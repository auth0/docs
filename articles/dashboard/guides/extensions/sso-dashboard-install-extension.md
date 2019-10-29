---
description: Learn how to install the SSO Dashboard Extension to enable SSO login for your applications.  
topics:
  - extensions
  - sso-dashboard
  - sso
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - setup-multiple-applications
  - setup-sso-dashboard
  - install-sso-dashboard-extension
---

# Install the SSO Dashboard Extension

Use the [SSO Dashboard Extension](/extensions/sso-dashboard) to manage SSO login for your users on multiple enterprise applications. 

Before you install and configure the SSO Dashboard extension, you need to [create a SSO Dashboard application](/dashboard/guides/extensions/sso-dashboard-create-app) in Auth0. 

::: note
Make sure you have copied the **Client ID** value from your SSO Dashboard application. 
:::

1. Go to [Dashboard > Extensions](${manage_url}/#/extensions) and click on your new SSO Dashboard extension.

2. Click on the **SSO Dashboard** box in the list of provided extensions. The **Install Extension** window will open.

    ![Install SSO Dashboard Extension](/media/articles/extensions/sso-dashboard/install-extension.png)

3. Set the following configuration variables:

    | Variable | Description |
    | --- | --- |
    | **EXTENSION_CLIENT_ID** | The **Client ID** of the application you have created in the [Applications](${manage_url}/#/applications) that you wish to use this extension with. |
    | **TITLE** | The custom title that will appear at the top of the SSO Dashboard page. |
    | **CUSTOM_CSS** | (*Optional*) A link to a custom CSS you can use to style the look of your SSO Dashboard page. |
    | **FAVICON_PATH** | (*Optional*) Path to custom favicon. |
    | **AUTH0_CUSTOM_DOMAIN** | (*Optional*) If you have a custom domain name configured, enter it here (for example: `login.example.com`). This will change the authorization endpoint to `https://login.example.com/login`. |

::: note
Setting the `AUTH0_CUSTOM_DOMAIN` variable does not affect the extension URL, it only changes the authorization endpoint. When a custom domain is used, users that are logging into the extension will be navigated to `https://AUTH0_CUSTOM_DOMAIN/login` instead of the default `https://tenant-name.us.auth0.com/login`. 
:::

4. Click **INSTALL**.

    If you navigate back to the [Applications](${manage_url}/#/applications) view, you will see that there has been an additional application created.

    ![New created Application](/media/articles/extensions/sso-dashboard/new-client.png)

::: note
The `auth0-sso-dashboard` application is created automatically when you install the extension. It's an application authorized to access the [Management API](/api/management/v2) and you shouldn't modify it.
:::

5. To use the extension, navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

6. Click on the row for the **SSO Dashboard** extension. The first time you click on your installed extension, you will be asked to grant it the required permissions.

    Once you agree, you will be directed to your custom **SSO Dashboard** page, which will have the **TITLE** you provided at the top of the page, and if you provided a custom CSS file that styling will be applied.

    ![Your Custom SSO Dashboard](/media/articles/extensions/sso-dashboard/dashboard.png)

7. To login into the dashboard:

    For **Admins** use `https://${account.tenant}.<REGION>8.webtask.io/auth0-sso-dashboard/admins/login` or through the Dashboard.

    For **Users** use `https://${account.tenant}.<REGION>8.webtask.io/auth0-sso-dashboard/login`.

## Keep reading

- [Add Applications to the SSO Dashboard](/dashboard/guides/extensions/sso-dashboard-add-apps)
- [Update Applications on the SSO Dashboard](/dashboard/guides/extensions/sso-dashboard-update-apps)
- [View this Extension on GitHub](https://github.com/auth0-extensions/auth0-sso-dashboard-extension)
- [Troubleshoot Extensions](/extensions/troubleshoot)
- [Understand how Single Sign-On works with Auth0](/sso/current/sso-auth0)
- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant)
- [Understand session lifetime](/sessions/concepts/session-lifetime)
- Learn how to [configure session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings)
- Learn how to [log users out](/logout)
