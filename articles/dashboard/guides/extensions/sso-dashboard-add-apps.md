---
description: Learn how to add applications to the SSO Dashboard Extension to enable SSO login for your applications. 
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
---

# Add Applications to the SSO Dashboard

Use the [SSO Dashboard Extension](/extensions/sso-dashboard) to manage SSO login for your users on multiple enterprise applications. 

Before you add the applications to the SSO Dashboard, you need to:

* [Create the SSO Dashboard application](/dashboard/guides/extensions/sso-dashboard-create-app)
* [Install the SSO Dashboard Extension](/dashboard/guides/extensions/sso-dashboard-install-extension)

1. Go to [Dashboard > Extensions](${manage_url}/#/extensions) and click on your new SSO Dashboard extension. 

::: note
If you are an administrator, you can also login to the SSO Dashboard using `https://${account.tenant}.<REGION>8.webtask.io/auth0-sso-dashboard/admins/login`.
:::

2. In the upper right corner, select **Settings** from the dropdown below your tenant name.

3. Click **CREATE APP** to add a new application.

    ![Dashboard Settings](/media/articles/extensions/sso-dashboard/settings.png)

    The **New Application** form appears. 

    ![Create a new application](/media/articles/extensions/sso-dashboard/new-app.png)

4. Complete the following fields for the new application:

    | Field | Description |
    | --- | --- |
    | **Type** | A dropdown where you select <dfn data-key="security-assertion-markup-language">SAML</dfn>, <dfn data-key="openid">OpenID-Connect</dfn>, or WS-Federation depending on the type of application. |
    | **Application** | A dropdown where you select the application that you wish to add.  |
    | **Name** | The name is automatically populated based on the application you selected. You can change the name or use the default. |
    | **Logo** | The url of the logo you wish to user as an icon for the application. |
    | **Callback** | One of the **Allowed Callback URLs** under your [Application Settings](${manage_url}/#/applications) for the application. |
    | **Connection** | (*Optional*) The connection type. You can add or edit your available connection types in the [Connections section of the Auth0 Management dashboard](${manage_url}/#/connections/database).  If a connection is not set and the user is not logged, the user will see the Auth0 Login page. |
    | **Custom URL** | (*Optional*) Checkbox to use a custom URL rather than the Auth0 URL. If you check the box, a field appears where you can enter your custom URL. |
    | **Enabled** | Checkbox for this application to be visible (published) to your users. |

5. Click **CREATE**.

    Your new application will then appear on the **Applications** page of the SSO dashboard with any other applications that have been created.

    ![SSO Dashboard Applications](/media/articles/extensions/sso-dashboard/dashboard-apps.png)

6. Click on an application to test the connection.

## Keep reading

- [Update Applications on the SSO Dashboard](/dashboard/guides/extensions/sso-dashboard-update-apps)
- [View this Extension on GitHub](https://github.com/auth0-extensions/auth0-sso-dashboard-extension)
- [Troubleshoot Extensions](/extensions/troubleshoot)
- [Understand how Single Sign-On works with Auth0](/sso/current/sso-auth0)
- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant)
- [Understand session lifetime](/sessions/concepts/session-lifetime)
- Learn how to [configure session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings)
- Learn how to [log users out](/logout)
