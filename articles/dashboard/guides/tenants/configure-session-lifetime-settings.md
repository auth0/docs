---
title: Configure Session Lifetime Settings
description: Learn how to configure session lengths and limits for a tenant using the Auth0 Management Dashboard.
topics:
  - idle-timeout
  - absolute-timeout
  - session-lifetime-limits
  - dashboard
contentType:
  - how-to
useCase:
  - integrate-saas-sso
  - configure-sso
  - build-an-app
---
# Configure Session Lifetime Settings

This guide will show you how to configure session settings for your tenant using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/tenants/configure-session-lifetime-settings).

1. Navigate to the [Tenant Settings](${manage_url}/#/tenant) page in the [Auth0 Dashboard](${manage_url}/), and click the [**Advanced**](${manage_url}/#/tenant/advanced) tab.

![View Advanced Tenant Settings](/media/articles/dashboard/guides/tenants/tenant-settings.png)

2. Scroll to the **Log In Session Management** section, locate **Inactivity timeout** and **Require log in after**, enter the desired settings, and click **Save**.

![View Log In Session Management Settings](/media/articles/dashboard/guides/tenants/tenant-settings-advanced-login-session-management.png)

| Setting | Description |
| ------- | ----------- |
| **Inactivity&nbsp;timeout** | Timeframe (in minutes) after which a user's session will expire if they haven’t interacted with the Authorization Server. Will be superseded by system limits if over 4,320 minutes (3 days) for self-service plans or 144,000 minutes (100 days) for enterprise plans. |
| **Require log in after** | Timeframe (in minutes) after which a user will be required to log in again, regardless of their activity. Will be superseded by system limits if over 43,200 minutes (30 days) for self-service plans or 525,600 minutes (365 days) for enterprise plans. |