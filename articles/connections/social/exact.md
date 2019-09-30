---
title: Connect Your App to Exact
connection: Exact
image: /media/connections/exact.png
seo_alias: exact
description: Learn how to connect your application to Exact.
topics:
  - connections
  - social
  - exact
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Your App to Exact

To configure an Exact OAuth2 connection, you will need to register your Auth0 tenant on the [Exact Online App Center](https://apps.exactonline.com/).

1. Register a new app by logging into the Exact Online App Center and clicking on **Manage Apps**, then **Add a new application**.

2. Enter your app name.

3. Enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`.

    <%= include('../_find-auth0-domain-redirects') %>

4. Click **Save**.

5. Click **Edit** below your app. 

6. On the **Manage App** page, under the **Authorization** section, copy the `Client Id` and `Client Secret` provided.

7. In the Auth0 Dashboard, navigate to [Connections > Social](${manage_url}/#/connections/social), and choose **Exact**. 

8. Copy the `Client Id` and `Client Secret` from the **Manage App** page of your app in the Exact Online App Center into the fields on this page.

![Exact Connection Settings](/media/articles/connections/social/exact/exact-register-6.png)

::: note
You can register applications in multiple regions with Exact. By default, Auth0 will use `https://start.exactonline.nl`, but this value can be overridden with the `Base URL` parameter.
:::

<%= include('../_quickstart-links.md') %>
