---
description: Understand how the SSO Dashboard Extension enables you to manage SSO login for your users on multiple enterprise applications. 
classes: topic-page
topics:
  - extensions
  - sso-dashboard
  - sso
contentType:
  - concept
useCase: 
  - extensibility-extensions
  - setup-multiple-applications
  - setup-sso-dashboard
---

# Auth0 Single Sign-On Dashboard Extension

The **<dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> Dashboard** is a web application designed to solve a problem familiar to many people. Organizations of all sizes maintain a variety of different applications to handle various business functions like accounting, HR, development, support, etc. Remembering usernames and passwords and login URLs for all of your applications can be cumbersome. With this extension, you can simplify the authentication experience by enabling SSO login for your users on multiple enterprise applications. It allows you to create a list of all the cloud services for which a user can authenticate with SSO logins. 

::: note
A user should not be able to access, from the dashboard or otherwise, the service provider without having appropriate permissions (groups/roles) to do so.  Ideally, these users would not see any service provider they are not granted access to on the dashboard.
:::

The SSO Dashboard supports two types of users: 
- **Users** who can login to the dashboard to select an application to sign into with SSO. 
- **Admins** who can configure applications visible to the users. 

To setup and configure this extension, do the following steps:

<%= include('../_includes/_topic-links', { links: [
  'dashboard/guides/extensions/sso-dashboard-create-app',
  'dashboard/guides/extensions/sso-dashboard-install-extension',
  'dashboard/guides/extensions/sso-dashboard-add-apps',
  'dashboard/guides/extensions/sso-dashboard-update-apps',
] }) %>

## Keep reading

- [View this Extension on GitHub](https://github.com/auth0-extensions/auth0-sso-dashboard-extension)
- [Troubleshoot Extensions](/extensions/troubleshoot)
- [Understand how Single Sign-On works with Auth0](/sso/current/sso-auth0)
- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant)
- [Understand session lifetime](/sessions/concepts/session-lifetime)
- Learn how to [configure session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings)
- Learn how to [log users out](/logout)
