---
title: Enable Single Sign-On for Applications
description: Learn how to enable single sign-on for an application using the Auth0 Management Dashboard. Only for use with legacy tenants.
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
# Enable Single Sign-On for Applications

By default, seamless Single Sign-On (SSO) is enabled for all new Auth0 tenants; however, legacy tenants may [choose whether to enable this feature at the tenant level](/dashboard/guides/tenants/enable-sso-tenant). If you have not enabled tenant-level SSO, you may enable it per application.

This guide will show you how to enable single sign-on (SSO) for your application using Auth0's Dashboard.

::: warning
Before enabling SSO for an [application](/applications), you must first create and configure a connection for each [Identity Provider](/identityproviders) you want to use. For social identity providers, make sure the connection is not using [developer keys](/connections/social/devkeys).
:::

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the application to view.

![Select Application](/media/articles/applications/app-list.png)

2. Scroll to the bottom of the Settings page, locate **Use Auth0 instead of the IdP to do Single Sign On**, enable the toggle, and click **Save Changes**. 

![Enable SSO](/media/articles/applications/app-settings-danger-zone-legacy.png)