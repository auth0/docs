---
connection: Baidu
image: /media/connections/baidu.png
seo_alias: baidu
description: How to obtain an API Key and Secret Key for Baidu.
---

# Obtain an API Key and Secret Key for Baidu

To configure a Baidu OAuth2 connection, you will need to register your Auth0 tenant on their [integration portal](https://developer.baidu.com/dev).

This doc refers to the client steps to connect your client. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

## 1. Log into the integration portal and register a new App:

![](/media/articles/connections/social/baidu/baidu-register-1.png)


## 2. Get your API Key and Secret Key

Once the application is registered, enter your new `API Key` and `Secret Key` into the connection settings in Auth0.

![](/media/articles/connections/social/baidu/baidu-register-2.png)


## 3. Enter the callback URL:

Use the following value for the callback URL:

  https://${account.namespace}/login/callback

Select your application on the console, and then click on `API 管理 -> 安全设置`

![](/media/articles/connections/social/baidu/baidu-register-3.png)

<%= include('../_quickstart-links.md') %>
