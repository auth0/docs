---
title: Connect your app to The City
connection: The City
image: /media/connections/thecity.png
seo_alias: thecity
description: How to obtain an App ID and Secret with The City.
toc: true
topics:
  - connections
  - social
  - thecity
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to The City

To connect your Auth0 app to The City, you will need to create a plugin as an administrator on your The City portal.

## 1. Log in into The City portal

Log in into your The City portal, and select __Admin__:

![](/media/articles/connections/social/thecity/thecity-register-1.png)

## 2. Create new Plugin

Select __API > Plugin > Create plugin__:

![](/media/articles/connections/social/thecity/thecity-register-2.png)

Complete the form using this <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

![](/media/articles/connections/social/thecity/thecity-register-3.png)

Press __Create__

## 3. Get your App ID & Secret

Once the application is created, enter your new `App ID` and `Secret` into the connection settings in Auth0.

![](/media/articles/connections/social/thecity/thecity-register-4.png)

<%= include('../_quickstart-links.md') %>
