---
title: Rotate Client Secret
description: Learn how to rotate an application's client secret using the Auth0 Management Dashboard.
topics:
  - applications
  - client-secrets
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Rotate Client Secret

This guide will show you how to change an application's client secret using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/applications/rotate-client-secret).

::: note
The global client secret can also be rotated via the Dashboard. Your global client ID and secret can be found in your [Advanced Tenant Settings](${manage_url}/#/tenant/advanced).
:::

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Scroll to the bottom of the Application Settings page and under **Danger Zone**, you will see the Rotate secret option. Click the **Rotate** button to rotate the client's secret.

![Rotate Client Secret](/media/articles/dashboard/guides/rotate-client-secret.png)

You can view your new secret by selecting the **Reveal client secret** checkbox.

3. Update authorized applications

After you rotate your client secret, you must update any authorized applications with the new value.
