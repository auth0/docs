---
description: Learn how to test enterprise connections for applications using the Auth0 Management Dashboard.
topics:
  - connections
  - dashboard
  - enterprise
  - testing
contentType: 
    - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Test Enterprise Connections

This guide will show you how to test enterprise [connections](/connections) for applications using Auth0's Dashboard.

::: warning
To properly test, you should have already [set up your enterprise connection](/connections/identity-providers-enterprise).
:::

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) page in the [Auth0 Dashboard](${manage_url}/), and click on the connection type to view.

![Select Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Click the Try arrow next to the connection you want to test.

![Select Connection](/media/articles/dashboard/connections/enterprise/conn-enterprise-saml-list.png)

3. Log in and consent to allow access to your app. If you have configured everything correctly, you will see the **It Works!** page.
