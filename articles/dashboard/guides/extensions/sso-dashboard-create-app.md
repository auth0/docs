---
description: Learn how to create an application to use with the SSO Dashboard Extension to enable SSO login for your applications. 
topics:
  - extensions
  - sso-dashboard
  - sso
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - setup-multiple-sso-applications
  - create-sso-dashboard-application
---

# Create a SSO Dashboard Application

Use the [SSO Dashboard Extension](/extensions/sso-dashboard) to manage SSO login for your users on multiple enterprise applications. 

Before you [add the SSO Dashboard extension](/dashboard/guides/extensions/sso-dashboard-install-extension), you need to create the SSO Dashboard application in Auth0. 

1. Go to [Dashboard > Applications](${manage_url}/#/applications).

2. Click **+Create Application**. 

3. Enter a name for the application (for example *SSO Dashboard*).

4. Select the **Single-Page Web Applications** application type. 

5. Click **Create**.

  ![](/media/articles/extensions/sso-dashboard/create-client.png)

6. Select the **Settings** tab and set the **Allowed Callback URLs** based on your location.

    For **Admins**:

    | Location | Allowed Callback URL |
    | --- | --- |
    | USA | `https://${account.tenant}.us8.webtask.io/auth0-sso-dashboard/admins/login` |
    | Europe | `https://${account.tenant}.eu8.webtask.io/auth0-sso-dashboard/admins/login` |
    | Australia | `https://${account.tenant}.au8.webtask.io/auth0-sso-dashboard/admins/login` |

    For **Users**:

    | Location | Allowed Callback URL |
    | --- | --- |
    | USA | `https://${account.tenant}.us8.webtask.io/auth0-sso-dashboard/login` |
    | Europe | `https://${account.tenant}.eu8.webtask.io/auth0-sso-dashboard/login` |
    | Australia | `https://${account.tenant}.au8.webtask.io/auth0-sso-dashboard/login` |

7. Select and copy the **Client ID** value.

8. At the bottom of the page, click **Show Advanced Settings**. 

9. Select the **OAuth** tab and paste the **Client ID** value that you copied previously into the **Allowed APPs / APIs** field.

10. Make sure that the **JsonWebToken Signature Algorithm** is set to **RS256**.

11. Click **Save Changes**. 

  Next, you will need to [install the SSO Dashboard Extension](/dashboard/guides/extensions/sso-dashboard-install-extension) and [add applications](/dashboard/guides/extensions/sso-dashboard-add-apps) to the dashboard.

::: note
By default all the connection types are enabled for users to be able to login into the SSO Dashboard. If you would like to change this, navigate to the **Connections** tab for the Application.
:::

## Keep reading

- [View this Extension on GitHub](https://github.com/auth0-extensions/auth0-sso-dashboard-extension)
- [Troubleshoot Extensions](/extensions/troubleshoot)
- [Understand how Single Sign-On works with Auth0](/sso/current/sso-auth0)
- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant)
- [Understand session lifetime](/sessions/concepts/session-lifetime)
- Learn how to [configure session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings)
- Learn how to [log users out](/logout)
