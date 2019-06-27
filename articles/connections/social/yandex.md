---
title: Connect your app to Yandex
connection: Yandex
image: /media/connections/yandex.png
seo_alias: yandex
description: How to obtain an Application ID and Application Password for Yandex.
toc: true
topics:
  - connections
  - social
  - yandex
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Yandex

To configure an Yandex connection you will need to register your Auth0 instance as a Yandex application.

## 1. Create a new Application in Yandex:

Log in into Yandex and [create a new app](https://oauth.yandex.ru/client/new):

::: note
Complete instructions are available [here](http://api.yandex.ru/oauth/doc/dg/tasks/register-client.xml)
:::


## 2. Register a new application

Complete the form:

![](/media/articles/connections/social/yandex/yandex-create-app.png)

The <dfn data-key="callback">callback URL</dfn> for your app should be:

  https://${account.namespace}/login/callback

  <%= include('../_find-auth0-domain-redirects') %>


Notice that `scopes` in Yandex are defined in this screen. Select what kind of information you are requesting for your app.


## 3. Get your Application ID and Application Password

Once the application is registered, enter your new `Application ID` and `Application Password` into the connection settings in Auth0.

![](/media/articles/connections/social/yandex/yandex-add-connection.png)

<%= include('../_quickstart-links.md') %>
