---
description: Learn how to rotate your application's client secret using the Auth0 Dashboard.
crews: crew-2
topics:
  - applications
  - client-secrets
contentType: how-to
useCase:
  - build-an-app
---

# Rotate a Client Secret using the Dashboard

This guide will show you how to change your application's client secret using Auth0's Dashboard. The global client secret can also be rotated via the Dashboard. Your global client ID can be found in your [Advanced Tenant Settings](${manage_url}/#/tenant/advanced).

::: warning 
New secrets may be delayed while rotating. To make sure that you see as little downtime as possible, we suggest you store the new client secret in your application's code as a fallback to the previous secret. This way, if the connection doesn't work with the old secret, your app will use the new secret.

Secrets can be stored in a list (or similar structure) to track keys until they're no longer needed. Once you're sure that an old secret is obsolete, you can remove its value from your app's code.
:::

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Locate the **Client Secret**, and click the **Rotate** button in the **Rotate secret** section of the **Danger Zone**. 

![](/media/articles/clients/change-client-secret/rotate-client-secret.jpg)

4. You can view your new secret at the top of the Settings page by checking the box next to **Reveal client secret**.

5. Update authorized applications

After you rotate your client secret, you must update any authorized applications with the new value.
