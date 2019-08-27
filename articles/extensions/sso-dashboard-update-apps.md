---
description: Learn how to update applications on the SSO Dashboard Extension to enable SSO login for your applications. 
topics:
  - extensions
  - sso-dashboard
  - sso
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - setup-multiple-applications
  - update-sso-dashboard-applications
---

# Update Applications on the SSO Dashboard

Use the [SSO Dashboard Extension](/extensions/sso-dashboard) to manage SSO login for your users on multiple enterprise applications. 

Before you can update the applications to the SSO Dashboard, you need to 

* [Create the SSO Dashboard application](/extensions/sso-dashboard-create-app) in Auth0
* [Install the SSO Dashboard Extension](/extensions/sso-dashboard-install-extension)
* [Add applications to the SSO Dashboard](/extensions/sso-dashboard-add-apps) 

1. Login to the SSO Dashboard. Use `https://${account.tenant}.<REGION>8.webtask.io/auth0-sso-dashboard/admins/login` or through the Dashboard.

2. In the upper right corner, select **Settings** from the dropdown.

3. Change whether users can see the application (if it is enabled) with the **Publish** or **Unpublish** buttons. 

4. Click the gear icon to update an application's settings.
  
  ![Change Application Settings](/media/articles/extensions/sso-dashboard/change-settings.png)

  Delete an application with the **X** button. A confirmation box will popup to confirm the deletion.

## Keep reading

- [View this Extension on GitHub](https://github.com/auth0-extensions/auth0-sso-dashboard-extension)
- [Understand how Single Sign-On works with Auth0](/sso/current/sso-auth0)
- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant)
- [Understand session lifetime](/sessions/concepts/session-lifetime)
- Learn how to [configure session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings)
- Learn how to [log users out](/logout)
