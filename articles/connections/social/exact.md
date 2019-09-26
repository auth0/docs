---
title: Connect your app to Exact
connection: Exact
image: /media/connections/exact.png
seo_alias: exact
description: How to obtain a Client Id and Client Secret for Exact.
topics:
  - connections
  - social
  - exact
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Exact

To configure an Exact OAuth2 connection, you will need to register your Auth0 tenant on the [Exact Online App Center](https://apps.exactonline.com/).

1. Register a new app by logging into the Exact Online App Center and click on **Manage Apps** and then click **Add a new application**.

2. Enter your app name.

3. Enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`.

    <%= include('../_find-auth0-domain-redirects') %>

4. Click **Save**.

5. Click **Edit** below your app. 

6. On the **Manage App** page, under the **Authorization** section, copy the `Client Id` and `Client Secret` provided.

7. Go to the Auth0 Dashboard, go to [Connections > Social](${manage_url}/#/connections/social), then choose **Exact**. 

8. Copy the `Client Id` and `Client Secret` from the **Manage App** page of your app in the Exact Online App Center into the fields on this page.

![Exact Connection Settings](/media/articles/connections/social/exact/exact-register-6.png)

::: note
You can register applications in multiple regions with Exact. By default Auth0 will use `https://start.exactonline.nl`, but this value can be overridden with the `Base URL` parameter.
:::

<%= include('../_quickstart-links.md') %>
