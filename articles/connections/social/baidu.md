---
title: Connect your app to Baidu
connection: Baidu
image: /media/connections/baidu.png
seo_alias: baidu
description: How to obtain an API Key and Secret Key for Baidu.
toc: true
topics:
  - connections
  - social
  - baidu
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Baidu

To configure a Baidu OAuth2 connection, you will need to register your Auth0 tenant on their [integration portal](https://developer.baidu.com/dev).

## 1. Log into the integration portal and register a new App:

![](/media/articles/connections/social/baidu/baidu-register-1.png)


## 2. Get your API Key and Secret Key

Once the application is registered, enter your new `API Key` and `Secret Key` into the connection settings in Auth0.

![](/media/articles/connections/social/baidu/baidu-register-2.png)


## 3. Enter the callback URL:

Use the following value for the <dfn data-key="callback">callback URL</dfn>:

  https://${account.namespace}/login/callback

  <%= include('../_find-auth0-domain-redirects') %>

Select your application on the console, and then click on `API 管理 -> 安全设置`

![](/media/articles/connections/social/baidu/baidu-register-3.png)

<%= include('../_quickstart-links.md') %>
