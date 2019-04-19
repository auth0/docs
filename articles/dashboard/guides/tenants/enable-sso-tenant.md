---
title: Enable Single Sign-On
description: Learn how to enable single sign-on for a tenant using the Auth0 Management Dashboard. Only for use with legacy tenants.
toc: true
topics:
  - sso
  - dashboard
contentType:
  - how-to
useCase:
  - integrate-saas-sso
  - configure-sso
  - build-an-app
---
# Enable Single Sign-On
 
By default, seamless Single Sign-On (SSO) is enabled for all new Auth0 tenants; however, legacy tenants may choose whether to enable this feature.

This guide will show you how to enable single sign-on (SSO) for your tenant using Auth0's Dashboard.

::: note
If you do not choose to enable tenant-level SSO, you may [enable it per application](/dashboard/guides/applications/enable-sso-app).
:::

1. Navigate to the [Tenant Settings](${manage_url}/#/tenant) page in the [Auth0 Dashboard](${manage_url}/), and click the [**Advanced**](${manage_url}/#/tenant/advanced) tab.

![View Advanced Tenant Settings](/media/articles/sessions/tenant-settings.png)

2. Scroll to the **Log In Session Management** section, locate **Enable Seamless SSO**, and enable the toggle.

![View Log In Session Management Settings](/media/articles/sessions/tenant-settings-advanced-login-session-management.png)

Once finished, you should also [configure your session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings).
